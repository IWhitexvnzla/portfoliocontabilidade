const inputReceita = document.getElementById("receita");
const botao = document.getElementById("btn-calcular");
const resultado = document.getElementById("resultado-texto");

botao.addEventListener('click', function() {
  const receita = parseFloat(inputReceita.value);

  if (receita > 0) {
    const margem = receita * 1.0;
    resultado.textContent = `Margem: R$ ${margem.toFixed(2)}`;
  } else {
    resultado.textContent = "Valor inválido!";
  }
});
