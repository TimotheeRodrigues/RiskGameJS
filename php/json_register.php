<?php
/**
 * Created by PhpStorm.
 * User: timothee
 * Date: 30/03/16
 */

$obj = new stdClass();
$obj->success = false;

if(!isset($_POST['nickname'])
  || !isset($_POST['email'])
  || !isset($_POST['password'])
  || !isset($_POST['password-confirm'])){
    die;
}


if($_POST['nickname'] == '' || $_POST['email'] == '' || $_POST['password'] == ''){
    $obj->error = 'Invalid values';
    echo json_encode($obj);
    die;
}


if($_POST['password'] != $_POST['password-confirm']){
    $obj->error = 'Password not confirmed';
    echo json_encode($obj);
    die;
}

//Check in the DB if the nickname is not used

$obj->success = true;
$obj->message = 'You are now registered';

echo json_encode($obj);