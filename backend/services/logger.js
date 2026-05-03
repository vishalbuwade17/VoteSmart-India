import winston from 'winston';

/**
 * Creates a winston logger configured for Google Cloud structured logging.
 */
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: 'votesmart-backend' },
  transports: [
    new winston.transports.Console()
  ],
});

export default logger;
