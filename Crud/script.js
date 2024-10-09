$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "http://localhost:4567/getMateriasPrimas", // Cambia esto a tu endpoint correcto
        dataType: "json",
        success: function (result) {
            console.log(result); // Para verificar la respuesta
            
            // Construir la tabla
            var tablaMateriasPrimas = '<table class="table table-rosa"><tr><th>ID</th><th>NOMBRE</th><th>STOCK</th><th>VTO</th><th>ACCIONES</th></tr>';
            result.forEach(function (element) {
                tablaMateriasPrimas +=
                    "<tr><td>" +
                    element.id_MateriaPrima +
                    "</td><td>" +
                    element.nombre_MP +
                    "</td><td>" +
                    element.stock + " " + element.unidades +
                    "</td><td>" +
                    element.fecha_vto_prox +
                    "</td><td>" +
                    '<button class="btn btn-warning btn-sm edit-button" data-id="' + element.id_MateriaPrima + '">Editar</button> ' +
                    '<button class="btn btn-danger btn-sm delete-button" data-id="' + element.id_MateriaPrima + '">Eliminar</button>' +
                    "</td></tr>";
            });
            tablaMateriasPrimas += "</table>";
            $("#container").append(tablaMateriasPrimas);
        },
        error: function (xhr, status, error) {
            console.error("Error en la solicitud:", status, error);
            $("#container").html("<h3>Error al cargar las materias primas</h3>");
        }
    });

    $(document).on("click", ".edit-button", function () {
        var id = $(this).data("id");
        // Aquí puedes buscar el elemento por ID para prellenar los campos del modal
        var row = $(this).closest("tr");
        var nombre = row.find("td:eq(1)").text(); // Suponiendo que el nombre está en la segunda celda
        var stock = row.find("td:eq(3)").text(); // Suponiendo que el stock está en la cuarta celda
        
        // Prellenar el modal con la información del elemento
        $("#materiaPrima-id").val(id);
        $("#materiaPrima-nombre").val(nombre);
        $("#materiaPrima-stock").val(stock);
        
        // Abrir el modal
        var modal = new bootstrap.Modal(document.getElementById('modal'));
        modal.show();
    });
});
