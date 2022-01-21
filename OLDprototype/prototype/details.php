<?php 

include('config/db_connect.php');

//delete
if(isset($_POST['delete'])){
	//get id
	$id_to_delete = mysqli_real_escape_string($conn, $_POST['id_to_delete']);

	//make sql string
	$sql = "DELETE FROM cars WHERE id = $id_to_delete";

	//make query & check
	if(mysqli_query($conn, $sql)){
		//success
		header('Location: index.php');
	} {
		//failure
		echo 'query error: ' . mysqli_error($conn);
	}

}

//check GET request id parameter
if(isset($_GET['id'])){
	$id = mysqli_real_escape_string($conn, $_GET['id']);

	//make sql
	$sql = "SELECT * FROM cars WHERE id = $id";
	

	//get the query results
	$result = mysqli_query($conn, $sql);

	//fetch the result in array format
	$car = mysqli_fetch_assoc($result);

	//free result
	mysqli_free_result($result);
	//close connection
	mysqli_close($conn);
	}
?>

<!DOCTYPE html>
<html>
	<?php include('templates/header.php') ?>

	<div class="container center grey-text">
		<?php if($car): ?>
			<h4><?php echo htmlspecialchars(ucfirst($car['make'])) ?></h4>
			<h5><?php echo htmlspecialchars(ucfirst($car['model'])) ?></h5>
			<p>&pound: <?php echo htmlspecialchars($car['price']) ?></p>
			<p>Contact: <?php echo htmlspecialchars($car['dealerEmail']) ?></p>
			<p>Created: <?php echo htmlspecialchars($car['created_at']) ?></p>
			
			<!-- Delete Form -->
			<form action="details.php" method="POST">
				<input type="hidden" name="id_to_delete" value="<?php echo $car['id'] ?>">	
				<input type="submit" name="delete" value="Delete" class="btn brand z-depth-0">
			</form>

		<?php else: ?>
			<h5>Sorry! This ad does not exist anymore</h5>
		<?php endif;?>
	</div>

	<?php include('templates/footer.php') ?>
</html>