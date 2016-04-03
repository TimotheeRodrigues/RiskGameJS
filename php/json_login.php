<?php
	header('Cache-Control: no-cache, must-revalidate');
	header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
	header('Content-type: application/json');
	
	session_start();

	$obj = new stdClass();

	// Regarder ce qu'il y a dans ces champs:
	if($_POST['nickname'] == '' || $_POST['password'] == ''){
		$obj->success = false;
		$obj->message = "Bad login...";
		echo json_encode($obj);
	}else{
		$_SESSION['connecte'] = $_POST['nickname'];

		$obj->success = true;
		$obj->message = "Hello " . $_SESSION['connecte'];

		echo json_encode($obj);
	}

