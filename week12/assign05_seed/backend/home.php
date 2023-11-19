<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1 style="text-align: center;">Toronto Business College</h1>
    <h1 style="text-align: center;">
    <?php
        $user = $_POST["uname1"];
        if(isset($user) && $user == "David"){
            echo 'Welcome ' . htmlspecialchars($_POST["uname1"]) . '!';
            echo '<br>';
            echo 'You are an authorized user.';
        }else{
            echo 'Invalid User Login ...';
        }
    ?>
    </h1>
</body>
</html>