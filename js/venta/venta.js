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
        db.collection("Empresas").doc(user.uid).collection("Clientes")
            .onSnapshot(function (querySnapshot) {


                var clientes = "";

                querySnapshot.forEach(function (doc) {
                    clientes += "<option value=\"" + doc.data().rut + "\">" + doc.data().nombre + "</option>";
                });


                //  console.log("Proveedores activos actualmente: ", productos);

                $("#cliente").append(clientes);

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
            db.collection("Empresas").doc(user.uid).collection("Productos").where("seVende", "==", true).get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    productosformula += "<option data-medida=\"" + doc.data().stock.medida + "\" data-precio=\"" + doc.data().precioventa + "\" value=\"" + doc.data().codigo + "\">" + doc.data().nombre + "</option>";
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

        });


        $("#guardarVenta").click(function () {
            var fecha = new Date();
            var unidadDeMedida = "";
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


                        unidadDeMedida = $('option:selected', $('table#productos tr')[i].children[k].children[0].children[3]).attr('data-medida');
                        codigoProducto = $('option:selected', $('table#productos tr')[i].children[k].children[0].children[3]).attr('value');

                        // producto = $('table#formula tr')[i].children[k].children[0].children[3].value;
                        // console.log(producto)
                    } else if (k === 1) {
                        cantidadProducto = $('table#productos tr')[i].children[1].children[0].value;

                        //console.log("Las Cantidades deberian ser: " + cantidad);

                        var m = $('table#productos tr')[i].children[1].children[0];
                        m.placeholder = "Medida: " + unidadDeMedida;
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
            var venta = {
                fecha: fecha,
                productos: cantidadProductos,
                proveedor: $("#proveedor").val(),
                total: total
            };

            console.log(venta);
            //funcc Escribo la venta en la base de datos y luego hago la transaccion de agregar el stock al prducto
            //todo Buscar como hacer las dos cosas al mismo tiempo

            venta.productos.forEach(function (element) {
                test(element.codigo, element.cantidad);
            });

            function test(codigo, cantidad) {
                var sfDocRef = db.collection("Empresas").doc(user.uid).collection("Productos").doc(codigo);

                sfDocRef.get().then(function (doc) {
                        if (doc.exists) {
                            if (doc.data().formula === false) {

                                transaccion(doc.id, cantidad)

                            } else {


                                for (var i = 0; i < doc.data().ingredientes.length; i++) {
                                    transaccion(doc.data().ingredientes[i].codigo, (doc.data().ingredientes[i].cantidad * cantidad));
                                }
                            }

                        }
                        else {
                            // doc.data() will be undefined in this case
                            console.log("No such document!");
                        }
                    }
                ).catch(function (error) {
                    console.log("Error getting document:", error);
                });


            }


            function transaccion(codigo, cantidad) {
                // Create a reference to the SF doc.
                var sfDocRef = db.collection("Empresas").doc(user.uid).collection("Productos").doc(codigo);

                return db.runTransaction(function (transaction) {
                    // This code may get re-run multiple times if there are conflicts.
                    return transaction.get(sfDocRef).then(function (sfDoc) {
                        if (!sfDoc.exists) {
                            throw "Document does not exist!";
                        }

                        var newPopulation = parseInt(sfDoc.data().stock.cantidad) - parseInt(cantidad);
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
                }).catch(function (error) {
                    console.log("Transaction failed: ", error);
                });
            }


        });
    } else {
        //redireccionar a login
        console.log("no existe usuario");
    }
});


function sumaFormulas() {
    var totalVenta = 0;


    //Obtengo todas las filas de la tabla para recorrerlas mas adelante
    var filas = $('table#productos tr').length;
    for (var i = 0; i < filas; i++) {


        var precioVenta = 0;
        var cantidad = 0;
        var total = 0;
        var codigo = "";

        for (var k = 0; k < 4; k++) {
            if (k === 0) {
                precioVenta = $('option:selected', $('table#productos tr')[i].children[k].children[0].children[3]).attr('data-precio');
                codigo = $('option:selected', $('table#productos tr')[i].children[k].children[0].children[3]).attr('value');


                // producto = $('table#formula tr')[i].children[k].children[0].children[3].value;
                // console.log(producto)

            } else if (k === 1) {
                cantidad = $('table#productos tr')[i].children[1].children[0].value;
                console.log("Las Cantidades deberian ser: " + cantidad);


            } else if (k === 2) {
                //precioVenta = $('table#formula tr')[i].children[2].children[0].value;


                var b = $('table#productos tr')[i].children[2].children[0];
                b.value = precioVenta;


                console.log("Los precios costo deberian ser: " + precioVenta)
            } else if (k === 3) {
                total = cantidad * precioVenta;
                console.log("Los totales costo deberian ser: " + total);


                console.log($('table#productos tr')[i].children[3].children[0].value);
                var a = $('table#productos tr')[i].children[3].children[0];
                a.value = total;

                totalVenta += total;
            }
        }
    }
    $("#total").val(totalVenta);
}


function eliminar(e) {
    $(e).parent().parent().fadeOut(400).remove();
    /**
     * el boton eliminar esta jerarquicamente asi:
     *      form > table > tr > td > input.eliminar
     * por esta razon se debe subir dos posiciones
     */
}