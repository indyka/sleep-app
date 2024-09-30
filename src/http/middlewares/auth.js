import { errors, validator } from '../../helpers';
import { jwt } from '../../modules';

export default (req, res, next) => {
    const { headers } = req;

    validator.required(headers, 'authorization', 'header');

    let token = headers.authorization;
    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }

    try {
        jwt.verifyJwt(token);
        const decodedJwt = jwt.verifyJwt(token);
        req.user = decodedJwt.payload.data.user;
    } catch (error) {
        if (error.name !== 'TokenExpiredError') {
            throw new errors.internalError.UnauthorizedError();
        }
        throw new errors.internalError.ExpiredTokenError();
    }

    next();
};
