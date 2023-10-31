const BANNER = document.querySelector('[data-banner]');
const BANNER_SLIDES = BANNER.querySelectorAll('[data-banner-slide]');
const BANNER_IMAGENS = BANNER.querySelectorAll('[data-banner-imagem]');
const TEMPO_SLIDE = parseInt(BANNER.dataset.timeSlide);
const TEMPO_TRANSICAO = parseInt(BANNER.dataset.timeTransicao);
const SLIDES_QTD = BANNER_SLIDES.length;
const BANNER_SETAS = BANNER.querySelectorAll('[data-banner-seta]');
const BANNER_INDICES = BANNER.querySelector('[data-banner-indices]');
let indicadores = [];
let indiceAtual;
let indiceNovo;

window.onload = () => preparaBanner();

preparaSlide(BANNER_SLIDES);

BANNER_IMAGENS.forEach(imagem => {
  imagem.addEventListener('load', preparaBanner)
});

BANNER_SETAS.forEach(seta => {
  seta.addEventListener('click', (e) => {
    passaSlide(e.target);
  })
});

window.addEventListener("resize", preparaBanner);

let autoSlide = setInterval(proximoSlide, TEMPO_SLIDE);

BANNER.addEventListener('mouseover', stopSlides);

BANNER.addEventListener('mouseleave', () => {
  return autoSlide = setInterval(proximoSlide, TEMPO_SLIDE);
});

function stopSlides() {
  clearInterval(autoSlide);
}

function passaSlide(direcao) {
  if (direcao.dataset.bannerSeta == 'voltar') {
    voltarSlide();
    return;
  }
  proximoSlide();
}

function proximoSlide() {

    BANNER_SLIDES.forEach((slide) => {
      let posicao = parseFloat(slide.style.left);
      let novaPosicao;

      slideAtivo(slide);

      slide.dataset.estado = '';

      if (posicao < 0) {
        novaPosicao = ((SLIDES_QTD - 2) * 100) + '%';
      } else {
        novaPosicao = (posicao - 100) + '%';
      }
      slide.style.left = novaPosicao;

      controleEstado(slide, novaPosicao, 'proximo');
    });

  destacaIndice(indiceAtual, indiceNovo);
}

function voltarSlide() {

  BANNER_SLIDES.forEach((slide) => {
    let posicao = parseFloat(slide.style.left);
    let novaPosicao;

    slideAtivo(slide);

    slide.dataset.estado = '';

    if (posicao == (SLIDES_QTD - 2) * 100) {
      novaPosicao = -100 + '%';
    } else {
      novaPosicao = (posicao + 100) + '%';
    }
    slide.style.left = novaPosicao;

    controleEstado(slide, novaPosicao, 'voltar');
  });

  destacaIndice(indiceAtual, indiceNovo);
}

function controleEstado(slide, posicao, sentido) {
  if (sentido == 'proximo') {
    if (parseInt(posicao) < 0) {
      slide.style.zIndex = '-1';
    } else if (parseInt(posicao) === 0) {
      slide.dataset.estado = 'ativo';
      slide.style.zIndex = '0';
      indiceNovo = slide.dataset.indiceSlide;
    } else {
      slide.style.zIndex = '-2';
    }
  } else {
    if (parseInt(posicao) < 0) {
      slide.style.zIndex = '-2';
    } else if (parseInt(posicao) === 0) {
      slide.dataset.estado = 'ativo';
      slide.style.zIndex = '0';
      indiceNovo = slide.dataset.indiceSlide;
    } else {
      slide.style.zIndex = '-1';
    }
  }
}

function slideAtivo(slide) {
  if(slide.dataset.estado === 'ativo') {
    return indiceAtual = slide.dataset.indiceSlide;
  }
}

function criaIndicadores() {
  const LARGURA = 30;
  const ALTURA = 3;
  const GAP = 3;

  for (let i = 0; i < SLIDES_QTD; i++) {
    let posicao = (LARGURA + GAP * 2) * i;
    let indicador = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    indicador.classList.add('banner__indice');

    indicador.style.transform = `matrix(1, 0, 0, -1, ${posicao}, ${GAP})`;
    indicador.dataset.indice = i;
    indicador.dataset.indicadorEstado = '';

    if(BANNER_SLIDES[i].dataset.estado == 'ativo') indicador.dataset.indicadorEstado = 'ativo';

    indicador.addEventListener('click', (e) => {
      moveToSlide(e.target.dataset.indice, BANNER_SLIDES);
    });

    indicadores.push(indicador);
  }

  indicadores.forEach(item => BANNER_INDICES.appendChild(item))
}

criaIndicadores();

function moveToSlide(indice, slides) {
  let slideAtivo;
  slides.forEach((slide, index) => {
    let slideEstado = slide.dataset.estado;
    if (slideEstado == 'ativo') {
      slideAtivo = index;
    }
  });

  let sentido;
  let novaPosicao = Math.abs(slideAtivo - indice);

  if (slideAtivo < indice) {
    sentido = -1;
  } else if (slideAtivo >= indice) {
    sentido = 1;
  }

  for (let i = 0; i < novaPosicao; i++) {
    if (sentido < 0) {
      proximoSlide();
    } else {
      voltarSlide();
    }
  }

  destacaIndice(slideAtivo, indice);
}

function destacaIndice(ultimoAtivo, novoAtivo) {
  indicadores[ultimoAtivo].dataset.indicadorEstado = '';
  indicadores[novoAtivo].dataset.indicadorEstado = 'ativo';
}

function preparaBanner() {
  BANNER.style.height = ((BANNER_IMAGENS[0].clientHeight * 100) / window.screen.height) + 'vh';
}

function preparaSlide(slides) {
  return slides.forEach((slide, index) => {
    slide.dataset.indiceSlide = index;
    slide.style.transition = `left ${TEMPO_TRANSICAO / 1000}s`;

    if (index == (slides.length - 1)) {
      slide.style.left = '-100%';
      return;
    }
    slide.style.left = (index * 100) + '%';
  })
}