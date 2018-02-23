function registrar(){
    var email = document.getElementById('email').value;
    var contrasena = document.getElementById('contraseña').value;
    firebase.auth().createUserWithEmailAndPassword(email, contrasena).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorcode);
        console.log(errorMessage);
        // ...
      });
}