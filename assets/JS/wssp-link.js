// Seleccionar el botón flotante
const linkWhatsappButton = document.getElementById('linkWhatsappButton');

// Añadir evento de clic
linkWhatsappButton.addEventListener('click', () => {
  // Configurar el número de WhatsApp y mensaje predefinido
  const whatsappNumber = '51956900742'; // Cambia este número
  const message = encodeURIComponent('¡Hola! Me interesa su institución, quiero más información.' ); // Personaliza el mensaje

  // Detectar si el dispositivo es móvil
  const isMobile = /iPhone|Android|iPad|iPod/i.test(navigator.userAgent);
  
  // Construir la URL según el dispositivo
  const whatsappURL = isMobile
    ? `https://wa.me/${whatsappNumber}?text=${message}` // Para móviles
    : `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`; // Para escritorio

  // Redirigir a WhatsApp
  window.open(whatsappURL, '_blank'); // Abre en una nueva pestaña
});
