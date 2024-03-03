let app = document.getElementById('app');
let fontSize = 25;
let arrowHeight = {
    x: 50,
    y: 50
}
let midCoords = {
    x: 500,
    y: 400
};
let arrowCoords = [
    {//0 vertical up
        x: midCoords.x, 
        y: 30,
        x1: midCoords.x-arrowHeight.x,
        y1: 80,
        x2: midCoords.x+arrowHeight.x,
        y2: 80,
        text: 'text0',
        textMargin: {
            x: 0,
            y: -10
        },
    },
    { //1 vertical dowm
        x: midCoords.x, 
        y: 670,
        x1: midCoords.x-arrowHeight.x,
        y1: 620,
        x2: midCoords.x+arrowHeight.x,
        y2: 620,
        text: 'text1',
        textMargin: {
            x: 0,
            y: 15
        }
    },
    {
        // 2 horizontal left =,
        x: 30,
        y: midCoords.y,
        x1: 30+arrowHeight.x,
        y1: midCoords.y-arrowHeight.y,
        x2: 30+arrowHeight.x,
        y2: midCoords.y+arrowHeight.y,
        text: 'text3',
        textMargin: {
            x: 50,
            y: -15
        }
    },
    {
        // 3 horizontal right =,
        x: 970,
        y: midCoords.y,
        x1: 970-arrowHeight.x,
        y1: midCoords.y-arrowHeight.y,
        x2: 970-arrowHeight.x,
        y2: midCoords.y+arrowHeight.y,
        text: 'text4',
        textMargin: {
            x: -50,
            y: -15
        }
    }
]

window.onload = function(){   
    drawArrow(3);    
    drawArrow(2);
    drawArrow(0);
    drawCircle();
}

function drawCircle(){
    var canvas = document.getElementById('canvas');
    if (canvas.getContext){
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.fillStyle = "rgb(200,0,0)";
        ctx.arc(midCoords.x, midCoords.y, 100, 0, 360 * Math.PI, false);
        ctx.fill();
        
        ctx.font = '24pt Calibri';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText('Складаныя', midCoords.x, midCoords.y - fontSize+10);
        ctx.fillText('часціны', midCoords.x, midCoords.y+10);
        ctx.fillText('мовы', midCoords.x, midCoords.y+fontSize+10);
    }
}

function drawArrow(ind){
    var canvas = document.getElementById('canvas');
    if (canvas.getContext){
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(midCoords.x, midCoords.y);        
        ctx.lineTo(arrowCoords[ind].x, arrowCoords[ind].y);
        ctx.lineTo(arrowCoords[ind].x1, arrowCoords[ind].y1);
        ctx.moveTo(arrowCoords[ind].x, arrowCoords[ind].y);
        ctx.lineTo(arrowCoords[ind].x2, arrowCoords[ind].y2);
        ctx.stroke();

        ctx.font = '24pt Calibri';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.fillText('Складаныя', 
                    arrowCoords[ind].x+arrowCoords[ind].textMargin.x, 
                    arrowCoords[ind].y+arrowCoords[ind].textMargin.y);
    }
}

