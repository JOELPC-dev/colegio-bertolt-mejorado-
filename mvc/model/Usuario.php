<?php
require_once __DIR__ . '/../../config/Database.php';

class Usuario {
    private $conn;
    private $table = 'usuario';
    
    public function __construct() {
        global $conn;
        $this->conn = $conn;
    }
    
    public function getAll() {
        $stmt = $this->conn->prepare("SELECT id, nombre FROM {$this->table} ORDER BY nombre ASC");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_OBJ);
    }
}
?>