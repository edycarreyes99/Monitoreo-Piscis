function registrar(){
    var emailregistro = document.getElementById('emailregistro').value;
    var contrasenaregistro = document.getElementById('contrasenaregistro').value;
    firebase.auth().createUserWithEmailAndPassword(emailregistro, contrasenaregistro).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
      });
}

function ingresa(){
    var emailingresa = document.getElementById('emailingreso').value;
    var contrasenaingresa = document.getElementById('contrasenaingreso').value;
    firebase.auth().signInWithEmailAndPassword(emailingresa, contrasenaingresa).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      // ...
    });
}

function observador(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('Hay Usuarios Activos');
            contenido();
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

observador();

function contenido(){
    var content = document.getElementById('contenido');
    content.innerHTML = `
    <p>Bienvenido!</p>
    <button onclick="cerrar()">Cerrar Sesion</button>
    `;
}

function cerrar(){
    firebase.auth().signOut().then(function(){
    console.log('Sesion Cerrada')}).catch(function(error){console.log(error)})
}