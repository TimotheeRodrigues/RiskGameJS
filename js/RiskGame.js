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
 * class RiskGame
 * @param size
 * @constructor
 */
function RiskGame(size){
    RiskGame.instance = null;

    /**
     * @method startGame()
     *
     * Function called when START GAME is called.
     * It draws a new map, adds a button to end turn, and places players.
     */
    this.startGame = function(){
        //draw a new Map and add a button to end turn
        riskMap = new Map(10);
        $('#riskgame').append(riskMap.drawMap())
                      .append('<button id="end_turn" type="button" ' +
                                'class="btn btn-primary">END TURN</button>');
        $('#end_turn').click(function(){RiskGame.getInstance().newTurn();});

        //place players
        riskMap.placePlayer('player');
        riskMap.placePlayer('cpu');

        this.newTurn();
    };//startGame()

    /**
     * method newTurn()
     */
    this.newTurn = function(){
        var click = false;
        $('.player').click(function(){
            var id = $(this).attr('id');
            if(!click) {
                click = true;
                console.log(id[0] + '\t' + id[1]);
                riskMap.onFirstClick(id[0],id[1]);
            }else{
                click = false;
                riskMap.setToDefault();
            }
        });
    };//newTurn()

}//RiskGame()

/**
 * @static_method getInstance(size)
 * @param size
 * @returns {null|RiskGame|*}
 */
RiskGame.getInstance = function(size){
    if(null == RiskGame.instance)
        RiskGame.instance = new RiskGame(size);
    return this.instance;
};

//END class RiskGame ###########
//##############################







//##############################
//BEGIN class Map ##############

/**
 * class Map
 * @param size
 * @constructor
 */
function Map(size){
    this.grid = [];
    this.size = size;
    this.higlighted = [];
    /**
     * method: drawMap()
     * @returns {*|jQuery|HTMLElement}
     */
    this.drawMap = function(){
        var newTable = $('<table id="map"/>');
        for(i = 0; i < this.size; ++i){
            newTable.append(this.createLine(i));
        }
        return newTable;
    };


    /**
     * method: createLine(i)
     * @param i  (the line number)
     * @returns {*|jQuery|HTMLElement}
     *
     * function called in drawMap()
     */
    this.createLine = function(i){
        var newLine = $('<tr/>');
        for(var j = 0; j < this.size; ++j) {
            //create td with id = "+i+j+"
            newLine.append($('<td class="neutral" id="'+i+j+'">').html('2'));
        }
        return newLine;
    };


    /**
     * method: placePlayer(playerType)
     * @param playerType  (could be : 'player', 'cpu')
     *
     * Place the player randomly
     */
    this.placePlayer = function(playerType) {
        var randomLine = Math.floor((Math.random() * this.size));
        var randomColumn = Math.floor((Math.random() * this.size));
        var id = '' + randomLine + randomColumn;
        $('#' + id).attr('class', playerType);
    };

    /**
     * method: onFirstClick(line, column)
     * @param line
     * @param column
     *
     * function called when the square is clicked for the first time
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
     * method: highlight(line, column)
     * @param line
     * @param column
     */
    this.highlight = function(line, column){
        var id = '' + line + column;
        $('#'+id).css('opacity', '0.5');
        $('#'+id).click(function(){
            $('#' + id).attr('class', 'player');
            //this.setToDefault(); ToDo write a new function conquer()
        });
        this.higlighted.push(id);
    };

    /**
     * method: setToDefault()
     */
    this.setToDefault = function(){
        for(i=0; i < this.higlighted.length; ++i){
            var id = this.higlighted[i];
            $('#'+ id).css('opacity', '');
            $('#'+ id).unbind('click');
        }
        this.higlighted = [];
    }
}
//END class Map ################
//##############################