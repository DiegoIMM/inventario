$("#iniciarSesion").click(function () {

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    console.log(email);
    console.log(password);

    firebase.auth().signInWithEmailAndPassword(email, password).then(function () {

        window.location.href = 'index.html';

    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });

});

