var express = require('express');  
var app = express();  
var httpServer = require("http").createServer(app);  
var io = require('socket.io')(httpServer);
var serialport = require('serialport');
var SerialPort = serialport.SerialPort;

var port = 3000; 
var serialPortNo='COM36';
 
app.use(express.static(__dirname + '/public'));
 
app.get('/', function(req, res) {  
        res.sendFile(__dirname + '/public/index.html');
});
 
httpServer.listen(port);  
console.log('Server available at http://localhost:' + port); 

var serialPort = new SerialPort(serialPortNo, {
  baudrate: 9600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false,
  parser: serialport.parsers.readline("\r")
});

io.listen(httpServer).on('connection', function (socket) {
	console.log('Client connected...');
    socket.on('switch', function(data) {
        console.log(data);
		if(data === "on"){
			serialPort.write(data + 1);
		}else if(data === "off"){
			serialPort.write(data + 0);
		}
    });
	
    serialPort.on('data', function(data) {  
       socket.emit('data',data);
    });  

});
 
