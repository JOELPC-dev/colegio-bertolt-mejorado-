<?php
require_once __DIR__ . "/../../config/database.php"; 

class ModeloNoticias {
    private $conn;

    public function __construct($conexion) {
        $this->conn = $conexion;
    }

    public function obtenerNoticias() {
        $sql = "SELECT * FROM noticias ORDER BY fecha_publicacion ASC";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function obtenerNoticiaPorId($id) {
        $sql = "SELECT * FROM noticias WHERE id_noticia = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function crearNoticia($titulo, $contenido, $imagen, $id_usuario) {
        $sql = "INSERT INTO noticias (titulo, contenido, imagen, id_usuario) VALUES (?, ?, ?, ?)";
        $stmt = $this->conn->prepare($sql);
        return $stmt->execute([$titulo, $contenido, $imagen, $id_usuario]);
    }

    public function editarNoticia($id, $titulo, $contenido, $imagen = null){
        if ($imagen !== null) {
            $sql = "UPDATE noticias SET titulo = ?, contenido = ?, imagen = ? WHERE id_noticia = ?";
            $stmt = $this->conn->prepare($sql);
            return $stmt->execute([$titulo, $contenido, $imagen, $id]);
        } else {
            $sql = "UPDATE noticias SET titulo = ?, contenido = ? WHERE id_noticia = ?";
            $stmt = $this->conn->prepare($sql);
            return $stmt->execute([$titulo, $contenido, $id]);
        }
    }

    public function eliminarNoticia($id) {
        $sql = "DELETE FROM noticias WHERE id_noticia = ?";
        $stmt = $this->conn->prepare($sql);
        return $stmt->execute([$id]);
    }
}
?>