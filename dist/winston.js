const fs = require('fs');
const path = require('path');
const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
const logDir = __dirname + '/../log';
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}
const debugConsoleTransport = new transports.Console({
    level: 'debug',
    format: format.combine(format.colorize(), format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
    }), format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)),
});
const errorFileTransport = new transports.DailyRotateFile({
    level: 'error',
    filename: `${logDir}/%DATE%-error.log`,
    datePattern: 'YYYY-MM-DD',
    format: format.combine(format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
    }), format.printf(info => `${info.timestamp}: ${info.message}`)),
    handleExceptions: true,
});
const combinedFileTransport = new transports.File({
    level: 'debug',
    filename: `${logDir}/combined.log`,
    format: format.combine(format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
    }), format.json()),
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
logger.stream = {
    write: (message, encoding) => {
        logger.info(message.trim());
    },
};
module.exports = logger;
//# sourceMappingURL=winston.js.map