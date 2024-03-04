class AnswerBlock {
    constructor(x, y, color, word) {
        this.color = color
        this.x = x
        this.y = y
        this.word = word;
        this.radius = 10
        this.selected = false
        this.active = true

    }
    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle = this.color;
        context.fill();
        context.lineWidth = 5;
        context.strokeStyle = this.color;
        context.stroke();

        ctx.font = '24pt Calibri';
        ctx.fillStyle = 'red';
        ctx.textAlign = 'center';
        ctx.fillText(this.word, this.x, this.y - this.radius);
    }
    update() {
        this.x += 0.1
    }

    select() {
        this.selected = !this.selected
    }

    activate() {
        this.active = !this.active
    }
}
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d')
let w = canvas.width = 1000;
let h = canvas.height = 700;
let selectedAnswer = null;
let rightAnswersCount = 0;

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
        x1: midCoords.x - arrowHeight.x,
        y1: 80,
        x2: midCoords.x + arrowHeight.x,
        y2: 80,
        color: 'black',
        text: 'text0',
        textMargin: {
            x: 0,
            y: -10
        },
    },
    {
        //1 horizontal left =,
        x: 30,
        y: midCoords.y,
        x1: 30 + arrowHeight.x,
        y1: midCoords.y - arrowHeight.y,
        x2: 30 + arrowHeight.x,
        y2: midCoords.y + arrowHeight.y,
        color: 'black',
        text: 'text1',
        textMargin: {
            x: 50,
            y: -15
        }
    },
    {
        //2 horizontal right =,
        x: 970,
        y: midCoords.y,
        x1: 970 - arrowHeight.x,
        y1: midCoords.y - arrowHeight.y,
        x2: 970 - arrowHeight.x,
        y2: midCoords.y + arrowHeight.y,
        color: 'black',
        text: 'text2',
        textMargin: {
            x: -50,
            y: -15
        }
    },
    { //3 vertical dowm
        x: midCoords.x,
        y: 670,
        x1: midCoords.x - arrowHeight.x,
        y1: 620,
        x2: midCoords.x + arrowHeight.x,
        y2: 620,
        color: 'black',
        text: 'text3',
        textMargin: {
            x: 0,
            y: 15
        }
    },
]
function drawCircle() {
    if (canvas.getContext) {
        ctx.beginPath();
        ctx.fillStyle = "rgb(200,0,0)";
        ctx.arc(midCoords.x, midCoords.y, 100, 0, 360 * Math.PI, false);
        ctx.fill();

        ctx.font = '24pt Calibri';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText('Складаныя', midCoords.x, midCoords.y - fontSize + 10);
        ctx.fillText('часціны', midCoords.x, midCoords.y + 10);
        ctx.fillText('мовы', midCoords.x, midCoords.y + fontSize + 10);

    }
}

function drawArrow(ind) {
    if (canvas.getContext) {
        ctx.beginPath();
        ctx.fillStyle = arrowCoords[ind].color;
        ctx.strokeStyle = arrowCoords[ind].color;
        ctx.moveTo(midCoords.x, midCoords.y);
        ctx.lineTo(arrowCoords[ind].x, arrowCoords[ind].y);
        ctx.lineTo(arrowCoords[ind].x1, arrowCoords[ind].y1);
        ctx.moveTo(arrowCoords[ind].x, arrowCoords[ind].y);
        ctx.lineTo(arrowCoords[ind].x2, arrowCoords[ind].y2);
        ctx.stroke();

        ctx.font = '24pt Calibri';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.textAlign = 'center';
        ctx.fillText(arrowCoords[ind].text,
            arrowCoords[ind].x + arrowCoords[ind].textMargin.x,
            arrowCoords[ind].y + arrowCoords[ind].textMargin.y);
    }
}

let wordsArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let answerBlocks = new Array(10).fill().map((el, ind) => new AnswerBlock(50 + ind * 100, 670, '#0000FF', wordsArr[ind]));

let getMouseCoords = (canvas, event) => {
    let canvasCoords = canvas.getBoundingClientRect()
    return {
        x: event.pageX - canvasCoords.left,
        y: event.pageY - canvasCoords.top
    }
}
let getOffsetCoords = (mouse, rect) => {
    return {
        x: mouse.x - rect.x,
        y: mouse.y - rect.y
    }
}

let cursorInRect = (clickCoord, ansCood) => {
    let xLine = clickCoord.x > ansCood.x - ansCood.radius && clickCoord.x < ansCood.x + ansCood.radius
    let yLine = clickCoord.y > ansCood.y - ansCood.radius && clickCoord.y < ansCood.y + ansCood.radius

    return xLine && yLine
}



canvas.addEventListener('mousedown', e => {
    for (let i = 0; i < answerBlocks.length; i++) {
        let el = answerBlocks[i];
        let clickedCoor = {
            x: e.x - canvas.offsetLeft,
            y: e.y - canvas.offsetTop
        }
        let elCoord = {
            x: el.x,
            y: el.y,
            radius: el.radius
        }
        if (cursorInRect(clickedCoor, elCoord)) {
            if (el.active) el.selected = true;
        }
    }
})

canvas.addEventListener('mousemove', e => {
    for (let i = 0; i < answerBlocks.length; i++) {
        if (answerBlocks[i].selected) {
            answerBlocks[i].x = e.x - canvas.offsetLeft;
            answerBlocks[i].y = e.y - canvas.offsetTop;
        }
    }
})

let answerLines = [
    [], [], []
]
let rigntAnwersLines = [
    ['2', '3', '4', '6'],
    ['0', '7', '8'],
    ['1', '5', '9']
]

let answerZones = [
    {
        zoneId: 0,
        startX: 450,
        startY: 40,
        endX: 550,
        endY: 300
    },
    {
        zoneId: 1,
        startX: 50,
        startY: 350,
        endX: 400,
        endY: 450
    },
    {
        zoneId: 2,
        startX: 600,
        startY: 350,
        endX: 950,
        endY: 450
    }
]

canvas.addEventListener('mouseup', e => {
    checkAnswer(e.x - canvas.offsetLeft, e.y - canvas.offsetTop);
})

function inZone(mouseX, mouseY) {
    for (let i = 0; i < answerZones.length; i++) {
        let inX = mouseX > answerZones[i].startX && mouseX < answerZones[i].endX;
        let inY = mouseY > answerZones[i].startY && mouseY < answerZones[i].endY;
        if (inX && inY) {
            return answerZones[i].zoneId
        }
    }
    return -1;
}

function checkAnswer(mouseX, mouseY) {
    let zoneId = inZone(mouseX, mouseY);
    if (zoneId !== -1) {
        for (let i = 0; i < answerBlocks.length; i++) {
            if (answerBlocks[i].selected) {
                answerLines[zoneId].push(answerBlocks[i].word);
                let isRight = rigntAnwersLines[zoneId].indexOf(answerBlocks[i].word);
                if (isRight === -1) {
                    answerBlocks[i].color = 'red'
                } else {
                    answerBlocks[i].color = 'green';
                    rightAnswersCount += 1;
                }
                answerBlocks[i].active = false;
            };
        };
    }
    for (let i = 0; i < answerBlocks.length; i++) {
        answerBlocks[i].selected = false;
    };
}

function drawRightCount() {    
    ctx.font = '24pt Calibri';
    ctx.fillStyle = 'red';
    ctx.textAlign = 'center';
    ctx.fillText('Дакладных адказау: ' + rightAnswersCount, 500, 550);
}

function animate() {
    ctx.clearRect(0, 0, w, ctx.canvas.height)
    ctx.fillStyle = 'white';
    drawArrow(2);
    drawArrow(1);
    drawArrow(0);
    drawCircle();
    drawRightCount();
    answerBlocks.forEach(e => {
        e.draw(ctx)
    })
    window.requestAnimationFrame(animate)
}

animate()

