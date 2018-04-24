$(document).ready(function () {
    var movimientos = 0;
    var puntuacion = 0;
    $(".main-titulo").click(function () {    });
    var candysType = [];
    candysType[0] = 'image/1.png'
    candysType[1] = 'image/2.png'
    candysType[2] = 'image/3.png'
    candysType[3] = 'image/4.png'
    function cambiarColor() {

        $('.main-titulo').animate({
            color: "#fff"
        }, 100);
        $('.main-titulo').animate({color: "yellow"}, cambiarColor);

    }

    setInterval(cambiarColor, 500);
      

    $('.btn-reinicio').click(function () {
        fillBoard();
        movimientos=0;
        puntuacion=0;
        $('#score-text').text(0);
        $('#movimientos-text').text(0);
    });

    var grid = [];
    var rows = 7;
    var cols = 7;
    var validFigures = 0;
    var levelGoal = 0;
    // this function returns a random candy.
    function pickRandomcandy() {
        var pickInt = Math.floor((Math.random() * 4));
        return candysType[pickInt];
    }
    function fillBoard() {
        $('.col-0').empty();
        $('.col-1').empty();
        $('.col-2').empty();
        $('.col-3').empty();
        $('.col-4').empty();
        $('.col-5').empty();
        $('.col-6').empty();

    
    function candy(r, c, obj, src) {
        return {
            r: r,  // current row of the object 
            c: c,  // current columns of the object
            src: src, // the image showed in cells(r, c) A Planet image!!
            locked: false, // This property indicate if the cell(r, c) is locked
            isInCombo: false, // This property indicate if the cell(r, c) is currently in valid figure
            o: obj // this is a pointer to a jQuery object-
       }
    }

    for (var r = 0; r < rows; r++) {

        grid[r] = [];

        for (var c = 0; c < cols; c++) {

            grid[r][c] = new candy(r, c, null, pickRandomcandy());

        }
        console.log(grid);
    }

      var width = $('.panel-tablero').width();
      var height = $('.panel-tablero').height(); // for firefox use $(document) instead of $(body)
      var cellWidth = width / (cols + 1);
      var cellHeight = height / (rows + 1);
      var marginWidth = cellWidth / cols;
      var marginHeight = cellHeight / rows;

        for (var r = 0; r < rows; r++) {
            for (var c = 0; c < cols; c++) {
                var cell = $("<img class='candy' id='candy_" +
                    r + "_" + c + "' r='" + r + "' c='" + c + "' ondrop = '_onDrop(event); 'ondragover = '_onDragOverEnabled(event);' src = '"+grid[r][c].src+"' style = 'width:"+(cellWidth - 20) + "px;height:" + cellHeight + "px;top:" + r * cellHeight + "px;left:" + (c * cellWidth + marginWidth) + "px'/>");
                cell.attr("ondragstart", "_ondragstart(event)");
                $(".col-" + c).append(cell);
                grid[r][c].o = cell;
            }
        }
    }
    // executed when user clicks on a candy
   document._ondragstart = function(a) {
        a.dataTransfer.setData("text/plain", a.target.id);
    }

// executes when user moves the candy over another candy 
// without releasing it
document._onDragOverEnabled = function (e) {
    e.preventDefault();
    console.log("drag over " + e.target.id);
}

// executes when user releases candy on other candy
document._onDrop = function(e) {
    // only for firefox! Firefox open new tab with dropped element as default
    // behavior. We hate it!
    var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    if (isFirefox) {
        console.log("firefox compatibility");
        e.preventDefault();
    }
    // gets source candy
    var src = e.dataTransfer.getData("text");
    var sr = src.split("_")[1];
    var sc = src.split("_")[2];

    // get destination candy
    var dst = e.target.id;
    var dr = dst.split("_")[1];
    var dc = dst.split("_")[2];

    // check distance between candy and avoid jump with distance > 1 ;)
    var ddx = Math.abs(parseInt(sr) - parseInt(dr));
    var ddy = Math.abs(parseInt(sc) - parseInt(dc));
    if (ddx > 1 || ddy > 1) {
        console.log("invalid! distance > 1");
        return;
    }

    // executes candys swap
    var tmp = grid[sr][sc].src;
    grid[sr][sc].src = grid[dr][dc].src;
    grid[sr][sc].o.attr("src", grid[sr][sc].src);
    grid[dr][dc].src = tmp;
    grid[dr][dc].o.attr("src", grid[dr][dc].src);

    // searches for valid figures
    _checkAndDestroy();
}

// check and destroy combination 
function _checkAndDestroy() {
    /**
    		HORIZONTAL COMBO  
    **/
    for (var r = 0; r < rows; r++) {
        var prevCell = null;
        var figureLen = 0;
        var figureStart = null;
        var figureStop = null;

        for (var c = 0; c < cols; c++) {

            // bypass locked and candys that partecipate to combo. 
            //The next cell will become first cell of combo.   
            if (grid[r][c].locked || grid[r][c].isInCombo) {
                figureStart = null;
                figureStop = null;
                prevCell = null;
                figureLen = 1;
                continue;
            }

            // first cell of combo!
            if (prevCell == null) {
                //console.log("FirstCell: " + r + "," + c);
                prevCell = grid[r][c].src;
                figureStart = c;
                figureLen = 1;
                figureStop = null;
                continue;
            } else {
                //second or more cell of combo.
                var curCell = grid[r][c].src;
                // if current cell is not equals to prev cell then current cell become new first cell!
                if (!(prevCell == curCell)) {
                    //console.log("New FirstCell: " + r + "," + c);
                    prevCell = grid[r][c].src;
                    figureStart = c;
                    figureStop = null;
                    figureLen = 1;
                    continue;
                } else {
                    // if current cell is equal to prevcell than combo lenght is increased
                    // Due to combo, current combo will be destroyed at the end of this procedure.
                    // Then, the next cell will become new first cell
                    figureLen += 1;
                    if (figureLen == 3) {
                        validFigures += 1;
                        figureStop = c;

                        console.log("Combo from " + figureStart + " to " + figureStop + "!");
                        for (var ci = figureStart; ci <= figureStop; ci++) {

                            grid[r][ci].isInCombo = true;
                            grid[r][ci].src = null;
                            //grid[r][ci].o.attr("src","");
                            puntuacion++;
                            $('#score-text').text(puntuacion);
                        }
                        prevCell = null;
                        figureStart = null;
                        figureStop = null;
                        figureLen = 1;
                        continue;
                    }
                }
            }

        }
    }
    /**
    		VERTICAL COMBO!
    **/
   movimientos++;
   $('#movimientos-text').text(movimientos);
    for (var c = 0; c < cols; c++) {
        var prevCell = null;
        var figureLen = 0;
        var figureStart = null;
        var figureStop = null;
        
        for (var r = 0; r < rows; r++) {

            // bypass locked and candys that partecipate to combo. 
            //The next cell will become first cell of combo.   
            if (grid[r][c].locked || grid[r][c].isInCombo) {
                figureStart = null;
                figureStop = null;
                prevCell = null;
                figureLen = 1;
                continue;
            }

            // first cell of combo!
            if (prevCell == null) {
                //console.log("FirstCell: " + r + "," + c);
                prevCell = grid[r][c].src;
                figureStart = r;
                figureLen = 1;
                figureStop = null;
                continue;
            } else {
                //second or more cell of combo.
                var curCell = grid[r][c].src;
                // if current cell is not equals to prev cell then current cell become new first cell!
                if (!(prevCell == curCell)) {
                    //console.log("New FirstCell: " + r + "," + c);
                    prevCell = grid[r][c].src;
                    figureStart = r;
                    figureStop = null;
                    figureLen = 1;
                    continue;
                } else {
                    // if current cell is equal to prevcell than combo lenght is increased
                    // Due to combo, current combo will be destroyed at the end of this procedure.
                    // Then, the next cell will become new first cell
                    figureLen += 1;
                    if (figureLen == 3) {
                        validFigures += 1;
                        figureStop = r;
                        console.log("Combo from " + figureStart + " to " + figureStop + "!");

                        for (var ci = figureStart; ci <= figureStop; ci++) {
                            puntuacion++;
                            $('#score-text').text(puntuacion);
                            grid[ci][c].isInCombo = true;
                            grid[ci][c].src = null;
                            //grid[ci][c].o.attr("src","");

                        }
                        prevCell = null;
                        figureStart = null;
                        figureStop = null;
                        figureLen = 1;
                        continue;
                    }
                }
            }

        }
    }
    // if there is combo then execute destroy

    var isCombo = false;
    for (var r = 0; r < rows; r++)
        for (var c = 0; c < cols; c++)
            if (grid[r][c].isInCombo) {
                console.log("There are a combo");
                isCombo = true;
            }
    if (isCombo)
        _executeDestroy();
    else
        console.log("NO COMBO");
}

// execute the destroy fo cell
function _executeDestroy() {

    for (var r = 0; r < rows - 1; r++)
        for (var c = 0; c < cols - 1; c++)
            if (grid[r][c].isInCombo) // this is an empty cell
    {

        grid[r][c].o.animate({
            opacity: 0
        }, 700, "linear", function () {
            _executeDestroyMemory();
        });

    }

/*    $(":animated").promise().done(function () {
        _executeDestroyMemory();
    });
*/

}

function _executeDestroyMemory() {
    console.log('hola');
    // move empty cells to top 
    for (var r = 0; r < rows - 1; r++) {
        for (var c = 0; c < cols - 1; c++) {

            if (grid[r][c].isInCombo) // this is an empty cell
            {

                grid[r][c].o.attr("src", "")

                // disable cell from combo. 
                //(The cell at the end of this routine will be on the top)

                grid[r][c].isInCombo = false;

                for (var sr = r; sr >= 0; sr--) {
                    if (sr == 0) break; // cannot shift. this is the first rows
                    if (grid[sr - 1][c].locked)
                        break; // cannot shift. my top is locked

                    // shift cell
                    var tmp = grid[sr][c].src;
                    grid[sr][c].src = grid[sr - 1][c].src;
                    grid[sr - 1][c].src = tmp;
                }
            }
        }
    }

    console.log("End of movement");
    //redrawing the grid
    // and setup respaw			 					
    // this function returns a random candy.
    //Reset all cell
    for (var r = 0; r < rows - 1; r++) {
        for (var c = 0; c < cols - 1; c++) {
            grid[r][c].o.attr("src", grid[r][c].src);
            grid[r][c].o.css("opacity", "1");
            grid[r][c].isInCombo = false;
            if (grid[r][c].src == null)
                grid[r][c].respawn = true;
            // if respawn is needed
            if (grid[r][c].respawn == true) {

                grid[r][c].o.off("ondragover");
                grid[r][c].o.off("ondrop");
                grid[r][c].o.off("ondragstart");
                grid[r][c].respawn = false; // respawned!

                console.log("Respawning " + r + "," + c);
                grid[r][c].src = pickRandomcandy();
                grid[r][c].locked = false;
                grid[r][c].o.attr("src", grid[r][c].src);
                grid[r][c].o.attr("ondragstart", "_ondragstart(event)");
                grid[r][c].o.attr("ondrop", "_onDrop(event)");
                grid[r][c].o.attr("ondragover", "_onDragOverEnabled(event)");
            }
        }
    }

    console.log("Combo resetted and rewpawned");
    // check for other combos
    _checkAndDestroy();
}
 });
