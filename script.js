window.onload = function () {
  setInterval(executar, 1000 / 60);
};

var folhaDesenho = document.querySelector('#folha');
var areaDesenho = folhaDesenho.getContext('2d');
var larguraCampo = 600;
var alturaCampo = 500;
var espessuraRede = 5;
var diametroBola = 10;
var alturaRaquete = 100;
var posicaoBolaX = 10;
var posicaoBolaY = posicaoBolaX;
var velocidadeBolaPosicaoX = 4;
var velocidadeBolaPosicaoY = velocidadeBolaPosicaoX;
var espessuraRaquete = 11;
var posicaoJogador1 = 200;
var posicaoJogador2 = posicaoJogador1;
var efeitoRaquete = 0.3;
var pontuacaoJogardor1 = 0;
var pontuacaoJogardor2 = pontuacaoJogardor1;
var velocidadeJogador2 = 5;

folhaDesenho.addEventListener('mousemove', function (e) {
  posicaoJogador1 = e.clientY - alturaRaquete / 2;
});

function executar() {
  //Canvas
  areaDesenho.fillStyle = '#286047';
  areaDesenho.fillRect(0, 0, larguraCampo, alturaCampo);
  //Linha de divisão do campo
  areaDesenho.fillStyle = '#ffffff';
  areaDesenho.fillRect(
    larguraCampo / 2 - espessuraRede / 2,
    0,
    espessuraRede,
    alturaCampo
  );
  //Raquete 1
  areaDesenho.fillRect(2, posicaoJogador1, espessuraRaquete, alturaRaquete);
  //Raquete 2
  areaDesenho.fillRect(
    larguraCampo - espessuraRaquete - 2,
    posicaoJogador2,
    espessuraRaquete,
    alturaRaquete
  );
  //Bolinha
  areaDesenho.fillRect(
    posicaoBolaX - diametroBola / 2,
    posicaoBolaY - diametroBola / 2,
    diametroBola,
    diametroBola
  );
  posicaoBolaX = posicaoBolaX + velocidadeBolaPosicaoX;
  posicaoBolaY = posicaoBolaY + velocidadeBolaPosicaoY;
  //Escrever a pontuação dos Jogadores
  areaDesenho.fillText('Humano - ' + pontuacaoJogardor1 + ' pontos', 100, 20);
  areaDesenho.fillText(
    'Computador - ' + pontuacaoJogardor2 + ' pontos',
    larguraCampo - 200,
    20
  );
  //Verifica Lateral Superior
  if (posicaoBolaY < 0 && velocidadeBolaPosicaoY < 0) {
    velocidadeBolaPosicaoY = -velocidadeBolaPosicaoY;
  }
  //Verifica Lateral Inferior
  if (posicaoBolaY > alturaCampo && velocidadeBolaPosicaoY > 0) {
    velocidadeBolaPosicaoY = -velocidadeBolaPosicaoY;
  }
  //Verifica se o Jogador 2 fez ponto
  if (posicaoBolaX < 0) {
    if (
      posicaoBolaY > posicaoJogador1 &&
      posicaoBolaY < posicaoJogador1 + alturaRaquete
    ) {
      //Rebater a bola
      velocidadeBolaPosicaoX = -velocidadeBolaPosicaoX;
      var diferencaY = posicaoBolaY - (posicaoJogador1 + alturaRaquete / 2);
      velocidadeBolaPosicaoY = diferencaY * efeitoRaquete;
    } else {
      //Pontos Jogador 2
      pontuacaoJogardor2++;
      //Colocar bola no centro
      posicaoBolaX = larguraCampo / 2;
      posicaoBolaY = alturaCampo / 2;
      velocidadeBolaPosicaoX = -velocidadeBolaPosicaoX;
      velocidadeBolaPosicaoY = 3;
    }
  }
  //Verifica se o Jogador 1 fez ponto
  if (posicaoBolaX > larguraCampo) {
    if (
      posicaoBolaY > posicaoJogador2 &&
      posicaoBolaY < posicaoJogador2 + alturaRaquete
    ) {
      //Rebater a bola
      velocidadeBolaPosicaoX = -velocidadeBolaPosicaoX;
      var diferencaY = posicaoBolaY - (posicaoJogador2 + alturaRaquete / 2);
      velocidadeBolaPosicaoY = diferencaY * efeitoRaquete;
    } else {
      //Pontos Jogador 1
      pontuacaoJogardor1++;
      //Colocar bola no centro
      posicaoBolaX = larguraCampo / 2;
      posicaoBolaY = alturaCampo / 2;
      velocidadeBolaPosicaoX = -velocidadeBolaPosicaoX;
      velocidadeBolaPosicaoY = 3;
    }
  }
  //Atualiza a posição do Jogador 2
  if (posicaoJogador2 + alturaRaquete / 2 < posicaoBolaY) {
    posicaoJogador2 = posicaoJogador2 + velocidadeJogador2;
  } else {
    posicaoJogador2 = posicaoJogador2 - velocidadeJogador2;
  }
}
