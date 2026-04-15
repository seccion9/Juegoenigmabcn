<?php
header('Content-Type: application/json');

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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $logFile = 'visits.json';
    
    if (writeJSONFile($logFile, [])) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Failed to clear logs']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method']);
}
?>