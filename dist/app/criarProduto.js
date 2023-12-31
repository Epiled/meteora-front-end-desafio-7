import { conectaApi } from "./conectaApi.js";
import { modal } from "../js/modal.js";

const produtos = document.querySelector('[data-produtos]');

function criarCard(id, titulo, descricao, preco, imagem) {
  const card = document.createElement('div');
  
  const imagemMobile = new Image();
  const imagemTablet = new Image();
  const imagemDesktop = new Image();

  imagemDesktop.src = `./assets/images/Desktop/Imagens-cards/${imagem}`;
  imagemTablet.src = `./assets/images/Tablet/Imagens-cards/${imagem}`;
  imagemMobile.src = `./assets/images/Mobile/Imagens-cards/${imagem}`;

  card.className = 'produto';
  card.innerHTML = `
        <picture>
          <source srcset="./assets/images/Desktop/Imagens-cards/${imagem}" width="${imagemDesktop.width}" height="${imagemDesktop.height}">
          <source srcset="./assets/images/Tablet/Imagens-cards/${imagem}" width="${imagemTablet.width}" height="${imagemTablet.height}">
          <img src="./assets/images/Mobile/Imagens-cards/${imagem}" loading="lazy" width="${imagemMobile.width}" height="${imagemMobile.height}" alt="#" class="produto__imagem">
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
          <button class="produto__btn" data-modal-btn="produto" data-id="${id}">
            Veja mais
          </button>
        </div>
  `

  const btn = card.querySelector('[data-modal-btn]');
  btn.addEventListener('click', modal.ativaModal);

  return card
}

async function listaProdutos(lista) {
  try {
    produtos.innerHTML = "";
    const listaApi = lista;
    listaApi.forEach(element => {
      produtos.appendChild(criarCard(element.id, element.titulo, element.descricao, element.preco, element.imagem))});
  } catch(e) {
    listaProdutos.innerHTML = `<h2 class="mensagem__titulo">Não foi possível carregar os vídeos</h2>`;
  }
}

listaProdutos(await conectaApi.listaDeProdutos);

export const criarProdutos = {
  listaProdutos,
  produtos,
};