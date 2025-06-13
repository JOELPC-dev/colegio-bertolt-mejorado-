<?php
require_once(__DIR__ . '/../../config/database.php');

// Manejo de eliminación (mantener igual)
if (isset($_GET['id']) && isset($_GET['accion']) && $_GET['accion'] == 'eliminar') {
    $id = intval($_GET['id']);
    
    try {
        $sql = "DELETE FROM mensajes WHERE id = ?";
        $stmt = $conn->prepare($sql);
        
        $stmt->execute([$id]);

        header("Location: ../view/contactenos/index.php");
        exit();

    } catch (PDOException $e) {
        die("Error al eliminar la consulta: " . $e->getMessage());
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (empty($_POST['nombre']) || empty($_POST['email']) || empty($_POST['consulta'])) {
        die("Todos los campos son requeridos");
    }

    $nombre = trim(htmlspecialchars($_POST['nombre']));
    $email = trim(htmlspecialchars($_POST['email']));
    $consulta = trim(htmlspecialchars($_POST['consulta']));

    try {
        $sql = "INSERT INTO mensajes (nombre, correo, consulta) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$nombre, $email, $consulta]);
        
        $destinatario = "quelionpc@gmail.com"; 
        $asunto_email = "Nueva consulta desde el formulario de contacto";
        
        $cuerpo_email = "Has recibido una nueva consulta:\n\n";
        $cuerpo_email .= "Nombre: " . $nombre . "\n";
        $cuerpo_email .= "Correo: " . $email . "\n";
        $cuerpo_email .= "Consulta:\n" . $consulta . "\n";

        $headers = "From: " . $email . "\r\n";
        $headers .= "Reply-To: " . $email . "\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion();

        $mailSent = mail($destinatario, $asunto_email, $cuerpo_email, $headers);
        
        if (!$mailSent) {
            error_log("Error al enviar correo a $destinatario");
        }
        
        header("Location: ../../pages/gracias.html");
        exit(); 

    } catch (PDOException $e) {
        die("Error al guardar el mensaje en la base de datos: " . $e->getMessage());
    }
} else {
    header("Location: ../../pages/contactenos.html");
    exit();
}