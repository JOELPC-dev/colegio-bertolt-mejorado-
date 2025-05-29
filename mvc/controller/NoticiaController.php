<?php
require_once __DIR__ . "/../model/Noticia.php";
require_once __DIR__ . "/../../config/database.php";

$modelo = new ModeloNoticias($conn);
$noticias = $modelo->obtenerNoticias();

if ($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET["accion"]) && $_GET["accion"] === "listar") {
    $noticias = $modelo->obtenerNoticias();
    include "../view/index.php";
}

if ($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET["accion"]) && $_GET["accion"] === "ver") {
    $noticia = $modelo->obtenerNoticiaPorId($_GET["id"]);
    include "../view/admin.php"; 
}

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["crear"])) {
    $imagenNombre = '';
    if (isset($_FILES["imagen"]) && $_FILES["imagen"]["error"] === UPLOAD_ERR_OK) {
        $directorioImagenes = __DIR__ . '/../../public/img/noticias/';
        if (!file_exists($directorioImagenes)) {
            mkdir($directorioImagenes, 0777, true);
        }
        
        $extension = pathinfo($_FILES["imagen"]["name"], PATHINFO_EXTENSION);
        $imagenNombre = uniqid() . '.' . $extension;
        $rutaImagen = $directorioImagenes . $imagenNombre;
        
        if (!move_uploaded_file($_FILES["imagen"]["tmp_name"], $rutaImagen)) {
            $imagenNombre = '';
        }
    }
    
    $modelo->crearNoticia($_POST["titulo"], $_POST["contenido"], $imagenNombre, $_POST["id_usuario"]);
    header("Location: ../view/index.php");
    exit;
}

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["editar"])) {
    $id = $_POST["id"];
    $titulo = $_POST["titulo"];
    $contenido = $_POST["contenido"];
    
    $noticiaActual = $modelo->obtenerNoticiaPorId($id);
    $imagenNombre = $noticiaActual['imagen'];
    
    $eliminarImagen = isset($_POST["eliminarImagen"]) && $_POST["eliminarImagen"] == 'on';
    
    if ($eliminarImagen && !empty($imagenNombre)) {
        $rutaImagen = __DIR__ . '/../../public/img/noticias/' . $imagenNombre;
        if (file_exists($rutaImagen)) {
            unlink($rutaImagen);
        }
        $imagenNombre = ''; 
    }
    
    if (isset($_FILES["imagen"]) && $_FILES["imagen"]["error"] === UPLOAD_ERR_OK) {
        if (!empty($imagenNombre)) {
            $rutaImagenAnterior = __DIR__ . '/../../public/img/noticias/' . $imagenNombre;
            if (file_exists($rutaImagenAnterior)) {
                unlink($rutaImagenAnterior);
            }
        }
        
        $directorioImagenes = __DIR__ . '/../../public/img/noticias/';
        if (!file_exists($directorioImagenes)) {
            mkdir($directorioImagenes, 0777, true);
        }
        
        $extension = pathinfo($_FILES["imagen"]["name"], PATHINFO_EXTENSION);
        $imagenNombre = uniqid() . '.' . $extension;
        $rutaImagen = $directorioImagenes . $imagenNombre;
        
        if (!move_uploaded_file($_FILES["imagen"]["tmp_name"], $rutaImagen)) {
            $_SESSION['error'] = "Error al subir la imagen";
            header("Location: ../view/edit.php?id=" . $id);
            exit;
        }
    }
    
    if ($modelo->editarNoticia($id, $titulo, $contenido, $imagenNombre)) {
        $_SESSION['exito'] = "Noticia actualizada correctamente";
        header("Location: ../view/index.php");
    } else {
        $_SESSION['error'] = "Error al actualizar la noticia";
        header("Location: ../view/edit.php?id=" . $id);
    }
    exit;
}

if ($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET["accion"]) && $_GET["accion"] === "eliminar") {
    $modelo->eliminarNoticia($_GET["id"]);
    header("Location: ../view/index.php");
    exit;
}
?>