window.onload = function () {
  iniciar(); //Inicializa os comandos e variáveis
  setInterval(principal, 1000 / 60); //Roda o jogo dentro do laço
};

function iniciar() {
  folhaDesenho = document.querySelector('#folha');
  areaDesenho = folhaDesenho.getContext('2d');
  larguraCampo = 600;
  alturaCampo = 500;
  espessuraRede = 5;
  diametroBola = 10;
  alturaRaquete = 100;
  posicaoBolaX = 10;
  posicaoBolaY = posicaoBolaX;
  velocidadeBolaPosicaoX = 4;
  velocidadeBolaPosicaoY = velocidadeBolaPosicaoX;
  espessuraRaquete = 11;
  posicaoJogador1 = 200;
  posicaoJogador2 = posicaoJogador1;
  efeitoRaquete = 0.3;
  pontuacaoJogardor1 = 0;
  pontuacaoJogardor2 = pontuacaoJogardor1;
  velocidadeJogador2 = 8;
  folhaDesenho.addEventListener('mousemove', function (e) {
    posicaoJogador1 = e.clientY - alturaRaquete / 2;
  });
}

function continuar() {
  posicaoBolaX = larguraCampo / 2;
  posicaoBolaY = alturaCampo;
  velocidadeBolaPosicaoX = -velocidadeBolaPosicaoX;
  velocidadeBolaPosicaoY = 3;
}

function desenhar() {
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
}

function calcular() {
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
      continuar();
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
      continuar();
    }
  }
  //Atualiza a posição do Jogador 2
  if (posicaoJogador2 + alturaRaquete / 2 < posicaoBolaY) {
    posicaoJogador2 = posicaoJogador2 + velocidadeJogador2;
  } else {
    posicaoJogador2 = posicaoJogador2 - velocidadeJogador2;
  }
}

function principal() {
  desenhar();
  calcular();
}
