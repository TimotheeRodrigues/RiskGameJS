<?php
require_once 'Map.php';

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

session_start();

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

if($attacker->getArmies() > 1){
    $attArmies = $attacker->getArmies();
    $defArmies = $defender->getArmies();
    if($attacker->getOwner() != $defender->getOwner()) {
        $attPts = $attArmies * rand(0, 20);
        $defPts = $defender * rand(0, 30);

        if ($attPts > $defPts) {
            $defender->changeOwner($attacker->getOwner());
            $defender->setArmies(floor($attArmies / 2));
            $attacker->setArmies(ceil($attArmies / 2));
            $obj->success = true;
        } else {
            if ($attArmies == 2)
                $attacker->setArmies(floor($attArmies / 2));
            else
                $attacker->setArmies($attArmies - floor($attArmies / 3));
        }

        $map->updatePlayersTerritories();
    }else{
        $defender->setArmies($defArmies + floor($attArmies / 2));
        $attacker->setArmies(ceil($attArmies / 2));
        $obj->success = true;
    }
}

$obj->attacker = $attacker->getVars();
$obj->defender = $defender->getVars();

echo json_encode($obj);