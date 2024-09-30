import * as config from 'config';
import * as app from './app';
import { logger } from './helpers';

// START HTTP SERVER

const port = process.env.PORT || config.app.port;
const server = app.http.listen(port, () => {
    logger.info(`Listening HTTP on port ${port}`);
});

export default server;
