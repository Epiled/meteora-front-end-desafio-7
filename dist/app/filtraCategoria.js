import { conectaApi } from "./conectaApi.js";
import { criarProdutos } from "./criarProduto.js";

const botoes = document.querySelectorAll('[data-categoria]');

botoes.forEach(btn => {
  btn.addEventListener('click', filtrarProdutos);
})

async function filtrarProdutos() {
  const categoria = this.dataset.categoria;
  const filtrados = await filtrarPorcategoria(categoria);

  criarProdutos.listaProdutos(filtrados);
}

async function filtrarPorcategoria(categoria) {
  let lista = await conectaApi.listaDeProdutos;
  let listaFiltrada = lista.filter(produto => produto.categoria == categoria);
  return listaFiltrada;
}