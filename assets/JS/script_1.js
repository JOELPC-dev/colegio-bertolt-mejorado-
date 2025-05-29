let currentIndex = 0;
const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length;
const slideInterval = 3000; // Intervalo en milisegundos (3 segundos)
let slideTimer;

// Clonar el primer y último elemento para facilitar la transición infinita
const firstSlide = slides[0].cloneNode(true);
const lastSlide = slides[totalSlides - 1].cloneNode(true);
const carouselInner = document.querySelector('.carousel-inner');

carouselInner.appendChild(firstSlide);
carouselInner.insertBefore(lastSlide, slides[0]);

const newTotalSlides = totalSlides + 2; // Incluye los clones

function showSlide(index) {
    const offset = -index * 100;
    carouselInner.style.transform = `translateX(${offset}%)`;
}

function moveSlide(step) {
    currentIndex = (currentIndex + step + newTotalSlides) % newTotalSlides;
    
    // Si llegamos al primer slide original, ajustar el índice al último
    if (currentIndex === 0) {
        setTimeout(() => {
            carouselInner.style.transition = 'none';
            currentIndex = totalSlides;
            showSlide(currentIndex);
        }, 500); // Duración de la animación (500 ms)
    }
    
    // Si llegamos al último slide original, ajustar el índice al primero
    if (currentIndex === newTotalSlides - 1) {
        setTimeout(() => {
            carouselInner.style.transition = 'none';
            currentIndex = 1;
            showSlide(currentIndex);
        }, 500); // Duración de la animación (500 ms)
    }
    
    carouselInner.style.transition = 'transform 0.5s ease';
    showSlide(currentIndex);
    resetTimer();
}

function resetTimer() {
    clearInterval(slideTimer);
    slideTimer = setInterval(() => {
        moveSlide(1);
    }, slideInterval);
}

// Inicializar el carrusel
showSlide(currentIndex);
slideTimer = setInterval(() => {
    moveSlide(1);
}, slideInterval);

// Opcional: Pausar el carrusel al pasar el mouse
const carousel = document.querySelector('.carousel');
carousel.addEventListener('mouseover', () => clearInterval(slideTimer));
carousel.addEventListener('mouseout', resetTimer);

// Manejo de eventos táctiles
let startX;
let isDragging = false;

function handleTouchStart(e) {
    isDragging = true;
    startX = e.touches[0].clientX;
}

function handleTouchMove(e) {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const movedBy = startX - currentX;
    
    if (movedBy > 50) { // Si el movimiento es mayor a 50px, avanza al siguiente slide
        moveSlide(1);
        isDragging = false;
    } else if (movedBy < -50) { // Si el movimiento es menor a -50px, retrocede al slide anterior
        moveSlide(-1);
        isDragging = false;
    }
}

function handleTouchEnd() {
    isDragging = false;
}

carousel.addEventListener('touchstart', handleTouchStart);
carousel.addEventListener('touchmove', handleTouchMove);
carousel.addEventListener('touchend', handleTouchEnd);
