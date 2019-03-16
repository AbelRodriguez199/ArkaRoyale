/**
 * Juego "ArkaRoyale" version: 1.0
 * autor: Abel Rodríguez
 */

// Falta:
// Agregar Objetos de choque

// Pintar Canvas y Variables 
var canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d'), keydown = [],
	twoPlayers = true, ball_speed_i = 0, winner = 0,
	play = false, score_1 = score_2 = 0 ,background = new Image;

// Funcionamiento del Teclado
(function() {
	window.addEventListener('keydown',function(e) {
		keydown[e.keyCode] = true;
	},false);
	window.addEventListener('keyup',function(e) {
		keydown[e.keyCode] = false;
	},false)
})();

// Jugadores
var player1 = {
	x:0,y:250,width:100,height:100
},
player2 = {
	x:700,y:250,width:100,height:100
},
ball = {
	x:400,y:parseInt(Math.random()*570+15),radio:10,dir:1,angle:120
};


// Efectos de sonido e imágenes
var beat_go = document.createElement('audio'),
beat_colision = document.createElement('audio');
beat_go.src = 'aud/Pick.wav';
beat_colision.src = 'aud/wood1.wav';

var img_blok = new Image;
img_blok.src = 'img/Block.png';
var img_blok2 = new Image;
img_blok2.src = 'img/Block2.png';
var img_urano = new Image;
img_urano.src = 'img/urano.png';
var img_moon = new Image;
img_moon.src = 'img/moon.png';


// Fondo Aleatorio
function randomBackgroung() {
	var backs = new Array('img/0030.jpg','img/0044.png','img/0057.jpg','img/0009.jpg','img/0033.jpg','img/0001.png');
	var i = parseInt(Math.random()*backs.length);
	background.src = backs[i];
}
// Funcionalidad del Juego
function drawBackground() {
	ctx.drawImage(background,0,0,800,600);
}
function drawPlayers() {
	// Dibujando Objetos
	ctx.save();
	ctx.fillStyle = '#F6F616';
	if(winner != 0) ctx.globalAlpha = 0;
	ctx.drawImage(img_blok,player1.x,player1.y,player1.width,player1.height);
	ctx.drawImage(img_blok2,player2.x,player2.y,player2.width,player2.height);
	ctx.beginPath();
	ctx.arc(ball.x,ball.y,ball.radio,0,7);
	ctx.fill();
	ctx.restore();

	// Dibujando Marcador
	ctx.save();
	ctx.shadowOffsetX = shadowOffsetY = 0;
	ctx.shadowBlur = 10;
	ctx.shadowColor = '#fff';
	ctx.font = '36px Arial';
	ctx.fillStyle = 'white';
	ctx.textAlign = 'center';
	ctx.verticalAlign = 'middle';
	ctx.fillText(score_1,20,30);
	ctx.fillText(score_2,780,30);
	ctx.restore();
}
function movePlayers() {
	// Dibujando Obstáculos
	var brickRowCount = 2;
	var brickColumnCount = 2;
	var brickWidth = 80;
	var brickHeight = 80;
	var brickPadding = 360;
	var brickOffsetTop = 40;
	var brickOffsetLeft = 130;
	
	var bricks = [];
	for(c=0; c<brickColumnCount; c++) {
		bricks[c] = [];
		for(r=0; r<brickRowCount; r++) {
			bricks[c][r] = { x: 0, y: 0, status: 1 };
		}
	}
	function drawBricks() {
		for(c=0; c<brickColumnCount; c++) {
			for(r=0; r<brickRowCount; r++) {
				if(bricks[c][r].status == 1) {
					var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
					var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
					bricks[c][r].x = brickX;
					bricks[c][r].y = brickY;
					ctx.beginPath();
					ctx.rect(brickX, brickY, brickWidth, brickHeight);
					ctx.fillStyle = "rgba(0,255,0,0)";
					ctx.drawImage(img_urano,130,40);
					ctx.drawImage(img_urano,580,460);
					ctx.drawImage(img_moon,130,460);
					ctx.drawImage(img_moon,580,40);
					ctx.fill();
					ctx.closePath();
				}
			}
		}
	}
	drawBricks();
	
		// Movimiento Jugador 1
		if(keydown[65]) player1.y -= 5;
		if(keydown[90]) player1.y += 5;
		// Colisiones Jugador 1
		if(player1.y < 0) player1.y = 0;
		if(player1.y > 500) player1.y = 500;
		// /mover player1 }
	
		// Movimiento Jugador 2
		// Modo 2 Jugadores
		if(twoPlayers) {
			if(keydown[38]) player2.y -= 5;
			if(keydown[40]) player2.y += 5;
		}
		// Modo 1 Jugador
		if(!twoPlayers && ball.dir == 1) {
			if(ball.y - 50 < player2.y) player2.y -= 5;
			if(ball.y - 50 > player2.y) player2.y += 5;
		}
		// Colisiones Jugador 2
		if(player2.y < 0) player2.y = 0;
		if(player2.y > 500) player2.y = 500;
		// /mover player2}
	
		// Movimiento Bola
		ball.x += (4 + ball_speed_i)*ball.dir;
		ball.y += Math.sin(ball.angle)*(4 + ball_speed_i);
		// Colisión con los jugadores
		// Jugador 2
		if (ball.x + ball.radio > player2.x &&
			ball.y > player2.y &&
			ball.y < player2.y + player2.height
			)
		{
			ball.dir = -1;
			ball_speed_i += 0.25;
			var beat = beat_colision;
			beat.currentTime = 0;
			beat.play();
		}
		// Jugador 1
		if (ball.x - ball.radio < player1.x + player1.width &&
			ball.y > player1.y &&
			ball.y < player1.y + player1.height
			)
		{
			ball.dir = 1;
			ball_speed_i += 0.25;
			var beat = beat_colision;
			beat.currentTime = 0;
			beat.play();
		}
		// Colisión con Paredes
		if(ball.y + ball.radio > 600 && winner == 0) {
			ball.angle = -ball.angle;
			var beat = beat_colision;
			beat.currentTime = 0;
			beat.play();
		}
		if(ball.y - ball.radio < 0 && winner == 0) {
			ball.angle = -ball.angle;
			var beat = beat_colision;
			beat.currentTime = 0;
			beat.play();
		}
		// Colision con Obstáculos
		// Finalizando del juego
		// Determinando Ganador
		if(ball.x < 0 && winner == 0) {
			winner = 'Jugador DOS';
			score_2 += 1;
			ball.x = 400;
		}
		if(ball.x > 800 && winner == 0) {
			winner = 'Jugador UNO';
			score_1 += 1;
			ball.x = 400;
		}
	}
	// Texto Ganador
	function drawText() {
		if(winner != 0) {
			ctx.save();
			ctx.shadowOffsetX = shadowOffsetY = 0;
			ctx.shadowBlur = 10;
			ctx.shadowColor = '#fff';
			ctx.font = '40px Arial';
			ctx.fillStyle = 'white';
			ctx.textAlign = 'center';
			ctx.verticalAlign = 'hanging';
			ctx.fillText('Gana el '+winner,400,150);
			ctx.fillText('Pulsar espacio para continuar',400,420);
			ball.x = 0;
			ctx.restore();
			// Reanudación Juego
			if(keydown[32]) {
				winner = 0;
				ball_speed_i = 0;
				ball.angle = 120;
				ball.x = 400;
				ball.y = 300;
				ball.dir = 1;
				player1.y = player2.y = 250;
				beat_go.play();
				randomBackgroung();
			}
		}
	
	}
	function collisionDetection() {
		for(c=0; c<brickColumnCount; c++) {
			for(r=0; r<brickRowCount; r++) {
				var b = bricks[c][r];
				if(b.status == 1) {
					if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
						dy = -dy;
						b.status = 0;
					}
				}
			}
		}
	}
	// Pantalla inicial del juego
	function getPlay() {
		ctx.save();
		ctx.shadowOffsetX = shadowOffsetY = 0;
		ctx.shadowBlur = 10;
		ctx.shadowColor = '#050504';
		ctx.fillStyle = 'yellow';
		ctx.textAlign = 'center';
		ctx.verticalAlign = 'middle';
		ctx.font = '42px arial';
		ctx.font = '32px arial';
		ctx.fillText('INSTRUCCIONES',400,80);
		ctx.fillText('1 JUGADOR: PULSE 1',400,132);
		ctx.fillText('2 JUGADORES: PULSE 2',400,400);
		ctx.font = '24px arial';
		ctx.fillText('Use "A" y "Z" para subir y bajar',400,204);
		ctx.fillText('JUGADOR 1: Use "A" y "Z" para subir y bajar             ',400,460);
		ctx.fillText('JUGADOR 2: Use "Arriba" y "Abajo" para subir y bajar',400,530);
		ctx.restore();
		// Elegir 1 Jugador
		if(keydown[97] || keydown[49]){
			play = true;
			twoPlayers = false;
			beat_go.play();
			randomBackgroung();
		}
		// Elegir 2 Jugadores
		if(keydown[98] || keydown[50]){
			play = true;
			twoPlayers = true;
			beat_go.play();
		}
	}
	// Tamaño y fondo de Canvas
	canvas.width = 800; canvas.height = 600;
	// canvas.style.backgroundColor = '#000';
	randomBackgroung();
	// Ajustar Pantalla
	autoScale(canvas);
	// Función PPal
	function main() {
		drawBackground(); 
		
		if(play) {
			movePlayers();
			drawPlayers();
			drawText();
			collisionDetection();
			
			
		} else { 
			getPlay();
		}
	}
	// Intervalo
	setInterval(main,18);