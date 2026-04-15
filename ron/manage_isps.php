<?php
header('Content-Type: application/json');

$blockedISPsFile = 'blocked_isps.json';

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

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $blockedISPs = readJSONFile($blockedISPsFile);
    echo json_encode($blockedISPs);
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (isset($input['blockedISPs']) && is_array($input['blockedISPs'])) {
        if (writeJSONFile($blockedISPsFile, $input['blockedISPs'])) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Failed to save blocked ISPs']);
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'Invalid data']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method']);
}
?>