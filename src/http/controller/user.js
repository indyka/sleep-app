import {
    utilities, response, validator,
} from '../../helpers';
import { UserLogic } from '../../logics';

const register = utilities.controllerWrapper(async (req, res) => {
    const { body } = req;

    validator.required(body, 'username');

    const result = await UserLogic.register(body.username);

    return response.httpResponse.ok(res, 'Successfully register', { token: result });
});

const login = utilities.controllerWrapper(async (req, res) => {
    const { body } = req;

    validator.required(body, 'username');

    const result = await UserLogic.login(body.username);

    return response.httpResponse.ok(res, 'Successfully login', { token: result });
});

const follow = utilities.controllerWrapper(async (req, res) => {
    const { body, user } = req;

    validator.required(body, 'user_id');
    validator.integer(body, 'user_id');

    await UserLogic.follow(body.user_id, user.id);

    return response.httpResponse.ok(res, 'Successfully follow user');
});

const unfollow = utilities.controllerWrapper(async (req, res) => {
    const { body, user } = req;

    validator.required(body, 'user_id');
    validator.integer(body, 'user_id');

    await UserLogic.unfollow(body.user_id, user.id);

    return response.httpResponse.ok(res, 'Successfully unfollow user');
});

export {
    register,
    login,
    follow,
    unfollow,
};
