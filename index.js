/* Página inicial: valida a data, gira a roda e redireciona para signo.html */

const SIGNOS = window.SIGNOS_DADOS;

const form   = document.getElementById("form-signo");
const campo  = document.getElementById("data");
const erro   = document.getElementById("erro");
const roda   = document.getElementById("roda");
const anel   = document.getElementById("roda-anel");
const centroSimbolo = document.getElementById("centro-simbolo");
const centroNome    = document.getElementById("centro-nome");

// Data máxima = hoje (no fuso local)
const hoje = new Date();
const hojeISO = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}-${String(hoje.getDate()).padStart(2, "0")}`;
campo.max = hojeISO;

// Monta os 12 símbolos ao redor da roda
SIGNOS.forEach((s, i) => {
  const g = document.createElement("div");
  g.className = "glifo";
  g.style.setProperty("--a", `${i * 30}deg`);
  g.title = s.nome;
  const span = document.createElement("span");
  span.textContent = s.simbolo + TEXTO;
  g.appendChild(span);
  anel.appendChild(g);
});

function indiceDoSigno(dataISO) {
  return SIGNOS.indexOf(buscarSigno(dataISO));
}

function dataValida(valor) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(valor)) return "Informa a data do teu nascimento.";
  const [a, m, d] = valor.split("-").map(Number);
  const dt = new Date(a, m - 1, d);
  if (dt.getFullYear() !== a || dt.getMonth() !== m - 1 || dt.getDate() !== d) return "Essa data não existe. Confere o dia e o mês.";
  if (a < 1900) return "Usa uma data a partir de 1900.";
  if (valor > hojeISO) return "Ninguém nasce no futuro, nobre viajante.";
  return "";
}

function mostrarErro(msg) {
  erro.textContent = msg;
  campo.setAttribute("aria-invalid", msg ? "true" : "false");
}

// Ao escolher a data, a roda gira até o signo correspondente
campo.addEventListener("input", () => {
  if (dataValida(campo.value)) return;
  mostrarErro("");
  const i = indiceDoSigno(campo.value);
  roda.style.setProperty("--rot", `${-i * 30}deg`);
  anel.style.setProperty("--rot", `${-i * 30}deg`);
  anel.querySelectorAll(".glifo").forEach((g, idx) => {
    g.classList.toggle("ativo", idx === i);
    g.firstChild.style.setProperty("--rot", `${-i * 30}deg`);
  });
  centroSimbolo.textContent = SIGNOS[i].simbolo + TEXTO;
  centroNome.textContent = SIGNOS[i].nome;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = dataValida(campo.value);
  if (msg) {
    mostrarErro(msg);
    campo.focus();
    return;
  }
  window.location.href = `signo.html?data=${encodeURIComponent(campo.value)}`;
});
