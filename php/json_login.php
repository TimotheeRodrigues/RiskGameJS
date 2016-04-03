<?php
	header('Cache-Control: no-cache, must-revalidate');
	header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
	header('Content-type: application/json');
	
	session_start();

	$obj = new stdClass();

	// Regarder ce qu'il y a dans ces champs:
	if(!isset($_POST['nickname']) || !isset($_POST['password'])){
		$obj->message = "error";
		echo json_encode($obj);
		die;
	}

	$nickname = $_POST['nickname'];
	$passwd = $_POST['password'];

	$_SESSION['connecte'] = $_POST['nickname'];

	$obj->success = true;
	$obj->message = "Hello ".$_SESSION['connecte'];

	echo json_encode($obj);

