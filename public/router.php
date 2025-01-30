<?php

use Jeiso\PruebaGelpud\Controllers\PersonaController;

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../config/database.php';

$controller = new PersonaController();

$action = $_GET['action'] ?? 'list';

switch ($action) {
    case 'create':
        $controller->create();
        break;
    case 'list':
        $controller->list();
        break;
    case 'edit':
        if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id'])) {
            $id = $_GET['id'];  
            $controller->update($id); 
        } elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['id'])) {
            $id = $_GET['id'];  
            $controller->update($id);  
        } else {
            echo "ID no proporcionado";
        }
        break;
    case 'delete':
            if (isset($_GET['id'])) {  
                $id = $_GET['id'];  
                $controller->delete($id); 
            } else {
                echo "ID no proporcionado para eliminar";
            }
            break;
    default:
        echo "default";
        break;
}

