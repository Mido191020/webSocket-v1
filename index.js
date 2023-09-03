const http = require('http');
const WebSocketServer = require("websocket").server;
let connection = null;

const httpserver = http.createServer((req, res) => {
    console.log("request received");
});

const websocket = new WebSocketServer({
    "httpServer": httpserver
});

websocket.on("request", request => {
    connection = request.accept(null, request.origin);
    connection.on("open", () => console.log("opened!"));
    connection.on("close", () => console.log("closed!"));
    connection.on("message", message => {
        console.log(`Received message ${message.utf8Data}`);
    });
    sendevery5send(); 
});

httpserver.listen(8080, () => console.log("My server is listening on port 8080"));
function sendevery5send() {
    connection.send(`Message ${Math.random()}`);
    setTimeout(sendevery5send, 5000);
}