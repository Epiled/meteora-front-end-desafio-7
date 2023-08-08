import { conectaApi } from "./conectaApi.js";

const produtos = document.querySelector('[data-produtos]');

function criarCard(titulo, descricao, preco, imagem) {
  const card = document.createElement('div');
  const btn = criarBotao();
  card.className = 'produto';
  card.innerHTML = `
        <picture>
          <source srcset="./assets/images/Desktop/Imagens-cards/${imagem}">
          <source srcset="./assets/images/Tablet/Imagens-cards/${imagem}">
          <img src="./assets/images/Mobile/Imagens-cards/${imagem}" alt="#" class="produto__imagem">
        </picture>
        <div class="produto__conteudo">
          <h2 class="produto__titulo">
            ${titulo}
          </h2>
          <p class="produto__txt">
            ${descricao}
          </p>
          <span class="produto__preco">
            R$ ${preco}
          </span>
          ${btn}
        </div>
  `

  card.appendChild(btn);
  return card
}

function criarBotao() {
  const btn = document.createElement('button');
  btn.className = 'produto__btn';
  btn.dataset.modalBtn = 'produto';
  btn.textContent = 'Veja mais';

  return btn;
}

async function listaProdutos() {
  try {
    const listaApi = await conectaApi.listaProdutos();
    listaApi.forEach(element => {
      produtos.appendChild(criarCard(element.titulo, element.descricao, element.preco, element.imagem))});
  } catch(e) {
    listaProdutos.innerHTML = `<h2 class="mensagem__titulo">Não foi possível carregar os vídeos</h2>`;
  }
}

listaProdutos();

export default criarCard;