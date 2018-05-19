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

//Classe Ball
function Ball(x, y, ball){
  this.x = x;
  this.y = y;
  this.ball = ball;
}

//Classe Point
function Point(x, y, point){
  this.x = x;
  this.y = y;
  this.point = point;
}

//Classe Bar
function Bar(x, bar){
  this.x = x;
  this.bar = bar;
}

//Variaveis
var points = [];
var frame;
var forca;
var inclinacao = 0;
var bVelocidade = 10;
var velocidade = 5;
var handler;
var ball;
var bar;
var gameover;
var game;


//Função de inicialização
function inicializar(){
  var vball = document.getElementById('ball');
  var vbar = document.getElementById('bar');
  ball = new Ball(vball.offsetLeft, vball.offsetTop, vball);
  bar = new Bar(vbar.offsetLeft, vbar);
  gameover = document.getElementById('Gameover');
  frame = document.getElementById('Frame');
  forca = 0;
  game = true;
  spawnPoints();
  handler = setInterval(ballMove, 30);
}

//Spawna os pontos
function spawnPoints(){
  var a = 0;
  for (var i = 0; i < 15; i++) {
    for(var j = 0; j < 6; j++){
      var point = document.createElement('div');
      point.className = 'Point';
      var color = 'rgb(' + Math.floor(Math.random() * 255) + 1 + ', ' + Math.floor(Math.random() * 255) + 1 + ',' + Math.floor(Math.random() * 255)  + 1 + ')';
      point.style.backgroundColor = color;
      var x = 60 * i + 5;
      var y = 30 * j + 5;
      point.style.left = x + 'px';
      point.style.top = y + 'px';
      points[a] = new Point(x, y, point);
      frame.appendChild(point);
      a++;
    }
  }
}


//Spawna a bola
function spawnBall(){
  ball.ball.style.visibility = 'visible';
  ball.ball.style.left = '50%';
  ball.ball.style.top = '50%';
  bar.bar.style.left = '360px';
  bar.x = 360;
  ball.x = 450
  ball.y = 300;
  inclinacao = 0;
  forca = 0;
  handler = setInterval(ballMove, 30);
  console.log("Bola spawnada");
}


//Recomeça o jogo
function restart(){
  if(!game){
    gameover.style.visibility = 'hidden';
    spawnBall();
    game = true;
    console.log("Reiniciando");
  }
}

//Movimento da bola
function ballMove(){
  if(forca > 0){
    ball.y -= bVelocidade;
    forca--;
    console.log("Subindo");
    if(inclinacao != 0){
      ball.x += inclinacao;
    }
  }else if(forca == 0){
    console.log("Descendo");
    ball.y += bVelocidade;
    if(inclinacao != 0){
      ball.x += inclinacao;
    }
  }
  if(ball.y == 550 && (ball.x >= bar.x - 10 && ball.x <= bar.x + 100) ){
    forca = 500;
    inclinacao = ((ball.x - bar.x) - 45)/10;
  }
  if((ball.x >= 0 && ball.x <= 10) || (ball.x >= 870 && ball.x <= 880)){
    inclinacao = inclinacao * -1;
  }
  if(ball.y == 0){
    forca = 0;
  }

  if(ball.y + 20 == 600){
    clearInterval(handler);
    ball.ball.style.visibility = 'hidden';
    gameover.style.visibility = 'visible';
    game = false;
  }
  ball.ball.style.top = ball.y + 'px';
  ball.ball.style.left = ball.x + "px";
}

//Move a barra pra esquerda
function esquerda(){
  if(bar.x + velocidade > 5){
    bar.x -= velocidade;
    bar.bar.style.left = (bar.x) + 'px';
  }
}

//Move a barra pra direita
function direita(){
  if(bar.x + 90 + velocidade <= 895){
    bar.x += velocidade;
    bar.bar.style.left = (bar.x) + 'px';
  }
}

function getPoint(x, y){
  console.log("Procurando ponto entre " + x + " e " + y);
  for (var p in points) {
    if ((p.x <= x && p.x + 50 >= x) && y == p.y + 20 && p.style.visibility != 'hidden') {
      return p;
      console.log("Foi achado um em " + p.x + " e " + p.y);
      break;
    }
  }
  console.log("Não foi achado nada");
}
