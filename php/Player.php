<?php

/**
 * Created by PhpStorm.
 * User: timothee
 * Date: 27/03/16
 */
class Player
{
    private $type;
    private $reinforcement;
    private $territories = array();

    function __construct($params){
        if(!isset($params['type'])){
            echo "error [Player.php]";
            die;
        }
        $this->type = $params['type'];
    }

    function setTerritories($territories){
        if(!isset($territories)){
            echo "error [Player.php]";
            die;
        }
        $this->territories = $territories;
    }

    function countReinforcement(){
        $count = count($this->territories);
        $count += floor($count * 1.5);
        if($count < 5){
            $count = 5;
        }
        $this->reinforcement = $count;
    }

    function getReinforcement(){
        return $this->reinforcement;
    }

    function type(){
        return $this->type;
    }

    function decrementReinforcement(){
        --$this->reinforcement;
    }
}