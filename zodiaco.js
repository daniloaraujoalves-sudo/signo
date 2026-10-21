/* Dados e busca dos signos (usado pelas duas páginas).
   Os dados vêm de data/signos.js, gerado a partir do banco SQLite. */

const TEXTO = "︎"; // força o símbolo em modo texto (não emoji)

// Procura o signo de uma data "AAAA-MM-DD". Devolve o objeto do signo ou null.
function buscarSigno(dataISO) {
  const [, m, d] = dataISO.split("-").map(Number);
  const md = m * 100 + d;
  // Capricórnio atravessa o ano (inicio_md > fim_md), por isso o segundo ramo.
  return window.SIGNOS_DADOS.find(s =>
    s.inicio_md <= s.fim_md
      ? md >= s.inicio_md && md <= s.fim_md
      : md >= s.inicio_md || md <= s.fim_md
  ) || null;
}
