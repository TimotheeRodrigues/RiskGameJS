/**
 * @class RiskGame()
 *
 * @class Map()
 */


//##############################
//BEGIN class RiskGame #########
/**
 * @class RiskGame
 * @param size
 * @constructor
 */
function RiskGame(){
    RiskGame.instance = null;
    RiskGame.riskMap = null;
    /**
     * @method startGame()
     *
     * Function called when START GAME is called.
     * ask server to return a map and draw this new map
     */
    this.startGame = function(){
        $.ajax({
            method: 'post',
            url: 'php/createGame.php',
            dataType: 'json',
            success: function(data){
                if(typeof(data.size) == 'undefined'){
                    alert('error data.size');
                } else if(typeof(data.jsonmap) == 'undefined'){
                    alert('error data.size');
                } else if(typeof(data.reinforcement) == 'undefined'){
                    alert('error data.reinforcement');
                } else{
                    RiskGame.riskMap = new Map(data.size);
                    RiskGame.riskMap.reinforcement = data.reinforcement;
                    $('#riskgame')
                        .append(RiskGame.getInstance().displayReinforcement())
                        .append(RiskGame.riskMap.drawMap(data.jsonmap))
                        .append(RiskGame.getInstance().createEndTurnButton());
                    $('#end_turn').click(function(){RiskGame.getInstance().endTurn();});
                    RiskGame.getInstance().newTurn();
                }
            },
            error: function() {
                alert('error when start game');
            }
        });
        $(this).hide();

        return false;
    };//startGame()


    /**
     * @method newTurn()
     *
     * @see startGame()
     */
    this.newTurn = function(){
        RiskGame.riskMap.defenders = [];
        RiskGame.riskMap.setToDefault();
        RiskGame.riskMap.placeReinforcement();
    };//newTurn()

    /**
     * @method endTurn
     *
     *      When the server has finished its turn
     *      we display the reinforcements availables
     *      we draw the new map received
     *      we start a new turn
     */
    this.endTurn = function(){
        $.ajax({
            method: 'post',
            url: 'php/endTurn.php',
            dataType: 'json',
            success: function(data){
                if(typeof(data.jsonmap) == 'undefined'){
                    alert('error data.jsonmap');
                } else if(typeof(data.reinforcement) == 'undefined'){
                    alert('error data.reinforcement');
                } else{
                    RiskGame.riskMap.reinforcement = data.reinforcement;
                    $('#riskgame')
                        .empty()
                        .append(RiskGame.getInstance().displayReinforcement())
                        .append(RiskGame.riskMap.drawMap(data.jsonmap))
                        .append(RiskGame.getInstance().createEndTurnButton());
                    $('#end_turn').click(function(){RiskGame.getInstance().endTurn();});
                    RiskGame.getInstance().newTurn();
                }
            },
            error: function() {
                alert('error when end turn');
            }
        });
        return false;
    };

    this.createEndTurnButton = function(){
        var button = '<button id="end_turn" type="button" ' +
            'class="btn btn-primary">END TURN</button>';
        return button;
    };

    this.displayReinforcement = function(){
        var reinforcement = '<div id="reinforcement-div"><label>reinforcement: </label>' +
            '<h3 id="reinforcement">' +RiskGame.riskMap.reinforcement +
            '</h3></div>';
        return reinforcement;
    };
}//RiskGame()

/**
 * @static_method getInstance()
 * @returns {null|RiskGame|*}
 */
RiskGame.getInstance = function(){
    if(null == RiskGame.instance)
        RiskGame.instance = new RiskGame();
    return this.instance;
};//getInstance()

//END class RiskGame ###########
//##############################







//##############################
//BEGIN class Map ##############

/**
 * @class Map
 * @param size
 * @constructor
 */
function Map(size){
    this.size = size;
    this.higlighted = [];
    this.reinforcement = 0;

    this.click = false;
    this.attacker = null;
    this.defenders = [];



    /**
     * @method: drawMap()
     * @returns {*|jQuery|HTMLElement}
     */
    this.drawMap = function(jsonmap){
        var newTable = $('<table id="map"/>');
        for(i = 0; i < this.size; ++i){
            newTable.append(this.createLine(i,jsonmap));
        }
        return newTable;
    };


    /**
     * @method createLine(i)
     * @param i  (the line number)
     * @returns {*|jQuery|HTMLElement}
     *
     * @see drawMap()
     */
    this.createLine = function(i,jsonmap){

        var newLine = $('<tr/>');
        for(var j = 0; j < this.size; ++j) {
            var varId = i+'-'+j;
            var owner = jsonmap[varId]['owner'];
            var armies = jsonmap[varId]['armies'];
            newLine.append($('<td class="'+owner+'" id="'+varId+'">').html(armies));
        }
        return newLine;
    };


    /**
     * @method clickListener()
     * @see RiskGame.newTurn()
     */
    this.clickListener = function(){
        var id = $(this).attr('id');
        var map = $(this).data('map-obj'); //map is the current instance of Map
        if(!map.click && map.defenders[id] === undefined) {
            map.click = true;
            id = id.split('-');
            map.onFirstClick(id[0],id[1]);
        }else{
            map.click = false;
            map.setToDefault();
        }
    };


    /**
     * @method onFirstClick(line, column)
     * @param line
     * @param column
     *
     * @see clickListener
     */
    this.onFirstClick = function(line,column){
        var i = parseInt(line);
        var j = parseInt(column);
        this.attacker = i+'-'+j;
        if(0 <= j-1){
            this.highlight(i, j-1);
        }
        if(0 <= i-1){
            this.highlight(i-1, j);
        }
        if(this.size > j+1){
            this.highlight(i, j+1);
        }
        if(this.size > i+1){
            this.highlight(i+1, j);
        }
    };

    /**
     * @method highlight(line, column)
     * @param line
     * @param column
     */
    this.highlight = function(line, column){
        var id = '#' + line + '-' + column;
        $(id)
            .css('opacity', '0.5')
            .unbind('click')
            .data('id', line+'-'+column)
            .data('current-obj', this)
            .click(this.conquer);
        this.higlighted.push(id);
    };//highlight(line, column)


    /**
     * @method setToDefault()
     * @see conquer(), clickListener()
     */
    this.setToDefault = function(){
        for(var i=0; i < this.higlighted.length; ++i){
            var id = this.higlighted[i];
            $(id)
                .css('opacity', '')
                .unbind('click');
        }
        this.higlighted = []; //initialize the array
        this.click = false;
        if(this.attacker != null)
            this.attacker = null;
        $('.player')
            .unbind('click')
            .data('map-obj', this)
            .click(this.clickListener);
    };//setToDefault()

    /**
     * @method conquer()
     * @see highlight(line, column)
     *
     *      Send to the server the attacking territory and the defending territory.
     *
     *      If the attack has succeeded, half of the attacking armies will be sent
     *      to the conquered territory.
     *      Else if the attack has failed, a third of the attacking army will be
     *      destroyed.
     *
     *      This function is also used when the player wants to move armies
     *      on is own territory. In this case half of the army to move will be
     *      sent (added) to the destination.
     */
    this.conquer = function(){
        var id = $(this).data('id');
        var map = $(this).data('current-obj');
        map.defenders[id] = id;
        $.ajax({
            method: 'POST',
            url: 'php/attack.php',
            data: {'attacker': map.attacker,
                   'defender': map.defenders[id]},
            dataType: 'json',
            success: function(data){
                if (data.success == 'undefined'
                || data.attacker == 'undefined'
                || data.defender == 'undefined')
                    alert('error data.success/attacker/defenders');
                else if(data.success){
                    /*  if the attack has succeeded
                            - refresh the number of armies on the attacker's territory
                                and also on the defender's territory
                            - change the owner of the former defending territory
                    */
                    $('#'+map.attacker).html(data.attacker.armies);
                    $('#'+map.defenders[id])
                        .html(data.defender.armies)
                        .attr('class', data.defender.owner);

                }else{
                    $('#'+map.attacker).html(data.attacker.armies);
                }
                RiskGame.riskMap.setToDefault();
            },
            error: function(){
                alert('error when attack');
            }
        })
    };//conquer()

    /**
     * @method placeReinforcement()
     * @see newTurn()
     */
    this.placeReinforcement = function(){

        $('.player')
            .unbind('click')
            .data('current-obj', this)
            .click(function() {
                var map = $(this).data('current-obj');
                var id = $(this).attr('id');
                $.ajax({
                    method: 'POST',
                    url: 'php/reinforcement.php',
                    data: {'id': id},
                    dataType: 'json',
                    success: function (data) {

                        if (data.success == 'undefined'
                            || data.armies == 'undefined'
                            || data.reinforcement == 'undefined') {
                            alert('error data.success/data.armies');
                        } else if (data.success == true) {

                            $('#'+id).html(data.armies);
                            map.reinforcement = data.reinforcement;
                            $('#reinforcement').html(map.reinforcement);

                            //if there are reinforcement to place
                            if(map.reinforcement != 0)
                                map.placeReinforcement();
                            else {
                                //if there are no more reinforcement
                                //the map is waiting for attack requests
                                $('.player')
                                    .data('map-obj', RiskGame.riskMap)
                                    .click(RiskGame.riskMap.clickListener);
                            }
                        }
                    },
                    error: function() {
                        alert('error when place reinforcement');
                    }
                });
                return false;
            });
    };//placeReinforcement()
}
//END class Map ################
//##############################