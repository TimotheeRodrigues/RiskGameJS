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

    function getOwner(){
        return $this->owner;
    }

    function getArmiesNbr(){
        return $this->armiesNbr;
    }
}