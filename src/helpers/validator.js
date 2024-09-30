import { errors, utilities } from '.';
import _ from 'lodash';

export const required = (body, key, placement = 'body') => {
    if (!_.has(body, key)) throw new errors.internalError.InCompleteKeyError(key, placement);
    if (body[key] === '' || body[key] === null) throw new errors.internalError.InCompleteValueError(key);
};

export const integer = (body, key, placement = 'body') => {
    if (!utilities.isInteger(Number(body[key]))) {
        throw new errors.internalError.InvalidTypeError(key, placement);
    }
};