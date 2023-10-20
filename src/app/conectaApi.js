let listaDeProdutos = await listaProdutos();

async function listaProdutos() {
  const conexao = await fetch('http://localhost:3000/produtos');
  const produtosLista = await conexao.json();
  console.table(produtosLista);
  return produtosLista;
}

async function buscaProduto(termoDeBusca) {
  const conexao = await fetch(`http://localhost:3000/produtos?q=${termoDeBusca}`);
  const produtosLista = await conexao.json();

  return produtosLista;
}

export const conectaApi = {
  listaDeProdutos,
  buscaProduto,
}