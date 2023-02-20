var http = require("http");
var fs = require("fs");
var xml2js = require('xml2js');

var parser = new xml2js.Parser();

const htmlHead = `<!DOCTYPE html><html>
<head>
    <meta charset="UTF-8">
</head>
<body>
`

http.createServer(function(req, res) {
    var d = new Date().toISOString().substring(0,16);
    console.log(req.method + " " + req.url + " " + d + "</pre>");

    if (req.url == '/index.html' || req.url == '/') {
        fs.readFile('./index.html', function(err, data) {
            if(err){
                res.end("Ficheiro não encontrado.");
            } else{
                res.end(data);
            }
        });
    } else{
        var x = req.url.substring(1);
        console.log(x);
        fs.readFile('arqs/arq'+x+'.xml', function(err, data){
            if(err){
                res.end("Ficheiro não encontrado.");
            } else{
                parser.parseString(data, function(err, result) {
                    console.log(result)
                    if (err) {
                        res.end("Erro ao converter XML para HTML.");
                    } else {
                        res.writeHead(200, {"Content-Type": "text/html"});
                        res.write(htmlHead);
                        var htmlBody = "<h1>"+ result.ARQELEM.IDENTI +"</h1>"
                        htmlBody += "<p><b>Crono: </b> "+ result.ARQELEM.CRONO + "</p>"
                        htmlBody += "<p><b>Lugar: </b> "+ result.ARQELEM.LUGAR + "</p>"
                        htmlBody += "<p><b>Freguesia: </b> "+ result.ARQELEM.FREGUE + "</p>"
                        htmlBody += "<p><b>Concelho: </b> "+ result.ARQELEM.CONCEL + "</p>"
                        htmlBody += "<p><b>Codadm: </b> "+ result.ARQELEM.CODADM + "</p>"
                        htmlBody += "<p><b>Latitude: </b> "+ result.ARQELEM.LATITU + "</p>"
                        htmlBody += "<p><b>Longitude: </b> "+ result.ARQELEM.LONGIT + "</p>"
                        htmlBody += "<p><b>Altitude: </b> "+ result.ARQELEM.ALTITU + "</p>"
                        htmlBody += "<p><b>Acesso: </b> "+ result.ARQELEM.ACESSO + "</p>"
                        htmlBody += "<p><b>Traarq: </b> "+ result.ARQELEM.TRAARQ + "</p>"
                        htmlBody += "<p><b>Deposito: </b> "+ result.ARQELEM.DEPOSI + "</p>"
                        htmlBody += "<p><b>Bibliotecas: </b> "+ result.ARQELEM.BIBLIO + "</p>"
                        htmlBody += "<p><b>Autor: </b> "+ result.ARQELEM.AUTOR + "</p>"
                        htmlBody += "<p><b>Data: </b> "+ result.ARQELEM.DATA + "</p>"
                        res.write(htmlBody);
                        res.write("</body></html>");
                        res.end();
                    }
                });
            }
        });
    }
}).listen(7777);

console.log("Servidor à escuta na porta 7777...");
