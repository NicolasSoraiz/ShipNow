const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const path = require("path");
const { combine, timestamp, printf, colorize, errors } = winston.format;

const levels = {
    debug: 5,
    http: 4,
    info: 3,
    warning: 2,
    error: 1,
    fatal: 0
};

const colors = {
    debug: "blue",
    http: "magenta",
    info: "green",
    warning: "yellow",
    error: "red",
    fatal: "red"
};

winston.addColors(colors);

const environment = process.env.NODE_ENV || "development";
const isDevelopment = environment === "development";

const logFormat = printf(({ timestamp, level, message, stack }) => {
    return `${timestamp} [${level}] ${stack || message}`;
});

const logger = winston.createLogger({
    levels,
    level: isDevelopment ? "debug" : "info",
    format: combine(
        errors({ stack: true }),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        logFormat
    ),
    transports: [
        new winston.transports.Console({
            level: isDevelopment ? "debug" : "info",
            format: combine(
                colorize(),
                timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
                errors({ stack: true }),
                logFormat
            )
        }),

        new DailyRotateFile({
            filename: path.join("logs", "application-%DATE%.log"),
            datePattern: "YYYY-MM-DD",
            maxSize: "10m",
            maxFiles: "14d",
            level: "debug"
        }),

        new DailyRotateFile({
            filename: path.join("logs", "error-%DATE%.log"),
            datePattern: "YYYY-MM-DD",
            maxSize: "10m",
            maxFiles: "14d",
            level: "error"
        })
    ]
});

module.exports = logger;