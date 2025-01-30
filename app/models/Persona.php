<?php

namespace Jeiso\PruebaGelpud\Models;

use Illuminate\Database\Eloquent\Model;

class Persona extends Model
{
    protected $table = 'persona';  // Tabla asociada
    protected $primaryKey = 'IdPersona'; 
    public $timestamps = false;  // Desactivamos los timestamps (created_at, updated_at)
    protected $fillable = ['Nombres', 'Apellidos', 'Identificacion', 'Genero', 'FechaNacimiento', 'Contraseña', 'Activo'];  // Campos que se pueden asignar masivamente
    

}


