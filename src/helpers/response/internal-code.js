import { httpCode } from '.';

const CODE = {
    SUCCESS: {
        OK: {
            code: 'SSR001',
            status: 'success',
            text: 'success',
        },
    },
    CLIENT_ERROR: {
        NOT_FOUND: {
            code: 'CLE001',
            status: 'error',
            text: (key) => `Resources not found: ${key}`,
            httpCode: httpCode.CLIENT_ERROR.NOT_FOUND,
        },
        UNAUTHORIZED: {
            code: 'CLE002',
            status: 'error',
            text: 'Unauthorized user',
            httpCode: httpCode.CLIENT_ERROR.UNAUTHORIZED,
        },
        EXPIRED_TOKEN: {
            code: 'CLE003',
            status: 'error',
            text: 'Expired token',
            httpCode: httpCode.CLIENT_ERROR.UNAUTHORIZED,
        },
        BAD_REQUEST_KEY: {
            code: 'CLE004',
            status: 'error',
            text: (key, placement) => `Missing required key: ${key} in ${placement}`,
            httpCode: httpCode.CLIENT_ERROR.BAD_REQUEST,
        },
        BAD_REQUEST_VALUE: {
            code: 'CLE005',
            status: 'error',
            text: (key, placement) => `Missing required value for key: ${key} in ${placement}`,
            httpCode: httpCode.CLIENT_ERROR.BAD_REQUEST,
        },
        BAD_REQUEST_TYPE: {
            code: 'CLE006',
            status: 'error',
            text: (key, placement) => `Value is invalid data type: ${key} in ${placement}`,
            httpCode: httpCode.CLIENT_ERROR.BAD_REQUEST,
        },
        DUPLICATE_VALUE: {
            code: 'CLE007',
            status: 'error',
            text: (key) => `Value has been used: ${key}`,
            httpCode: httpCode.CLIENT_ERROR.BAD_REQUEST,
        },
    },

    SERVER_ERROR: {
        INTERNAL_SERVER_ERROR: {
            code: 'ISE001',
            status: 'error',
            text: 'Server error, please try again later',
        },
    },
};

export default CODE;
