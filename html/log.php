<?php
// Get the POST data
$data = json_decode(file_get_contents('php://input'), true);

// Check if data was received
if ($data) {
    // Prepare the log data
    $logData = date('Y-m-d H:i:s') . " - Click: " . $data['click'] . " - Need: " . $data['need'] . ", Category: " . $data['category'] . ", Type: " . $data['type'] . ", Item: " . $data['item'] . ", Link: " . $data['link'] . ", UniqueID: " . $data['uniqueid'] . PHP_EOL;

    // Append the log data to the log file
    file_put_contents('logs/user_log.txt', $logData, FILE_APPEND);

    // Respond with a success message
    echo "Data successfully logged";
} else {
    // Respond with an error if no data received
    http_response_code(400);
    echo "No data received";
}
?>
