<?php
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);
if (isset($data['logs'])) {
    file_put_contents('visits.json', json_encode($data['logs'], JSON_PRETTY_PRINT));
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid data']);
}
?>