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



firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        crearTabla();

        $("#btnGuardar").click(function () {

            var habilitado = true;
            if (!$("#habilitado").prop('checked')) {
                habilitado = false;
            }


            var cliente = {
                rut: $("#epRut").val(),
                habilitado: habilitado,
                nombre: $("#nombre").val(),
                celular: $("#epCelular").val(),
                facebook: $("#epFacebook").val(),
                fechaNacimiento: $("#epFechaNacimiento").val(),
                giro: $("#epGiro").val(),
                mail: $("#epMail").val(),
                tipoCliente: $("#epTipoCliente").val(),
                twitter: $("#epTwitter").val(),
                banco: $("#banco :selected").text(),
                cuenta: $("#cuenta").val(),
                tipoCuenta: $("#tipocuenta :selected").text(),
                direccion: $("#direccion").val(),
                region: $("#region :selected").text(),
                provincia: $("#provincia :selected").text(),
                comuna: $("#comuna :selected").text()
            };


            db.collection("Usuarios").doc(user.uid).collection("Clientes").doc(cliente.rut).set(cliente).then(function () {
                M.toast({html: 'El usuario se ha creado correctamente', classes: 'rounded green'});

                crearTabla();
            }).catch(function (error) {
                console.error("Error writing document: ", error);
            });

            // crearTabla();
            // $("#selectDireccion").empty();
            // $("#selectdireccioneditar").empty();

        });

        $("#eebotonguardar").click(function () {

            var eehabilitado = true;
            if (!$("#eehabilitado").prop('checked')) {
                eehabilitado = false;
            }


            var eecliente = {
                rut: $("#eeRut").val(),
                habilitado: eehabilitado,
                nombre: $("#eeNombre").val(),
                celular: $("#eeCelular").val(),
                facebook: $("#eeFacebook").val(),
                fechaNacimiento: $("#eeFechaNacimiento").val(),
                giro: $("#eeGiro").val(),
                mail: $("#eeMail").val(),
                tipoCliente: $("#eeTipoCliente").val(),
                twitter: $("#eeTwitter").val(),
                banco:$("#banco :selected").text(),
                cuenta: $("#cuenta").val(),
                tipoCuenta: $("#tipoCuenta :selected").text(),
                direccion: $("#direccion").val(),
                region: $("#region :selected").text(),
                provincia: $("#provincia :selected").text(),
                comuna: $("#comuna :selected").text()
            };


            db.collection("Usuarios").doc(user.uid).collection("Clientes").doc(eecliente.rut).set(eecliente).then(function () {
                M.toast({html: 'El usuario se ha creado correctamente', classes: 'rounded green'});

                crearTabla();
            }).catch(function (error) {
                console.error("Error writing document: ", error);
            });

            // crearTabla();
            // $("#selectDireccion").empty();
            // $("#selectdireccioneditar").empty();

        });


        function crearTabla() {
            $("#clientes").empty();

            var cltes = "<thead>\n" +
                "<tr>" +
                "<th>Rut</th>" +
                "<th>Nombre</th>" +
                "<th>Direccion</th>" +
                "<th>Comuna</th>" +
                "<th>Mail</th>" +
                "<th>Celular</th>" +
                "</tr>" +
                "</thead>" +
                "<tbody>";

            db.collection("Usuarios").doc(user.uid).collection("Clientes").where("habilitado", "==", true).orderBy("rut").get().then(function (querySnapshot) {
                $("#cargandotabla").empty();

                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    var rut = doc.data().rut;
                    var nombre = doc.data().nombre;
                    var direccion = doc.data().direccion;
                    var comuna = doc.data().comuna;
                    var mail = doc.data().mail;
                    var celular = doc.data().celular;
                    cltes = cltes + "<tr class=\"hoverable\" style=\"cursor: pointer\" data-rut=" + rut + ">" +
                        "<td>" + rut + "</td>" +
                        "<td>" + nombre + "</td>" +
                        "<td>" + direccion + "</td>" +
                        "<td>" + comuna + "</td>" +
                        "<td>" + mail + "</td>" +
                        "<td>" + celular + "</td>" +
                        // "<td> <a onclick=\"editarCliente()\" class=\"modal-action modal-close waves-effect waves-green btn-flat btn-floating waves-effect waves-light yellow\"><i class=\"material-icons\">edit</i></a> </td>" +
                        // "<td> <a class=\"btn-floating waves-effect waves-light red\"><i class=\"material-icons\">delete</i></a> </td>" +
                        "</tr>";

                });

                cltes = cltes + "</tbody>";

                $("#clientes").append(cltes);
                $("#clientes").dataTable().fnDestroy();


            }).then(function () {
                $('#clientes').DataTable({
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
                $("#clientes_length").addClass("col s1 l1");
                $("#clientes_filter").addClass("col s11 l11");
                $("#clientes_info").addClass("col s6 l6");
                $("#clientes_paginate").addClass("col l6 right-align flow-text");
                $("#clientes").append("<br>");
                $('select').formSelect();

            })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });
        }

        //Fin crear Tabla
        $('#clientes').on('click', 'tr td', function (evt) {
            modalEditar();
        });

        function modalEditar() {
            //Se vacian todos los selectores de regiones existentes en el documento
            $("#selectDireccion").empty();
            $("#selectdireccioneditar").empty();

            //Se cargan los select de regiones solamente en el modal donde se modificara el proveedor
            modalmodificar();
            //declaro variables para la funcion, estan detectaran y guardaran el rut de la fila en la que estoy haciendo click
            var target, rut;
            target = $(event.target);
            rut = target.parent().data('rut');

            //Hago la consulta pasandole el rut capturado, si se realiza correctamente cargo los datos en la modal
            var docRef = db.collection("Usuarios").doc(user.uid).collection("Clientes").doc(rut.toString());
            docRef.get().then(function (doc) {
                    if (doc.exists) {


                        if (doc.data().habilitado == false) {
                            $("#eehabilitado").prop('checked', false);
                        } else {
                            $("#eehabilitado").prop('checked', true);

                        }

                        $("#eeRut").val(doc.data().rut);
                        $("#eeNombre").val(doc.data().nombre);
                        $("#eeCelular").val(doc.data().celular);
                        $("#eeFacebook").val(doc.data().facebook);
                        $("#eeFechaNacimiento").val(doc.data().fechaNacimiento);
                        $("#eeGiro").val(doc.data().giro);
                        $("#eeMail").val(doc.data().mail);
                        $("#eeTipoCliente").val(doc.data().tipoCliente);
                        $("#eeTwitter").val(doc.data().twitter);
                        $("#banco").val(doc.data().banco);
                        $("#cuenta").val(doc.data().cuenta);
                        $("#tipoCuenta").val(doc.data().tipoCuenta);
                        $("#direccion").val(doc.data().direccion);


                        M.Modal.getInstance($('#modalEditarCliente')).open();
                        M.updateTextFields();


                    } else {
                        // doc.data() will be undefined in this case
                        console.log("error");
                    }
                }
            ).catch(function (error) {
                console.log("Error getting document:", error);
            });


        }


        $("#crearCliente").click(function () {
            $("#selectDireccion").empty();
            $("#selectdireccioneditar").empty();
            modalagregar();
        })


    } else {
        //redireccionar a login
        console.log("no existe usuario");
    }
});
function modalagregar() {

    var html = "";
    db.collection("Bancos").get().then(function (querySnapshot) {
        html = html +
            "<div class=\"input-field col s12 l6\">" +
            "<i class=\"material-icons prefix\">local_convenience_store</i>" +
            "<select class=\" \" onchange=\"cargaCuenta(this)\" id=\"banco\">" +
            "<option value=\"0\" disabled selected>Selecciona una Banco</option>";
        querySnapshot.forEach(function (doc) {
            html = html + "<option value=" + doc.id.trim() + ">" + doc.id + "</option>";
        });
        html = html + "</select>" +
            "<label>Bancos</label>" +
            "</div>" +
            "<div class=\"input-field col s12 l6\">" +
            "<i class=\"material-icons prefix\">list</i>" +
            "<select id=\"tipoCuenta\">" +
            "<option value=\"0\" disabled selected>Selecciona un tipo de cuenta</option>" +
            "</select>" +
            "<label>Tipo Cuenta</label>" +
            "</div>" +
            "<div class=\"input-field col s6\">" +
            "<i class=\"material-icons prefix\">credit_card</i>" +
            "<input id=\"cuenta\" type=\"text\" class=\"validate\">" +
            "<label for=\"cuenta\">Nro - Cuenta</label>" +
            "</div>"

    });

    db.collection("Regiones").get().then(function (querySnapshot) {
        html = html +
            "<div class=\"input-field col s12 l6\">" +
            "<i class=\"material-icons prefix\">terrain</i>" +
            "<select class=\" \" onchange=\"cargaProvincias(this)\" id=\"region\">" +
            "<option value=\"0\" disabled selected>Selecciona una Region</option>";
        querySnapshot.forEach(function (doc) {
            html = html + " <option value=" + doc.id.trim() + ">" + doc.id + "</option>";
        });
        html = html + "</select>" +
            "<label>Regiones</label>" +
            "</div>" +
            "<div class=\"input-field col s12 l6\">" +
            "<i class=\"material-icons prefix\">satellite</i>" +
            "<select onchange=\"cargaComunas(this)\" id=\"provincia\">" +
            "<option value=\"0\" disabled selected>Selecciona una Provincia</option>" +
            "</select>" +
            "<label>Provincias</label>" +
            "</div>" +
            "<div class=\"input-field col s12 l6\">" +
            "<i class=\"material-icons prefix\">map</i>" +
            "<select id='comuna'>" +
            "<option value=\"0\" disabled selected>Selecciona una comuna</option>" +
            "</select>" +
            "<label>Comunas</label>" +
            "</div>" +
            "<div class=\"input-field col s6\">" +
            "<i class=\"material-icons prefix\">my_location</i>" +
            "<input id=\"direccion\" type=\"text\" class=\"validate\">" +
            "<label for=\"direccion\">Direccion</label>" +
            "</div>";
        $("#selectDireccion").empty();
        $("#selectdireccioneditar").empty();
        $('#selectDireccion').append(html);
        $('select').formSelect();
        //document.write(html);
    });

}

function modalmodificar() {
    var html = "";
    db.collection("Bancos").get().then(function (querySnapshot) {
        html = html +
            "<div class=\"input-field col s12 l6\">" +
            "<i class=\"material-icons prefix\">local_convenience_store</i>" +
            "<select class=\" \" onchange=\"cargaCuenta(this)\" id=\"banco\">" +
            "<option value=\"0\" disabled selected>Selecciona una Banco</option>";
        querySnapshot.forEach(function (doc) {
            html = html + " <option value=" + doc.id.trim() + ">" + doc.id + "</option>";
        });
        html = html + "</select>" +
            "<label>Bancos</label>" +
            "</div>" +
            "<div class=\"input-field col s12 l6\">" +
            "<i class=\"material-icons prefix\">list</i>" +
            "<select id=\"tipoCuenta\">" +
            "<option value=\"0\" disabled selected>Selecciona un tipo de cuenta</option>" +
            "</select>" +
            "<label>Tipo Cuenta</label>" +
            "</div>" +
            "<div class=\"input-field col s6\">" +
            "<i class=\"material-icons prefix\">credit_card</i>" +
            "<input id=\"cuenta\" type=\"text\" class=\"validate\">" +
            "<label for=\"cuenta\">Nro - Cuenta</label>" +
            "</div>"

    });

    db.collection("Regiones").get().then(function (querySnapshot) {
        html = html +
            "<div class=\"input-field col s12 l6\">" +
            "<i class=\"material-icons prefix\">terrain</i>" +
            "<select class=\" \" onchange=\"cargaProvincias(this)\" id=\"region\">" +
            "<option value=\"0\" disabled selected>Selecciona una Region</option>";
        querySnapshot.forEach(function (doc) {
            html = html + " <option value=" + doc.id.trim() + ">" + doc.id + "</option>";
        });
        html = html + "</select>" +
            "<label>Regiones</label>" +
            "</div>" +
            "<div class=\"input-field col s12 l6\">" +
            "<i class=\"material-icons prefix\">satellite</i>" +
            "<select onchange=\"cargaComunas(this)\" id=\"provincia\">" +
            "<option value=\"0\" disabled selected>Selecciona una Provincia</option>" +
            "</select>" +
            "<label>Provincias</label>" +
            "</div>" +
            "<div class=\"input-field col s12 l6\">" +
            "<i class=\"material-icons prefix\">map</i>" +
            "<select id='comuna'>" +
            "<option value=\"0\" disabled selected>Selecciona una comuna</option>" +
            "</select>" +
            "<label>Comunas</label>" +
            "</div>" +
            "<div class=\"input-field col s6\">" +
            "<i class=\"material-icons prefix\">my_location</i>" +
            "<input id=\"direccion\" type=\"text\" class=\"validate\">" +
            "<label for=\"direccion\">Direccion</label>" +
            "</div>";
        $("#selectDireccion").empty();
        $("#selectdireccioneditar").empty();
        $('#selectdireccioneditar').append(html);
        $('select').formSelect();

        //document.write(html);
    });

}

function cargaComunas(provinciaSelect) {
    $('#comuna').find('option:not(:first)').remove();
    $('#comuna').val("0");
    var provincia = $("#provincia :selected").text();
    var region = $("#region :selected").text();
    var html = '';
    db.collection("Regiones").doc(region).collection("Provincias").doc(provincia).collection("Comunas").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            html = html + " <option value=\"1\">" + doc.id + "</option>";
        });
        $("#comuna").append(html);
        $('select').formSelect();

    });
}

function cargaProvincias(regionSelect) {
    $('#provincia').find('option:not(:first)').remove();
    $("#provincia").val("0");
    $('#comuna').find('option:not(:first)').remove();
    $('#comuna').val("0");
    var region = $("#region").find(":selected").text();
    var html = '';
    db.collection("Regiones").doc(region).collection("Provincias").get().then(function (querySnapshot) {

        querySnapshot.forEach(function (doc) {
            html = html + "<option value=" + doc.id + ">" + doc.id + "</option>";
        });
        $("#provincia").append(html);
        $('select').formSelect();

    });
}

function cargaCuenta(bancoselect) {
    $('#tipoCuenta').find('option:not(:first)').remove();
    $("#tipoCuenta").val("0");

    var banco = $("#banco").find(":selected").text();
    var html = '';
    db.collection("Bancos").doc(banco).collection("Cuentas").get().then(function (querySnapshot) {

        querySnapshot.forEach(function (doc) {
            html = html + "<option value=" + doc.id + ">" + doc.id + "</option>";
        });
        $("#tipoCuenta").append(html);
        $('select').formSelect();

    });
}
