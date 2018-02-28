firebase.initializeApp({
    apiKey: "AIzaSyBu_Yb1UXx6W12dkeSYvr7aj9ueNwj0NLQ",
    authDomain: "proyecto-robotica-35bed.firebaseapp.com",
    databaseURL: "https://proyecto-robotica-35bed.firebaseio.com",
    projectId: "proyecto-robotica-35bed",
    storageBucket: "proyecto-robotica-35bed.appspot.com",
    messagingSenderId: "990553561020"
  });
  
  // Initialize Cloud Firestore through Firebase
  var db = firebase.firestore();
 // const docRef = db.collection('Sensores').doc(`${ano}`).collection(`${meses}`).doc(`${dia}`).collection(`${hora}`).doc(`${minutos}`).collection(`${segundos}`).doc("Temperatura","Humedad","PH","Oxigeno");
 const docRef = db.collection('Sensores').doc('Temperatura');
  //se extrae el id del h1 dond se mostraran los datos de firestore
    var idData = document.getElementById('dataTemperature');

//leer documentos en tiempo real
var doc = db.collection('Sensores').doc('Temperatura');

var observer = doc.onSnapshot(docSnapshot => {
    const datareal = docSnapshot.data();
    console.log(`Received doc snapshot: ${docSnapshot}`);
    idData.innerHTML= `${datareal.valor}`+ " °C";
    // ...
}, err => {
    console.log(`Encountered error: ${err}`);
});