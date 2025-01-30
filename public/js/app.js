$(document).ready(function() {
    loadPersonas(); 

    // Cargar personas con AJAX
    function loadPersonas() {
        $.ajax({
            url: '/router.php?action=list',
            method: 'GET',
            success: function(data) {
                console.log("Datos recibidos:", data);
                const personas = JSON.parse(data);
                let rows = '';
                personas.forEach(persona => {
                    rows += `
                        <tr data-id="${persona.IdPersona}">
                            <td>${persona.IdPersona}</td>
                            <td>${persona.Nombres}</td>
                            <td>${persona.Apellidos}</td>
                            <td>${persona.Identificacion}</td>
                            <td>${persona.Genero === 'M' ? 'Masculino' : persona.Genero === 'F' ? 'Femenino' : ''}</td>
                            <td>${persona.FechaNacimiento}</td>
                            <td>${persona.Activo ? 'Sí' : 'No'}</td>
                            <td>
                                <button class="btn btn-warning btn-edit">Editar</button>
                                <button class="btn btn-danger btn-delete">Eliminar</button>
                            </td>
                        </tr>
                    `;
                });
                $('#personaTable tbody').html(rows);
            },
            error: function(xhr, status, error) {
                console.error('Error al cargar personas:', error);
            }
        });
    }

    // Editar persona con AJAX
    $('#personaTable').on('click', '.btn-edit', function() {
        const row = $(this).closest('tr');
        const id = row.data('id');  // Obtener el ID de la fila

        $.ajax({
            url: `/router.php?action=edit&id=${id}`,
            method: 'GET',
            success: function(data) {
                const persona = JSON.parse(data);

                // Llenamos el modal
                $('#personaId').val(persona.IdPersona);
                $('#nombre').val(persona.Nombres);
                $('#apellidos').val(persona.Apellidos);
                $('#identificacion').val(persona.Identificacion);
                $('#genero').val(persona.Genero);
                $('#fechaNacimiento').val(persona.FechaNacimiento);
                $('#contraseña').val(persona.Contraseña);
                $('#activo').val(persona.Activo);

                
                $('#personaModalLabel').text('Editar Persona');
                $('#personaModal').modal('show');
            },
            error: function(xhr, status, error) {
                console.error("Error al obtener los datos de la persona:", error);
            }
        });
    });

    $('#btnAgregarPersona').on('click', function() {
        $('#personaForm')[0].reset();
        $('#personaId').val('');
        $('#personaModalLabel').text('Agregar Persona');
        $('#personaModal').modal('show');
    });

    // Validación del formulario
    function validarFormulario() {
        let valido = true;

        // Validar nombres y apellidos (solo letras)
        const nombre = $('#nombre').val();
        const apellidos = $('#apellidos').val();
        const identificacion = $('#identificacion').val();
        const fechaNacimiento = $('#fechaNacimiento').val();

        
        const letraRegex = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/;
        const numeroRegex = /^[0-9]+$/;

        if (!letraRegex.test(nombre)) {
            alert("El campo 'Nombre' solo debe contener letras.");
            valido = false;
        }

        if (!letraRegex.test(apellidos)) {
            alert("El campo 'Apellidos' solo debe contener letras.");
            valido = false;
        }

        if (!numeroRegex.test(identificacion)) {
            alert("El campo 'Identificacióm' solo debe contener números.");
            valido = false;
        }



        // Validar fecha
        const fechaNacimientoDate = new Date(fechaNacimiento);
        const edad = new Date().getFullYear() - fechaNacimientoDate.getFullYear();
        if (edad < 1) {
            alert("La persona debe ser mayor de 1 año.");
            valido = false;
        }

        return valido;
    }

    // Enviar los datos modificados al servidor para actualizar la persona
    $('#personaForm').on('submit', function(event) {
        event.preventDefault();
        if (!validarFormulario()) {
            return; 
        }

        const formData = {
            IdPersona: $('#personaId').val(),
            Nombres: $('#nombre').val(),
            Apellidos: $('#apellidos').val(),
            Identificacion: $('#identificacion').val(),
            Genero: $('#genero').val(),
            FechaNacimiento: $('#fechaNacimiento').val(),
            Contraseña: $('#contraseña').val(),
            Activo: $('#activo').val()
        };

        if (formData.IdPersona) {
            $.ajax({
                url: `/router.php?action=edit&id=${formData.IdPersona}`,
                method: 'POST',
                data: formData,
                success: function(response) {
                    console.log("Persona actualizada:", response);
                    const result = JSON.parse(response);

                    if (result.error) {
                        alert("Error: " + result.error);
                    } else {
                        $('#personaModal').modal('hide');
                        alert("Persona actualizada exitosamente.");
                        loadPersonas();
                    }
                },
                error: function(xhr, status, error) {
                    console.error("Error al actualizar la persona:", error);
                }
            });
        } else {
            
            $.ajax({
                url: '/router.php?action=create',
                method: 'POST',
                data: formData,
                success: function(response) {
                    console.log("Persona registrada:", response);
                    const result = JSON.parse(response);

                    if (result.error) {
                        alert("Error: " + result.error);
                    } else {
                        $('#personaModal').modal('hide');
                        alert("Persona registrada exitosamente.");
                        loadPersonas();
                    }
                },
                error: function(xhr, status, error) {
                    console.error("Error al registrar la persona:", error);
                }
            });
        }
    });

    // Eliminar persona con AJAX
    $('#personaTable').on('click', '.btn-delete', function() {
        const row = $(this).closest('tr');
        const id = row.data('id');

        if (confirm('¿Estás seguro de eliminar esta persona?')) {
            $.ajax({
                url: `/index.php?action=delete&id=${id}`,
                method: 'DELETE',
                success: function() {
                    row.remove();
                    alert('Persona eliminada');
                },
                error: function(xhr, status, error) {
                    console.error('Error:', error);
                    alert('Error al eliminar la persona');
                }
            });
        }
    });
});
