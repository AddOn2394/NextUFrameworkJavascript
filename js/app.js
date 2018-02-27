$(document).ready(function () {

    function cambiarColor() {

        $('.main-titulo').animate({
            color: "#fff"
        }, 100);

        $('.main-titulo').animate({color: "yellow"}, cambiarColor);

    }

    setInterval(cambiarColor, 500);

    for (var i = 1; i < 8; i++) {
        for (var b = 1; b < 8; b++) {
            $('.col-' + b).prepend('<img style="width : 100%;" src="image/' + (1 + Math.floor(Math.random() * 4)) + '.png">')
            console.log()
        }
    }
    
});

