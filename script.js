const titulo = document.querySelector('.titulo');
const artista = document.querySelector('.artista');
const anterior = document.querySelector('.anterior');
const executarPausar = document.querySelector('.executarPausar');
const proxima = document.querySelector('.proxima');
const musica = document.querySelector('audio');
const duracaoMusica = document.querySelector('.fim');
const imagem = document.querySelector('.imagem-artista');

// criar lista de musica
const listaMusica = [
  {
    audioDiretorio: 'audio/Lonely.mp3', 
    nomeMusica: 'Lonely',
    nomeArtista: 'Akon', 
    imagemArtista: 'img/akon.jpg',
  },
  {
    audioDiretorio: 'audio/Killing Me Softly.mp3', 
    nomeMusica: 'Killing Me Softly',
    nomeArtista: 'Fugees', 
    imagemArtista: 'img/fugees.jpeg',
  },
]

let musicaTocando = false;

// executando musica
function executandoMusica() {
  musicaTocando = true;
  musica.play();
  executarPausar.classList.add('active');
  // mudança de icone
  executarPausar.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" class="bi bi-pause" viewBox="0 0 16 16">
     <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
  </svg>`;
}

// pausando musica
function pausandoMusica() {
  musicaTocando = false;
  musica.pause();
  executarPausar.classList.remove('active');
  // mudança de icone
  executarPausar.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" class="bi bi-play" viewBox="0 0 16 16">
     <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
  </svg>`

}

// executando ou pausando musica com um click
executarPausar.addEventListener("click", () => (musicaTocando ? 
pausandoMusica() : executandoMusica()));

// carregando musica
function carregandoMusica(listaMusica) {
  titulo.textContent = listaMusica.nomeMusica;
  musica.src = listaMusica.audioDiretorio;
  imagem.src = listaMusica.imagemArtista;
  artista.textContent = listaMusica.nomeArtista;

  musica.addEventListener('loadeddata', () => {
    duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
  })

}

// atual musica
let i = 0;

// carregamento ativado - selecionar primeira musica da lista 
carregandoMusica(listaMusica[i]);

// musica anterior
function faixaAnterior() {
  i--;
  if (i < 0) {
    i = listaMusica.length - 1;
  }
  carregandoMusica(listaMusica[i]);
  executandoMusica();
}
anterior.addEventListener("click", faixaAnterior);

// proxima musica 
function proximaFaixa() {
  i++;
  if (i > listaMusica.length - 1) {
    i = 0;
  }
  carregandoMusica(listaMusica[i]);
  executandoMusica();
}
proxima.addEventListener("click", proximaFaixa);

function atualizarBarra(){
  let barra = document.querySelector('progress');
  barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + '%';
  let tempoDecorrido = document.querySelector('.inicio');
  tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
}
musica.addEventListener('timeupdate', atualizarBarra);


function segundosParaMinutos(segundos){
  let campoMinutos = Math.floor(segundos / 60);
  let campoSegundos = segundos % 60;
  if (campoSegundos < 10){
      campoSegundos = '0' + campoSegundos;
  }

  return campoMinutos+':'+campoSegundos;
}
