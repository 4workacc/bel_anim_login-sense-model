let app = document.getElementById('app');
let i=0;

window.onload = function(){   
    drawCircle();
}

function drawCircle(){
    var canvas = document.getElementById('canvas');
    canvas.addEventListener("click", function(event) {
      if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        var w = 16;
        var x = Math.floor(event.pageX-this.offsetLeft);
        var y = Math.floor(event.pageY-this.offsetTop);
        
        ctx.beginPath();
        ctx.fillStyle = "rgb(200,0,0)";
        ctx.arc(x, y, w/2, 0, 2 * Math.PI, false);
        ctx.fill();
    
        ctx.font = '8pt Calibri';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText(''+i, x, y+3);
        i+=1;
      }
    })
}