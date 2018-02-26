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
//integracion de las dependencias de firebase
const firebase = require('firebase');
firebase.initializeApp({
    databaseURL: "https://proyecto-robotica-35bed.firebaseio.com"
});

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
});

//define y muestra en consola el tipo de error que hay
parser.on('err',function(){
    console.log(err.message());
});

//se configura la escucha del servidor
server.listen(3000,() =>{
    console.log('servidor abierto en puerto 3000');
});