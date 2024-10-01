import knex from '../knex';
import { Following, SleepSession, User } from '../models';

const lib = knex;

const getSession = async (trx, filters) => {
    const result = await SleepSession.findOne(trx, filters);
    return result;
};

const createSession = async (trx, data) => {
    await SleepSession.create(trx, data);
};

const updateSession = async (trx, id, data) => {
    await SleepSession.update(trx, id, data);
};

const getSessionsByUserId = async (userId) => {
    const selects = [
        `${SleepSession.tableName}.id`,
        `${SleepSession.tableName}.start_at`,
        `${SleepSession.tableName}.end_at`,
        `${SleepSession.tableName}.duration`,
    ];

    const results = await SleepSession.find(null, { user_id: userId }, selects)
        .orderBy(`${SleepSession.tableName}.created_at`, 'DESC');
    return results;
};

const getFriendsSessionsByStatuses = async (userId, statuses, limit, offset) => {
    const selects = [
        `${SleepSession.tableName}.id`,
        `${SleepSession.tableName}.start_at`,
        `${SleepSession.tableName}.end_at`,
        `${SleepSession.tableName}.duration`,
        `${SleepSession.tableName}.user_id`,
        `${User.tableName}.username`,
    ];

    const results = await SleepSession.find(null, {}, selects)
        .join(Following.tableName, `${Following.tableName}.following_user_id`, `${SleepSession.tableName}.user_id`)
        .join(User.tableName, User.pk, `${SleepSession.tableName}.user_id`)
        .where(`${Following.tableName}.user_id`, userId)
        .whereIn(`${SleepSession.tableName}.status`, statuses)
        .orderBy(`${SleepSession.tableName}.created_at`, 'DESC')
        .limit(limit)
        .offset(offset);
    return results;
};

export {
    lib,
    getSession,
    createSession,
    updateSession,
    getSessionsByUserId,
    getFriendsSessionsByStatuses,
};
