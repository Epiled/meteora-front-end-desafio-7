
const modals = [...document.querySelectorAll('[data-modal]')];
const btnsModals = [...document.querySelectorAll('[data-modal-btn]')];

const modalTipo = {
  produto: modals.find(item => item.dataset.modal === 'produto'),
  newsletter: modals.find(item => item.dataset.modal === 'newsletter'),
};

btnsModals.forEach(btn => {
  btn.addEventListener('click', ativaModal);
});

modals.forEach(modal => {
  modal.addEventListener('click', (e) => {
    fechaModal(e.target, modal);
  });
});

function fechaModal(btn, modal) {
  if(btn.hasAttribute('data-modal-fechar') || btn.parentNode.hasAttribute('data-modal-fechar')) {
    modal.dataset.estado = '';
  };
}

function fechaModalsGeral(lista) {
  lista.forEach(item => {
    item.dataset.estado = '';
  })
}

function ativaModal() {
  fechaModalsGeral(modals);
  const alvo = this.dataset.modalBtn;
  modalTipo[alvo].dataset.estado = "ativo";
}