import constants from '../../src/constant';
import { SleepSessionRepository } from '../../src/data/sql/repositories';
import { TimelineLogic } from '../../src/logics';

jest.mock('../../src/data/sql/repositories');

test('set sleep clock-in', async () => {
    SleepSessionRepository.getSession.mockImplementation(() => Promise.resolve(null));
    SleepSessionRepository.createSession.mockImplementation(() => Promise.resolve(true));

    const result = TimelineLogic.createUpdateSession(null, 1);
    await expect(result).resolves.toBe(constants.ENUM.SLEEP_SESSION.CLOCK_IN);
});

test('set sleep clock-out', async () => {
    const currentTimestamp = Math.floor(Date.now() / 1000);

    SleepSessionRepository.getSession.mockImplementation(() => Promise.resolve({ start_at: currentTimestamp - 500 }));
    SleepSessionRepository.updateSession.mockImplementation(() => Promise.resolve(true));

    const result = TimelineLogic.createUpdateSession(null, 1);
    await expect(result).resolves.toBe(constants.ENUM.SLEEP_SESSION.CLOCK_OUT);
});
