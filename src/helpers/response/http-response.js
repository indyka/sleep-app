import * as apiResponse from './api-response';
import HTTP_CODE from './http-code';
import INTERNAL_CODE from './internal-code';
import * as logger from '../logger';
import { internalError } from '../errors';

/**
 * Good Response http handler
 */
export const ok = (res, message, data) => {
    const response = apiResponse.successResponse(INTERNAL_CODE.SUCCESS.OK.code, INTERNAL_CODE.SUCCESS.OK.status, message, data);
    logger.rawResponse(res, response);
    res.status(HTTP_CODE.SUCCESS.OK.code)
        .send(response);
};

/**
 * Bad Response http handler
 */
export const clientError = (res, error) => {
    res.status(error.status)
        .send(apiResponse.errorResponse(error.data));
};
export const internalServerError = (res, error) => {
    if (!error.data) {
        error = new internalError.ServerError();
    }
    res.status(error.status || HTTP_CODE.SERVER_ERROR.INTERNAL_SERVER_ERROR.code)
        .send(apiResponse.errorResponse(error.data));
};

/**
 * Handler general error
 */
export const errorHandler = (res, error) => {
    if (!error.status || error.status >= HTTP_CODE.SERVER_ERROR.INTERNAL_SERVER_ERROR.code) {
        return internalServerError(res, error);
    }

    return clientError(res, error);
};
