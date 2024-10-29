<?php

// Define the upload directory path
$uploadDirectory = '../html/data/';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Check if a file was uploaded
    if (isset($_FILES['fileToUpload'])) {

        // Validate the file size
        if ($_FILES['fileToUpload']['size'] > 500000) { // Adjust the limit as needed
            echo "File is too large.";
        } else {
            // Get the uploaded file details
            $fileName = $_FILES['fileToUpload']['name'];
            $tmpName = $_FILES['fileToUpload']['tmp_name'];

            // Move the uploaded file to the upload directory
            if (move_uploaded_file($tmpName, $uploadDirectory . $fileName)) {
                echo "<div class='alert alert-success' style='font-size: 18px;'>File uploaded successfully.</div>";
            } else {
                echo "<div class='alert alert-warning' style='font-size: 18px; '>Failed to upload file: " . $tmpName . " :: " . $fileName . "</div>";
            }
        }
    }
}

?>

<!DOCTYPE html>
<html>
    <head>
        <title>File Upload</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    </head>
    <body>

    <h2>Upload File</h2>

    <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post" enctype="multipart/form-data">
        <input type="hidden" name="MAX_FILE_SIZE" value="200000" />
        <input type="file" name="fileToUpload" class="form-control"> 
        <button type="submit" class="btn btn-primary">Upload</button>
    </form>

    </body>
</html>
