/*
Criado por VitorEmanoel
*/

//Evento de Captura de teclas.
document.addEventListener('keydown', function(evento){
  var key = evento.keyCode;
  if(key == 39 && game){
    direita();
  }else if(key == 37 && game){
    esquerda();
  }
});


//Variaveis
var tFrame = 900;
var frameDiv;
var points = new Array(78);
var forca;
var inclinacao = 0;
var bVelocidade = 10;
var velocidade = 5;
var handler;
var ball;
var bar;
var barOffsetLeft;
var ballOffsetTop;
var ballOffsetLeft;
var gameover;
var game;


//Função de inicialização
function inicializar(){
  ball = document.getElementById('ball');
  bar = document.getElementById('bar');
  gameover = document.getElementById('Gameover');
  frameDiv = document.getElementById('Frame');
  barOffsetLeft = bar.offsetLeft;
  ballOffsetTop = ball.offsetTop;
  ballOffsetLeft = ball.offsetLeft;
  handler = setInterval(ballMove, 33);
  forca = 0;
  game = true;
  spawnPoints();
}

//Spawna os pontos
function spawnPoints(){
  for (var i = 1; i <= 15; i++) {
    for(var j = 1; j <= 6; j++){
      console.log("DIV " + i + " " + j);
      var point = document.createElement('div');
      point.className = 'Point';
      var color = 'rgb(' + Math.floor(Math.random() * 255) + 1 + ', ' + Math.floor(Math.random() * 255) + 1 + ',' + Math.floor(Math.random() * 255)  + 1 + ')';
      point.style.backgroundColor = color;
      point.style.left = 60 * (i - 1) + 5  + 'px';
      point.style.top = 30 * (j - 1) + 5 + 'px';
      console.log("POS" + point.offsetLeft + " " + point.offsetTop);
      points[i] = point;
      frameDiv.appendChild(point);
    }
  }
}


//Spawna a bola
function spawnBall(){
  ball.style.visibility = 'visible';
  ball.style.left = '50%';
  ball.style.top = '50%';
  bar.style.left = '360px';
  barOffsetLeft = bar.offsetLeft;
  ballOffsetTop = ball.offsetTop;
  ballOffsetLeft = ball.offsetLeft;
  inclinacao = 0;
  handler = setInterval(ballMove, 33);
}


//Recomeça o jogo
function restart(){
  if(!game){
    gameover.style.visibility = 'hidden';
    spawnBall();
    game = true;
    forca = 0;
  }
}

//Movimento da bola
function ballMove(){
  if(forca > 0){
    ballOffsetTop -= bVelocidade;
    forca--;
    if(inclinacao != 0){
      ballOffsetLeft += inclinacao;
    }
  }else if(forca == 0){
    ballOffsetTop += bVelocidade;
    if(inclinacao != 0){
      ballOffsetLeft += inclinacao;
    }
  }
  if(ballOffsetTop == 550 && (ballOffsetLeft >= barOffsetLeft - 10 && ballOffsetLeft <= barOffsetLeft + 100) ){
    forca = 500;
    inclinacao = ((ballOffsetLeft - barOffsetLeft) - 45)/10;
  }
  if((ballOffsetLeft >= 0 && ballOffsetLeft <= 10) || (ballOffsetLeft >= 870 && ballOffsetLeft <= 880)){
    inclinacao = inclinacao * -1;
  }
  if(ballOffsetTop == 0){
    forca = 0;
  }
  if(ballOffsetTop <= 810 && (ballOffsetLeft >= 50 && ballOffsetLeft < 850) ){
    var point = getPoint(ballOffsetLeft, ballOffsetTop);
    if(point != null){
      point.style.visible = 'hidden';
      forca = 0;
    }
  }

  if(ballOffsetTop + 20 == 600){
    clearInterval(handler);
    ball.style.visibility = 'hidden';
    gameover.style.visibility = 'visible';
    game = false;
  }
  ball.style.top = ballOffsetTop + 'px';
  ball.style.left = ballOffsetLeft + "px";
}

//Move a barra pra esquerda
function esquerda(){
  if(barOffsetLeft + velocidade > 5){
    barOffsetLeft -= velocidade;
    bar.style.left = (barOffsetLeft) + 'px';
  }
}

//Move a barra pra direita
function direita(){
  if(barOffsetLeft + 90 + velocidade <= 895){
    barOffsetLeft += velocidade;
    bar.style.left = (barOffsetLeft) + 'px';
  }
}

function getPoint(x, y){
  console.log("Procurando ponto entre " + x + " e " + y);
  for (var p in points) {
    if ((p.offsetLeft <= x && p.offsetLeft + 50 >= x) && y == p.offsetTop + 20 && p.style.visibility != 'hidden') {
      return p;
      console.log("Foi achado um em " + p.offsetLeft + " e " + p.offsetTop);
      break;
    }
  }
  console.log("Não foi achado nada");
}
