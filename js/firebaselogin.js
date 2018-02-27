var modalError = document.getElementById('cuerpoModalError');

function registrar(){
    var email = document.getElementById('email').value;
    var contrasena = document.getElementById('contrasena').value;
    firebase.auth().createUserWithEmailAndPassword(email, contrasena)
    .then(function(){
        verificaUsuario()
        location.reload(true)
    })

    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
      });
}

function ingresa(){
    var email = document.getElementById('email').value;
    var contrasena = document.getElementById('contrasena').value;
    firebase.auth().signInWithEmailAndPassword(email, contrasena)
    .then(function(){
        //acciones
        modalError.innerHTML = `Bienvenido`;
        
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      modalError.innerHTML= errorMessage;
      // ...
    });
}

function observador(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('Hay Usuarios Activos');
            contenido(user);
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          console.log('******************')
          console.log(user.emailVerified)
          console.log('******************')

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

function contenido(user){
    var user = user;
    var content = document.getElementById('contenido');
    var navbar = document.getElementById('navbar');
    if(user.emailVerified)
    {
        content.innerHTML = `
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

        <div class="container text-center">
        <div class="container mx-auto">
        <button onclick="cerrar()" class="btn btn-danger">Cerrar Sesion</button>
        </div>
        </div>

        
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
        `;
    }else{
        content.innerHTML=`
        <p class="h4">Para poder iniciar sesion primero tiene que verificar su correo electronico<p>
        `;
    }
}

function cerrar(){
    firebase.auth().signOut().then(function(){
    console.log('Sesion Cerrada')
    location.reload(true)
}).catch(function(error){
        console.log(error)
    })
}

function verificaUsuario(){
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
    // Email sent.
    console.log('enviando');
    }).catch(function(error) {
    // An error happened.
    console.logo(error);
    });
}