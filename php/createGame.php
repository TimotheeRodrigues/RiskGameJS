<?php
require_once 'Map.php';

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

session_start();

$size = 10;
$_SESSION['player'] = new Player(['type'=>'player']);
$_SESSION['map'] = new Map(['size'=>$size, 'player' => $_SESSION['player']]);
$_SESSION['map']->placePlayer($_SESSION['player']);
$_SESSION['map']->placePlayer(new Player(['type'=>'cpu']));

$obj = new stdClass();
$obj->size = $size;
$_SESSION['player']->countReinforcement();
$obj->reinforcement = $_SESSION['player']->getReinforcement();
$obj->jsonmap = $_SESSION['map']->getToArray();

echo json_encode($obj);