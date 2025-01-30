<?php

require __DIR__ . '/vendor/autoload.php';  

use Illuminate\Database\Capsule\Manager as Capsule; 

require __DIR__ . '/config/database.php';  

// Prueba de conexión a la base de datos
try {
    Capsule::connection()->getPdo();
    echo "✅ Conexión a la base de datos establecida correctamente.";
} catch (\Exception $e) {
    die("❌ Error de conexión: " . $e->getMessage());
}
