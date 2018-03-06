firebase.initializeApp({
    apiKey: "AIzaSyBu_Yb1UXx6W12dkeSYvr7aj9ueNwj0NLQ",
    authDomain: "proyecto-robotica-35bed.firebaseapp.com",
    projectId: "proyecto-robotica-35bed",
  });
  
  //Leer documentos
  var tabla = document.getElementById('tabla');
  var db = firebase.firestore();
  docRef = db.collection('Sensores');

  db.collection("Sensores").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        tabla.innerHTML = `
      <tr>
      <th scope="row">${doc.id}</th>
      <td>primero</td>
      <td>segundo</td>
      <td>tercero</td>
    </tr>`;
    });
});