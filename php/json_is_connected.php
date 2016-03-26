<?php
	header('Cache-Control: no-cache, must-revalidate');
	header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
	header('Content-type: application/json');
	
	session_start();

	$obj = new stdClass();

	if (isset($_SESSION['connecte'])){
		$obj->est_connecte = true;
	}else{
		$obj->est_connecte = false;
	}

	echo json_encode($obj);
