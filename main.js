var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var paddleHeight = 20;
var paddleWidth = 150;
var paddleX = (canvas.width-paddleWidth)/2;
var paddleHeight2 = 20;
var paddleWidth2 = 150;
var paddleX2 = (canvas.width-paddleWidth2)/2;
var rightPressed = false;
var leftPressed = false;
var rightPressed2 = false;
var leftPressed2 = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keydown", keyDownHandler2, false);
document.addEventListener("keyup", keyUpHandler2, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyDownHandler2(e) {
    if(e.keyCode == 67) {
        rightPressed2 = true;
    }
    else if(e.keyCode == 90) {
        leftPressed2 = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}
function keyUpHandler2(e) {
    if(e.keyCode == 67) {
        rightPressed2 = false;
    }
    else if(e.keyCode == 90) {
        leftPressed2 = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#F7FA26";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle2() {
    ctx.beginPath();
    ctx.rect(paddleX2, paddleHeight2-paddleHeight2, paddleWidth2, paddleHeight2);
    ctx.fillStyle = "#FF9C33";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawPaddle2();
    
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }
    
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    if(rightPressed2 && paddleX2 < canvas.width-paddleWidth2) {
        paddleX2 += 7;
    }
    else if(leftPressed2 && paddleX2 > 0) {
        paddleX2 -= 7;
    }
    
    x += dx;
    y += dy;
}

setInterval(draw, 20);