$( document ).ready(function() {
console.log("hello");		
	var socket = io.connect('http://localhost:3000');
    socket.on('connect', function(data) {
		$('#flipBtn').on('change', function (event) {
			console.log($("#flipBtn").val());
			var btnStatus = $("#flipBtn").val();
			if(btnStatus === "on"){
				socket.emit('switch', 'on');
			}else if(btnStatus === "off"){
				socket.emit('switch', 'off');
			}
		});
    });
	
	socket.on('lightStatus', function(data) {
		console.log("data");
		if(data === 'Y'){
			$('#status').append("Light is ON");
		}else if(data === 'N'){
			$('#status').append("Light id OFF");
		}
    });
});