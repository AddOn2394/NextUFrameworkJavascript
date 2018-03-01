$(document).ready(function () {

    /*$('.panel-tablero').click(function (e) {
        alert(e.target.id);
        // ...
    });
*/
    function cambiarColor() {

        $('.main-titulo').animate({
            color: "#fff"
        }, 100);

        $('.main-titulo').animate({color: "yellow"}, cambiarColor);

    }

    setInterval(cambiarColor, 500);
    var c = 0;
    for (var i = 1; i < 8; i++) {
        for (var b = 1; b < 8; b++) {
            $('.col-' + b).prepend('<img class="draggable" style="width : 100%; " src="image/' + (1 + Math.floor(Math.random() * 4)) + '.png" id="' + c + '">')
            c++;
        }
    }
    
//    $(".draggable").draggable({ grid: [90, 90] });
    
    $("#sortable1, #sortable2, #sortable3, #sortable4, #sortable5, #sortable6, #sortable6").sortable({
        connectWith: ".connectedSortable"
    }).disableSelection();

});

