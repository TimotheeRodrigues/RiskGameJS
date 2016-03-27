<?php
/**
 * Created by PhpStorm.
 * User: timothee
 * Date: 26/03/16
 */
require_once 'Territory.php';
require_once 'Player.php';

class Map{
    private $map = array();
    private $size;
    private $players = array();

    private function initializeMap(){
        for($i = 0; $i < $this->size; ++$i){
            for($j = 0; $j < $this->size; ++$j){
                $id = $i . '-' . $j;
                $this->map[$id] = new Territory();
            }
        }
    }//initializeMap()

    function placePlayer($player){
        if(!isset($player)
            || !$player instanceof Player){
            echo 'Error[Map.php]: player';
            die;
        }
        $this->players[] = $player;
        while(true){
            $i = rand(0, $this->size - 1);
            $j = rand(0, $this->size - 1);
            $id = $i . '-' . $j;
            if($this->map[$id]->getOwner() == 'neutral'){
                $this->map[$id]->changeOwner($player->type());
                break;
            };
        }
        $this->updatePlayerTerritories($player);
    }//placePlayers()

    function __construct($params){
        if(!isset($params['size'])
            || !is_int($params['size'])){
            echo 'error[Map.php]: size';
            die;
        }

        $this->size = $params['size'];

        $this->initializeMap();

    }//__construct($params)

    function getToArray(){
        $map = array();
        foreach($this->map as $id => $territory ){
            $map[$id] = $territory->getVars();
        }
        return $map;
    }//getJsonMap()

    function getById($id){
        return $this->map[$id];
    }//getById($id)

    function updatePlayerTerritories($player){
        $territories = array();
        foreach($this->map as $key => $territory){
            if($territory->getOwner() == $player->type()){
                $territories[$key] = $territory;
            }
        }
        $player->setTerritories($territories);
    }//updatePlayerTerritories($player)

    function updatePlayersTerritories(){
        foreach($this->players as $player){
            $this->updatePlayerTerritories($player);
        }
    }//updatePlayerTerritories($player)
}
