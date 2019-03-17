// Key Firebase HEYHEYEHASHDASO
var config = {
    apiKey: "AIzaSyCXpdq1RwfMJlEe39etBlcRYAQxvLki88E",
    authDomain: "inv2-66cfb.firebaseapp.com",
    databaseURL: "https://inv2-66cfb.firebaseio.com",
    projectId: "inv2-66cfb",
    storageBucket: "inv2-66cfb.appspot.com",
    messagingSenderId: "288920973734"
};
firebase.initializeApp(config);
var db = firebase.firestore();


//Se detecta si hay un usuario autenticado y que pasara en este caso
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

        //funcc Obtenemos todos los proveedores activos en este momento y los pintamos en la tabla
        db.collection("Empresas").doc(user.uid).collection("Proveedores").where("habilitado", "==", true).orderBy("rut")
            .onSnapshot(function (querySnapshot) {
                $("#proveedores").empty();
                $("#cargandotabla").empty();


                var proveedores = "";
                proveedores +=
                    " <thead>\n" +
                    "<tr>" +
                    "<th>Rut</th>" +
                    "<th>Nombre</th>" +
                    "<th>Razon social</th>" +
                    "<th>Mail</th>" +
                    "<th>Telefono</th>" +
                    // "<th>Celular</th>" +
                    // "<th>Comuna</th>" +
                    // "<th>Direccion</th>" +
                    "</tr>" +
                    "</thead>" +
                    "<tbody>";


                querySnapshot.forEach(function (doc) {
                    console.log(doc.data().rut);
                    var rut = doc.data().rut;
                    var nombre = doc.data().nombre;

                    var correo = doc.data().correo;
                    var celular = doc.data().celular;
                    var razon = doc.data().razonsocial;
                    proveedores += "<tr class=\"hoverable\" style=\"cursor: pointer\" data-rut=" + rut + ">;" +
                        "<td>" + rut + "</td>" +
                        "<td>" + nombre + "</td>" +
                        "<td>" + razon + "</td>" +
                        "<td>" + correo + "</td>" +
                        "<td>" + celular + "</td>" +

                        // "<td>" +
                        // "<a class=\"btn-floating hoverable waves-effect waves-light yellow\"><i class=\"material-icons\">edit</i></a>\n" +
                        // "<a class=\"btn-floating hoverable waves-effect waves-light red\"><i class=\"material-icons\">delete</i></a>\n" +
                        // "</td>" +
                        "</tr>";
                });


                proveedores += "</tbody>";

                $("#proveedores").append(proveedores);
                $("#proveedores").dataTable().fnDestroy();

                $('#proveedores').DataTable({
                    "language": {
                        "sProcessing": "Procesando...",
                        "sLengthMenu": "Mostrar:_MENU_",
                        "sZeroRecords": "No se encontraron resultados",
                        "sEmptyTable": "Ningún dato disponible en esta tabla",
                        "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                        "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                        "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                        "sInfoPostFix": "",
                        "sSearch": "Buscar:",
                        "sUrl": "",
                        "sInfoThousands": ",",
                        "sLoadingRecords": "Cargando...",
                        "oPaginate": {
                            "sFirst": "Primero",
                            "sLast": "Último",
                            "sNext": "<i class=\"material-icons\">navigate_next</i>",
                            "sPrevious": "<i class=\"material-icons\">navigate_before</i>"
                        },
                        "oAria": {
                            "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                            "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                        }
                    }
                });
                $("select").val('10');
                $("#proveedores_length").addClass("col s1 l1");
                $("#proveedores_filter").addClass("col s11 l11");
                $("#proveedores_info").addClass("col s6 l6");
                $("#proveedores_paginate").addClass("col l6 right-align flow-text");
                $("#proveedores").append("<br>");
                $('select').formSelect();

            });

        //funcc Lo mismo pero con los deshabilitados
        db.collection("Empresas").doc(user.uid).collection("Proveedores").where("habilitado", "==", false).orderBy("rut")
            .onSnapshot(function (querySnapshot) {
                $("#proveedoresDeshabilitados").empty();
                $("#cargandotabla").empty();


                var proveedoresDeshabilitads = "";
                proveedoresDeshabilitads +=
                    " <thead>\n" +
                    "<tr>" +
                    "<th>Rut</th>" +
                    "<th>Nombre</th>" +
                    "<th>Razon social</th>" +
                    "<th>Mail</th>" +
                    "<th>Telefono</th>" +
                    // "<th>Celular</th>" +
                    // "<th>Comuna</th>" +
                    // "<th>Direccion</th>" +
                    "</tr>" +
                    "</thead>" +
                    "<tbody>";


                querySnapshot.forEach(function (doc) {
                    console.log(doc.data().rut);
                    var rut = doc.data().rut;
                    var nombre = doc.data().nombre;

                    var correo = doc.data().correo;
                    var celular = doc.data().celular;
                    var razon = doc.data().razonsocial;
                    proveedoresDeshabilitads += "<tr class=\"hoverable\" style=\"cursor: pointer\" data-rut=" + rut + ">;" +
                        "<td>" + rut + "</td>" +
                        "<td>" + nombre + "</td>" +
                        "<td>" + razon + "</td>" +
                        "<td>" + correo + "</td>" +
                        "<td>" + celular + "</td>" +

                        // "<td>" +
                        // "<a class=\"btn-floating hoverable waves-effect waves-light yellow\"><i class=\"material-icons\">edit</i></a>\n" +
                        // "<a class=\"btn-floating hoverable waves-effect waves-light red\"><i class=\"material-icons\">delete</i></a>\n" +
                        // "</td>" +
                        "</tr>";
                });


                console.log("Current cities in CA: ", proveedoresDeshabilitads);
                proveedoresDeshabilitads += "</tbody>";

                $("#proveedoresDeshabilitados").append(proveedoresDeshabilitads);
                $("#proveedoresDeshabilitados").dataTable().fnDestroy();

                $('#proveedoresDeshabilitados').DataTable({
                    "language": {
                        "sProcessing": "Procesando...",
                        "sLengthMenu": "Mostrar:_MENU_",
                        "sZeroRecords": "No se encontraron resultados",
                        "sEmptyTable": "Ningún dato disponible en esta tabla",
                        "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                        "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                        "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                        "sInfoPostFix": "",
                        "sSearch": "Buscar:",
                        "sUrl": "",
                        "sInfoThousands": ",",
                        "sLoadingRecords": "Cargando...",
                        "oPaginate": {
                            "sFirst": "Primero",
                            "sLast": "Último",
                            "sNext": "<i class=\"material-icons\">navigate_next</i>",
                            "sPrevious": "<i class=\"material-icons\">navigate_before</i>"
                        },
                        "oAria": {
                            "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                            "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                        }
                    }
                });
                $("select").val('10');
                $("#proveedoresDeshabilitados_length").addClass("col s1 l1");
                $("#proveedoresDeshabilitados_filter").addClass("col s11 l11");
                $("#proveedoresDeshabilitados_info").addClass("col s6 l6");
                $("#proveedoresDeshabilitados_paginate").addClass("col l6 right-align flow-text");
                $("#proveedoresDeshabilitados").append("<br>");
                $('select').formSelect();

            });


        //funcc Se detecta el click en el boton de guardar los NUEVOS Proveedores
        $("#botonguardar").click(function () {

            var habilitado = true;
            if (!$("#habilitado").prop('checked')) {
                habilitado = false;
            }


            var prove = {
                rut: $("#epRut").val(),
                habilitado: habilitado,
                nombre: $("#name").val(),
                celular: $("#epCelular").val(),
                razonsocial: $("#epRazonSocial").val(),
                correo: $("#epcorreo").val()
            };
            console.log(prove);

            //todo Validar formulario antes de guardarlo

           // alert(validar());
            db.collection("Empresas").doc(user.uid).collection("Proveedores").doc(prove.rut).set(prove);
            M.toast({html: 'El Proveedor se ha creado correctamente', classes: 'rounded green'});

        });


        //Funcc Se detecta el click en el boton para MODIFICAR los proveedores
        $("#eebotonguardar").click(function () {


            var eehabilitado = true;
            if (!$("#eehabilitado").prop('checked')) {
                eehabilitado = false;
            }
            var eeprov = {
                rut: $("#eeRut").val(),
                habilitado: eehabilitado,
                nombre: $("#eename").val(),
                celular: $("#eeCelular").val(),
                razonsocial: $("#eeRazonSocial").val(),
                correo: $("#eecorreo").val()

            };
//todo Validar este formulario antes de guardarlo
            db.collection("Empresas").doc(user.uid).collection("Proveedores").doc(eeprov.rut).set(eeprov)
                .then(function () {


                    M.toast({html: 'Los datos se han modificado correctamente', classes: 'rounded green'});
                })
                .catch(function (error) {
                    M.toast({html: 'Error al sobreescribir', classes: 'rounded red'});
                    M.toast({html: 'Descripcion del error' + error, classes: 'rounded red'});
                });
        });


        //Modal para editar proveedores
        function modalEditar() {

            //declaro variables para la funcion, estan detectaran y guardaran el rut de la fila en la que estoy haciendo click
            var target, rut;
            target = $(event.target);
            rut = target.parent().data('rut');
            //Hago la consulta pasandole el rut capturado, si se realiza correctamente cargo los datos en la modal
            var docRef = db.collection("Empresas").doc(user.uid).collection("Proveedores").doc(rut.toString());
            docRef.get().then(function (doc) {
                    if (doc.exists) {


                        if (doc.data().habilitado === false) {
                            $("#eehabilitado").prop('checked', false);
                        } else {
                            $("#eehabilitado").prop('checked', true);

                        }

                        $("#eeRut").val(doc.data().rut);
                        $("#eename").val(doc.data().nombre);
                        $("#eeCelular").val(doc.data().celular);
                        $("#eeGiro").val(doc.data().giro);
                        $("#eeRazonSocial").val(doc.data().razonsocial);
                        $("#eecorreo").val(doc.data().correo);


                        M.Modal.getInstance($('#modalEditar')).open();
                        M.updateTextFields();


                    } else {
                        alert("error al ecnotrar el rut seleccionado");
                        console.log("error");
                    }
                }
            ).catch(function (error) {
                console.log("Error getting document:", error);
            });


        }

        //Detectar cual es el rut de la celda donde se esta haciendo click
        $('#proveedores').on('click', 'tr td', function (evt) {
            modalEditar();
        });

        $('#proveedoresDeshabilitados').on('click', 'tr td', function (evt) {
            modalEditar();
        });


    }
    else {
        alert("No se detecto ningun usuario, cierra sesion e inicia nuevamente")
    }
});


function validar() {

    if ($("#epRut").val() == 1234) {
        $("#epRut").addClass("invalid");
        return false
    }
    if ($("#epRazonSocial").val().length < 3) {
        $("#epRazonSocial").addClass("invalid");
        return false

    }
    return true


}




