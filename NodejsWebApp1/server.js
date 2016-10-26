var http = require('http');
var url = require('url');
var fs = require('fs');
var os = require("os");
var port = process.env.port || 1337;

var choices = ["testreply1", "testreply2", "testreply3", "testreply4", "testreply5"];

http.createServer(function (req, res) {

    var path = url.parse(req.url).pathname;

    if (path == "/GetCustomerData") {
        console.log("ajax req received");
        var resString = choices[Math.floor(Math.random() * choices.length)];
        console.log("string '" + resString + "' chosen");
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(resString);
        console.log("string sent");

        // log 
        fs.appendFile("./log_requests.txt", req.ip + "," + req.url + "," + resString + os.EOL, function (err) {
        if (err) {
            return console.log(err);
        }
            
    }); 
    }

    else {
        fs.readFile('./IndexPage.html', function (err, file) {
            if (err) {
                // write an error response or nothing here  and another one here for github 
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(file, "utf-8");
        });
    }
    
    
}).listen(port);