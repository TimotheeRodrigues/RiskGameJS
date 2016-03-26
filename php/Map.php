<?php
/**
 * Created by PhpStorm.
 * User: timothee
 * Date: 26/03/16
 */
require_once 'Territory.php';

class Map{
    private $map = array();
    private $size;

    function __construct($params){
        if(!isset($params['size']) && !is_int($params['size'])){
            echo 'error[Map.php]: size';
            die;
        }

        $this->size = $params['size'];

        for($i = 0; $i < $this->size; ++$i){
            for($j = 0; $j < $this->size; ++$j){
                $id = $i . $j;
                $this->map[$id] = new Territory();
            }
        }
    }

    function getMap(){
        return $this->map;
    }
}