(function($){
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var mouseDown = false;
    var pencilThickness = 1;
    var eraser = false;

    context.strokeStyle = '#000';

    //Detect a mouse down. Set the xy coordinates
    $(canvas).mousedown(function(e){
        mouseDown = true;

        context.beginPath();
        context.moveTo(e.offsetX, e.offsetY);

    });

    //Detect that the mouse is moving and draw the line while the mouse is still down
    $(canvas).mousemove(function(e){
        if(mouseDown && eraser != true){
            var x = e.offsetX;
            var y = e.offsetY;

            context.lineTo(x, y);
            context.stroke();
        } else if(mouseDown && eraser == true){
            var x = e.offsetX;
            var y = e.offsetY;

            context.clearRect(x , y, 50, 50);
        }
    });

    //On mouse up
    $(canvas).mouseup(function(){
        mouseDown = false;
        context.closePath();
    });

    $('.color-container').click(function(){
        eraser = false;
        context.strokeStyle = this.id;
        $(canvas).css('cursor', 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAADFElEQVRoQ+2Z0VHbQBCG/5UZnMRYEh2QCmI/ZrBnnA5IBYEKAhWEDiAVROmAVAAMZvIYOoBUEJ+Nk5gJ2swZziMkWdbasnIw8aP0S/q/u9s93y7hifzoiXDgP0hZMzk4W+vcUuWAgIb+JjOOqiujveevf19FPVg7I9fntUYIp8HsfIoPGjN61ZVRMwpjJUj/vL79EID3vFb/kL/B7w/dQ4DeAfzFa/W3DKR1IHEIBq68mmpSE73x0hrDeD/0rPhttW4lyEMI3mPQNgGvGLjwauqNhpmAAMpvKd86kCgEUbjjbg4CbVoNvZMoTH/oHgC0beXSSoMwI/0AhtEjgs+AqlZGDauCPSWwA6/V34lmqiiMvl6hP821zeGFNek3FhOf77LROKQTMKrr7gJ0oO+uVkYvrdlH0pZTDGwCk7X0/mmwZxmLwxDxqdlTTBJI+1dR+j6SZ3STcQNkQWiwUkHyQJjRVl03MDEzC6JUEAmERFtqjEiMSbSlpl+JMYk2HvBLjRGJMYm21KwlMSbRTjvQLWVGJMYk2qxTaeEgEmMS7ayjdaEgEmMS7SyIQvcRiTGJNg9EYSASYxJtXohCQCTGJFoJxMIgEmMSrRRiIRCJMYl2Hoi5QSTGJNp5IeYCkRiTaBeBEINIjEm0i0KIQCTGJNoiIHKDSIxJtEVB5AKRGJNoi4SYCSIxJtEWDZEJIjEm0S4DIhOk1/UuCdiIl/XjRmyAmAqi210hVY7jpnXby2+rt+a6LRBTQSY1JeKPzNTRZX1j3mup8RnGJohUkHHl+9q71OX7aLFYdT3WD7g1tT74Wd/KU8ZcVjykvTdxQjQjzYxTv6065qFe17u4b7hc6dgZj8J9Q6ZMw9O+lQDpdb1jAjpRk7++Ptu4uV19D9CueZFNEImldWe4eqlv6L6dg/AwhKP7eJOZYeC7Q+G+bo3ZMBOTgY2aUWfuPog+JLIVoAh85HAY1NvXJzYBpIKYvcPc1HHiOGFQfzE4Mu1hGyESS0sHNACfmIPVlZsg3t6yFSJzZ7fZdK70+9gAUmPksUJo338BLPjCUaLw8qMAAAAASUVORK5CYII=), auto');
    });

    $(window).bind('mousewheel', function(e) {
       if(e.originalEvent.wheelDelta >= 0){
           pencilThickness++;
       }else{
           pencilThickness--;
       }
        context.lineWidth = pencilThickness;
    });

    //Empty the canvas
    $('.glyphicon-trash').click(function(){
        var warning = confirm("Are you sure you want to do this? This will permanently delete your drawing");

        if(warning){
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
    });

    $('.glyphicon-erase').click(function(){
        eraser = true;
        $(canvas).css('cursor', 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACJ0lEQVRoQ+2Z4VHDMAxG5WYA2ICOkMYLsAEdASaADTg2YAMYoWzAAg5hAjoCHSAx5157F0IcS7Ll0Lv2b1vnPX+yLbcKTvylTpwfzgJzJ5gtgbIsl4vF4hEA1kqpS2vtNwBsuq57appmy52ILAJVVd0qpV58kNbau7quXzkS4gIh+CM0V0JUAAsfIyEmQIXnSogIcOE5EskFYuGpEkkFUsFTJJIJpIbHSiQRkILHSEQLSMOHJKIEcsE7Cdd6dF23GrYdbIGc8L0W480Ys+63HCyBmeAdd2OMWUUJzAi/5zbG/Jp0UgJzw1trP+u6LlkJ+OBdF+kGnGqXOW2y5zu8NTAFf+zjM6Sza9u2JO9CGPjjbElK+O4Lk2uAAi8pMXXZ8Qpw4CUkQje1UYEY+JQSIfj95jFc7YdfDz7cLwf99zCDDceKWRPY5/0R0FpvAOAmFj4mCSz8aAJVVX0ppZahLpCyt1OSoMCPCmitbR9ueHRTwPufxUhQ4X0JbJVSVykTwJQTB96XQNI1gEmBC+/dhYqiaADgItVCduOk2JrHylfsHJCe+eP4IidxLvjREkr5cKmy6TMGLzRcCO73qNt0UICzAHPBB0uIU0454UkCmCS01vcA8Dwsg5h9PlRSqBLCJOF7kCQ8OQFMS5Dy8AvNPltgqpwkeqgpEXIJ9Qdzl5+iKFzNXx9ajx0AvLdt+xDz1ylm5oMnMWWQOT8blcCc4OcE/sPsO4YfYLnXQKXRz+wAAAAASUVORK5CYII=), auto');
    });

})(jQuery);