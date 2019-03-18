"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const path = require('path');
const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
const logDir = __dirname + '/../log';
class Logger {
    constructor() {
        this.createLogDirectory();
        this.setttingTransports();
        this.settingLogger();
    }
    createLogDirectory() {
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir);
        }
    }
    setttingTransports() {
        this.debugConsoleTransport = new transports.Console({
            level: 'debug',
            format: format.combine(format.colorize(), format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
            }), format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)),
        });
        this.errorFileTransport = new transports.DailyRotateFile({
            level: 'error',
            filename: `${logDir}/%DATE%-error.log`,
            datePattern: 'YYYY-MM-DD',
            format: format.combine(format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
            }), format.printf((info) => `${info.timestamp}: ${info.message}`)),
            handleExceptions: true,
        });
        this.combinedFileTransport = new transports.File({
            level: 'debug',
            filename: `${logDir}/combined.log`,
            format: format.combine(format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
            }), format.json()),
            handleExceptions: false,
        });
    }
    settingLogger() {
        this.logger = createLogger({
            transports: [
                this.debugConsoleTransport,
                this.errorFileTransport,
                this.combinedFileTransport,
            ],
            exitOnError: true,
        });
        this.logger.stream = {
            write: (message, encoding) => {
                this.logger.info(message.trim());
            },
        };
    }
}
exports.Logger = Logger;
exports.default = new Logger().logger;
//# sourceMappingURL=winston.js.map