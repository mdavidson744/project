<?php
//episode #36 Sessions

//sessions
if (isset($_POST['submit'])){

    setcookie('gender', $_POST['gender'], time() + 86400); //86400s for 1 day

    session_start();

    $_SESSION['name'] = $_POST['name'];

    header('Location: index.php');
}

?>

<!DOCTYPE html>
<html>
    <head>
        <title>sessions test</title>
    </head>
    <body>
        <p class="center">Enter name</p>
        <form action="<?php echo $_SERVER['PHP_SELF'] ?>" method ="POST">
            <input type="text" name="name">
            <select name="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>

            <input type="submit" name="submit" value="submit">

        </form>
    </body>
</html>