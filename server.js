//archivo de configuracion de envio y recepcion de datos a la base de datos

//variables para trabajar con la fechas y almacenarlas
var dia_semana = [
"Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"
];

var mes = [
"Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
];
//integracion de las dependencias de SerialPort
const SerialPort = require('serialport');
const ReadLine = SerialPort.parsers.Readline;

//integracion de las dependencias de Express
const express = require('express');
const app = express();
//integracion de las dependencias de Socket.io
const socket = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = socket.listen(server);
const PORT = process.env.PORT || 3000;
//integracion de las dependencias de firebase
const firebase = require('firebase');
firebase.initializeApp({
    databaseURL: "https://proyecto-robotica-35bed.firebaseio.com"
});
//integracion de las dependencias de firestrore
var admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "proyecto-robotica-35bed",
        "private_key_id": "6a6a807f2ac9f58d4b7994a03050130cdcd6e93f",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDUrXT9A45TEXgV\nCT0c9u7jE14niIdwe4ARjbKck3HcH8Mi9A+N9cYw2TBiDF/0YGStH5+DtIVABfqp\nbe3ALVqHhQxLw7ZO9SKO7YfVeb2ZJVfbEg+VvzkroWCyT1wDLghP5Lgl+FfRS+xg\nJn6Wx5DI5ij7OINQoaK4tMMPUqp26JTKqnZSCCG8h5QFE+dKmCyMFxxzXFXl8RQk\nPS/qYfCZXPlLiOZ2UxJPw3PhBGKB3qb8eZ02gFVebsC/EjATM0iWeCRlrtyGLBzu\nqJkGfq6dgWcGGvGZJNZW4NivuyGZj60nFsng2yEY3wZ4GyXjSC9JYasDbBdt4bRP\nP2AY8c01AgMBAAECggEALuzGrzylnnZwRFPxg/6H3tpbH+Xj3FGjhDv7eMifiq4H\nZCLte6kKvaRuJHQOh+Ds1bXwgCLIc8Pd9pwmpQxcuSIGAIGCLBGyOk72dYeS6cNv\niwqFHck/V/0XVMBl0N3LP7V7XAVbevaBhQV5UNNfgrQlvqhNcPD48kAP+cWHjwyD\nBUbkzmX6YeNtyrqCWUQaG08+xa8aOYKRpgQTDzKhuj7Wm6dPmvOvkkA+gaHIc+L1\n2wucpyJxeFV12fHOR88lTWiajMdeveFrE2ehNPoBz8ZlUtKaSZUQAQBYUNHk84yC\nQXlnGa2NUXoyBrmzpTDZdRkamM/agcKP3Gm9n9ZogQKBgQD3DHURz/gWqkAHWKFw\nJipmszSsjkcCN8LDbufCaXOmQMYNVtjv5o/fwav0by3cOwWkO1cNXA5D1wnJKdlZ\ne6VTIJ9gqUZBoAfPLGVsfzIfJOD1HbH2Ad9kza6E+24xARBGZAZ2UO6bczBtYbhl\nZRwvA9h1PUOtj9pcfP/AlaoM6QKBgQDcYi9D+wm6D2ovKILyS54UmuWEIb1N3NWr\nIUwz30x1mWBOszgnzznpTAYQTRRPXWCp2EQQMbT6myvHpqYaedt7k3wjUCruyzqY\nB8F/ugRrm1KrY498r25Y2vuiN/qw6BGs59LG8BSfKHzk2CSs01rVmxtzWZ/SStqh\nIlAocW8ebQKBgEw/cQZtXJGKPDbIORNHBEEsQC6dvvbFRPxSh38uUr5WMYo+argo\nPfF+cdcAVXQqV0Rn+CcsaU6w2NlYbDe8/LqaT/ZiaEeq354mgqso2sxX8oJUhu95\nhnwzKxDqFQlU3bQL/R6ZPfuGYsTvqxzIRxmPo0gT/4Za5rcy8TB8QL65AoGAUHM3\nNeXKYzWFWbm8M58PEg6JgnaemHHpPhNlsfnt+3AGDDS4Zy/qwBOUkxbQNzirNNVR\n42eB3YoPrU5UjI23ZaEtS+bUBWAC/8S1Cl9pha6puw8ZLjcMXTtzaIBu722IJkpq\nU10I6iDpltCgcsak/h0lJDKveSECNphEEr92BPECgYBEfWqsJ5AilvZpw2/AA31+\nZt+ieAExfvaRtiGrldM9toKcUbHLeNklL8mgAqNHy3lJcBnkvXPaQiiO7wIljTKl\n+NqRxuhpnNzifX6i76lU9IlFaIU+LH6kH93WNDf34fHIK/8j5LmXRuMOaSLABwJ3\nbmCdCLNuAJ5MnwhAYcQWZQ==\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-4nqlo@proyecto-robotica-35bed.iam.gserviceaccount.com",
        "client_id": "117915194449686656264",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://accounts.google.com/o/oauth2/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-4nqlo%40proyecto-robotica-35bed.iam.gserviceaccount.com"
    }),
    databaseURL: "https://proyecto-robotica-35bed.firebaseio.com/"
  });

//ph, temperatura, amonio, oxigeno, posible streaming

  var db = admin.firestore();

//envia la ruta de enlace de este archivo al index.html para mostrar los datos
app.get('/',(req,res,next) => {
    res.sendFile(__dirname + '/pages/datos.html');
});

//se abre el puerto serial para recibir datos 
const mySerial = new SerialPort('COM6',{
    baudRate: 9600,
});
//se lee la salida de arduino delimitando los caracteres nulos y los espacios en blanco
const parser = mySerial.pipe(new ReadLine({ delimeter: '\r \n'}));
//dispone si se realizo correctamente la conexion
parser.on('open',function(){
    console.log('Puerto Serial Abierto');
});

//muestra dato por dato en consola
parser.on('data',function(data){
    var fecha = new Date();
    let temp = parseInt(data.toString()) + " °C";
    console.log(temp);
    //se envian los datos a todos los clientes
    io.emit('temperature',data)
    //se envian los datos a la firebase
    //se definen las direcciones de datos donde se guardaran
    let ano = fecha.getFullYear();
    let meses = mes[fecha.getMonth()];
    let dia = fecha.getDate();
    let hora = fecha.getHours();
    let minutos = fecha.getMinutes();
    let segundos = fecha.getSeconds();
    const docRef = db.collection('Sensores').doc(`${ano}`).collection(`${meses}`).doc(`${dia}`).collection(`${hora}`).doc(`${minutos}`).collection(`${segundos}`).doc("Temperatura","Humedad","PH","Oxigeno");
    //const docRef = db.collection('Sensores').doc('Temperatura');
    const ref = firebase.database().ref('temperature');
    const temperatureAno = ref.child(fecha.getFullYear());
    const temperatureMonth = temperatureAno.child(mes[fecha.getMonth()]);
    const temperatureDay = temperatureMonth.child(fecha.getDate());
    const temperatureHour = temperatureDay.child(fecha.getHours());
    const temperatureMinutes = temperatureHour.child(fecha.getMinutes());
    const temperatureSeconds = temperatureMinutes.child(fecha.getSeconds());
temperatureSeconds.push({
        valor: data,
        hora: fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds()
    });
    //elimina todos los datos cuando la base de datos se llena:
    //ref.remove();
    docRef.set({
        valor: data,
        hora: fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds()
    }).then(function(){
        //something to do
    }).catch(function(error){
        console.log("Hay un error: ",error);
    });
});

//define y muestra en consola el tipo de error que hay
parser.on('err',function(){
    console.log(err.message());
});

//se configura la escucha del servidor
server.listen(PORT,() =>{
    console.log(`Servidor abierto en http://localhost:${PORT}`);
});