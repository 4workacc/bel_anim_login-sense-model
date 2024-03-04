class AnswerBlock {
    constructor(x, y, color, word) {
        this.color = color
        this.x = x
        this.y = y
        this.word = word;
        this.radius = 10
        this.selected = false

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
        ctx.fillText(this.word, this.x, this.y-this.radius);
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
let hsl = (h, s, l) => `hsl(${h},${s}%,${l}%)`
let selectedAnswer = null;

let wordsArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let answerBlocks = new Array(10).fill().map((el, ind) => new AnswerBlock(50 + ind * 100, 670, '#00FF00', wordsArr[ind]));
console.log(answerBlocks)


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
            el.color = 'red';            
            el.selected = true;
        }
        el.color = '#00FF00';
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

canvas.addEventListener('mouseup', e => {
    for (let i = 0; i < answerBlocks.length; i++) {
        answerBlocks[i].selected = false;
    }
})


function animate() {
    ctx.clearRect(0, 0, w, ctx.canvas.height)
    ctx.fillStyle = 'white'
    answerBlocks.forEach(e => {
        e.draw(ctx)
    })
    window.requestAnimationFrame(animate)
}

animate()

