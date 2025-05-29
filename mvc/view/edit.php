<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Noticia | Bertol Brecht</title>
    <!-- Bootstrap 5.3 -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome 6.5 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <!-- Estilos personalizados -->
    <style>
        :root {
            --primary-color: #3b82f6;
            --primary-hover: #2563eb;
            --success-color: #10b981;
            --light-bg: #f8fafc;
            --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        body {
            background-color: var(--light-bg);
        }

        .card {
            border-radius: 0.75rem;
            box-shadow: var(--card-shadow);
            border: none;
        }

        .card-header {
            border-radius: 0.75rem 0.75rem 0 0 !important;
        }

        .form-label {
            font-weight: 500;
            color: #1e293b;
        }

        .preview-image {
            max-width: 200px;
            max-height: 200px;
            border-radius: 0.5rem;
            margin-top: 1rem;
        }

        .file-upload {
            position: relative;
            overflow: hidden;
            display: inline-block;
        }

        .file-upload-input {
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0;
            width: 100%;
            height: 100%;
            cursor: pointer;
        }

        .current-image {
            border: 2px dashed #dee2e6;
            padding: 5px;
            border-radius: 0.5rem;
        }
    </style>
</head>

<body>
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-lg-8">
                <div class="card">
                    <div class="card-header bg-primary text-white">
                        <div class="d-flex align-items-center">
                            <i class="fas fa-edit me-3 fs-4"></i>
                            <h4 class="mb-0">Editar Noticia</h4>
                        </div>
                    </div>
                    <div class="card-body">
                        <?php
                        require_once __DIR__ . "/../../config/database.php";
                        require_once __DIR__ . "/../model/Noticia.php";

                        $modelo = new ModeloNoticias($conn);

                        // Obtener la noticia a editar
                        $noticia = $modelo->obtenerNoticiaPorId($_GET['id']);

                        if (!$noticia) {
                            header("Location: index.php");
                            exit;
                        }
                        ?>

                        <form action="../controller/NoticiaController.php" method="POST" enctype="multipart/form-data">
                            <input type="hidden" name="id" value="<?php echo $noticia['id_noticia']; ?>">

                            <!-- Título -->
                            <div class="mb-4">
                                <label for="titulo" class="form-label">
                                    <i class="fas fa-heading me-2 text-primary"></i>Título de la Noticia
                                </label>
                                <input type="text" class="form-control form-control-lg" id="titulo" name="titulo"
                                    value="<?php echo htmlspecialchars($noticia['titulo']); ?>"
                                    placeholder="Ingrese un título llamativo" required>
                            </div>

                            <!-- Imagen -->
                            <div class="mb-4">
                                <label class="form-label">
                                    <i class="fas fa-image me-2 text-primary"></i>Imagen Destacada
                                </label>

                                <!-- Mostrar imagen actual -->
                                <?php if (!empty($noticia['imagen'])): ?>
                                    <div class="mb-3">
                                        <p class="mb-2">Imagen actual:</p>
                                        <img src="../../public/img/noticias/<?php echo $noticia['imagen']; ?>"
                                            class="current-image preview-image"
                                            alt="Imagen actual"
                                            id="currentImagePreview">
                                        <div class="form-check mt-2">
                                            <input class="form-check-input" type="checkbox"
                                                id="eliminarImagen" name="eliminarImagen">
                                            <label class="form-check-label" for="eliminarImagen">
                                                Eliminar imagen actual
                                            </label>
                                        </div>
                                    </div>
                                <?php endif; ?>

                                <!-- Campo para nueva imagen -->
                                <div class="file-upload btn btn-outline-primary w-100 py-3">
                                    <i class="fas fa-cloud-upload-alt me-2"></i>Cambiar Imagen
                                    <input type="file" class="file-upload-input" id="imagen" name="imagen"
                                        accept="image/*" onchange="previewFile()">
                                </div>
                                <small class="text-muted d-block mt-2">Formatos aceptados: JPG, PNG, GIF (Máx. 2MB)</small>

                                <!-- Vista previa de nueva imagen -->
                                <img id="imagePreview" class="preview-image img-thumbnail d-none" alt="Vista previa">
                            </div>

                            <!-- Contenido -->
                            <div class="mb-4">
                                <label for="contenido" class="form-label">
                                    <i class="fas fa-align-left me-2 text-primary"></i>Contenido Completo
                                </label>
                                <textarea class="form-control" id="contenido" name="contenido" rows="8"
                                    placeholder="Redacte el contenido de la noticia..."
                                    required><?php echo htmlspecialchars($noticia['contenido']); ?></textarea>
                            </div>

                            <!-- Botones de Acción -->
                            <div class="d-flex justify-content-between mt-4">
                                <a href="index.php" class="btn btn-secondary">
                                    <i class="fas fa-arrow-left me-2"></i>Cancelar
                                </a>
                                <button type="submit" name="editar" class="btn btn-success px-4">
                                    <i class="fas fa-save me-2"></i>Guardar Cambios
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

    <!-- Script para vista previa de imagen -->
    <script>
        function previewFile() {
            const preview = document.getElementById('imagePreview');
            const file = document.querySelector('input[type=file]').files[0];
            const reader = new FileReader();

            reader.onloadend = function() {
                preview.src = reader.result;
                preview.classList.remove('d-none');

                // Ocultar imagen actual si se selecciona una nueva
                const currentPreview = document.getElementById('currentImagePreview');
                if (currentPreview) {
                    currentPreview.classList.add('d-none');
                }
            }

            if (file) {
                reader.readAsDataURL(file);
            } else {
                preview.src = '';
                preview.classList.add('d-none');
            }
        }

        // Manejar el checkbox de eliminar imagen
        document.getElementById('eliminarImagen')?.addEventListener('change', function() {
            const currentPreview = document.getElementById('currentImagePreview');
            if (this.checked) {
                currentPreview?.classList.add('d-none');
            } else {
                currentPreview?.classList.remove('d-none');
            }
        });
    </script>
</body>

</html>