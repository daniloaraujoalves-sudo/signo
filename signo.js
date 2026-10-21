/* Página de resultado: busca o signo nos dados locais e preenche a tela */

const MESES = ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];
const $ = (id) => document.getElementById(id);

function dataPorExtenso(iso) {
  const [a, m, d] = iso.split("-").map(Number);
  return `Nascido aos ${d} de ${MESES[m - 1]} de ${a}`;
}

function preencherLista(id, texto) {
  const ul = $(id);
  texto.split(",").map(t => t.trim()).filter(Boolean).forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.charAt(0).toUpperCase() + item.slice(1);
    ul.appendChild(li);
  });
}

function falhar(msg) {
  const estado = $("estado");
  estado.textContent = msg;
  estado.classList.add("erro-estado");
}

function carregar() {
  const data = new URLSearchParams(window.location.search).get("data");
  if (!data) return falhar("Nenhuma data informada. Volta e preenche a data do teu nascimento.");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data)) return falhar("Data inválida.");

  const s = buscarSigno(data);
  if (!s) return falhar("Signo não encontrado.");

  document.title = `${s.nome} — Pergaminho dos Signos`;
  document.documentElement.style.setProperty("--accent", s.cor_hex);

  $("simbolo").textContent = s.simbolo + TEXTO;
  $("nascimento").textContent = dataPorExtenso(data);
  $("nome").textContent = s.nome;
  $("periodo").textContent = s.periodo;
  $("descricao").textContent = s.descricao;
  $("elemento").textContent = s.elemento;
  $("modalidade").textContent = s.modalidade;
  $("regente").textContent = s.regente;
  $("cor").textContent = s.cor;
  $("amostra").style.background = s.cor_hex;
  $("pedra").textContent = s.pedra;
  $("dia").textContent = s.dia_semana;
  $("numeros").textContent = s.numeros;
  preencherLista("qualidades", s.qualidades);
  preencherLista("desafios", s.desafios);
  preencherLista("compatibilidade", s.compatibilidade);

  $("estado").hidden = true;
  $("signo").hidden = false;
}

carregar();
