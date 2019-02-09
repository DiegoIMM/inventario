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



//funcc Se trabaja en el formulario dinamico de las formulas para preparar
        $("#agregarProductos").on("click", nuevo);

        function nuevo() {
            var preciocosto = 0;
            productosformula = "<tr>" +
                "<td class=\"input-field\">" +
                " <select onchange='sumaFormulas()'>" +
                "<option value=\"\" disabled selected>Productos</option>";
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


    } else {
        //redireccionar a login
        console.log("no existe usuario");
    }
});



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