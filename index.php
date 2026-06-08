<?php
// Homepage - Menu principale
?>
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro Consegna Referti</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <link href="assets/css/style.css" rel="stylesheet">
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <a class="navbar-brand" href="index.php">
                <i class="fas fa-file-medical"></i> Registro Referti
            </a>
        </div>
    </nav>

    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-lg-8">
                <h1 class="text-center mb-5">Gestione Consegna Referti</h1>
                
                <div class="row g-4">
                    <!-- Card: Nuova Consegna -->
                    <div class="col-md-6">
                        <div class="card h-100 shadow-sm hover-card">
                            <div class="card-body text-center">
                                <div class="icon-large mb-3">
                                    <i class="fas fa-plus-circle" style="font-size: 2.5rem; color: #0d6efd;"></i>
                                </div>
                                <h5 class="card-title">Nuova Consegna</h5>
                                <p class="card-text text-muted">Registra una nuova consegna di referti</p>
                                <a href="delivery.php" class="btn btn-primary">Inizia</a>
                            </div>
                        </div>
                    </div>

                    <!-- Card: Visualizza Registro -->
                    <div class="col-md-6">
                        <div class="card h-100 shadow-sm hover-card">
                            <div class="card-body text-center">
                                <div class="icon-large mb-3">
                                    <i class="fas fa-list-check" style="font-size: 2.5rem; color: #198754;"></i>
                                </div>
                                <h5 class="card-title">Registro Consegne</h5>
                                <p class="card-text text-muted">Visualizza tutte le consegne registrate</p>
                                <a href="register.php" class="btn btn-success">Visualizza</a>
                            </div>
                        </div>
                    </div>

                    <!-- Card: Ricerca -->
                    <div class="col-md-6">
                        <div class="card h-100 shadow-sm hover-card">
                            <div class="card-body text-center">
                                <div class="icon-large mb-3">
                                    <i class="fas fa-search" style="font-size: 2.5rem; color: #ffc107;"></i>
                                </div>
                                <h5 class="card-title">Ricerca Rapida</h5>
                                <p class="card-text text-muted">Cerca una consegna specifica</p>
                                <a href="search.php" class="btn btn-warning">Cerca</a>
                            </div>
                        </div>
                    </div>

                    <!-- Card: Info -->
                    <div class="col-md-6">
                        <div class="card h-100 shadow-sm hover-card">
                            <div class="card-body text-center">
                                <div class="icon-large mb-3">
                                    <i class="fas fa-info-circle" style="font-size: 2.5rem; color: #6c757d;"></i>
                                </div>
                                <h5 class="card-title">Informazioni</h5>
                                <p class="card-text text-muted">Guide e aiuto dell'applicazione</p>
                                <a href="info.php" class="btn btn-secondary">Leggi</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <footer class="text-center text-muted py-4 mt-5">
        <small>&copy; 2026 Registro Consegna Referti | XAMPP Local Version</small>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
