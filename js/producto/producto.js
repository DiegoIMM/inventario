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
<<<<<<< HEAD
=======
$('#crmedida').change(function () {
    $('#crlabelStockCritico').text($('#crmedida :selected').text());
});
>>>>>>> Segunda Subida


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
// funcc escucho los datos y los pinto en la tabla creada
        db.collection("Usuarios").doc(user.uid).collection("Productos").orderBy("codigo")
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


//funcc Se carga el select con los proveedores activos
        db.collection("Usuarios").doc(user.uid).collection("Proveedores").where("habilitado", "==", true).orderBy("rut")
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
<<<<<<< HEAD
                "<td class=\"input-field col s12\">" +
                " <select onchange='sumaFormulas()'>" +
                "<option value=\"\" disabled selected>Seleccione un producto</option>";
=======
                "<td class=\"input-field\">" +
                " <select onchange='sumaFormulas()'>" +
                "<option value=\"\" disabled selected>Productos</option>";
>>>>>>> Segunda Subida
            db.collection("Usuarios").doc(user.uid).collection("Productos").where("paraFabricar", "==", true).get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {

                    productosformula += "<option data-medida=\"" + doc.data().stock.medida + "\" data-costo=\"" + doc.data().costo.precio + "\" value=\"" + doc.data().codigo + "\">" + doc.data().nombre + "</option>";
                    preciocosto = doc.data().costo.precio;
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


<<<<<<< HEAD
        $("#guardarIngredientes").click(function () {

            var filas = $('table#formula tr').length;
            for (var i = 0; i < filas; i++) {

                for (var k = 0; k < 4; k++) {
                    if (k === 0) {
                        console.log("Valor del selector: " + $('table#formula tr')[i].children[k].children[0].children[3].value);

                    } else {
                        console.log("Valor de los datos de la tabla: " + $('table#formula tr')[i].children[k].children[0].value);
                    }
                }
            }
        });

        $("select").val('10');
        $("#formula_length").addClass("col s1 l1");
        $("#formula_filter").addClass("col s11 l11");
        $("#formula_info").addClass("col s6 l6");
        $("#formula_paginate").addClass("col l6 right-align flow-text");
        $("#formula").append("<br>");
        $('select').formSelect();
=======
        $("#crearprodprep").click(function () {

            var ingredientes = [];
            var codigoing, cantidading;
            var filas = $('table#formula tr').length;

            for (var i = 0; i < filas; i++) {
                for (var k = 0; k < 4; k++) {
                    if (k === 0) {
                        //precioCosto = $('option:selected', $('table#formula tr')[i].children[k].children[0].children[3]).attr('data-costo');
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


                        // console.log("Los precios costo deberian ser: " + precioCosto)
                    } else if (k === 3) {
                        // total = cantidad * precioCosto;
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
            var seVende = true;

            var paraFabricar = false;


            var cantidad = $("#crstock").val();
            var medida = $("#crmedida").val();
            if (medida === "Do") {
                cantidad = cantidad * 12;
            }
            if (medida === "Gr") {
                cantidad = cantidad / 1000
            }
            if (medida === "Ml") {
                cantidad = cantidad / 1000
            }

            var unidadMedida = $('#crmedida :selected').parent().attr('label');

            var producto = {
                proveedor: {
                    id: user.uid,
                    nombre: "Fabricacion Propia"
                },
                codigo: $("#crCodigo").val(),
                seVende: seVende,
                paraFabricar: paraFabricar,
                nombre: $("#crNombre").val(),
                costo: {
                    precio: $('#crPrecioCosto').val(),
                    precioPor: unidadMedida
                },
                descripcion: $("#crDescripcion").val(),
                precioventa: $("#crPrecioVenta").val(),
                stock: {
                    cantidad: cantidad,
                    medida: unidadMedida
                },
                stockcritico: $("#crstockCritico").val(),
                ingredientes: ingredientes,
                tags: tags
            };
            console.log(producto);
            db.collection("Usuarios").doc(user.uid).collection("Productos").doc(producto.codigo).set(producto)
                .then(function () {


                    for (let i = 0; i < producto.ingredientes.length; i++) {
                        // Create a reference to the SF doc.
                        var sfDocRef = db.collection("Usuarios").doc(user.uid).collection("Productos").doc(producto.ingredientes[i].codigo);


                        return db.runTransaction(function (transaction) {
                            // This code may get re-run multiple times if there are conflicts.
                            return transaction.get(sfDocRef).then(function (sfDoc) {
                                if (!sfDoc.exists) {
                                    throw "Document does not exist!";
                                }

                                var newPopulation = sfDoc.data().stock.cantidad - producto.ingredientes[i].cantidad;
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

                    }


                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });


        });
>>>>>>> Segunda Subida


        $("#guardar").click(function () {

            //Obtener los tags
            var tags = [];
            for (var i = 0; i < M.Chips.getInstance($('#etiquetas')).chipsData.length; i++) {
                tags.push(M.Chips.getInstance($('#etiquetas')).chipsData[i].tag);

            }
            var seVende = false;
            if ($("#seVende").prop('checked')) {
                seVende = true;
            }
            var paraFabricar = false;
            if ($("#paraFabricar").prop('checked')) {
                paraFabricar = true;
            }

            var cantidad = $("#stock").val();
            var medida = $("#medida").val();
            if (medida === "Do") {
                cantidad = cantidad * 12;
            }
            if (medida === "Gr") {
                cantidad = cantidad / 1000
            }
            if (medida === "Ml") {
                cantidad = cantidad / 1000
            }

            var unidadMedida = $('#medida :selected').parent().attr('label');
            var precioPor = $('#precioPor :selected').parent().attr('label');

            var producto = {
                proveedor: {
                    id: $('#proveedor').val(),
                    nombre: $('#proveedor option:selected').text()
                },
                codigo: $("#codigo").val(),
                seVende: seVende,
                paraFabricar: paraFabricar,
                nombre: $("#nombre").val(),
                costo: {
                    precio: $('#costo').val(),
                    precioPor: precioPor
                },
                descripcion: $("#descripcion").val(),
                precioventa: $("#precioVenta").val(),
                stock: {
                    cantidad: cantidad,
                    medida: unidadMedida
                },
                stockcritico: $("#stockCritico").val(),
                ingredientes: [{}],
                tags: tags
            };
            console.log(producto);

            db.collection("Usuarios").doc(user.uid).collection("Productos").doc(producto.codigo).set(producto)
                .then(function () {
                    console.log("Document successfully written!");
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
            var paraFabricar = false;
            if ($("#edparaFabricar").prop('checked')) {
                paraFabricar = true;
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
                paraFabricar: paraFabricar,
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

            db.collection("Usuarios").doc(user.uid).collection("Productos").doc(producto.codigo).set(producto)
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
            var docRef = db.collection("Usuarios").doc(user.uid).collection("Productos").doc(codigo.toString());
            docRef.get().then(function (doc) {
                    if (doc.exists) {
//Se carga el select con los proveedores activos
                        db.collection("Usuarios").doc(user.uid).collection("Proveedores").where("habilitado", "==", true).orderBy("rut")
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
<<<<<<< HEAD
=======

>>>>>>> Segunda Subida
                costoProducto += total;
            }
        }
    }
<<<<<<< HEAD
    console.log(costoProducto)
=======
    $("#crPrecioCosto").val(costoProducto);
    $("#crPrecioVenta").val(costoProducto * 120 / 100);
>>>>>>> Segunda Subida
}


function eliminar(e) {
    $(e).parent().parent().fadeOut(400).remove();
    /**
     * el boton eliminar esta jerarquicamente asi:
     *      form > table > tr > td > input.eliminar
     * por esta razon se debe subir dos posiciones
     */
}