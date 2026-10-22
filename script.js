// ─── Alternar tema claro/escuro ──────────────────────────────────────
// Guarda a escolha no localStorage pra lembrar na próxima visita, e
// aplica via atributo data-tema no <html> (o CSS reage a esse atributo).
const botaoTema = document.getElementById('alternar-tema');
const CHAVE_TEMA = 'portfolio:tema';

function aplicarTema(tema) {
  document.documentElement.dataset.tema = tema;
  botaoTema.textContent = tema === 'escuro' ? '☀️' : '🌙';
}

aplicarTema(localStorage.getItem(CHAVE_TEMA) || 'claro');

botaoTema.addEventListener('click', () => {
  const atual = document.documentElement.dataset.tema === 'escuro' ? 'claro' : 'escuro';
  aplicarTema(atual);
  localStorage.setItem(CHAVE_TEMA, atual);
});


// ─── Barras de habilidade animadas ao entrar na tela ─────────────────
const observadorBarras = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('animado');
      observadorBarras.unobserve(entrada.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.preenchimento').forEach((barra) => observadorBarras.observe(barra));


// ─── Formulário de contato ────────────────────────────────────────────
const formContato = document.getElementById('form-contato');
const confirmacaoEnvio = document.getElementById('confirmacao-envio');

const validadores = {
  nome: (v) => v.trim().length >= 2 || 'Digite seu nome.',
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'E-mail inválido.',
  mensagem: (v) => v.trim().length >= 10 || 'Escreva uma mensagem um pouco mais longa.',
};

function validarCampo(input) {
  const resultado = validadores[input.name](input.value);
  const campo = input.closest('.campo');
  const spanErro = campo.querySelector('.erro');

  if (resultado === true) {
    campo.classList.remove('invalido');
    spanErro.textContent = '';
    return true;
  }
  campo.classList.add('invalido');
  spanErro.textContent = resultado;
  return false;
}

formContato.querySelectorAll('input, textarea').forEach((input) => {
  input.addEventListener('blur', () => validarCampo(input));
});

formContato.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const campos = [...formContato.querySelectorAll('input, textarea')];
  const todosValidos = campos.map(validarCampo).every(Boolean);

  if (!todosValidos) {
    confirmacaoEnvio.textContent = '';
    return;
  }

  confirmacaoEnvio.textContent = 'Mensagem enviada! Retorno em breve.';
  formContato.reset();
});
