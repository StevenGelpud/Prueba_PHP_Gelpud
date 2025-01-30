<?php

use Illuminate\Database\Capsule\Manager as Capsule;

$capsule = new Capsule;

// Configura la conexión con la base de datos
$capsule->addConnection([
    'driver' => 'mysql',
    'host' => '127.0.0.1',
    'database' => 'Cruddb_gelpud', 
    'username' => 'jeason',       
    'password' => 'admin',      
    'charset' => 'utf8mb4',
    'collation' => 'utf8mb4_unicode_ci',
]);

$capsule->setAsGlobal();
$capsule->bootEloquent();  // inicializa la conexión
