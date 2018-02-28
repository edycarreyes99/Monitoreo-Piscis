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