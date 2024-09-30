import { errors } from '../../../helpers';
import { User, Following } from '../models';

const create = async (username) => {
    try {
        await User.create(null, { username });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') throw new errors.internalError.AlreadyUsedError('username');
        throw error;
    }
};

const findById = async (id) => {
    const user = await User.findById(null, id);
    return user;
};

const findByUsername = async (username) => {
    const selects = [
        User.pk,
        `${User.tableName}.username`,
    ];
    const wheres = { username };

    const user = await User.findOne(null, wheres, selects);
    return user;
};

const upsertFollow = async (data) => {
    await Following.upsert(null, [data]);
};

const deleteFollow = async (wheres) => {
    const result = await Following.deleteWhere(null, wheres);
    return !!result;
};

export {
    create,
    findById,
    findByUsername,
    upsertFollow,
    deleteFollow,
};
