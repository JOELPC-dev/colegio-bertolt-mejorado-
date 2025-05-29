<?php
session_start(); 
require '../config/database.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user = $_POST['user'];
    $password = $_POST['password'];

    try {
        $sql = "SELECT id_usuario, user, password FROM usuario WHERE user = :user";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':user', $user);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($password === $row['password']) {
                $_SESSION['id_usuario'] = $row['id_usuario'];
                $_SESSION['user'] = $row['user'];
                
                echo '<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>';
                echo '<script>
                    document.addEventListener("DOMContentLoaded", function() {
                        Swal.fire({
                            title: "Éxito",
                            text: "Inicio de sesión exitoso",
                            icon: "success",
                            timer: 3000,
                            showConfirmButton: false
                        }).then(() => {
                            window.location.href = "admin.php";
                        });
                    });
                </script>';
                exit();
            } else {
                $error = "Usuario o contraseña incorrectos.";
            }
        } else {
            $error = "Usuario o contraseña incorrectos.";
        }
    } catch (PDOException $e) {
        die("Error en la consulta: " . $e->getMessage());
    }

    $conn = null;
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
    <link rel="stylesheet" href="assets/css/login.css">
</head>
<body>
    <div class="login-container animate__animated animate__fadeIn">
        <div class="logo">
            <i class="fas fa-lock"></i>
        </div>
        <h1>Iniciar Sesión</h1>
        <form action="login.php" method="POST">
            <div class="input-group">
                <i class="fas fa-user"></i>
                <input type="text" name="user" placeholder="Usuario" required>
            </div>
            <div class="input-group">
                <i class="fas fa-key"></i>
                <input type="password" name="password" placeholder="Contraseña" required>
            </div>
            <button type="submit">
                <i class="fas fa-sign-in-alt"></i> Iniciar Sesión
            </button>
        </form>
        <?php
        if (isset($error)) {
            echo '<script>
                document.addEventListener("DOMContentLoaded", function() {
                    Swal.fire({
                        title: "Error",
                        text: "'.addslashes($error).'",
                        icon: "error",
                        timer: 3000,
                        showConfirmButton: false
                    });
                });
            </script>';
        }
        ?>
        <p class="footer-text">© 2025 Bertolt Brecht Sistema de Acceso. Todos los derechos reservados.</p>
    </div>
</body>
</html>