window.addEventListener('DOMContentLoaded', () => {
    const modalAd = document.getElementById('modal-ad');
    const closeAdButton = document.getElementById('close-ad');

    // Verifica que los elementos necesarios existan
    if (modalAd && closeAdButton) {
        closeAdButton.addEventListener('click', () => {
            modalAd.style.display = 'none'; // Oculta el modal
            document.body.style.overflow = 'auto'; // Permite desplazarse por la página
        });
    } else {
        console.error("No se encontraron los elementos necesarios en el DOM.");
    }
});
