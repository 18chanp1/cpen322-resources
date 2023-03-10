// This is the server corresponding to the AJAX client we developed earlier
// in the AJAX lecture (lecture 6). We'd earlier used a Python server.
// The main difference is that there is no error introduced here. 
// Can you add errors and delays as an exercise similar to Python ?

var http = require("http");
if (! http) process.exit(1);

var fs = require("fs");
if (! fs) process.exit(2);

var path="./client";

var serveRequest = function(request, response) {
	if ( request.url.startsWith("/hello") ) {
		
		// If it's an AJAX request, return world
		console.log( "Received " + request.url );
		setTimeout( function() {
			var count = request.url.split("-")[1];
			response.write("world-" + count);
			response.statusCode = 200;
			response.end();
		}, 1000);
	} else if ( request.url.endsWith(".html") || request.url.endsWith(".js")) {
		
		// If it's a HTML or JS file, retrieve the file in the request
		response.statusCode = 200;
		var fileName = path + request.url;
		var rs = fs.createReadStream(fileName);
		console.log("Reading from file " + fileName);
		rs.on("error", function(error) {	
			console.log(error);
			response.write("Unable to read file : " + fileName);
			response.statusCode = 404;
			response.end();
		});
		rs.on("data", function(data) {
			response.write(data);
		});
		rs.on("end", function() {
			response.end();
		});
	} else {
		
		// It's an unknown request, so return an error message
		response.write("Unknown request " + request.url);
		response.statusCode = 404;
		response.end();
	}
};


// Start the server on the port and setup response
var port = 8080;
var server = http.createServer(serveRequest);
server.listen(port);
console.log("Starting server on port " + port);
