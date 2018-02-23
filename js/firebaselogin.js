function registrar(){
    var emailregistro = document.getElementById('emailregistro').value;
    var contrasenaregistro = document.getElementById('contraseñaregistro').value;
    firebase.auth().createUserWithEmailAndPassword(emailregistro, contrasenaregistro).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorcode);
        console.log(errorMessage);
        // ...
      });

      function ingresa(){
          var email = document.getElementById('emailingreso').value;
          var contrasena = document.getElementById('contrasenaingreso').value;
          firebase.auth().signInWithEmailAndPassword(email, contrasena).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorcode);
            console.log(errorMessage);
            // ...
          });
      }
}