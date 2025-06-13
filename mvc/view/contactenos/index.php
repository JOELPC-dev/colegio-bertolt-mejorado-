<?php
// 1. Conexión a la base de datos
require_once(__DIR__ . '/../../../config/database.php');

// 2. Obtener los mensajes de la base de datos
$mensajes = []; 
try {
    $sql = "SELECT id, nombre, correo, consulta, fecha_envio FROM mensajes ORDER BY fecha_envio ASC";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $mensajes = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    die("Error al obtener las consultas: " . $e->getMessage());
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bandeja de Entrada | Bertol Brecht</title>
    <!-- Librerías Externas -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.datatables.net/2.0.0/css/dataTables.dataTables.min.css">
    
    <style>
        /* CSS GENERAL (Tu código original, está perfecto) */
        :root { --primary-color: #3b82f6; --primary-hover: #2563eb; --danger-color: #ef4444; --warning-color: #f59e0b; --success-color: #10b981; --text-color: #1e293b; --light-bg: #f8fafc; --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', sans-serif; }
        body { background-color: #f1f5f9; color: var(--text-color); padding: 2rem; }
        .table-container { max-width: 100%; overflow-x: auto; background: white; padding: 2rem; border-radius: 0.75rem; box-shadow: var(--card-shadow); }
        .table-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem; }
        .table-header h2 { font-size: 1.5rem; font-weight: 600; color: var(--text-color); }
        .btn { display: inline-flex; align-items: center; justify-content: center; padding: 0.625rem 1.25rem; border-radius: 0.5rem; font-weight: 500; transition: var(--transition); border: none; cursor: pointer; text-decoration: none; font-size: 0.875rem; }
        .btn i { margin-right: 0; } /* Quitado el margen para que los iconos se vean bien solos */
        .btn-info { background-color: #0ea5e9; color: white; }
        .btn-info:hover { background-color: #0284c7; }
        .btn-sm { padding: 0.375rem 0.75rem; font-size: 0.8125rem; }
        .btn-danger { background-color: var(--danger-color); color: white; }
        .btn-danger:hover { background-color: #dc2626; }
        table.dataTable { width: 100% !important; }
        .action-buttons { display: flex; gap: 0.5rem; }

        /* ESTILOS PARA EL MODAL (VENTANA EMERGENTE) */
        .modal {
            display: none; /* Oculto por defecto */
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0,0,0,0.5); /* Fondo oscuro semitransparente */
            padding-top: 60px;
        }

        .modal-content {
            background-color: #fefefe;
            margin: 5% auto;
            padding: 20px;
            border: 1px solid #888;
            width: 80%;
            max-width: 600px;
            border-radius: 0.5rem;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            animation: fadeIn 0.3s;
        }

        @keyframes fadeIn {
            from {transform: scale(0.95); opacity: 0;}
            to {transform: scale(1); opacity: 1;}
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #dee2e6;
            padding-bottom: 1rem;
        }
        
        .modal-header h2 {
            font-size: 1.25rem;
        }

        .modal-body {
            padding-top: 1rem;
            line-height: 1.6;
        }
        
        .modal-body p {
            margin-bottom: 10px;
        }
        
        .modal-body #modal-consulta {
            margin-top: 1rem;
            padding: 15px;
            background-color: #f8f9fa;
            border-radius: 5px;
            min-height: 100px;
            border-left: 4px solid var(--primary-color);
            white-space: pre-wrap; /* Respeta los saltos de línea y espacios del usuario */
        }

        .close-button {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
        }

        .close-button:hover,
        .close-button:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
        }

        /* Nuevos estilos para el botón de regreso */
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
        }

        .btn-back:hover {
            background-color: var(--primary-hover);
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
    <!-- Botón de regreso a admin.php -->
    <a href="../../admin.php" class="btn-back" title="Volver al panel de administración">
        <i class="fas fa-arrow-left"></i>
    </a>

    <div class="table-container">
        <div class="table-header">
            <h2><i class="fas fa-inbox"></i> Bandeja de Entrada de Consultas</h2>
        </div>

        <!-- Resto del código permanece igual -->
        <table id="consultasTable" class="display">
            <thead>
                <tr>
                    <th>Opciones</th>
                    <th>ID</th>
                    <th>Fecha</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Consulta (extracto)</th>
                </tr>
            </thead>
            <tbody>
                <?php if (!empty($mensajes)): ?>
                    <?php foreach ($mensajes as $mensaje): ?>
                        <tr>
                            <td>
                                <div class="action-buttons">
                                    <!-- BOTÓN VER: Añadimos la clase 'view-btn' y los atributos 'data-*' -->
                                    <a href="#" class="btn btn-info btn-sm view-btn" title="Ver Mensaje Completo"
                                       data-nombre="<?php echo htmlspecialchars($mensaje['nombre']); ?>"
                                       data-correo="<?php echo htmlspecialchars($mensaje['correo']); ?>"
                                       data-fecha="<?php echo date('d/m/Y H:i', strtotime($mensaje['fecha_envio'])); ?>"
                                       data-consulta="<?php echo htmlspecialchars($mensaje['consulta']); ?>">
                                        <i class="fas fa-eye"></i>
                                    </a>
                                    
                                    <!-- BOTÓN ELIMINAR: Apunta al controlador que hace la eliminación -->
                                    <a href="../../controller/procesar_consulta.php?id=<?php echo $mensaje['id']; ?>&accion=eliminar"
                                        class="btn btn-danger btn-sm" onclick="return confirm('¿Seguro que deseas eliminar esta consulta?');" title="Eliminar">
                                        <i class="fas fa-trash-alt"></i>
                                    </a>
                                </div>
                            </td>
                            <td><?php echo $mensaje['id']; ?></td>
                            <td><?php echo date('d/m/Y H:i', strtotime($mensaje['fecha_envio'])); ?></td>
                            <td><?php echo htmlspecialchars($mensaje['nombre']); ?></td>
                            <td><?php echo htmlspecialchars($mensaje['correo']); ?></td>
                            <td><?php echo htmlspecialchars(substr($mensaje['consulta'], 0, 70)) . '...'; ?></td>
                        </tr>
                    <?php endforeach; ?>
                <?php else: ?>
                    <tr>
                        <td colspan="6" class="text-center">No hay consultas registradas en el sistema.</td>
                    </tr>
                <?php endif; ?>
            </tbody>
        </table>
    </div>

    <!-- HTML DEL MODAL (VENTANA EMERGENTE) -->
    <div id="viewModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Detalles de la Consulta</h2>
                <span class="close-button">×</span>
            </div>
            <div class="modal-body">
                <p><strong>De:</strong> <span id="modal-nombre"></span></p>
                <p><strong>Correo:</strong> <a id="modal-correo-link" href="#"></a></p>
                <p><strong>Fecha:</strong> <span id="modal-fecha"></span></p>
                <hr>
                <p><strong>Consulta:</strong></p>
                <div id="modal-consulta"></div>
            </div>
        </div>
    </div>

    <!-- Librerías de JavaScript -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.datatables.net/2.0.0/js/dataTables.min.js"></script>
    
    <!-- SCRIPT PARA DATATABLES Y FUNCIONALIDAD DEL MODAL -->
    <script>
        $(document).ready(function() {
            // 1. Inicializar la tabla con DataTables
            $('#consultasTable').DataTable({
                responsive: true,
                language: { /* Tu configuración de idioma está bien, la mantengo */
                    "decimal": "","emptyTable": "No hay datos disponibles en la tabla","info": "Mostrando _START_ a _END_ de _TOTAL_ registros","infoEmpty": "Mostrando 0 a 0 de 0 registros","infoFiltered": "(filtrado de _MAX_ registros totales)","infoPostFix": "","thousands": ",","lengthMenu": "Mostrar _MENU_ registros","loadingRecords": "Cargando...","processing": "Procesando...","search": "Buscar:","zeroRecords": "No se encontraron registros coincidentes","paginate": {"first": "Primero","last": "Último","next": "Siguiente","previous": "Anterior"},"aria": {"sortAscending": ": activar para ordenar columna ascendente","sortDescending": ": activar para ordenar columna descendente"}
                },
                columnDefs: [
                    { orderable: false, targets: 0 } // La columna de opciones no se ordena
                ]
            });

            // 2. Lógica para el Modal de "Ver"
            const modal = $('#viewModal');
            const modalNombre = $('#modal-nombre');
            const modalCorreoLink = $('#modal-correo-link');
            const modalFecha = $('#modal-fecha');
            const modalConsulta = $('#modal-consulta');
            
            // Usamos delegación de eventos en la tabla para que funcione incluso después de ordenar/buscar
            $('#consultasTable tbody').on('click', '.view-btn', function(event) {
                event.preventDefault();

                // Obtenemos los datos desde los atributos 'data-*' del botón presionado
                const nombre = $(this).data('nombre');
                const correo = $(this).data('correo');
                const fecha = $(this).data('fecha');
                const consulta = $(this).data('consulta');
                
                // Rellenamos el modal con los datos
                modalNombre.text(nombre);
                modalCorreoLink.text(correo);
                modalCorreoLink.attr('href', 'mailto:' + correo); // Hacemos el correo clickeable
                modalFecha.text(fecha);
                modalConsulta.text(consulta); // Usamos .text() para seguridad, ya que el CSS se encarga de los saltos de línea

                // Mostramos el modal
                modal.css('display', 'block');
            });

            // Lógica para cerrar el modal
            $('.close-button').on('click', function() {
                modal.css('display', 'none');
            });

            $(window).on('click', function(event) {
                if (event.target == modal[0]) {
                    modal.css('display', 'none');
                }
            });
        });
    </script>
</body>
</html>