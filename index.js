var canvas;
var canvasContext;
var ballX = 50;
var ballSpeedX = 5;
var ballY = 50
var ballSpeedY = 4;
const PADDLE_HEIGHT = 100;
var paddleY = 250;
var paddle2Y = 250;
var paddleThickness = 10;

var player1Score = 0;
var player2Score = 0;
const WINNING_SCORE = 10;
var showingWinScreen = false;

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    var framesPerSecond = 30;
    setInterval(function() {
        moveEverything()
        drawEverything()
    }, 1000/framesPerSecond)

    canvas.addEventListener('mousemove',
        function(evt){
        var mousePos = calculateMousePos(evt);
        paddleY = mousePos.y - PADDLE_HEIGHT/2;
      //  paddle2Y = mousePos.y - PADDLE_HEIGHT/2;
    })

    canvas.addEventListener('click',function(evt){
        player1Score = 0;
        player2Score = 0;
        showingWinScreen = false;
    })
}

function computerMovement(){
    var paddle2Ycenter = paddle2Y + PADDLE_HEIGHT/2;
    if(paddle2Ycenter < ballY-35) {
        paddle2Y = paddle2Y + 6;
    } else if(paddle2Ycenter > ballY+35){
        paddle2Y = paddle2Y - 6;
    }
}
function moveEverything() {
    if(showingWinScreen) {
        return;
    }
    computerMovement();
    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;
    if(ballX < 0) {
        if(ballY > paddleY && ballY < paddleY+PADDLE_HEIGHT){
             ballSpeedX = -ballSpeedX;

            var deltaY = ballY - (paddleY + PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.35;
        }else{
            player2Score++;
            ballReset();
        }
    }

    if(ballX > canvas.width) {
        if(ballY > paddle2Y && ballY < paddle2Y+PADDLE_HEIGHT){
            ballSpeedX = -ballSpeedX;

            var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.35;
        }else{
            player1Score++;
            ballReset();
        }
    }

    if(ballY < 0 ) {
        ballSpeedY = -ballSpeedY;
    }

    if(ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }
}

function ballReset() {
     if(player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE) {
         showingWinScreen = true;
     }
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}

function drawNet() {
    for(var i=0;i<canvas.height;i+=40) {
        colorRect(canvas.width/2 - 1, i , 2 , 20, 'white')
    }
}
function drawEverything() {
    colorRect(0, 0, canvas.width, canvas.height, 'black')
    colorRect(0, paddleY,paddleThickness , PADDLE_HEIGHT, 'white')
    colorRect(canvas.width - paddleThickness, paddle2Y, paddleThickness, PADDLE_HEIGHT, 'white')
    colorCircle(ballX,ballY,10,'white')

    drawNet();
    canvasContext.fillText(player1Score,100,100);
    canvasContext.fillText(player2Score,canvas.width-100,100);

    if(showingWinScreen) {
        canvasContext.fillStyle = 'white';
        canvasContext.fillText("click to Continue",canvas.width/2 - 30,canvas.height/2 - 20);
    }
}

function colorRect(leftX,topY,width,height,drawColor) {
    canvasContext.fillStyle = drawColor
    canvasContext.fillRect(leftX,topY,width,height)
}

function colorCircle(centerX , centerY , radius ,drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX , centerY ,radius ,0,Math.PI*2,true);
    canvasContext.fill();
}

function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    }
}