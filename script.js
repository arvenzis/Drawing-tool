(function($){
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var mouseDown = false;

    context.strokeStyle = '#000';

    //Detect a mouse down. Set the xy coordinates
    $(canvas).mousedown(function(e){
        mouseDown = true;

        context.beginPath();
        context.moveTo(e.offsetX, e.offsetY);
    });

    //Detect that the mouse is moving and draw the line while the mouse is still down
    $(canvas).mousemove(function(e){
        if(mouseDown){
            var x = e.offsetX;
            var y = e.offsetY;

            context.lineTo(x, y);
            context.stroke();

        }
    });

    //On mouse up
    $(canvas).mouseup(function(){
        stopDrawing();
    });

    //If the mouse leaves
    $(canvas).mouseleave(function(){
       stopDrawing();
    });

    function stopDrawing(){
        mouseDown = false;
        context.closePath();
    }

    $('.color-container').click(function(){
        context.strokeStyle = this.id;
    });



})(jQuery);