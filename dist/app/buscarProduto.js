import { conectaApi } from "./conectaApi.js";
import { criarProdutos } from "./criarProduto.js";

const campoBusca = document.querySelector('[data-campo-busca]');
const btnBusca = document.querySelector('[data-btn-busca]');
const lista = criarProdutos.produtos;

btnBusca.addEventListener('click', buscaProduto);

async function buscaProduto() {

  const dadosDePesquisa = campoBusca.value;
  const busca = await conectaApi.buscaProduto(dadosDePesquisa);
  while (lista.firstChild) {
    lista.removeChild(lista.firstChild);
  }

  if(busca == '') {
    lista.innerHTML = `
    <h2 class="produto__busca">
      Nenhum produto encontrado com o termo ${dadosDePesquisa}
    </h2>
    `;
    return;
  }

  criarProdutos.listaProdutos(busca);
}