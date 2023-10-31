import { modal } from './modal.js'
const formulario = document.querySelector('[data-formulario]');
const campoEmail = formulario.querySelector('[data-email]');
const campoDeErro = formulario.querySelector('[data-mensagem-erro]');
const btn = formulario.querySelector('[data-modal-btn]');

let validadorDeInput;

const tiposDeErros = [
  'valueMissing',
  'typeMismatch',
  'tooShort',
  'customError'
]

const mensagens = {
  email: {
    valueMissing: "O campo de e-mail não pode estar vazio.",
    typeMismatch: "Por favor, preencha um email válido.",
    tooShort: "Por favor, preencha um e-mail válido."
  },
}

formulario.addEventListener('submit', (e) => {
  e.preventDefault();
});

campoEmail.addEventListener('blur', (e) => {
  verificaCampo(e.target);
});

campoEmail.addEventListener('invalid', (e) => {
  e.preventDefault();
});

function verificaCampo(campo) {
  let mensagem = '';

  tiposDeErros.forEach(erro => {
    if (campo.validity[erro]) {
      mensagem = mensagens[campo.name][erro];
    }
  });

  validadorDeInput = campo.checkValidity();

  if (!validadorDeInput) {
    campoDeErro.textContent = mensagem;
    btn.removeEventListener('click', modal.ativaModal);
  } else {
    campoDeErro.textContent = '';
    btn.addEventListener('click', modal.ativaModal);
  }

}
