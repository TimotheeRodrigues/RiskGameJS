<?php
require_once 'Map.php';

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

if (!isset($_SESSION['map'])
    || !isset($_POST['attacker'])
    || !isset($_POST['defender'])){
    echo "error attack.php";
    die;
}

$map = $_SESSION['map'];

$attacker = $map->getById($_POST['attacker']);

$defender = $map->getById($_POST['defender']);

$obj = new stdClass();
$obj->success = false;

if($attacker->getArmies > 1 && $attacker->getOwner() != $defender->getOwner()){
    $attArmies = $attacker->getArmies();
    $defArmies = $defender->getArmies();

    $attPts = $attArmies * rand(0, 20);
    $defPts = $defender * rand(0, 20);

    if($attPts > $defPts){
        $defender->changeOwner($attacker->getOwner());
        $defender->setArmies(intdiv($attArmies,2));
        $attacker->setArmies(intdiv($attArmies,2));
        $obj->success = true;
    }else{
        $attacker->setArmies($attArmies - intdiv($attArmies, 3));
    }

    $map->updatePlayersTerritories();
}

$obj->attacker = $attacker;
$obj->defender = $defender;

echo json_encode($obj);