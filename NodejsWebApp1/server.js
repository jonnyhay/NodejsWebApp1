var http = require('http');
var url = require('url');
var fs = require('fs');
var os = require("os");
var port = process.env.port || 1337;

var choices = ["CreditScore800", "CreditScore720", "CreditScore560", "CreditScore420", "CreditScore305"];

function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// For todays date;
Date.prototype.today = function () {
    return ((this.getDate() < 10) ? "0" : "") + this.getDate() + "/" + (((this.getMonth() + 1) < 10) ? "0" : "") + (this.getMonth() + 1) + "/" + this.getFullYear();
}

// For the time now
Date.prototype.timeNow = function () {
    return ((this.getHours() < 10) ? "0" : "") + this.getHours() + ":" + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes() + ":" + ((this.getSeconds() < 10) ? "0" : "") + this.getSeconds();
}

http.createServer(function (req, res) {

    var path = url.parse(req.url).pathname;
    console.log(req.url);
    console.log(path);
    if (path == "/GetCustomerData") {
        
        customerInfo = getParameterByName('cusInfo', req.url);
        console.log("ajax req received: " + customerInfo);

        var resString = choices[Math.floor(Math.random() * choices.length)];
        console.log("string '" + resString + "' chosen");
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(resString);
        console.log("string sent");
        var datetime = new Date().today() + " @ " + new Date().timeNow();
        // log 
        fs.appendFile("./log_requests.txt", req.ip + "," + datetime + "," + resString + "," + customerInfo + os.EOL, function (err) {
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