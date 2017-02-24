(function($){
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    //Detect a mouse down. Set the xy coordinates
    var mouseDown = false;

    $(canvas).mousedown(function(e){
        mouseDown = true;

        context.beginPath();
        context.moveTo(e.pageX, e.pageY);
    });

    //Detect that the mouse is moving and draw the line while the mouse is still down
    $(canvas).mousemove(function(e){
        if(mouseDown){
            var x = e.offsetX * 2;
            var y = e.offsetY * 2;


            context.lineTo(x, y);
            context.strokeStyle = '#000';
            context.stroke();

        }
    });

    //On mouse up, reset the coordinates
    $(canvas).mouseup(function(){
        mouseDown = false;
        context.closePath();
    });

})(jQuery);