import winston from "winston";

// Create logger instance
const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    // Print to console
    new winston.transports.Console(),

    // Save errors separately
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),

    // Save all logs
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

export default logger;
