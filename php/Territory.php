<?php

/**
 * Created by PhpStorm.
 * User: timothee
 * Date: 26/03/16
 */
class Territory {

    private $owner;
    private $armies;
    private $state;

    function __construct() {
        $this->owner = 'neutral';
        $this->armies = 2;
        $this->state = 'in_peace';
    }

    function changeOwner($player){
        if(!isset($player)){
            echo "Error [Territory.php]: player";
        }
        $this->owner = $player;
    }

    function getOwner(){
        return $this->owner;
    }

    function getArmies(){
        return $this->armies;
    }

    function setArmies($armies){
        if(!isset($armies)){
            echo "error [Territory.php]: armies";
            die;
        }
        $this->armies = $armies;
    }

    function getVars(){
        return get_object_vars($this);
    }
}