$(document).ready(function () {

    function cambiarColor() {

        $('.main-titulo').animate({
            color: "#fff"
        }, 100);

        $('.main-titulo').animate({color: "yellow"}, cambiarColor);

    }

    setInterval(cambiarColor, 500);

    
});

