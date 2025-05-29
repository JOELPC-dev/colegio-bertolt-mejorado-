// JavaScript mejorado para la funcionalidad del carrusel
document.addEventListener("DOMContentLoaded", () => {
    const eventsWrapper = document.querySelector(".events-wrapper");
    const arrowLeft = document.querySelector(".arrow-left");
    const arrowRight = document.querySelector(".arrow-right");

    let currentIndex = 0;
    const eventBlocks = document.querySelectorAll(".event-block");
    const blockWidth = 320 + 25; // Ancho del bloque + gap
    const totalBlocks = eventBlocks.length;
    const visibleBlocks = Math.floor(window.innerWidth / blockWidth);
    const maxIndex = Math.max(0, totalBlocks - visibleBlocks);

    // Función para actualizar el estado de las flechas
    function updateArrowStates() {
        arrowLeft.style.opacity = currentIndex === 0 ? '0.5' : '1';
        arrowLeft.style.cursor = currentIndex === 0 ? 'not-allowed' : 'pointer';

        arrowRight.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
        arrowRight.style.cursor = currentIndex >= maxIndex ? 'not-allowed' : 'pointer';
    }

    // Mover a la diapositiva anterior
    arrowLeft.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarouselPosition();
            updateArrowStates();
        }
    });

    // Mover a la siguiente diapositiva
    arrowRight.addEventListener("click", () => {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarouselPosition();
            updateArrowStates();
        }
    });

    // Actualizar la posición del carrusel con animación mejorada
    function updateCarouselPosition() {
        const newTransform = -(currentIndex * blockWidth);
        eventsWrapper.style.transform = `translateX(${newTransform}px)`;
    }

    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            currentIndex--;
            updateCarouselPosition();
            updateArrowStates();
        }
        if (e.key === 'ArrowRight' && currentIndex < maxIndex) {
            currentIndex++;
            updateCarouselPosition();
            updateArrowStates();
        }
    });

    // Navegación táctil para móviles
    let startX = 0;
    let isDragging = false;

    eventsWrapper.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });

    eventsWrapper.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });

    eventsWrapper.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;

        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;

        if (Math.abs(diff) > 50) {
            if (diff > 0 && currentIndex < maxIndex) {
                currentIndex++;
            } else if (diff < 0 && currentIndex > 0) {
                currentIndex--;
            }
            updateCarouselPosition();
            updateArrowStates();
        }
    });

    // Auto-scroll opcional (comentado por defecto)
    /*
    setInterval(() => {
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarouselPosition();
        updateArrowStates();
    }, 5000);
    */

    // Inicializar estados
    updateArrowStates();

    // Responsive handling
    window.addEventListener('resize', () => {
        const newVisibleBlocks = Math.floor(window.innerWidth / blockWidth);
        const newMaxIndex = Math.max(0, totalBlocks - newVisibleBlocks);
        if (currentIndex > newMaxIndex) {
            currentIndex = newMaxIndex;
            updateCarouselPosition();
        }
        updateArrowStates();
    });
});