<?php
require_once 'Map.php';

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
session_start();

if (!isset($_SESSION['map'])
    || !isset($_POST['id'])){
    echo "error reinforcement.php";
    die;
}

$territory = $_SESSION['map']->getById($_POST['id']);
$obj = new stdClass();
$obj->success = false;

if($_SESSION['player']->type() == $territory->getOwner()
    && $_SESSION['player']->getReinforcement()){
    $_SESSION['player']->decrementReinforcement();
    $territory->setArmies($territory->getArmies() + 1);
    $obj->success = true;
}
$obj->reinforcement = $_SESSION['player']->getReinforcement();
$obj->armies = $territory->getArmies();

echo json_encode($obj);

