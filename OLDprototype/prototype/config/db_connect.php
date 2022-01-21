<?php 
//MySQLi
	//connection to database
	$conn = MySQLi_connect('localhost', 'mark', 'test1234', 'car_database');

	//check connection
	if(!$conn){
		echo 'Connection error: ' . MySQLi_connect_error();
	}
?>