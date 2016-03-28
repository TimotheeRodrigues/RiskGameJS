<?php
require_once 'Map.php';
require_once 'Player.php';

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

session_start();

if (!isset($_SESSION['map'])||!isset($_SESSION['player'])){
    echo "error endTurn.php";
    die;
}

$obj = new stdClass();
$_SESSION['player']->countReinforcement();
$obj->reinforcement = $_SESSION['player']->getReinforcement();
$obj->jsonmap = $_SESSION['map']->getToArray();

echo json_encode($obj);