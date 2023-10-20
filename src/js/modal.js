
import { conectaApi } from "../app/conectaApi.js";

const produtos = await conectaApi.listaDeProdutos;
const modals = [...document.querySelectorAll('[data-modal]')];

const modalTipo = {
  produto: modals.find(item => item.dataset.modal === 'produto'),
  newsletter: modals.find(item => item.dataset.modal === 'newsletter'),
};

modals.forEach(modal => {
  modal.addEventListener('click', (e) => {
    fechaModal(e.target, modal);
  });
});

function fechaModal(btn, modal) {
  if (btn.hasAttribute('data-modal-fechar') || btn.parentNode.hasAttribute('data-modal-fechar')) {
    modal.dataset.estado = '';
  };
}

function fechaModalsGeral(lista) {
  lista.forEach(item => {
    item.dataset.estado = '';
  })
}

async function ativaModal() {
  fechaModalsGeral(modals);
  const alvo = this.dataset.modalBtn;
  const modal = modalTipo[alvo];

  if (modalTipo[alvo].dataset.modal === 'produto') {
    const produtoId = parseInt(this.dataset.id) - 1;
    preencheModalProduto(modal, produtoId);
    return;
  }
  
  modal.dataset.estado = "ativo";

}

function criaCor(nome, cor) {
  const label = document.createElement('label');
  label.className = 'modal__etq';
  label.for = nome;
  label.innerHTML = `
        <input type="radio" name="colorChoose" id="${nome}" class="modal__ipt" style="background: ${cor};">
        ${nome}`;

  return label;
}

function criaTamanho(tamanho) {
  const label = document.createElement('label');
  label.className = 'modal__etq';
  label.for = tamanho;
  label.innerHTML = `
  <label for="${tamanho}" class="modal__etq">
    <input type="radio" name="sizeChoose" id="${tamanho}" class="modal__ipt">
    ${tamanho}
  </label>
  `

  return label;
}

function preencheModalProduto(modal, produtoId) {
  modal.dataset.estado = "ativo";
  modal.querySelector('[data-imagem-desktop]').srcset = `./assets/images/Desktop/Imagens-cards/${produtos[produtoId].imagem}`;
  modal.querySelector('[data-imagem-tablet]').srcset = `./assets/images/Tablet/Imagens-cards/${produtos[produtoId].imagem}`;
  modal.querySelector('[data-imagem-mobile]').srcset = `./assets/images/Mobile/Imagens-cards/${produtos[produtoId].imagem}`;
  modal.querySelector('[data-modal-produto]').textContent = produtos[produtoId].titulo;
  modal.querySelector('[data-modal-descricao]').textContent = produtos[produtoId].descricao;
  modal.querySelector('[data-modal-preco]').textContent = produtos[produtoId].preco;

  const campoCores = modal.querySelector('[data-modal-cores]');
  campoCores.innerHTML = '';
  produtos[produtoId].cores.forEach(cor => {
    campoCores.appendChild(criaCor(cor.corNome, cor.corHash));
  });

  const campoTamanhos = modal.querySelector('[data-modal-tamanhos]');
  campoTamanhos.innerHTML = '';
  produtos[produtoId].tamanhos.forEach(tamanho => {
    campoTamanhos.appendChild(criaTamanho(tamanho));
  });
}

export const modal = {
  ativaModal,
}