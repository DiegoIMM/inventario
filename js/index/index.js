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
var cuantosProveedores = 0;
var costoInventario = 0;
var proyeccionVenta = 0;

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        db.collection("Empresas").doc(user.uid).collection("Proveedores").where("habilitado", "==", true).orderBy("rut").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                cuantosProveedores++;


            });
        }).then(function () {
            $("#cuantosProveedores").append("Hay " + cuantosProveedores + " Proveedores activos en este momento");

        }).catch(function (error) {
            console.error("Error writing document: ", error);
        });


        db.collection("Empresas").doc(user.uid).collection("Productos").where("formula", "==", false).get().then(function (querySnapshot) {

            querySnapshot.forEach(function (doc) {
                costoInventario += parseInt(doc.data().costo * doc.data().stock.cantidad);
                if (!isNaN(parseInt(doc.data().precioventa))) {
                    proyeccionVenta += parseInt(doc.data().precioventa * doc.data().stock.cantidad);
                    console.log(parseInt(doc.data().precioventa));

                }
            });
        }).then(function () {
            $("#costoInventario").append("Haz Gastado $" + costoInventario + " en tu inventario");
        }).catch(function (error) {
            console.error("Error writing document: ", error);
        });


    } else {



        //redireccionar a login
        console.log("no existe usuario");
    }
});