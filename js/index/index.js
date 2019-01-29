
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


var cuantosProveedores = 0;


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        db.collection("Usuarios").doc(user.uid).collection("Proveedores").where("habilitado", "==", true).orderBy("rut").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                cuantosProveedores++;


            });
        }).then(function () {
            $("#cuantosProveedores").append("Hay " + cuantosProveedores + " Proveedores activos en este momento");

        }).catch(function (error) {
            console.error("Error writing document: ", error);
        });
    } else {

    }
});




