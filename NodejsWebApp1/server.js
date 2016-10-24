var http = require('http');
var url = require('url');
var fs = require('fs');
var port = process.env.port || 1337;

var choices = ["testreply1", "testreply2", "testreply3", "testreply4", "testreply5"];

http.createServer(function (req, res) {

    var path = url.parse(req.url).pathname;

    if (path == "/GetCustomerData") {
        console.log("ajax req received");
        var string = choices[Math.floor(Math.random() * choices.length)];
        console.log("string '" + string + "' chosen");
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(string);
        console.log("string sent");
    }

    else {
        fs.readFile('./IndexPage.html', function (err, file) {
            if (err) {
                // write an error response or nothing here  
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(file, "utf-8");
        });
    }
    
    
}).listen(port);