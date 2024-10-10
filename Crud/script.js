$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "http://localhost:4567/getMateriasPrimas", 
        dataType: "json",
        success: function (result) {
            
            // Construir la tabla
            var tablaMateriasPrimas = '<table class="table table-rosa"><tr><th>ID</th><th>NOMBRE</th><th>STOCK</th><th>UNIDAD</th><th>VTO</th><th>ACCIONES</th></tr>';
            result.forEach(function (element) {
                tablaMateriasPrimas +=
                    "<tr><td>" +
                    element.id_MateriaPrima +
                    "</td><td>" +
                    element.nombre_MP +
                    "</td><td>" +
                    element.stock + 
                    "</td><td>" + 
                    element.unidades +
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
        var stock = row.find("td:eq(2)").text();
        var unidad = row.find("td:eq(3)").text();
        var vto = row.find("td:eq(4)").text();
        
        // Prellenar el modal con la información del elemento
        $("#materiaPrima-id").val(id);
        $("#materiaPrima-nombre").val(nombre);
        $("#materiaPrima-stock").val(stock);
        $("#materiaPrima-unidad").val(unidad);
        

    // Convertir la fecha a formato YYYY-MM-DD
    var months = {
        "ene": "January",
        "feb": "February",
        "mar": "March",
        "abr": "April",
        "may": "May",
        "jun": "June",
        "jul": "July",
        "ago": "August",
        "sep": "September",
        "oct": "October",
        "nov": "November",
        "dic": "December"
    };
    // Convertir el texto a un formato que el objeto Date pueda reconocer
    var vtoParts = vto.split(" ");
    var month = months[vtoParts[0].toLowerCase()]; // Convertir a mes completo
    var day = vtoParts[1];
    var year = vtoParts[2];
    var formattedDate = new Date(`${month} ${day}, ${year}`).toISOString().split("T")[0];
    $("#materiaPrima-vto").val(formattedDate); // Asignar la fecha formateada
        

        // Abrir el modal
        var modal = new bootstrap.Modal(document.getElementById('modal'));
        modal.show();
    });


    $(document).on("click", "#save-button", function () {
    var id = $("#materiaPrima-id").val();
    var nombre = $("#materiaPrima-nombre").val();
    var stock = $("#materiaPrima-stock").val();
    var unidad = $("#materiaPrima-unidad").val();
    var vto = $("#materiaPrima-vto").val();
    
    var url = "http://localhost:4567/updateMateriaPrima/" + id + "?nombre_MP=" + encodeURIComponent(nombre) 
                                                            + "&unidades=" + encodeURIComponent(unidad) + 
                                                            "&stock=" + encodeURIComponent(stock) + 
                                                            "&fecha_vto_prox=" + 
                                                            encodeURIComponent('2025-01-02');

    // Realizar la solicitud AJAX
    $.ajax({
        type: "PUT", // Asegúrate de que sea un PUT
        url: url,
        dataType: "json",
        success: function (response) {
            console.log(response);
            alert("Materia prima actualizada exitosamente.");
            // Aquí puedes actualizar la tabla o realizar otras acciones
        },
        error: function (xhr, status, error) {
            console.error("Error en la solicitud:", status, error);
            alert("Error al actualizar la materia prima.");
        }
    });

    }); 
});
