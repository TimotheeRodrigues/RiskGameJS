<?php
	header('Cache-Control: no-cache, must-revalidate');
	header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
	header('Content-type: application/json');
	
	$obj = new stdClass();

	$obj->success = true;
	$obj->message = "Bonjour :~)";

	echo json_encode($obj);

