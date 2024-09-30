import { internalCode } from '../response';

const errorFormat = (internalCode, message, data) => ({
    code: internalCode.code,
    status: internalCode.status,
    message,
    data,
});

class DomainError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

class ResourceNotFoundError extends DomainError {
    constructor(key) {
        super(internalCode.CLIENT_ERROR.NOT_FOUND.text(key));
        this.data = errorFormat(internalCode.CLIENT_ERROR.NOT_FOUND, internalCode.CLIENT_ERROR.NOT_FOUND.text(key));
        this.status = internalCode.CLIENT_ERROR.NOT_FOUND.httpCode.code;
    }
}

class UnauthorizedError extends DomainError {
    constructor() {
        super(internalCode.CLIENT_ERROR.UNAUTHORIZED.text);
        this.data = errorFormat(internalCode.CLIENT_ERROR.UNAUTHORIZED, internalCode.CLIENT_ERROR.UNAUTHORIZED.text);
        this.status = internalCode.CLIENT_ERROR.NOT_FOUND.httpCode.code;
    }
}

class ExpiredTokenError extends DomainError {
    constructor() {
        super(internalCode.CLIENT_ERROR.EXPIRED_TOKEN.text);
        this.data = errorFormat(internalCode.CLIENT_ERROR.EXPIRED_TOKEN, internalCode.CLIENT_ERROR.EXPIRED_TOKEN.text);
        this.status = 401;
    }
}

class InCompleteKeyError extends DomainError {
    constructor(key, placement) {
        super(internalCode.CLIENT_ERROR.BAD_REQUEST_KEY.text(key, placement));
        this.data = errorFormat(internalCode.CLIENT_ERROR.BAD_REQUEST_KEY, internalCode.CLIENT_ERROR.BAD_REQUEST_KEY.text(key, placement));
        this.status = 400;
    }
}

class InCompleteValueError extends DomainError {
    constructor(key, placement) {
        super(internalCode.CLIENT_ERROR.BAD_REQUEST_VALUE.text(key, placement));
        this.data = errorFormat(internalCode.CLIENT_ERROR.BAD_REQUEST_VALUE, internalCode.CLIENT_ERROR.BAD_REQUEST_VALUE.text(key, placement));
        this.status = 400;
    }
}

class InvalidTypeError extends DomainError {
    constructor(key, placement) {
        super(internalCode.CLIENT_ERROR.BAD_REQUEST_TYPE.text(key, placement));
        this.data = errorFormat(internalCode.CLIENT_ERROR.BAD_REQUEST_TYPE, internalCode.CLIENT_ERROR.BAD_REQUEST_TYPE.text(key, placement));
    }
}

class AlreadyUsedError extends DomainError {
    constructor(key) {
        super(internalCode.CLIENT_ERROR.DUPLICATE_VALUE.text(key));
        this.data = errorFormat(internalCode.CLIENT_ERROR.DUPLICATE_VALUE, internalCode.CLIENT_ERROR.DUPLICATE_VALUE.text(key));
        this.status = 400;
    }
}

class ServerError extends DomainError {
    constructor() {
        super(internalCode.SERVER_ERROR.INTERNAL_SERVER_ERROR.text);
        this.data = errorFormat(internalCode.SERVER_ERROR.INTERNAL_SERVER_ERROR, internalCode.SERVER_ERROR.INTERNAL_SERVER_ERROR.text);
    }
}

export {
    ResourceNotFoundError,
    UnauthorizedError,
    ExpiredTokenError,
    InCompleteKeyError,
    InCompleteValueError,
    InvalidTypeError,
    AlreadyUsedError,
    ServerError,
};
