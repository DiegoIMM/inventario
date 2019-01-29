// Initialize Firebase
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


        db.collection("Usuarios").doc(user.uid).collection("Proveedores").where("habilitado", "==", true).orderBy("rut")
            .onSnapshot(function (querySnapshot) {
                $("#proveedores").empty();
                $("#cargandotabla").empty();


                var cities = "";
                cities +=
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
                    cities += "<tr class=\"hoverable\" style=\"cursor: pointer\" data-rut=" + rut + ">;" +
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


                console.log("Current cities in CA: ", cities);
                cities += "</tbody>";

                $("#proveedores").append(cities);
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




        db.collection("Usuarios").doc(user.uid).collection("Proveedores").where("habilitado", "==", false).orderBy("rut")
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


        //Se detecta el click en el boton de guardar los NUEVOS Proveedores
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
                // contacto: $("#epContacto").val(),
                // fax: $("#epFax").val(),
                razonsocial: $("#epRazonSocial").val(),
                // giro: $("#epGiro").val(),
                // telefono: $("#telefono").val(),
                correo: $("#epcorreo").val()
                //banco: $("#banco :selected").text(),
                // cuenta: $("#Cuenta").val(),
                // tipoCuenta: $("#tipoCuenta :selected").text(),
                // direccion: $("#Direccion").val(),
                // region: $("#region :selected").text(),
                // provincia: $("#provincia :selected").text(),
                // comuna: $("#comuna :selected").text()
            };
            console.log(prove);
            db.collection("Usuarios").doc(user.uid).collection("Proveedores").doc(prove.rut).set(prove);
            M.toast({html: 'El usuario se ha creado correctamente', classes: 'rounded green'});

            $("#selectDireccion").empty();
            $("#selectdireccioneditar").empty();

        });

        //Se detecta el click en el boton para MODIFICAR los proveedores
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


            db.collection("Usuarios").doc(user.uid).collection("Proveedores").doc(eeprov.rut).set(eeprov)
                .then(function () {

                    $("#selectDireccion").empty();
                    $("#selectdireccioneditar").empty();
                    M.toast({html: 'Los datos se han modificado correctamente', classes: 'rounded green'});
                })
                .catch(function (error) {
                    M.toast({html: 'Error al sobreescribir', classes: 'rounded red'});
                    M.toast({html: 'Descripcion del error' + error, classes: 'rounded red'});
                });
        });


        //Consulta de Proveedores y los pinta en las dos tablas
        //  function crearTabla() {
        //     $("#proveedores").empty();
        //     var prov = " <thead>\n" +
        //         "<tr>" +
        //         "<th>Rut</th>" +
        //         "<th>Nombre</th>" +
        //         "<th>Razon social</th>" +
        //         "<th>Mail</th>" +
        //         "<th>Telefono</th>" +
        //         // "<th>Celular</th>" +
        //         "<th>Comuna</th>" +
        //         "<th>Direccion</th>" +
        //         "</tr>" +
        //         "</thead>" +
        //         "<tbody>" +
        //         // db.collection("Usuarios").doc(user.uid).collection("Proveedores").orderBy("rut")
        //         //     .startAfter("12312").limit(parseInt(limit)).get().then(function (querySnapshot) {
        //
        //
        //         db.collection("Usuarios").doc(user.uid).collection("Proveedores").where("habilitado", "==", true).orderBy("rut")
        //             .get().then(function (querySnapshot) {
        //             $("#cargandotabla").empty();
        //
        //             querySnapshot.forEach(function (doc) {
        //                 // doc.data() is never undefined for query doc snapshots
        //                 var rut = doc.data().rut;
        //                 var nombre = doc.data().nombre;
        //                 var direccion = doc.data().direccion;
        //                 var comuna = doc.data().comuna;
        //                 var correo = doc.data().correo;
        //                 var celular = doc.data().celular;
        //                 var razon = doc.data().razonsocial;
        //                 prov = prov + "<tr class=\"hoverable\" style=\"cursor: pointer\" data-rut=" + rut + ">;" +
        //                     "<td>" + rut + "</td>" +
        //                     "<td>" + nombre + "</td>" +
        //                     "<td>" + razon + "</td>" +
        //                     "<td>" + correo + "</td>" +
        //                     "<td>" + celular + "</td>" +
        //                     "<td>" + comuna + "</td>" +
        //                     "<td>" + direccion + "</td>" +
        //                     // "<td>" +
        //                     // "<a class=\"btn-floating hoverable waves-effect waves-light yellow\"><i class=\"material-icons\">edit</i></a>\n" +
        //                     // "<a class=\"btn-floating hoverable waves-effect waves-light red\"><i class=\"material-icons\">delete</i></a>\n" +
        //                     // "</td>" +
        //                     "</tr>";
        //
        //             });
        //
        //             prov = prov + "</tbody>";
        //
        //             $("#proveedores").append(prov);
        //             $("#proveedores").dataTable().fnDestroy();
        //
        //
        //         })
        //             .then(function () {
        //                 $('#proveedores').DataTable({
        //                     "language": {
        //                         "sProcessing": "Procesando...",
        //                         "sLengthMenu": "Mostrar:_MENU_",
        //                         "sZeroRecords": "No se encontraron resultados",
        //                         "sEmptyTable": "Ningún dato disponible en esta tabla",
        //                         "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
        //                         "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
        //                         "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
        //                         "sInfoPostFix": "",
        //                         "sSearch": "Buscar:",
        //                         "sUrl": "",
        //                         "sInfoThousands": ",",
        //                         "sLoadingRecords": "Cargando...",
        //                         "oPaginate": {
        //                             "sFirst": "Primero",
        //                             "sLast": "Último",
        //                             "sNext": "<i class=\"material-icons\">navigate_next</i>",
        //                             "sPrevious": "<i class=\"material-icons\">navigate_before</i>"
        //                         },
        //                         "oAria": {
        //                             "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
        //                             "sSortDescending": ": Activar para ordenar la columna de manera descendente"
        //                         }
        //                     }
        //                 });
        //                 $("select").val('10');
        //                 $("#proveedores_length").addClass("col s1 l1");
        //                 $("#proveedores_filter").addClass("col s11 l11");
        //                 $("#proveedores_info").addClass("col s6 l6");
        //                 $("#proveedores_paginate").addClass("col l6 right-align flow-text");
        //                 $("#proveedores").append("<br>");
        //                 $('select').formSelect();
        //
        //             })
        //             .catch(function (error) {
        //                 console.error("Error writing document: ", error);
        //             });
        //
        //     $("#proveedoresDeshabilitados").empty();
        //     var provdes = " <thead>\n" +
        //         "<tr>" +
        //         "<th>Rut</th>" +
        //         "<th>Nombre</th>" +
        //         "<th>Razon social</th>" +
        //         "<th>Mail</th>" +
        //         "<th>Telefono</th>" +
        //         // "<th>Celular</th>" +
        //         "<th>Comuna</th>" +
        //         "<th>Direccion</th>" +
        //         "</tr>" +
        //         "</thead>" +
        //         "<tbody>" +
        //         // db.collection("Usuarios").doc(user.uid).collection("Proveedores").orderBy("rut")
        //         //     .startAfter("12312").limit(parseInt(limit)).get().then(function (querySnapshot) {
        //
        //         db.collection("Usuarios").doc(user.uid).collection("Proveedores").where("habilitado", "==", false).orderBy("rut").get().then(function (querySnapshot) {
        //             $("#cargandotabla").empty();
        //
        //             querySnapshot.forEach(function (doc) {
        //                 // doc.data() is never undefined for query doc snapshots
        //                 var rut = doc.data().rut;
        //                 var nombre = doc.data().nombre;
        //                 var direccion = doc.data().direccion;
        //                 var comuna = doc.data().comuna;
        //                 var correo = doc.data().correo;
        //                 var celular = doc.data().celular;
        //                 var razon = doc.data().razonsocial;
        //                 provdes = provdes + "<tr class=\"hoverable\" style=\"cursor: pointer\" data-rut=" + rut + ">;" +
        //                     "<td>" + rut + "</td>" +
        //                     "<td>" + nombre + "</td>" +
        //                     "<td>" + razon + "</td>" +
        //                     "<td>" + correo + "</td>" +
        //                     "<td>" + celular + "</td>" +
        //                     "<td>" + comuna + "</td>" +
        //                     "<td>" + direccion + "</td>" +
        //                     // "<td>" +
        //                     // "<a class=\"btn-floating hoverable waves-effect waves-light yellow\"><i class=\"material-icons\">edit</i></a>\n" +
        //                     // "<a class=\"btn-floating hoverable waves-effect waves-light red\"><i class=\"material-icons\">delete</i></a>\n" +
        //                     // "</td>" +
        //                     "</tr>";
        //
        //             });
        //
        //             provdes = provdes + "</tbody>";
        //
        //             $("#proveedoresDeshabilitados").append(provdes);
        //             $("#proveedoresDeshabilitados").dataTable().fnDestroy();
        //
        //
        //         })
        //             .then(function () {
        //                 $('#proveedoresDeshabilitados').DataTable({
        //                     "language": {
        //                         "sProcessing": "Procesando...",
        //                         "sLengthMenu": "Mostrar:_MENU_",
        //                         "sZeroRecords": "No se encontraron resultados",
        //                         "sEmptyTable": "Ningún dato disponible en esta tabla",
        //                         "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
        //                         "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
        //                         "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
        //                         "sInfoPostFix": "",
        //                         "sSearch": "Buscar:",
        //                         "sUrl": "",
        //                         "sInfoThousands": ",",
        //                         "sLoadingRecords": "Cargando...",
        //                         "oPaginate": {
        //                             "sFirst": "Primero",
        //                             "sLast": "Último",
        //                             "sNext": "<i class=\"material-icons\">navigate_next</i>",
        //                             "sPrevious": "<i class=\"material-icons\">navigate_before</i>"
        //                         },
        //                         "oAria": {
        //                             "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
        //                             "sSortDescending": ": Activar para ordenar la columna de manera descendente"
        //                         }
        //                     }
        //                 });
        //                 $("select").val('10');
        //                 $("#proveedoresDeshabilitados_wrapper").addClass("row");
        //                 $("#proveedoresDeshabilitados_length").addClass("col s1 l1");
        //                 $("#proveedoresDeshabilitados_filter").addClass("col s11 l11");
        //                 $("#proveedoresDeshabilitados_info").addClass("col s6 l6");
        //                 $("#proveedoresDeshabilitados_paginate").addClass("col l6 right-align flow-text");
        //                 $("#proveedoresDeshabilitados").append("<br>");
        //                 $('select').formSelect();
        //
        //             })
        //             .catch(function (error) {
        //                 console.error("Error writing document: ", error);
        //             });
        //
        //
        // }

        //Modal para editar proveedores
        function modalEditar() {
            //Se vacian todos los selectores de regiones existentes en el documento

            //declaro variables para la funcion, estan detectaran y guardaran el rut de la fila en la que estoy haciendo click
            var target, rut;
            target = $(event.target);
            rut = target.parent().data('rut');
            //Hago la consulta pasandole el rut capturado, si se realiza correctamente cargo los datos en la modal
            var docRef = db.collection("Usuarios").doc(user.uid).collection("Proveedores").doc(rut.toString());
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
                        // $("#eeContacto").val(doc.data().contacto);
                        // $("#eeFax").val(doc.data().fax);
                        $("#eeGiro").val(doc.data().giro);
                        $("#eeRazonSocial").val(doc.data().razonsocial);
                        // $("#eetelefono").val(doc.data().telefono);
                        $("#eecorreo").val(doc.data().correo);


                        M.Modal.getInstance($('#modalEditar')).open();
                        M.updateTextFields();


                    } else {
                        // doc.data() will be undefined in this case
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






