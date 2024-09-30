import constants from '../constant';
import { SleepSessionRepository } from '../data/sql/repositories';

const createUpdateSession = async (trx, userId) => {
    const currentTimestamp = Math.floor(Date.now() / 1000);

    const currentSession = await SleepSessionRepository.getSession(trx, {
        user_id: userId,
        status: constants.ENUM.SLEEP_SESSION.STATUS.OPEN
    });

    if (!currentSession) {
        await SleepSessionRepository.createSession(trx, {
            user_id: userId,
            start_at: currentTimestamp,
        });
        return constants.ENUM.SLEEP_SESSION.CLOCK_IN;
    }

    const duration = currentTimestamp - currentSession.start_at;

    await SleepSessionRepository.updateSession(trx, currentSession.id, {
        end_at: currentTimestamp,
        duration,
        status: constants.ENUM.SLEEP_SESSION.STATUS.COMPLETED,
    });

    return constants.ENUM.SLEEP_SESSION.CLOCK_OUT;
};

const setSleepSession = async (userId) => {
    const result = await SleepSessionRepository.lib.transaction(async (trx) => {
        return await createUpdateSession(trx, userId);
    });

    return result;
};

const getFriendsSessions = async (userId, statuses, limit, offset) => {
    const sessions = await SleepSessionRepository.getFriendsSessionsByStatuses(userId, statuses, limit, offset);
    return sessions;
};

export {
    createUpdateSession,
    setSleepSession,
    getFriendsSessions,
};
