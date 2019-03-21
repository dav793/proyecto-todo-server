import * as http from 'http';

import App from './app';

process.on('uncaughtException', (err) => {
    console.log(err);
});

function normalizePort(val: number | string): number | string | boolean {
    // tslint:disable-next-line:no-shadowed-variable
    const port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port)) {
        return val;
    } else {
        if (port >= 0) {
            return port;
        } else {
            return false;
        }
    }
}

function onError(error: NodeJS.ErrnoException): void {
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

function onListening(): void {
    const addr = httpServer.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log(`Server is listening on ${bind}`);
}

const env = require('../config/environment');
const port = normalizePort(env.PORT || 8080);

App.set('port', port);

let httpServer: any;
httpServer = http.createServer(App);

httpServer.listen(port);
httpServer.on('error', onError);
httpServer.on('listening', onListening);
