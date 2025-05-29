document.querySelectorAll('.nivel').forEach(nivel => {
    nivel.addEventListener('mouseenter', () => {
        // Obtener el texto del atributo data-text
        const text = nivel.dataset.text || "Texto predeterminado"; // Asigna un valor predeterminado si no existe

        let hoverText = nivel.querySelector('.hover-text');

        // Crear el contenedor del texto solo si no existe
        if (!hoverText) {
            hoverText = document.createElement('div');
            hoverText.classList.add('hover-text');
            nivel.appendChild(hoverText);
        }

        // Limpiar el contenido previo
        hoverText.innerHTML = '';

        // Añadir letras animadas
        let delay = 0;
        for (let char of text) {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.display = 'inline-block';
            span.style.transform = 'translateX(50px)';
            span.style.transition = `transform 0.5s ease ${delay}s, opacity 0.5s ease ${delay}s`;
            span.style.opacity = '0';
            hoverText.appendChild(span);
            delay += 0.05;
        }

        // Activar la animación
        setTimeout(() => {
            hoverText.querySelectorAll('span').forEach(span => {
                span.style.transform = 'translateX(0)';
                span.style.opacity = '1';
            });
        }, 50);
    });

    // Evento para eliminar el contenedor del texto al salir del nivel
    nivel.addEventListener('mouseleave', () => {
        const hoverText = nivel.querySelector('.hover-text');
        if (hoverText) {
            hoverText.remove();
        }
    });
});
