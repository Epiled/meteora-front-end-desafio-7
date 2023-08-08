async function listaProdutos() {
  const conexao = await fetch('http://localhost:3000/produtos');
  const conexaoConvertida = await conexao.json();
  console.table(conexaoConvertida);
  return conexaoConvertida;
}

export const conectaApi = {
  listaProdutos,
}