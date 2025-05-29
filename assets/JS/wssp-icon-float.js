// Seleccionar elementos del DOM
const whatsappButton = document.getElementById('whatsappButton');
const messageMenu = document.getElementById('messageMenu');
const messageSelector = document.getElementById('messageSelector');
const sendMessage = document.getElementById('sendMessage');

// Configurar el número de WhatsApp
const whatsappNumber = '51956900742'; // Cambia este número

// Mostrar/ocultar el menú al hacer clic en el botón flotante
whatsappButton.addEventListener('click', () => {
    messageMenu.style.display = messageMenu.style.display === 'none' ? 'block' : 'none';
});

// Enviar mensaje seleccionado
sendMessage.addEventListener('click', () => {
    // Obtener el mensaje seleccionado
    const message = encodeURIComponent(messageSelector.value);

    // Detectar si el dispositivo es móvil
    const isMobile = /iPhone|Android|iPad|iPod/i.test(navigator.userAgent);

    // Construir la URL según el dispositivo
    const whatsappURL = isMobile
        ? `https://wa.me/${whatsappNumber}?text=${message}` // Para móviles
        : `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`; // Para escritorio

    // Redirigir a WhatsApp
    window.open(whatsappURL, '_blank'); // Abre en una nueva pestaña

    // Ocultar el menú después de enviar
    messageMenu.style.display = 'none';
});
