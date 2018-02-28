$(document).ready(function () {

    var tiempo = {
        minuto: 0,
        segundo: 5
    };

    var tiempo_corriendo = null;
    var seconds = 60;
    $(".btn-reinicio").click(function () {
        if ($(this).text() == 'Iniciar') {
            $(this).text('Reiniciar');
            $('.panel-tablero').show("slow");
            $('.panel-score').css("width", "25%");
            $(".titulo-juego").remove();
            tiempo_corriendo = setInterval(function () {
                // Segundos

                if (tiempo.segundo == 0) {
                    tiempo.segundo = 59;
                    tiempo.minuto--;
                }
                tiempo.segundo--;
                seconds = (tiempo.segundo < 10 ? '0' + tiempo.segundo : tiempo.segundo);
                $("#timer").text("0" + tiempo.minuto + ":" + seconds) ;
                if (tiempo.minuto==0 && tiempo.segundo==0) {
                    clearInterval(tiempo_corriendo);
                    $(this).text('Iniciar');
                    $('.panel-tablero').hide("slow");
                    $('.panel-score').css("width","100%");
                    $('.btn-reinicio').css("width", "100%");
                    $(".score").before("<h1 class='titulo-juego' style='color:yellow; font-size: 3em; text-align: center;'>Juego Terminado</h1>");
                }
            }, 1000);
        }
        else {
            $(this).text('Iniciar');
            $("#timer").text("02:00");
            $('.panel-tablero').show("slow");
            $('.panel-score').css("width", "25%");
            $(".titulo-juego").remove();
            tiempo.minuto=1
            tiempo.segundo = 60
            clearInterval(tiempo_corriendo);
        }
    })
})