<?php
	header('Cache-Control: no-cache, must-revalidate');
	header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
	header('Content-type: application/json');
	
	session_start();

	// Regarder ce qu'il y a dans ces champs:	
	// $_POST['nickname'];
	// $_POST['password'];
	// s'ils sont valides, vérifier s'il existe en base de données

	$obj = new stdClass();

	// /!\ ici on simule qu'on l'a trouvé en BD
	

	$_SESSION['connecte'] = $_POST['nickname'];

	$obj->success = true;
	$obj->message = "Bonjour ".$_SESSION['connecte'];

	echo json_encode($obj);

