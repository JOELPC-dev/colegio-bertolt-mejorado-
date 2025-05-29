document.addEventListener("DOMContentLoaded", () => {
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const linksContainer = document.querySelector(".links-container");

    // Función para alternar el menú desplegable
    hamburgerMenu.addEventListener("click", (event) => {
        linksContainer.classList.toggle("active");
        event.stopPropagation(); // Evita que el evento se propague al documento
    });

    // Cerrar el menú al hacer clic fuera de él
    document.addEventListener("click", (event) => {
        if (!linksContainer.contains(event.target) && !hamburgerMenu.contains(event.target)) {
            linksContainer.classList.remove("active");
        }
    });

    // Cerrar el menú al hacer scroll
    window.addEventListener("scroll", () => {
        linksContainer.classList.remove("active");
    });
});
// 
//
// Obtenemos todos los elementos de menú que tienen un submenú
const menuItems = document.querySelectorAll('.menu-item');

document.addEventListener("DOMContentLoaded", () => {
    const menuItems = document.querySelectorAll(".menu-item");

    menuItems.forEach((item) => {
        item.addEventListener("mouseenter", function () {
            // Evitar el cambio de color si pertenece a logo o logo2
            if (this.closest(".logo") || this.closest(".logo2")) return;

            // Cambiar el color de fondo para otros ítems
            this.style.backgroundColor = "#FFD53D";

        });

        item.addEventListener("mouseleave", function () {
            // Evitar restaurar el color para logo o logo2
            if (this.closest(".logo") || this.closest(".logo2")) return;

            // Restaurar el color original
            this.style.backgroundColor = "";
        });
    });
});
// Añadimos el evento de mouseenter para cada item de menú
menuItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        // Mostrar el submenú correspondiente
        const subMenu = this.querySelector('.submenu');
        if (subMenu) {
            subMenu.style.display = 'block';  // Mostrar el submenú
        }
    });

    //Evento de mouseleave para ocultar el submenú y restaurar el color
    item.addEventListener('mouseleave', function() {
        // Restaurar el color de fondo del ítem de menú principal
        this.style.backgroundColor = '';  // Restaura el color original (puedes personalizarlo)

        // Ocultar el submenú correspondiente
        const subMenu = this.querySelector('.submenu');
        if (subMenu) {
            subMenu.style.display = 'none'; 
        }
    });
});

// Cerrar submenú si se hace clic fuera del menú
document.addEventListener('click', function(event) {
    if (!event.target.closest('.menu-item') && !event.target.closest('.hamburger-menu')) {
        menuItems.forEach(item => {
            const subMenu = item.querySelector('.submenu');
            if (subMenu) {
                subMenu.style.display = 'none';  // Asegurarse de ocultar los submenús
            }
        });
    }
});