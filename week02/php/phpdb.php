<?php
function gettr($p_id, $p_name){
    $tr = <<<EOT
    <tr>
    <td>$p_id</td>
    <td>$p_name</td>
    </tr>
    EOT;
    return $tr;
}
?>

<!DOCTYPE html>
<html>

<head>
    <title>I am the title of this html page</title>
    <style>
        #student {
            width: 100%;
        }
    </style>
</head>

<body>
    <?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "test";

    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    //echo "Using mysqli, Connected successfully";
    ?>

    <table id="student" >
        <caption>Registered Users</caption>
        <thead >
            <tr>
                <th style="padding:20px 20px; text-align: left;">ID</th>
                <th style="text-align: left;">UserName</th>
            </tr>
        </thead>
        <tbody>
            <?php
            // Run a SQL query
            $sql = "SELECT * FROM student";
            $result = mysqli_query($conn, $sql);

            // Fetch the result data
            if (mysqli_num_rows($result) > 0) {
                while ($row = mysqli_fetch_assoc($result)) {

                    //echo "id: " . $row["id"] . " - username: " . $row["username"] . "";
                    echo gettr($row["id"], $row["username"]);
                }
            } else {
                echo "0 results";
            }

            // Close the connection
            mysqli_close($conn);
            ?>
        </tbody>
    </table>
</body>

</html>