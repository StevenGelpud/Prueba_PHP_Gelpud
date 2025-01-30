<?php

namespace Jeiso\PruebaGelpud\Controllers;

use Jeiso\PruebaGelpud\Models\Persona;

class PersonaController
{
    public function create()
    {
        // Verificacion si existe una persona con la misma identificación
        if (isset($_POST['Identificacion'])) {
            $identificacion = $_POST['Identificacion'];
            $personaExistente = Persona::where('Identificacion', $identificacion)->first();

            if ($personaExistente) {
                echo json_encode(['error' => 'Ya existe una persona con esa identificación.']);
                return;
            }
        }
        $persona = Persona::create([
            'Nombres' => $_POST['Nombres'],
            'Apellidos' => $_POST['Apellidos'],
            'Identificacion' => $_POST['Identificacion'],
            'Genero' => $_POST['Genero'],
            'FechaNacimiento' => $_POST['FechaNacimiento'],
            'Contraseña' => $_POST['Contraseña'],
            'Activo' => $_POST['Activo']
        ]);

        echo json_encode($persona);
    }


    public function list()
    {
        $personas = Persona::all();
        echo json_encode($personas);
   
    }
    
    public function update($id)
    {
        $persona = Persona::find($id);
        if ($persona) {
            if ($_SERVER['REQUEST_METHOD'] === 'GET') {
                echo json_encode($persona);
            } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
                if (isset($_POST['Identificacion'])) {
                    $identificacion = $_POST['Identificacion'];

                  $personaExistente = Persona::where('Identificacion', $identificacion)
                                                ->where('IdPersona', '!=', $id)  
                                                ->first();

                    if ($personaExistente) {
                        echo json_encode(['error' => 'Ya existe una persona con esa identificación.']);
                        return;  
                    }
                }
                // Actualizacion
                $persona->update([
                    'Nombres' => $_POST['Nombres'] ?? null,
                    'Apellidos' => $_POST['Apellidos'] ?? null,
                    'Identificacion' => $_POST['Identificacion'] ?? null,
                    'Genero' => $_POST['Genero'] ?? null,
                    'FechaNacimiento' => $_POST['FechaNacimiento'] ?? null,
                    'Contraseña' => $_POST['Contraseña'] ?? null,
                    'Activo' => $_POST['Activo'] ?? null,
                ]);

                echo json_encode($persona);
            }
        } else {
            echo json_encode(['error' => 'Persona no encontrada']);
        }
    }



public function delete($id)
{
    $persona = Persona::find($id);
    if ($persona) {
        $persona->delete();
        echo json_encode(['success' => 'Persona eliminada exitosamente']);
    } else {
        echo json_encode(['error' => 'Persona no encontrada']);
    }
}

}
