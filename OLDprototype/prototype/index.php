<?php
	
include('config/db_connect.php');

	//write query for all car records
	$sql = 'SELECT id, make, model, price, dealerEmail FROM cars ORDER BY created_at';
	//make query and get result
	$result = MySQLi_query($conn, $sql);
	//fetch the resulting rows as an array
	$cars = mysqli_fetch_all($result, MYSQLI_ASSOC);
	//not needed but good practice
	//free result from memory
	mysqli_free_result($result);
	//close Connection
	mysqli_close($conn);

?>

<!DOCTYPE html>
<html>
<?php include('templates/header.php') ?>

<h4 class="center grey-text">Car List</h4>
<div class="container">
	<div class="row">
		 <?php foreach($cars as $car): ?>
			<div class="col s6 md3">
				<div class="card z-depth-0">
					<img src="img/car.svg" alt="car" class="car">
					<div class="card-content center">
						<h6><?php echo htmlspecialchars(ucfirst($car['make']) . ' ' . ucfirst($car['model'])) ?></h6>
						<div><?php echo htmlspecialchars($car['price']); ?></div>
					</div>
					<div class="card-action right-align">
						<a class="brand-text" href="details.php?id=<?php echo $car['id'] ?>">More info</a>
					</div>
				</div>
			</div>
		 <?php endforeach; ?>

	</div>
</div


<?php include('templates/footer.php') ?>