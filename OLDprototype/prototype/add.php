<?php

include('config/db_connect.php');

//initialising all variables so that form doesn't break expecting an uncalled variable
$make = $model = $price = $dealerEmail = '';

//empty errors so they don't display until form submit
$errors = array('make'=>'', 'model'=>'', 'price'=>'', 'dealerEmail'=>'');


if(isset($_POST['submit'])){
	//check make
	if(empty($_POST['make'])){
		$errors['make'] = 'A make is required <br />';
	} else {
		$make = $_POST['make'];
		if(!preg_match('/^[a-zA-Z\s]+$/', $make)){
			$errors['make'] =  'make must be letters and spaces only';
		}
	}

	//check model
	if(empty($_POST['model'])){
		$errors['model'] = 'A model is required <br />';
	} else {
		$model = $_POST['model'];
		if(!preg_match('/^[a-zA-Z0-9\s]*$/', $model)){
			$errors['model'] =  'model must be letters, numbers and spaces only';
			}
	}

	//check price
	if(empty($_POST['price'])){
		$errors['price'] = 'A price is required <br />';
	} else {
		$price = $_POST['price'];
		if(!preg_match('/^[0-9]+$/', $price)){
			$errors['price'] =  'Price must be a valid number';
			}
	}

	//check dealer email:
	if(empty($_POST['dealerEmail'])){
		$errors['dealerEmail'] = 'A dealer\'s email address is required <br />';
	} else {
		$dealerEmail = $_POST['dealerEmail'];
		if(!filter_var($dealerEmail, FILTER_VALIDATE_EMAIL)) {
			$errors['dealerEmail'] =  'email must be a valid email address:';
		}
	}

	//redirect user to index page
	if(array_filter($errors)){
		echo 'errors in form';
	} else {
		//form is valid
		//save to database
		$make = mysqli_real_escape_string($conn, $_POST['make']);
		$model = mysqli_real_escape_string($conn, $_POST['model']);
		$price = mysqli_real_escape_string($conn, $_POST['price']);
		$dealerEmail = mysqli_real_escape_string($conn, $_POST['dealerEmail']);

		//create sql
		$sql = "INSERT INTO cars(make, model, price, dealerEmail) VALUES('$make', '$model', '$price', '$dealerEmail')";

		//save to database and check
		if(mysqli_query($conn, $sql)){
			//success
			//redirect to index
			header('Location: index.php');
		} else {
			echo 'query error: ' . mysqli_error($conn);
		}
	}

} //end of post check

?>

<!DOCTYPE html>
<html>

<?php include('templates/header.php') ?>

<section class="container grey-text">
<h4 class="center">Add a car</h4>
<form class="white" action="add.php" method="POST">
<label>Make:</label>
<input type="text" name="make" value="<?php echo htmlspecialchars($make) ?>">
<div class="red-text"><?php echo $errors['make']; ?></div>
<label>Model:</label>
<input type="text" name="model" value="<?php echo htmlspecialchars($model) ?>">
<div class="red-text"><?php echo $errors['model']; ?></div>
<label>Price &pound:</label>
<input type="text" name="price" value="<?php echo htmlspecialchars($price) ?>">
<div class="red-text"><?php echo $errors['price']; ?></div>
<label>Dealer email:</label>
<input type="text" name="dealerEmail" value="<?php echo htmlspecialchars($dealerEmail) ?>">
<div class="red-text"><?php echo $errors['dealerEmail']; ?></div>
<div class="center">
	<input type="submit" name="submit" value="submit" class="btn brand z-depth-0">
</div>
</form>
</section>
<?php include('templates/footer.php') ?>

</html>