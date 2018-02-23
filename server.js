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
//integracion de las dependencias de firebase
const firebase = require('firebase');
firebase.initializeApp({
    databaseURL: "https://proyecto-robotica-35bed.firebaseio.com"
});
const ref = firebase.database().ref('temperature');
const temperatureRef = ref.child("today");

//envia la ruta de enlace de este archivo al index.html para mostrar los datos
app.get('/',(req,res,next) => {
    res.sendFile(__dirname + '/index.html');
});

//se abre el puerto serial para recibir datos 
const mySerial = new SerialPort('COM6',{
    baudRate: 9600,
});
const parser = mySerial.pipe(new ReadLine({ delimeter: '\r\n'}));
//dispone si se realizo correctamente la conexion
parser.on('open',function(){
    console.log('Puerto Serial Abierto');
});

//muestra dato por dato en consola
parser.on('data',function(data){
    let temp = parseInt(data) + " °C"
    console.log(temp);
    //se envian los datos al index.html
    io.emit('temperature',data)
    //se envian los datos a la firebase
    temperatureRef.push({
        valor: data,
        fecha: 'hoy'
    });
});

//define y muestra en consola el tipo de error que hay
parser.on('err',function(){
    console.log(err.message());
});

//se configura la escucha del servidor
server.listen(3000,() =>{
    console.log('servidor abierto en puerto 3000');
});