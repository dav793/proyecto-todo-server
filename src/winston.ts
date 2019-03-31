/**
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

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const debugConsoleTransport = new transports.Console({
    level: 'debug',
    format: format.combine(
        format.colorize(),
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.printf(
            // tslint:disable-next-line:max-line-length
            // info => `${info.timestamp} ${info.level}: ${typeof info.message === 'string' || typeof info.message === 'number' ? info.message : JSON.stringify(info.message)}`
            // tslint:disable-next-line:arrow-parens
            info => `${info.timestamp} ${info.level}: ${info.message}`,
        ),
    ),
});

const errorFileTransport = new transports.DailyRotateFile({
    level: 'error',
    filename: `${logDir}/%DATE%-error.log`,
    datePattern: 'YYYY-MM-DD',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.printf(
            // tslint:disable-next-line:arrow-parens
            info => `${info.timestamp}: ${info.message}`,
        ),
    ),
    handleExceptions: true,
});

const combinedFileTransport = new transports.File({
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

const logger = createLogger({
    transports: [
        debugConsoleTransport,
        errorFileTransport,
        combinedFileTransport,
    ],
    exitOnError: true,
});

// create a stream object with a 'write' function that will be used by morgan
logger.stream = {
    write: (message, encoding) => {
        logger.info(message.trim());
    },
};

module.exports = logger;
