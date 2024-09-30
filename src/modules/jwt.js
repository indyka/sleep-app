import jwt from 'jsonwebtoken';
import config from 'config';

const generateJwt = (user) => {
    const exp = Math.floor(Date.now() / 1000) + config.app.jwt.expiresIn;

    const token = jwt.sign({
        data: { user },
        exp: exp,
        sub: config.app.jwt.subject,
        iss: config.app.jwt.issuer,
    }, config.app.secretKey);

    return token;
};

const verifyJwt = (token) => {
    const options = config.app.jwt;
    jwt.verify(token, `${config.app.secretKey}`, options);
    return jwt.decode(token, { complete: true });
};

export {
    generateJwt,
    verifyJwt,
};
