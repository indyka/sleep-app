import constants from '../../constant';
import { response, utilities, validator } from '../../helpers';
import { TimelineLogic } from '../../logics';

const setSleep = utilities.controllerWrapper(async (req, res) => {
    const { user } = req;

    const result = await TimelineLogic.setSleepSession(user.id);

    return response.httpResponse.ok(res, `Successfully ${result.message}`, result.sessions);
});

const getTimeline = utilities.controllerWrapper(async (req, res) => {
    const { user, query } = req;

    if (query.limit) validator.integer(query, 'limit', 'query');
    if (query.offset) validator.integer(query, 'offset', 'query');

    const statuses = [
        constants.ENUM.SLEEP_SESSION.STATUS.OPEN,
        constants.ENUM.SLEEP_SESSION.STATUS.COMPLETED,
    ];

    const result = await TimelineLogic.getFriendsSessions(
        user.id,
        statuses,
        query.limit || constants.PAGINATION.DEFAULT_LIMIT,
        query.offset || constants.PAGINATION.DEFAULT_OFFSET
    );

    return response.httpResponse.ok(res, 'Successfully get timeline', result);
});

export {
    setSleep,
    getTimeline,
};
