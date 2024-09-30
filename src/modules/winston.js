import winston from 'winston';

const logger = winston.createLogger({
    transports: [
        new winston.transports.Stream({
            stream: process.stderr,
            level: 'debug',
            format: winston.format.combine(
                winston.format.printf(info => `${new Date().toISOString()}-${info.level}: ${JSON.stringify({ ...info }, null, 4)}\n`),
            ),
        }),
    ],
    exitOnError: false,
});

export default logger;
