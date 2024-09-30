import { UserRepository } from '../data/sql/repositories';
import { errors } from '../helpers';
import { jwt } from '../modules';

const register = async (username) => {
    await UserRepository.create(username);
    const user = await UserRepository.findByUsername(username);

    return jwt.generateJwt(user);
};

const login = async (username) => {
    const user = await UserRepository.findByUsername(username);
    if (!user) throw new errors.internalError.ResourceNotFoundError('user');

    return jwt.generateJwt(user);
};

const follow = async (followingId, userId) => {
    const user = await UserRepository.findById(followingId);
    if (!user) throw new errors.internalError.ResourceNotFoundError('following user');
    if (user.id === userId) throw new errors.internalError.ResourceNotFoundError('followinng user');

    await UserRepository.upsertFollow({
        following_user_id: followingId,
        user_id: userId,
    });
};

const unfollow = async (followingId, userId) => {
    const result = await UserRepository.deleteFollow({
        following_user_id: followingId,
        user_id: userId,
    });
    if (!result) throw new errors.internalError.ResourceNotFoundError('followed user');
};

export {
    register,
    login,
    follow,
    unfollow,
};
