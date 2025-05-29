// Seleccionar elementos
const openModalBtn = document.querySelector('.open-modal-btn'); // Botón del <li>
const modal = document.getElementById('modal'); // Modal completo
const closeModalBtn = document.getElementById('closeModal'); // Botón de cerrar en el modal
const form = document.getElementById('form'); // Formulario dentro del modal

// Mostrar el modal
openModalBtn.addEventListener('click', () => {
  modal.style.display = 'flex';
});

// Cerrar el modal al hacer clic en el botón de cerrar
closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Cerrar el modal al enviar el formulario
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Evita el envío real del formulario
  alert('Formulario enviado con éxito'); // Mensaje de éxito (puedes personalizarlo)
  modal.style.display = 'none';
});
