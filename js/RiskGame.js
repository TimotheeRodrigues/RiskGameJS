/**
 * @class RiskGame()
 *
 * @class Map()
 *
 * @class Territory()
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
                }
                else if(typeof(data.jsonmap) == 'undefined'){
                    alert('error data.size');
                }
                else{
                    RiskGame.riskMap = new Map(data.size);

                    $('#riskgame').append(RiskGame.riskMap.drawMap(data.jsonmap))
                        .append('<button id="end_turn" type="button" ' +
                            'class="btn btn-primary">END TURN</button>');
                    $('#end_turn').click(function(){RiskGame.getInstance().newTurn();});

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
        RiskGame.riskMap.setToDefault();
        //TODO erase this map and draw a new map recieved from the server

        $('.attacked').attr('class', 'player');//TODO just to test
        //adds a clickListener to the .player buttons
        $('.player')
            .data('map-obj', RiskGame.riskMap)
            .click(RiskGame.riskMap.clickListener);
    };//newTurn()

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


    this.click = false;




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
     * method: createLine(i)
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
            var armies = jsonmap[varId]['armiesNbr'];
            newLine.append($('<td class="'+owner+'" id="'+varId+'">').html(armies));
        }
        return newLine;
    };


    /**
     * @method: placePlayer(playerType)
     * @param playerType  (could be : 'player', 'cpu')
     *
     * Place the player randomly
     */
    this.placePlayer = function(playerType) {
        var randomLine = Math.floor((Math.random() * this.size));
        var randomColumn = Math.floor((Math.random() * this.size));
        var id = '#' + randomLine + '-' + randomColumn;
        $(id).attr('class', playerType);
    };


    /**
     * @method clickListener()
     * @see RiskGame.newTurn()
     */
    this.clickListener = function(){
        var id = $(this).attr('id');
        id = id.split('-');
        var map = $(this).data('map-obj'); //map is the current instance of Map
        console.log("clickListener",map.click);
        if(!map.click) {
            map.click = true;
            map.onFirstClick(id[0],id[1]);
        }else{
            map.click = false;
            map.setToDefault();
        }
    };


    /**
     * method: onFirstClick(line, column)
     * @param line
     * @param column
     *
     * @see clickListener
     */
    this.onFirstClick = function(line,column){
        var i = parseInt(line);
        var j = parseInt(column);

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
            .data('pos-line', line)
            .data('pos-column', column)
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
        $('.player')
            .unbind('click')
            .click(this.clickListener);
        this.click = false;
    };//setToDefault()

    /**
     * @method conquer()
     * @see highlight(line, column)
     *
     * @note   Should add the territory that we want to conquer in an array.
     *         This array will be sent to the server when END TURN is called.
     *         The server will return the state of the new map.
     */
    this.conquer = function(){
        var line = $(this).data('pos-line');
        var column = $(this).data('pos-column');
        var obj = $(this).data('current-obj');
        obj.setToDefault();
        $('#' + line + '-' + column)
            .attr('class', 'attacked')
            .unbind('click');
    };//conquer()
}
//END class Map ################
//##############################