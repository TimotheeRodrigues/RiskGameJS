<?php
require_once 'Map.php';

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

$size = 10;

$map = new Map(['size'=>$size]);

$obj = new stdClass();
$obj->size = $size;
$obj->jsonmap = $map->getToArray();

echo json_encode($obj);