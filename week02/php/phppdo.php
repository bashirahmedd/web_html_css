<!DOCTYPE html>
<html>

<head>
    <title>I am the title of this html page</title>
</head>

<body>
    <?php
    $host = 'localhost';
    $username = "root";
    $password = "";
    $dbname = "test";

    try {
        $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        echo 'Using PDO, Connected to the database successfully!';
    } catch (PDOException $e) {
        echo 'Error connecting to the database: ' . $e->getMessage();
    } ?>

</body>

</html>