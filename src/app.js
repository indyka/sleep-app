import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import { routes } from './http';
import { logger, response } from './helpers';
import bodyParser from 'body-parser';
import constant from './constant';

logger.info(`App environment: ${process.env.NODE_ENV}`);

// START INIT HTTP SERVER

const http = express();

http.use(cors());
http.use(helmet());
http.use(compression());
http.use(bodyParser.json({ limit: constant.PARSER.JSON_LIMIT }));
http.enable('trust proxy');

http.use('/', routes);

http.use((err, req, res, next) => {
    logger.error(req, err);
    response.httpResponse.errorHandler(res, err);
});

// END INIT HTTP SERVER

export { http };
