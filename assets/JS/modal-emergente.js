// Obtener elementos del DOM
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('close-btn');

// Cuando el usuario hace clic en el botón de cerrar (X), se cierra el modal
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open'); // Restaurar desplazamiento
});

// Opcional: cerrar el modal si el usuario hace clic fuera de la ventana emergente
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open'); // Restaurar desplazamiento
    }
});

// Evitar el desplazamiento cuando el modal esté abierto
document.body.classList.add('modal-open');
