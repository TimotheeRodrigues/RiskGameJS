<?php

/**
 * Created by PhpStorm.
 * User: timothee
 * Date: 26/03/16
 */
class Territory {

    private $owner;
    private $armiesNbr;
    private $state;

    function __construct() {
        $this->owner = 'neutral';
        $this->armiesNbr = 2;
        $this->state = 'in_peace';
    }

    function changeOwner($player){
        if(!isset($player)){
            echo "Error [Territory.php]: $player";
        }
        $this->owner = $player;
    }

    function getOwner(){
        return $this->owner;
    }

    function getVars(){
        return get_object_vars($this);
    }
}