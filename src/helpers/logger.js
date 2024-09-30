import { logger } from '../modules';

export const info = (data, requestId) => {
    logger.info('INFO', { requestId, data });
};

export const error = (req, error) => {
    logger.error('ERROR', {
        stack: error.stack,
        message: error.message,
    });
};

export const rawResponse = (res, data) => {
    logger.info('RAW_RESPONSE', {
        requestId: res.locals.requestId,
        rawResponse: data,
    });
};

