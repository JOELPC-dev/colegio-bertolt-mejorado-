document.addEventListener('DOMContentLoaded', function() {
    // Elementos del modal
    const pdfModal = document.getElementById('pdfModal');
    const pdfViewer = document.getElementById('pdfViewer');
    const modalTitle = document.getElementById('modalTitle');
    const modalClose = document.querySelector('.modal-close');
    
    // Botones de las tarjetas
    const cardButtons = document.querySelectorAll('.card-button');
    
    // Función para abrir el modal
    function openModal(pdfUrl, title) {
        pdfViewer.src = pdfUrl;
        modalTitle.textContent = title;
        pdfModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Evita el scroll del body
    }
    
    // Función para cerrar el modal
    function closeModal() {
        pdfModal.classList.remove('active');
        pdfViewer.src = '';
        document.body.style.overflow = ''; // Restaura el scroll del body
    }
    
    // Event listeners para los botones
    cardButtons.forEach(button => {
        button.addEventListener('click', function() {
            const pdfUrl = this.getAttribute('data-pdf');
            const title = this.closest('.psychology-card').querySelector('.card-title').textContent;
            openModal(pdfUrl, title);
        });
    });
    
    // Event listener para cerrar el modal
    modalClose.addEventListener('click', closeModal);
    
    // Cerrar al hacer clic fuera del modal
    pdfModal.addEventListener('click', function(e) {
        if (e.target === pdfModal) {
            closeModal();
        }
    });
    
    // Descargar PDF (simulado)
    document.querySelector('.download-button').addEventListener('click', function() {
        if (pdfViewer.src) {
            const link = document.createElement('a');
            link.href = pdfViewer.src;
            link.download = modalTitle.textContent + '.pdf';
            link.click();
        }
    });
});