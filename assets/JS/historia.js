// script.js
let currentPage = 0;

const pages = document.querySelectorAll(".page");
const prevButton = document.getElementById("prevPage");
const nextButton = document.getElementById("nextPage");

function updateBook() {
    pages.forEach((page, index) => {
        // Controlar el estado visual de cada página
        if (index === currentPage - 1) {
            // Página izquierda
            page.style.transform = "rotateY(-180deg)";
            page.style.zIndex = pages.length - index; // Prioridad visual
        } else if (index === currentPage) {
            // Página derecha
            page.style.transform = "rotateY(0deg)";
            page.style.zIndex = pages.length - index; // Prioridad visual
        } else if (index < currentPage - 1) {
            // Páginas volteadas completamente hacia la izquierda
            page.style.transform = "rotateY(-180deg)";
            page.style.zIndex = 0;
        } else {
            // Páginas sin pasar, apiladas a la derecha
            page.style.transform = "rotateY(0deg)";
            page.style.zIndex = pages.length - index; // Prioridad visual
        }        
    });
}

// Evento para pasar a la página anterior
prevButton.addEventListener("click", () => {
    if (currentPage > 0) {
        currentPage--;
        updateBook();
    }
});

// Evento para pasar a la siguiente página
nextButton.addEventListener("click", () => {
    if (currentPage < pages.length) {
        currentPage++;
        updateBook();
    }
});

// Iniciar el estado del libro
updateBook();
