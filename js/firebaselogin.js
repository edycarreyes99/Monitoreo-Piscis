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
}

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

function observador(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('Hay Usuarios Activos');
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // ...
        } else {
          // User is signed out.
          console.log('No hay Ningun Usuario Activo');
          // ...
        }
      });
}