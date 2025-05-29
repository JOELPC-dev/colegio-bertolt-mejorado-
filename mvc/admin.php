<?php 
session_start();
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bertol Brecht - Admin Dashboard</title>
    <!-- Font Awesome 6.5 (2025) -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <!-- Google Fonts - Inter -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="stylesheet" href="assets/css/admin.css">
</head>
<body>

    <!-- Sidebar Moderno -->
    <div class="sidebar">
        <div class="sidebar-brand">
            <i class="fas fa-newspaper fa-lg"></i>
            <h2>Bertol Brecht</h2>
        </div>
        <ul class="sidebar-menu">
            <li>
                <a href="admin.php">
                    <i class="fas fa-chart-line"></i>
                    <span>Dashboard</span>
                </a>
            </li>
            <li>
                <a href="view/index.php">
                    <i class="fas fa-newspaper"></i>
                    <span>Noticias</span>
                </a>
            </li>
            <li>
                <a href="estadisticas.php">
                    <i class="fas fa-chart-pie"></i>
                    <span>Estadísticas</span>
                </a>
            </li>
            <li>
                <a href="configuracion.php">
                    <i class="fas fa-cog"></i>
                    <span>Configuración</span>
                </a>
            </li>
            <li>
                <a href="logout.php">
                    <i class="fas fa-sign-out-alt"></i>
                    <span>Cerrar sesión</span>
                </a>
            </li>
        </ul>
    </div>

    <!-- Contenido Principal -->
    <div class="main-content">
        <div class="header">
            <h1>Dashboard de Noticias</h1>
            <div class="user-profile">
                <img src="https://ui-avatars.com/api/?name=<?php echo urlencode($_SESSION['user'] ?? 'Admin'); ?>&background=3b82f6&color=fff" alt="Usuario">
                <span><?php echo $_SESSION['user'] ?? 'Admin'; ?></span>
            </div>
        </div>

        <!-- Estadísticas -->
        <div class="stats">
            <div class="stat-card">
                <div class="stat-card-header">
                    <h3>Total Noticias</h3>
                    <div class="stat-card-icon primary">
                        <i class="fas fa-newspaper"></i>
                    </div>
                </div>
                <p>1,589</p>
            </div>
            <div class="stat-card">
                <div class="stat-card-header">
                    <h3>Publicadas Hoy</h3>
                    <div class="stat-card-icon success">
                        <i class="fas fa-calendar-day"></i>
                    </div>
                </div>
                <p>234</p>
            </div>
            <div class="stat-card">
                <div class="stat-card-header">
                    <h3>Noticias Pendientes</h3>
                    <div class="stat-card-icon warning">
                        <i class="fas fa-clock"></i>
                    </div>
                </div>
                <p>57</p>
            </div>
            <div class="stat-card">
                <div class="stat-card-header">
                    <h3>Usuarios Activos</h3>
                    <div class="stat-card-icon danger">
                        <i class="fas fa-users"></i>
                    </div>
                </div>
                <p>120</p>
            </div>
        </div>

        <!-- Gráficos -->
        <div class="charts">
            <div class="chart-container">
                <h3>Noticias Publicadas Últimos 7 Días</h3>
                <canvas id="newsChart"></canvas>
            </div>
            <div class="chart-container">
                <h3>Fuentes de Noticias</h3>
                <canvas id="sourcesChart"></canvas>
            </div>
        </div>
    </div>

    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    
    <script>
        // Gráfico de noticias
        const ctx1 = document.getElementById('newsChart').getContext('2d');
        new Chart(ctx1, {
            type: 'line',
            data: {
                labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
                datasets: [{
                    label: 'Noticias Publicadas',
                    data: [50, 75, 150, 80, 120, 180, 200],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.05)',
                    borderWidth: 2,
                    tension: 0.3,
                    fill: true
                }]
            },
            options: { 
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Gráfico de fuentes
        const ctx2 = document.getElementById('sourcesChart').getContext('2d');
        new Chart(ctx2, {
            type: 'doughnut',
            data: {
                labels: ['Agencias', 'Blogs', 'Redes Sociales', 'Otros'],
                datasets: [{
                    label: 'Fuentes',
                    data: [40, 25, 20, 15],
                    backgroundColor: [
                        '#3b82f6',
                        '#10b981',
                        '#f59e0b',
                        '#ef4444'
                    ],
                    borderWidth: 0
                }]
            },
            options: { 
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right',
                    }
                }
            }
        });
    </script>

</body>
</html>