

    function cambiarColor(){

        $('.main-titulo').each(function() {
            $(this).find('.main-titulo').animate({
                width: $(this).attr('data-percent')
            }, 1500);
        });
  
}

setInterval(cambiarColor, 5000);
