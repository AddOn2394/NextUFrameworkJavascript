$(document).ready(function () {

    var tiempo = {
        minuto: 1,
        segundo: 60
    };

    var tiempo_corriendo = null;
    var seconds = 60;
    var minutes = 0;
    $(".btn-reinicio").click(function () {
        if ($(this).text() == 'Iniciar') {
            $(this).text('Reiniciar');
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
                }
            }, 1000);
        }
        else {
            $(this).text('Iniciar');
            clearInterval(tiempo_corriendo);
        }
    })
})