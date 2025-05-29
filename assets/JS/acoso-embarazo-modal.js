
// Script para el botón "ver-acoso"
const modalAcoso = document.getElementById('modal');
const openAcosoBtn = document.getElementById('ver-acoso');
const closeModalAcosoBtn = document.getElementById('closeModal');
const pdfViewerAcoso = document.getElementById('pdfViewer');

openAcosoBtn.addEventListener('click', () => {
    pdfViewerAcoso.src = "../assets/DOC/Psicologia/acoso-escolar.pdf";
    modalAcoso.style.display = 'flex';
});

closeModalAcosoBtn.addEventListener('click', () => {
    modalAcoso.style.display = 'none';
    pdfViewerAcoso.src = ""; // Limpia el iframe al cerrar
});

window.addEventListener('click', (event) => {
    if (event.target === modalAcoso) {
        modalAcoso.style.display = 'none';
        pdfViewerAcoso.src = ""; // Limpia el iframe al cerrar
    }
});
// Script para el botón "ver-embarazo"
const modalEmbarazo = document.getElementById('modal');
const openEmbarazoBtn = document.getElementById('ver-embarazo');
const closeModalEmbarazoBtn = document.getElementById('closeModal');
const pdfViewerEmbarazo = document.getElementById('pdfViewer');

openEmbarazoBtn.addEventListener('click', () => {
    pdfViewerEmbarazo.src = "../assets/DOC/Psicologia/EMBARAZO PRECOZ.pdf";
    modalEmbarazo.style.display = 'flex';
});

closeModalEmbarazoBtn.addEventListener('click', () => {
    modalEmbarazo.style.display = 'none';
    pdfViewerEmbarazo.src = ""; // Limpia el iframe al cerrar
});

window.addEventListener('click', (event) => {
    if (event.target === modalEmbarazo) {
        modalEmbarazo.style.display = 'none';
        pdfViewerEmbarazo.src = ""; // Limpia el iframe al cerrar
    }
});
