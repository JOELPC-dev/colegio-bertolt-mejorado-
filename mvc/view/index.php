<?php
include "../controller/NoticiaController.php";
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tabla de Noticias | Bertol Brecht</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.datatables.net/2.0.0/css/dataTables.dataTables.min.css">
    <style>
        :root {
            --primary-color: #3b82f6;
            --primary-hover: #2563eb;
            --danger-color: #ef4444;
            --warning-color: #f59e0b;
            --success-color: #10b981;
            --text-color: #1e293b;
            --light-bg: #f8fafc;
            --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Inter', sans-serif;
        }

        body {
            background-color: #f1f5f9;
            color: var(--text-color);
            padding: 2rem;
        }

        /* Estilo para el botón de regreso */
        .btn-back {
            position: absolute;
            left: 2rem;
            top: 2rem;
            background-color: var(--primary-color);
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            transition: var(--transition);
            box-shadow: var(--card-shadow);
            z-index: 10;
        }

        .btn-back:hover {
            background-color: var(--primary-hover);
            transform: translateY(-2px);
        }

        .table-container {
            max-width: 100%;
            overflow-x: auto;
            background: white;
            padding: 2rem;
            border-radius: 0.75rem;
            box-shadow: var(--card-shadow);
            position: relative;
            margin-top: 20px;
        }

        .table-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            flex-wrap: wrap;
            gap: 1rem;
        }

        .table-header h2 {
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--text-color);
        }

        .table-actions {
            display: flex;
            gap: 0.75rem;
        }

        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0.625rem 1.25rem;
            border-radius: 0.5rem;
            font-weight: 500;
            transition: var(--transition);
            border: none;
            cursor: pointer;
            text-decoration: none;
            font-size: 0.875rem;
        }

        .btn i {
            margin-right: 0.5rem;
            font-size: 0.9rem;
        }

        .btn-primary {
            background-color: var(--primary-color);
            color: white;
        }

        .btn-primary:hover {
            background-color: var(--primary-hover);
        }

        .btn-info {
            background-color: #0ea5e9;
            color: white;
        }

        .btn-info:hover {
            background-color: #0284c7;
        }

        .btn-sm {
            padding: 0.375rem 0.75rem;
            font-size: 0.8125rem;
        }

        .btn-warning {
            background-color: var(--warning-color);
            color: white;
        }

        .btn-warning:hover {
            background-color: #e69008;
        }

        .btn-danger {
            background-color: var(--danger-color);
            color: white;
        }

        .btn-danger:hover {
            background-color: #dc2626;
        }

        /* Estilos para DataTables */
        .dataTables_wrapper {
            margin-top: 1.5rem;
        }

        .dataTables_filter input {
            padding: 0.5rem 0.75rem;
            border: 1px solid #e2e8f0;
            border-radius: 0.5rem;
            margin-left: 0.5rem;
        }

        .dataTables_length select {
            padding: 0.5rem 0.75rem;
            border: 1px solid #e2e8f0;
            border-radius: 0.5rem;
        }

        table.dataTable {
            width: 100% !important;
            border-collapse: collapse;
            margin: 1rem 0;
        }

        table.dataTable thead th {
            background-color: var(--light-bg);
            color: #64748b;
            font-weight: 600;
            padding: 1rem;
            text-align: left;
            border-bottom: 2px solid #e2e8f0;
        }

        table.dataTable tbody td {
            padding: 1rem;
            border-bottom: 1px solid #e2e8f0;
            vertical-align: middle;
        }

        table.dataTable tbody tr:hover {
            background-color: rgba(59, 130, 246, 0.05);
        }

        .badge {
            display: inline-block;
            padding: 0.35rem 0.65rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .bg-success {
            background-color: rgba(16, 185, 129, 0.1);
            color: var(--success-color);
        }

        .text-center {
            text-align: center;
        }

        .action-buttons {
            display: flex;
            gap: 0.5rem;
        }

        @media (max-width: 768px) {
            body {
                padding: 1rem;
            }

            .btn-back {
                left: 1rem;
                top: 1rem;
            }

            .table-container {
                padding: 1rem;
            }

            .table-header {
                flex-direction: column;
                align-items: flex-start;
            }

            .table-actions {
                width: 100%;
                flex-wrap: wrap;
            }

            .btn {
                flex: 1;
                min-width: 120px;
            }
        }
    </style>
</head>

<body>
    <!-- Botón de regreso a admin.php -->
    <a href="../admin.php" class="btn-back" title="Volver al panel de administración">
        <i class="fas fa-arrow-left"></i>
    </a>

    <div class="table-container">
        <div class="table-header">
            <h2><i class="fas fa-newspaper"></i> Lista de Noticias</h2>
            <div class="table-actions">
                <a href="create.php" class="btn btn-primary">
                    <i class="fas fa-plus"></i> Nueva Noticia
                </a>
                <button class="btn btn-info">
                    <i class="fas fa-file-export"></i> Generar Reporte
                </button>
            </div>
        </div>

        <table id="newsTable" class="display">
            <thead>
                <tr>
                    <th>Opciones</th>
                    <th>ID</th>
                    <th>Imagen</th>
                    <th>Título</th>
                    <th>Contenido</th>
                    <th>Fecha Publicación</th>
                    <th>Autor</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
                <?php if (!empty($noticias)) { ?>
                    <?php foreach ($noticias as $noticia) { ?>
                        <tr>
                            <td>
                                <div class="action-buttons">
                                    <a href="edit.php?id=<?php echo $noticia['id_noticia']; ?>" class="btn btn-warning btn-sm">
                                        <i class="fas fa-edit"></i>
                                    </a>
                                    <a href="../controlador/control_noticias.php?id=<?php echo $noticia['id_noticia']; ?>&accion=eliminar"
                                        class="btn btn-danger btn-sm" onclick="return confirm('¿Seguro que deseas eliminar esta noticia?');">
                                        <i class="fas fa-trash-alt"></i>
                                    </a>
                                </div>
                            </td>
                            <td><?php echo $noticia['id_noticia']; ?></td>
                            <td>
                                <img src="../../public/img/noticias/<?php echo $noticia['imagen']; ?>" alt="Imagen" width="100">
                            </td>
                            <td><?php echo htmlspecialchars($noticia['titulo']); ?></td>
                            <td><?php echo htmlspecialchars(substr($noticia['contenido'], 0, 50)) . '...'; ?></td>
                            <td><?php echo date('d/m/Y', strtotime($noticia['fecha_publicacion'])); ?></td>
                            <td><?php echo htmlspecialchars($noticia['id_usuario']); ?></td>
                            <td>
                                <span class="badge bg-success">
                                    <i class="fas fa-check-circle"></i> Activo
                                </span>
                            </td>
                        </tr>
                    <?php } ?>
                <?php } else { ?>
                    <tr>
                        <td colspan="8" class="text-center">No hay noticias registradas en el sistema.</td>
                    </tr>
                <?php } ?>
            </tbody>
        </table>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.datatables.net/2.0.0/js/dataTables.min.js"></script>

    <script>
        $(document).ready(function() {
            $('#newsTable').DataTable({
                responsive: true,
                language: {
                    "decimal": "",
                    "emptyTable": "No hay datos disponibles en la tabla",
                    "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
                    "infoEmpty": "Mostrando 0 a 0 de 0 registros",
                    "infoFiltered": "(filtrado de _MAX_ registros totales)",
                    "infoPostFix": "",
                    "thousands": ",",
                    "lengthMenu": "Mostrar _MENU_ registros",
                    "loadingRecords": "Cargando...",
                    "processing": "Procesando...",
                    "search": "Buscar:",
                    "zeroRecords": "No se encontraron registros coincidentes",
                    "paginate": {
                        "first": "Primero",
                        "last": "Último",
                        "next": "Siguiente",
                        "previous": "Anterior"
                    },
                    "aria": {
                        "sortAscending": ": activar para ordenar columna ascendente",
                        "sortDescending": ": activar para ordenar columna descendente"
                    }
                },
                dom: '<"top"lf>rt<"bottom"ip>',
                initComplete: function() {
                    $('.dataTables_filter input').attr('placeholder', 'Buscar noticias...');
                },
                columnDefs: [{
                        orderable: false,
                        targets: 0
                    },
                    {
                        responsivePriority: 1,
                        targets: 0
                    },
                    {
                        responsivePriority: 2,
                        targets: 2
                    }
                ]
            });
        });
    </script>
</body>
</html>