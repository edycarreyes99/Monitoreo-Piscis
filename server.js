//integracion de las dependencias de SerialPort
const SerialPort = require('serialport');
const ReadLine = SerialPort.parsers.Readline;
const parser = new ReadLine();
//integracion de las dependencias de Express
const express = require('express');
const app = express();
//integracion de las dependencias de Socket.io
const socket = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = socket.listen(server);

//envia la ruta de enlace de este archivo al index.html para mostrar los datos
app.get('/',(req,res,next) => {
    res.sendFile(__dirname + '/index.html');
});

//se abre el puerto serial para recibir datos 
const mySerial = new SerialPort('COM6',{
    baudRate: 9600,
});

//dispone si se realizo correctamente la conexion
mySerial.on('open',function(){
    console.log('Puerto Serial Abierto');
});

//muestra dato por dato en consola
mySerial.on('data',function(data){
    console.log(data.toString());
    //se envian los datos al index.html
    io.emit('arduino:data',{
        value: data.toString()
    });
});

//define y muestra en consola el tipo de error que hay
mySerial.on('err',function(){
    console.log(err.message());
});

//se configura la escucha del servidor
server.listen(3000,() =>{
    console.log('servidor abierto en puerto 3000');
});