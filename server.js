const express = require('express')
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const PORT = process.env.PORT || 8080;

app.use(express.static('public'));  

let messages = [];

io.on('connection', function(socket){
    console.log('Un cliente se ha conectado');
    socket.emit('messages', messages); // emitir todos los mensajes a un cliente nuevo

    socket.on('new-messages', function(data){
        messages.push(data); // agregar mensajes a el array
        io.sockets.emit('messages', messages); // emitir a todos los clientes
    });
});

const srv = server.listen(PORT, ()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
});
srv.on('error', (error)=> console.log(error));
