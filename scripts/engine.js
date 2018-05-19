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
function Ponto(ax, ay, point){
  this.x = ax;
  this.y = ay;
  this.point = point;
}

//Classe Bar
function Bar(x, bar){
  this.x = x;
  this.bar = bar;
}

//Variaveis
var placar;
var pontos = 0;
var points = new Array();
var frame;
var forca;
var inclinacao = 0;
var bVelocidade = 10;
var velocidade = 10;
var handler;
var ball;
var bar;
var gameover;
var game;


//Função de inicialização
function inicializar(){
  placar = document.getElementById('placar');
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
  for (var i = 0; i < 15; i++) {
    var colunas = new Array();
    for(var j = 0; j < 6; j++){
      var point = new Ponto(60 * i + 5, 30 * j + 5, document.createElement('div'));
      point.point.className = 'Point';
      var color = 'rgb(' + Math.floor(Math.random() * 255) + ', ' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')';
      point.point.style.backgroundColor = color;
      point.point.style.left = point.x + 'px';
      point.point.style.top = point.y + 'px';
      colunas[j] = point;
      frame.appendChild(point.point);
    }
    points[i] = colunas;
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
}


//Recomeça o jogo
function restart(){
  if(!game){
    gameover.style.visibility = 'hidden';
    spawnBall();
    game = true;
    pontos = 0;
    placar.innerHTML = "Pontos: " + pontos;
    for(var i = 0; i < 15; i++){
      for(var j = 0; j < 6; j++){
        var color = 'rgb(' + Math.floor(Math.random() * 255) + ', ' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')';
        points[i][j].point.style.visibility = 'visible';
        points[i][j].point.style.backgroundColor = color;
      }
    }
  }
}

//Movimento da bola
function ballMove(){
  if(forca > 0){
    ball.y -= bVelocidade;
    forca--;
    if(inclinacao != 0){
      ball.x += inclinacao;
    }
  }else if(forca == 0){
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
  if(ball.y <= 175){
    var point = getPoint(ball.x + 10, ball.y);
    if(point.point.style.visibility != 'hidden'){
      point.point.style.visibility = 'hidden';
      forca = 0;
      pontos++;
      placar.innerHTML = "Pontos: " + pontos;
    }
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
  var i = Math.floor(15 - ((900 - x)/60));
  var j = Math.floor(6 - ((175 - y)/30));
  return points[i][j];
}
