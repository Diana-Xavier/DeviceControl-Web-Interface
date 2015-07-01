// server.js
var express        = require('express');  
var app            = express();  
var httpServer = require("http").createServer(app);  
var j5 = require("johnny-five");  
var io=require('socket.io')(httpServer);
 
var port = 3000; 
 
app.use(express.static(__dirname + '/public'));
 
app.get('/', function(req, res) {  
        res.sendFile(__dirname + '/public/index.html');
});
 
httpServer.listen(port);  
console.log('Server available at http://localhost:' + port);  
var led;
 
//Arduino board connection
 var board = new j5.Board({
     port: "COM36"
});
board.on("ready", function() {  
    console.log('Arduino connected');
    led = new j5.Led(2);
});
 
//Socket connection handler
io.on('connection', function (socket) {  
        console.log(socket.id);
 
        socket.on('led:on', function (data) {
           led.on();
           console.log('LED ON RECEIVED');
        });
 
        socket.on('led:off', function (data) {
            led.off();
            console.log('LED OFF RECEIVED');
 
        });
    });
 
console.log('Waiting for connection');
 