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

var rutProveedor;

function test(a) {
    console.log(a);
    rutProveedor = a.value;
    $("#productos").empty();
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {


        //funcc Al cargar la pagina se mostraran las compras existentes
        db.collection("Empresas").doc(user.uid).collection("Compras").orderBy("fecha")
            .onSnapshot(function (querySnapshot) {
                $("#compras").empty();
                $("#cargandotabla").empty();


                var compras = "";
                compras +=
                    " <thead>\n" +
                    "<tr>" +
                    "<th></th>" +
                    "<th>Fecha</th>" +
                    "<th>Proveedor</th>" +
                    "<th>Total</th>" +
                    "<th>Productos</th>" +
                    // "<th>Celular</th>" +
                    // "<th>Comuna</th>" +
                    // "<th>Direccion</th>" +
                    "</tr>" +
                    "</thead>" +
                    "<tbody>";


                querySnapshot.forEach(function (doc) {
                    var fecha = doc.data().fecha;
                    var proveedor = doc.data().proveedor;
                    var total = doc.data().total;
                    var prod = doc.data().productos;
                    compras += "<tr class=\"hoverable\" style=\"cursor: pointer\" data-id=" + doc.id + ">;" +
                        "<td></td>" +
                        "<td>" + fecha + "</td>" +
                        "<td>" + proveedor + "</td>" +
                        "<td>" + total + "</td>" +
                        "<td>" + prod + "</td>" +

                        // "<td>" +
                        // "<a class=\"btn-floating hoverable waves-effect waves-light yellow\"><i class=\"material-icons\">edit</i></a>\n" +
                        // "<a class=\"btn-floating hoverable waves-effect waves-light red\"><i class=\"material-icons\">delete</i></a>\n" +
                        // "</td>" +
                        "</tr>";
                });


                console.log("Current cities in CA: ", compras);
                compras += "</tbody>";

                $("#compras").append(compras);
                $("#compras").dataTable().fnDestroy();

                $('#compras').DataTable({
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
                $("#compras_length").addClass("col s1 l1");
                $("#compras_filter").addClass("col s11 l11");
                $("#compras_info").addClass("col s6 l6");
                $("#compras_paginate").addClass("col l6 right-align flow-text");
                $("#compras").append("<br>");
                $('select').formSelect();

            });


//funcc al cargar la pagina relleno los datos de mi empresa en la "factura"
        db.collection("Empresas").doc(user.uid).get().then(function (doc) {
            if (doc.exists) {
                $("#miRut").text(doc.data().rut);
                $("#miNombre").text(doc.data().nombre);
                $("#miDireccion").text(doc.data().direccion);
                $("#miTelefono").text(doc.data().celular);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });

//funcc Se carga el select con los proveedores activos
        db.collection("Empresas").doc(user.uid).collection("Proveedores").where("habilitado", "==", true).orderBy("rut")
            .onSnapshot(function (querySnapshot) {


                var productos = "";

                querySnapshot.forEach(function (doc) {
                    productos += "<option value=\"" + doc.data().rut + "\">" + doc.data().nombre + "</option>";
                });


                //  console.log("Proveedores activos actualmente: ", productos);

                $("#proveedor").append(productos);

                $('select').formSelect();

            });


//funcc Se trabaja en el formulario dinamico de las formulas para preparar
        $("#agregarProductos").on("click", nuevo);

        function nuevo() {
            var preciocosto = 0;
            var productosformula = "<tr>" +
                "<td class=\"input-field\">" +
                " <select onchange='sumaFormulas()'>" +
                "<option value=\"\" disabled selected>Productos</option>";
            db.collection("Empresas").doc(user.uid).collection("Productos").where("proveedor.id", "==", rutProveedor).where("formula", "==", false).get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    productosformula += "<option data-medida=\"" + doc.data().stock.medida + "\" data-costo=\"" + doc.data().costo + "\" value=\"" + doc.data().codigo + "\">" + doc.data().nombre + "</option>";
                    preciocosto = doc.data().costo;
                });

                productosformula += "</select>" +
                    "<label>Seleccione un producto</label>" +
                    "</td>" +
                    "<td><input onchange='sumaFormulas()' type='number' size='10' placeholder='Ingresa Cantidad' required/></td>" +
                    "<td><input type='number' disabled placeholder='Costo Unidad' required/></td>" +
                    "<td><input type='number' disabled placeholder='Costo Total' required/></td>" +
                    "<td><input type='button' value='Eliminar' onclick='eliminar(this)' class='btn red'></td>" +
                    "</tr>";


            }).then(function () {
                $("#productos").append(productosformula);
                $('select').formSelect();

            })


        }

//funcc cada vez que cambie el proveedor actualizo los datos en la "factura"
        $("#proveedor").change(function () {
            db.collection("Empresas").doc(user.uid).collection("Proveedores").doc(rutProveedor).get().then(function (doc) {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                    $("#rutProveedor").text(doc.id);
                    $("#nombrePorveedor").text(doc.data().nombre);
                    $("#mailProveedor").text(doc.data().correo);
                    $("#celularProveedor").text(doc.data().celular);
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });

        })


        $("#guardarCompra").click(function () {
            var fecha = new Date();

            var total = parseInt($("#total").val());
            var cantidadProductos = [];
            var codigoProducto, cantidadProducto;

            var miRut = $("#miRut").text();
            var miNombre = $("#miNombre").text();
            var miDireccion = $("#miDireccion").text();
            var miTelefono = $("#miTelefono").text();


            var filas = $('table#productos tr').length;
            for (var i = 0; i < filas; i++) {
                for (var k = 0; k < 4; k++) {
                    if (k === 0) {
                        // console.log("Los precios costo deberian ser: " + precioCosto)


                        //  unidadDeMedida = $('option:selected', $('table#formula tr')[i].children[k].children[0].children[3]).attr('data-medida');
                        codigoProducto = $('option:selected', $('table#productos tr')[i].children[k].children[0].children[3]).attr('value');

                        // producto = $('table#formula tr')[i].children[k].children[0].children[3].value;
                        // console.log(producto)
                    } else if (k === 1) {
                        cantidadProducto = $('table#productos tr')[i].children[1].children[0].value;

                        //console.log("Las Cantidades deberian ser: " + cantidad);

                        // var m = $('table#formula tr')[i].children[1].children[0];
                        // m.placeholder = "Medida: " + unidadDeMedida;
                    } else if (k === 2) {


                        //precioCosto = $('table#formula tr')[i].children[2].children[0].value;


                        //  var b = $('table#formula tr')[i].children[2].children[0];
                        //  b.value = precioCosto;
                        // total = cantidad * precioCosto;
                    } else if (k === 3) {
                        // console.log("Los totales costo deberian ser: " + total);
                        //
                        //
                        // console.log($('table#formula tr')[i].children[3].children[0].value);
                        // var a = $('table#formula tr')[i].children[3].children[0];
                        // a.value = total;
                        //
                        // costoProducto += total;

                    }
                }


                cantidadProductos.push({codigo: codigoProducto, cantidad: cantidadProducto});

            }
            console.log(cantidadProductos);
            var compra = {
                fecha: fecha,
                productos: cantidadProductos,
                proveedor: $("#proveedor").val(),
                total: total
            };

            console.log(compra);
            //funcc Escribo la compra en la base de datos y luego hago la transaccion de agregar el stock al prducto
            //todo Buscar como hacer las dos cosas al mismo tiempo

            console.log(compra.productos);
            compra.productos.forEach(function (element) {
                console.log(element.codigo);
                var sfDocRef = db.collection("Empresas").doc(user.uid).collection("Productos").doc(element.codigo);


                return db.runTransaction(function (transaction) {
                    // This code may get re-run multiple times if there are conflicts.
                    return transaction.get(sfDocRef).then(function (sfDoc) {
                        if (!sfDoc.exists) {
                            throw "Document does not exist!";
                        }

                        var newPopulation = parseInt(sfDoc.data().stock.cantidad) + parseInt(element.cantidad);
                        transaction.update(sfDocRef, {
                            stock: {
                                cantidad: newPopulation,
                                medida: sfDoc.data().stock.medida
                            }
                        });
                        M.toast({
                            html: 'Ahora hay ' + newPopulation + ' de ' + sfDoc.data().nombre,
                            classes: 'rounded green'
                        });

                    });
                }).then(function () {
                    console.log("Transaction successfully committed!");
                    db.collection("Empresas").doc(user.uid).collection("Compras").add(compra)
                        .then(function () {
                            console.log("Se ha guardado la formula correctamente");
                        }).catch(function (error) {
                        console.error("Error writing document: ", error);
                    });
                }).catch(function (error) {
                    console.log("Transaction failed: ", error);
                });
            });


        });


        $('#compras').on('click', 'tr td', function (evt) {
            modalEditar();
        });

        function modalEditar() {
            //Se vacian todos los selectores de regiones existentes en el documento

            //declaro variables para la funcion, estan detectaran y guardaran el rut de la fila en la que estoy haciendo click
            var target, id;
            target = $(event.target);
            id = target.parent().data('id');
            //Hago la consulta pasandole el id capturado, si se realiza correctamente cargo los datos en la modal
            var docRef = db.collection("Empresas").doc(user.uid).collection("Compras").doc(id.toString());
            docRef.get().then(function (doc) {
                    if (doc.exists) {


                        console.log(doc.data());


                        M.Modal.getInstance($('#modalDetalles')).open();
                        M.updateTextFields();


                    } else {
                        // doc.data() will be undefined in this case
                        alert("error al ecnotrar el id seleccionado");
                        console.log("error");
                    }
                }
            ).catch(function (error) {
                console.log("Error getting document:", error);
            });


        }


    } else {
        //redireccionar a login
        console.log("no existe usuario");
    }
});


function sumaFormulas() {
    var costoProducto = 0;


    //Obtengo todas las filas de la tabla para recorrerlas mas adelante
    var filas = $('table#productos tr').length;
    for (var i = 0; i < filas; i++) {


        var precioCosto = 0;
        var unidadDeMedida = "";
        var cantidad = 0;
        var total = 0;
        var codigo = "";

        for (var k = 0; k < 4; k++) {
            if (k === 0) {
                precioCosto = $('option:selected', $('table#productos tr')[i].children[k].children[0].children[3]).attr('data-costo');
                unidadDeMedida = $('option:selected', $('table#productos tr')[i].children[k].children[0].children[3]).attr('data-medida');
                codigo = $('option:selected', $('table#productos tr')[i].children[k].children[0].children[3]).attr('value');


                // producto = $('table#formula tr')[i].children[k].children[0].children[3].value;
                // console.log(producto)

            } else if (k === 1) {
                cantidad = $('table#productos tr')[i].children[1].children[0].value;
                console.log("Las Cantidades deberian ser: " + cantidad);

                var m = $('table#productos tr')[i].children[1].children[0];
                m.placeholder = "Medida: " + unidadDeMedida;

            } else if (k === 2) {
                //precioCosto = $('table#formula tr')[i].children[2].children[0].value;


                var b = $('table#productos tr')[i].children[2].children[0];
                b.value = precioCosto;


                console.log("Los precios costo deberian ser: " + precioCosto)
            } else if (k === 3) {
                total = cantidad * precioCosto;
                console.log("Los totales costo deberian ser: " + total);


                console.log($('table#productos tr')[i].children[3].children[0].value);
                var a = $('table#productos tr')[i].children[3].children[0];
                a.value = total;

                costoProducto += total;
            }
        }
    }
    $("#total").val(costoProducto);
}


function eliminar(e) {
    $(e).parent().parent().fadeOut(400).remove();
    /**
     * el boton eliminar esta jerarquicamente asi:
     *      form > table > tr > td > input.eliminar
     * por esta razon se debe subir dos posiciones
     */
}