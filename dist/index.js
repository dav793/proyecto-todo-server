"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const app_1 = require("./app");
function normalizePort(val) {
    let port = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port)) {
        return val;
    }
    else {
        if (port >= 0) {
            return port;
        }
        else {
            return false;
        }
    }
}
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    const addr = httpServer.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log(`Server is listening on ${bind}`);
}
const env = require('../config/environment.template');
const port = normalizePort(env.PORT || 8080);
app_1.default.set('port', port);
let httpServer;
httpServer = http.createServer(app_1.default);
httpServer.listen(port);
httpServer.on('error', onError);
httpServer.on('listening', onListening);
//# sourceMappingURL=index.js.map