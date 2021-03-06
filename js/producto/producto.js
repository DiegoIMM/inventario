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
var productosformula = "";


$("#seVende").click(function () {
    $("#vistaPrecioVenta").toggleClass('hide')
});
$("#edseVende").click(function () {
    $("#edvistaPrecioVenta").toggleClass('hide')
});

$('#medida').change(function () {
    $('#labelStockCritico').text($('#medida :selected').text());
});
$('#crmedida').change(function () {
    $('#crlabelStockCritico').text($('#crmedida :selected').text());
});


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
// funcc escucho los datos y los pinto en la tabla creada
        db.collection("Empresas").doc(user.uid).collection("Productos").where("formula", "==", false).orderBy("codigo")
            .onSnapshot(function (querySnapshot) {
                $("#productos").empty();
                //$("#cargandotabla").empty();

                var productos = "";
                productos +=
                    " <thead>\n" +
                    "<tr>" +
                    "<th>Codigo</th>" +
                    "<th>Nombre</th>" +
                    "<th>Descripcion</th>" +
                    "<th>Stock</th>" +
                    "<th>Proveedor</th>" +

                    "</tr>" +
                    "</thead>" +
                    "<tbody>";

                querySnapshot.forEach(function (doc) {
                    var codigo = doc.data().codigo;
                    var descripcion = doc.data().descripcion;
                    var nombre = doc.data().nombre;
                    var proveedor = doc.data().proveedor.nombre;
                    var stock = doc.data().stock.cantidad;
                    productos += "<tr class=\"hoverable\" style=\"cursor: pointer\" data-codigo=" + codigo + ">;" +
                        "<td>" + codigo + "</td>" +
                        "<td>" + nombre + "</td>" +
                        "<td>" + descripcion + "</td>" +
                        "<td>" + stock + "</td>" +
                        "<td>" + proveedor + "</td>" +

                        // "<td>" +
                        // "<a class=\"btn-floating hoverable waves-effect waves-light yellow\"><i class=\"material-icons\">edit</i></a>\n" +
                        // "<a class=\"btn-floating hoverable waves-effect waves-light red\"><i class=\"material-icons\">delete</i></a>\n" +
                        // "</td>" +
                        "</tr>";
                });


                // console.log("Productos: ", productos);
                productos += "</tbody>";

                $("#productos").append(productos);
                $("#productos").dataTable().fnDestroy();

                $('#productos').DataTable({
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
                $("#productos_length").addClass("col s1 l1");
                $("#productos_filter").addClass("col s11 l11");
                $("#productos_info").addClass("col s6 l6");
                $("#productos_paginate").addClass("col l6 right-align flow-text");
                $("#productos").append("<br>");
                $('select').formSelect();

            });


// funcc escucho los datos y los pinto en la tabla creada
        db.collection("Empresas").doc(user.uid).collection("Productos").where("formula", "==", true).orderBy("codigo")
            .onSnapshot(function (querySnapshot) {
                $("#Formulas").empty();
                //$("#cargandotabla").empty();

                var formulas = "";
                formulas +=
                    " <thead>\n" +
                    "<tr>" +
                    "<th>Codigo</th>" +
                    "<th>Nombre</th>" +
                    "<th>Descripcion</th>" +
                    "<th>Costo</th>" +
                    "<th>Precio Venta</th>" +

                    "</tr>" +
                    "</thead>" +
                    "<tbody>";

                querySnapshot.forEach(function (doc) {
                    var codigo = doc.data().codigo;
                    var descripcion = doc.data().descripcion;
                    var nombre = doc.data().nombre;
                    var costo = doc.data().costo;
                    var precioVenta = doc.data().precioventa;
                    formulas += "<tr class=\"hoverable\" style=\"cursor: pointer\" data-codigo=" + codigo + ">;" +
                        "<td>" + codigo + "</td>" +
                        "<td>" + nombre + "</td>" +
                        "<td>" + descripcion + "</td>" +
                        "<td>" + costo + "</td>" +
                        "<td>" + precioVenta + "</td>" +

                        // "<td>" +
                        // "<a class=\"btn-floating hoverable waves-effect waves-light yellow\"><i class=\"material-icons\">edit</i></a>\n" +
                        // "<a class=\"btn-floating hoverable waves-effect waves-light red\"><i class=\"material-icons\">delete</i></a>\n" +
                        // "</td>" +
                        "</tr>";
                });


                // console.log("Productos: ", productos);
                formulas += "</tbody>";

                $("#Formulas").append(formulas);
                $("#Formulas").dataTable().fnDestroy();

                $('#Formulas').DataTable({
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
                $("#Formulas_length").addClass("col s1 l1");
                $("#Formulas_filter").addClass("col s11 l11");
                $("#Formulas_info").addClass("col s6 l6");
                $("#Formulas_paginate").addClass("col l6 right-align flow-text");
                $("#Formulas").append("<br>");
                $('select').formSelect();

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
        $("#agregarIngrediente").on("click", nuevo);

        function nuevo() {
            var preciocosto = 0;
            productosformula = "<tr>" +

                "<td class=\"input-field\">" +
                " <select onchange='sumaFormulas()'>" +
                "<option value=\"\" disabled selected>Productos</option>";
            db.collection("Empresas").doc(user.uid).collection("Productos").where("formula", "==", false).
            orderBy("codigo").get().then(function (querySnapshot) {
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
                $("#formula").append(productosformula);
                $('select').formSelect();

            })


        }


        $("#guardarFormula").click(function () {

            //precioCosto = $('option:selected', $('table#formula tr')[i].children[k].children[0].children[3]).attr('data-costo');
            var precioCosto;
            var ingredientes = [];
            var codigoing, cantidading;

            var filas = $('table#formula tr').length;
            for (var i = 0; i < filas; i++) {
                for (var k = 0; k < 4; k++) {
                    if (k === 0) {
                        // console.log("Los precios costo deberian ser: " + precioCosto)


                        //  unidadDeMedida = $('option:selected', $('table#formula tr')[i].children[k].children[0].children[3]).attr('data-medida');
                        codigoing = $('option:selected', $('table#formula tr')[i].children[k].children[0].children[3]).attr('value');

                        // producto = $('table#formula tr')[i].children[k].children[0].children[3].value;
                        // console.log(producto)
                    } else if (k === 1) {
                        cantidading = $('table#formula tr')[i].children[1].children[0].value;

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


                ingredientes.push({codigo: codigoing, cantidad: cantidading});

            }
            //Obtener los tags
            var tags = [];
            for (var i = 0; i < M.Chips.getInstance($('#etiquetass')).chipsData.length; i++) {

                tags.push(M.Chips.getInstance($('#etiquetass')).chipsData[i].tag);
            }


            /* var stockCritico = parseFloat($("#crstockCritico").val());
             var cantidad = $("#crstock").val();


             var medida = $("#crmedida").val();*/
            precioCosto = parseFloat($('#crPrecioCosto').val());
            var producto = {
                proveedor: {
                    id: user.uid,
                    nombre: "Fabricacion Propia"
                },
                codigo: $("#crCodigo").val(),
                seVende: true,
                nombre: $("#crNombre").val(),
                formula: true,
                costo: precioCosto,
                descripcion: $("#crDescripcion").val(),
                precioventa: parseFloat($("#crPrecioVenta").val()),
                stock: {
                    cantidad: null,
                    medida: "Unidad"
                },
                stockcritico: null,
                ingredientes: ingredientes,
                tags: tags
            };
            console.log(producto);
            db.collection("Empresas").doc(user.uid).collection("Productos").doc(producto.codigo).set(producto)
                .then(function () {
                    console.log("Se ha guardado la formula correctamente");
                    M.toast({html: 'Se ha guardado la formula correctamente', classes: 'rounded green'});

                    /*      producto.ingredientes.forEach(function (element) {
                              console.log(element.codigo);
                              var sfDocRef = db.collection("Empresas").doc(user.uid).collection("Productos").doc(element.codigo);


                              return db.runTransaction(function (transaction) {
                                  // This code may get re-run multiple times if there are conflicts.
                                  return transaction.get(sfDocRef).then(function (sfDoc) {
                                      if (!sfDoc.exists) {
                                          throw "Document does not exist!";
                                      }

                                      var newPopulation = sfDoc.data().stock.cantidad - (element.cantidad * producto.stock.cantidad);
                                      transaction.update(sfDocRef, {
                                          stock: {
                                              cantidad: newPopulation,
                                              medida: sfDoc.data().stock.medida
                                          }
                                      });
                                  });
                              }).then(function () {
                                  console.log("Transaction successfully committed!");
                              }).catch(function (error) {
                                  console.log("Transaction failed: ", error);
                              });
                          });*/


                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });

        });


        $("#guardarProducto").click(function () {
            var precioCosto;
            var precioVenta = null;
            //Obtener los tags
            var tags = [];
            for (var i = 0; i < M.Chips.getInstance($('#etiquetas')).chipsData.length; i++) {
                tags.push(M.Chips.getInstance($('#etiquetas')).chipsData[i].tag);

            }
            var seVende = false;
            if ($("#seVende").prop('checked')) {
                seVende = true;
                precioVenta = parseFloat($("#precioVenta").val())
            }


            var cantidad = parseInt($("#stock").val());
            var medida = $("#medida").val();

            precioCosto = parseFloat($('#costo').val());

            var producto = {
                proveedor: {
                    id: $('#proveedor').val(),
                    nombre: $('#proveedor option:selected').text()
                },
                codigo: $("#codigo").val(),
                seVende: seVende,
                nombre: $("#nombre").val(),
                formula: false,
                costo: precioCosto,
                descripcion: $("#descripcion").val(),
                precioventa: precioVenta,
                stock: {
                    cantidad: cantidad,
                    medida: medida
                },
                stockcritico: parseFloat($("#stockCritico").val()),
                ingredientes: [{}],
                tags: tags
            };
            console.log(producto);

            db.collection("Empresas").doc(user.uid).collection("Productos").doc(producto.codigo).set(producto)
                .then(function () {
                    console.log("Se ha creado un producto satisfactoriamente");
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });

        });


        $("#eebtnGuardar").click(function () {

            //Obtener los tags
            var tags = [];
            for (var i = 0; i < M.Chips.getInstance($('#edetiquetas')).chipsData.length; i++) {
                tags.push(M.Chips.getInstance($('#edetiquetas')).chipsData[i].tag);

            }
            var seVende = false;
            if ($("#edseVende").prop('checked')) {
                seVende = true;
            }


            var cantidad = $("#edstock").val();
            var medida = $("#edmedida").val();
            if (medida === "Do") {
                cantidad = cantidad * 12;
            }
            if (medida === "Gr") {
                cantidad = cantidad / 1000
            }
            if (medida === "Ml") {
                cantidad = cantidad / 1000
            }

            var label = $('#edmedida :selected').parent().attr('label');
            var precioPor = $('#edprecioPor :selected').parent().attr('label');


            var producto = {
                proveedor: {
                    id: $('#edproveedor').val(),
                    nombre: $('#edproveedor option:selected').text()
                },
                codigo: $("#edcodigo").val(),
                seVende: seVende,
                nombre: $("#ednombre").val(),
                costo: {
                    precio: $('#edcosto').val(),
                    precioPor: precioPor
                }, descripcion: $("#eddescripcion").val(),
                precioventa: $("#edprecioVenta").val(),
                stock: {
                    cantidad: cantidad,
                    medida: label
                },
                stockcritico: $("#edstockCritico").val(),
                tags: tags
            };
            console.log(producto);

            db.collection("Empresas").doc(user.uid).collection("Productos").doc(producto.codigo).set(producto)
                .then(function () {
                    console.log("Document successfully written!");
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });

        });

        $('#productos').on('click', 'tr td', function (evt) {
            modalEditar();
        });


        function modalEditar() {
            //Se vacian todos los selectores de regiones existentes en el documento


            //Se cargan los select de regiones solamente en el modal donde se modificara el proveedor
            //declaro variables para la funcion, estan detectaran y guardaran el rut de la fila en la que estoy haciendo click
            var target, codigo;
            target = $(event.target);
            codigo = target.parent().data('codigo');
            console.log(codigo);
            //Hago la consulta pasandole el rut capturado, si se realiza correctamente cargo los datos en la modal
            var docRef = db.collection("Empresas").doc(user.uid).collection("Productos").doc(codigo.toString());
            docRef.get().then(function (doc) {
                    if (doc.exists) {
//Se carga el select con los proveedores activos
                        db.collection("Empresas").doc(user.uid).collection("Proveedores").where("habilitado", "==", true).orderBy("rut")
                            .onSnapshot(function (querySnapshot) {


                                var proveedores = "";

                                querySnapshot.forEach(function (doc) {
                                    proveedores += "<option value=\"" + doc.data().rut + "\">" + doc.data().nombre + "</option>";
                                });


                                console.log("Current cities in CA: ", proveedores);

                                $("#edproveedor").append(proveedores);

                                $('select').formSelect();

                            });

                        //TODO agregar los tags y los selectores para que se rellenen automaticamente
                        $("#edcodigo").val(doc.data().codigo);
                        $("#eddescripcion").val(doc.data().descripcion);
                        $("#ednombre").val(doc.data().nombre);
                        $("#edprecioVenta").val(doc.data().precioventa);
                        $("#edstock").val(doc.data().stock.cantidad);
                        $("#edcosto").val(doc.data().costo.precio);
                        $("#edstockCritico").val(doc.data().stockcritico);


                        M.Modal.getInstance($('#modalEditar')).open();
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


    } else {
        //redireccionar a login
        console.log("no existe usuario");
    }
})
;


function sumaFormulas() {
    var costoProducto = 0;


    //Obtengo todas las filas de la tabla para recorrerlas mas adelante
    var filas = $('table#formula tr').length;
    for (var i = 0; i < filas; i++) {


        var precioCosto = 0;
        var unidadDeMedida = "";
        var cantidad = 0;
        var total = 0;
        var codigo = "";

        for (var k = 0; k < 4; k++) {
            if (k === 0) {
                precioCosto = $('option:selected', $('table#formula tr')[i].children[k].children[0].children[3]).attr('data-costo');
                unidadDeMedida = $('option:selected', $('table#formula tr')[i].children[k].children[0].children[3]).attr('data-medida');
                codigo = $('option:selected', $('table#formula tr')[i].children[k].children[0].children[3]).attr('value');


                // producto = $('table#formula tr')[i].children[k].children[0].children[3].value;
                // console.log(producto)

            } else if (k === 1) {
                cantidad = $('table#formula tr')[i].children[1].children[0].value;
                console.log("Las Cantidades deberian ser: " + cantidad);

                var m = $('table#formula tr')[i].children[1].children[0];
                m.placeholder = "Medida: " + unidadDeMedida;

            } else if (k === 2) {
                //precioCosto = $('table#formula tr')[i].children[2].children[0].value;


                var b = $('table#formula tr')[i].children[2].children[0];
                b.value = precioCosto;


                console.log("Los precios costo deberian ser: " + precioCosto)
            } else if (k === 3) {
                total = cantidad * precioCosto;
                console.log("Los totales costo deberian ser: " + total);


                console.log($('table#formula tr')[i].children[3].children[0].value);
                var a = $('table#formula tr')[i].children[3].children[0];
                a.value = total;


                costoProducto += total;
            }
        }
    }
    console.log(costoProducto)
    $("#crPrecioCosto").val(costoProducto);
    $("#crPrecioVenta").val(costoProducto * 120 / 100);
}


function eliminar(e) {
    $(e).parent().parent().fadeOut(400).remove();
    /**
     * el boton eliminar esta jerarquicamente asi:
     *      form > table > tr > td > input.eliminar
     * por esta razon se debe subir dos posiciones
     */
}