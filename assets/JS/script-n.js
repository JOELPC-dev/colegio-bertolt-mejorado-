document.addEventListener("DOMContentLoaded", function () {
    const noticiasPorPagina = 6;
    let paginaActual = 1;
    const noticias = document.querySelectorAll('.noticia');
    const totalPaginas = Math.ceil(noticias.length / noticiasPorPagina);

    function mostrarPagina(pagina) {
        noticias.forEach((noticia, index) => {
            noticia.style.display = 'none';
            if (index >= (pagina - 1) * noticiasPorPagina && index < pagina * noticiasPorPagina) {
                noticia.style.display = 'block';
            }
        });
        actualizarPaginacion();
    }

    function actualizarPaginacion() {
        const paginacion = document.querySelector('.paginacion');
        paginacion.innerHTML = '';

        const prevLink = document.createElement('a');
        prevLink.href = "#";
        prevLink.className = 'prev';
        prevLink.textContent = '« Previous';
        prevLink.addEventListener('click', function (e) {
            e.preventDefault();
            if (paginaActual > 1) {
                paginaActual--;
                mostrarPagina(paginaActual);
            }
        });
        paginacion.appendChild(prevLink);

        // Mostrar máximo 3 páginas con lógica para los puntos sucesivos
        if (totalPaginas <= 4) {
            for (let i = 1; i <= totalPaginas; i++) {
                agregarPaginaLink(i);
            }
        } else {
            if (paginaActual > 1) agregarPaginaLink(1);
            if (paginaActual > 2) agregarPuntosSuspensivos();

            const startPage = Math.max(2, paginaActual - 1);
            const endPage = Math.min(totalPaginas - 1, paginaActual + 1);
            for (let i = startPage; i <= endPage; i++) {
                agregarPaginaLink(i);
            }

            if (paginaActual < totalPaginas - 1) agregarPuntosSuspensivos();
            if (paginaActual < totalPaginas) agregarPaginaLink(totalPaginas);
        }

        const nextLink = document.createElement('a');
        nextLink.href = "#";
        nextLink.className = 'next';
        nextLink.textContent = 'Next »';
        nextLink.addEventListener('click', function (e) {
            e.preventDefault();
            if (paginaActual < totalPaginas) {
                paginaActual++;
                mostrarPagina(paginaActual);
            }
        });
        paginacion.appendChild(nextLink);
    }

    function agregarPaginaLink(numeroPagina) {
        const pageLink = document.createElement('a');
        pageLink.href = "#";
        pageLink.textContent = numeroPagina;
        if (numeroPagina === paginaActual) {
            pageLink.className = 'active';
        }
        pageLink.addEventListener('click', function (e) {
            e.preventDefault();
            paginaActual = numeroPagina;
            mostrarPagina(paginaActual);
        });
        document.querySelector('.paginacion').appendChild(pageLink);
    }

    function agregarPuntosSuspensivos() {
        const puntosSuspensivos = document.createElement('span');
        puntosSuspensivos.textContent = '...';
        document.querySelector('.paginacion').appendChild(puntosSuspensivos);
    }

    mostrarPagina(paginaActual);
});
