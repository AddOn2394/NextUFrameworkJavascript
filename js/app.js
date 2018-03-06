$(document).ready(function () {
   function swapCandy(event, candyDrag) {
        var candyDrag = $(candyDrag.draggable);
        var dragSrc = candyDrag.attr('src');
        var candyDrop = $(this);
        var dropSrc = candyDrop.attr('src');
        candyDrag.attr('src', dropSrc);
        candyDrop.attr('src', dragSrc);

<<<<<<< HEAD
        setTimeout(function () {
            checkBoard();
            if ($('img.delete').length === 0) {
                candyDrag.attr('src', dragSrc);
                candyDrop.attr('src', dropSrc);
            } else {
                updateMoves();
            }
        }, 500);
=======
    $(".main-titulo").click(function () {
        
    });

    function cambiarColor() {
>>>>>>> parent of dd533ab... Terminar parte del drag

        function updateMoves() {
            var actualValue = Number($('#movimientos-text').text());
            var result = actualValue += 1;
            $('#movimientos-text').text(result);
        }

        function checkBoard() {
            fillBoard();
        }

        function fillBoard() {
            var top = 6;
            var column = $('[class^="col-"]');

<<<<<<< HEAD
            column.each(function () {
                var candys = $(this).children().length;
                var agrega = top - candys;
                for (var i = 0; i < agrega; i++) {
                    var candyType = getRandomInt(1, 5);
                    if (i === 0 && candys < 1) {
                        $(this).append('<img src="image/' + candyType + '.png" class="element"></img>');
                    } else {
                        $(this).find('img:eq(0)').before('<img src="image/' + candyType + '.png" class="element"></img>');
                    }
                }
            });
            addCandyEvents();
            setValidations();
        }

        function setValidations() {
            columnValidation();
            rowValidation();
            if ($('img.delete').length !== 0) {
                deletesCandyAnimation();
            }
        }

        function addCandyEvents() {
            $('img').draggable({
                containment: '.panel-tablero',
                droppable: 'img',
                revert: true,
                revertDuration: 500,
                grid: [100, 100],
                zIndex: 10,
                drag: constrainCandyMovement
            });
            $('img').droppable({
                drop: swapCandy
            });
            enableCandyEvents();
        }
=======
    setInterval(cambiarColor, 500);

    for (var i = 1; i < 8; i++) {
        for (var b = 1; b < 8; b++) {
            $('.col-' + b).prepend('<img style="width : 100%; " src="image/' + (1 + Math.floor(Math.random() * 4)) + '.png">')
            console.log()
        }
    }
    
});
>>>>>>> parent of dd533ab... Terminar parte del drag

        function disableCandyEvents() {
            $('img').draggable('disable');
            $('img').droppable('disable');
        }

        function enableCandyEvents() {
            $('img').draggable('enable');
            $('img').droppable('enable');
        }
        function deletesCandyAnimation() {
            disableCandyEvents();
            $('img.delete').effect('pulsate', 400);
            $('img.delete').animate({
                opacity: '0'
            }, {
                    duration: 300
                })
                .animate({
                    opacity: '0'
                }, {
                        duration: 400,
                        complete: function () {
                            deletesCandy()
                                .then(checkBoardPromise)
                                .catch(showPromiseError);
                        },
                        queue: true
                    });
        }

    }
});
