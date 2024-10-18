<?php
// Check for post data (if using POST)
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $message = $_POST['message']; // Fetch message from the form
  $selecteStyle = $_POST['alert-style-dropdown'];
  $filename = '../data/message.txt';

  // Write to file (use file_put_contents() function)
  if (file_exists($filename)) {
    $handle = fopen($filename, "w");
    fwrite($handle, "<div class='text-center alert alert-" . $selecteStyle . "' >" . $message . "</div>");
    fclose($handle);
    echo "Message saved to file: ".$filename;
  } else {
    file_put_contents($filename, "<div class='text-center alert alert-success' style='font-size: 18px;'></div>");
  }
}

?>