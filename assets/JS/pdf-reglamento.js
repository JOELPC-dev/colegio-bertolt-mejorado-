// URL del PDF
const pdfUrl = 'DOC/Políticas educativas regionales.pdf';

// Configuración de PDF.js
pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {
    // Se carga la primera página
    pdf.getPage(1).then(page => {
        const scale = 1.5; // Ajusta el tamaño del PDF si es necesario
        const viewport = page.getViewport({ scale });

        // Configura el canvas
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        document.getElementById('pdf-viewer').appendChild(canvas);

        // Renderiza la página en el canvas
        const renderContext = {
            canvasContext: context,
            viewport
        };
        page.render(renderContext);
    });
}).catch(error => {
    console.error('Error al cargar el PDF:', error);
});