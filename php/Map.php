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

    private function initializeMap(){
        for($i = 0; $i < $this->size; ++$i){
            for($j = 0; $j < $this->size; ++$j){
                $id = $i . '-' . $j;
                $this->map[$id] = new Territory();
            }
        }
    }//initializeMap()

    private function placePlayer($player){
        if(!isset($player)){
            echo 'Error[Map.php]: player';
            die;
        }
        while(true){
            $i = rand(0, $this->size - 1);
            $j = rand(0, $this->size - 1);
            $id = $i . '-' . $j;
            if($this->map[$id]->getOwner() == 'neutral'){
                $this->map[$id]->changeOwner($player);
                break;
            };
        }
    }//placePlayers()

    function __construct($params){
        if(!isset($params['size']) && !is_int($params['size'])){
            echo 'error[Map.php]: size';
            die;
        }

        $this->size = $params['size'];

        $this->initializeMap();

        $this->placePlayer('player');

        $this->placePlayer('cpu');

    }//__construct($params)

    function getToArray(){
        $map = array();
        foreach($this->map as $id => $territory ){
            $map[$id] = $territory->getVars();
        }
        return $map;
    }//getJsonMap()
}
