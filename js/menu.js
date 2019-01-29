firebase.auth().onAuthStateChanged(function (user) {
    if (user) {


        $("#nombre").append("<span class=\"white-text name\">" + user.displayName + "</span>");
        $("#email").append("<span class=\"white-text email\">" + user.email + "</span>");

        //console.log(user);

        $("#guardarperfil").click(function () {
            user.updateProfile({
                displayName: $("#epNombre").val(),
                photoURL: "https://example.com/jane-q-user/prile.jpg"
            }).then(function () {
                $("#nombre").empty();
                $("#email").empty();
                $("#nombre").append("<span class=\"black-text name\">" + user.displayName + "</span>");
                $("#email").append("<span class=\"black-text email\">" + user.email + "</span>");
            }).catch(function (error) {
                // An error happened.
            });


        });

        $("#editarperfilmodal").click(function () {
            $("#epNombre").val(user.displayName);
            $("#epMail").val(user.email);
            $("#epTelefono").val(user.phoneNumber);

            M.updateTextFields();
        });


        $('#cerrarSesion').click(function () {

            firebase.auth().signOut().then(function () {
                console.warn("Sesion Cerrada");
                window.location.href = 'iniciarSesion.html';


                // Sign-out successful.
            }).catch(function (error) {
                // An error happened.
            });

        });

    } else {
        window.location.href = 'iniciarSesion.html';
    }
});