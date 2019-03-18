/*
 * Logging levels
 *      error:      0
 *      warn:       1
 *      info:       2
 *      verbose:    3
 *      debug:      4
 *      silly:      5
 */

const fs = require('fs');
const path = require('path');
const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');

const logDir = __dirname + '/../log';

export class Logger {
    public logger: any;

    // Transports section of the logger
    public debugConsoleTransport: any;
    public errorFileTransport: any;
    public combinedFileTransport: any;

    constructor() {
        this.createLogDirectory();
        this.setttingTransports();
        this.settingLogger();
    }

    // Creating the log directory if it does not exist
    private createLogDirectory() {
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir);
        }
    }

    private setttingTransports() {
        this.debugConsoleTransport = new transports.Console({
            level: 'debug',
            format: format.combine(
                format.colorize(),
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss',
                }),
                format.printf(
                    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
                ),
            ),
        });

        this.errorFileTransport = new transports.DailyRotateFile({
            level: 'error',
            filename: `${logDir}/%DATE%-error.log`,
            datePattern: 'YYYY-MM-DD',
            format: format.combine(
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss',
                }),
                format.printf(
                    (info) => `${info.timestamp}: ${info.message}`,
                ),
            ),
            handleExceptions: true,
        });

        this.combinedFileTransport = new transports.File({
            level: 'debug',
            filename: `${logDir}/combined.log`,
            format: format.combine(
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss',
                }),
                format.json(),
            ),
            handleExceptions: false,
        });
    }

    private settingLogger() {
        this.logger = createLogger({
            transports: [
                this.debugConsoleTransport,
                this.errorFileTransport,
                this.combinedFileTransport,
            ],
            exitOnError: true,
        });

        // create a stream object with a 'write' function that will be used by morgan
        this.logger.stream = {
            write: (message, encoding) => {
                this.logger.info(message.trim());
            },
        };
    }
}

export default new Logger().logger;
