import { jwt } from '../../src/modules';
import { UserRepository } from '../../src/data/sql/repositories';
import { UserLogic } from '../../src/logics';

jest.mock('../../src/data/sql/repositories');

test('generate jwt success', () => {
    const user = { id: 1, username: 'bambang' };
    const token = jwt.generateJwt(user);

    expect(() => jwt.verifyJwt(token)).not.toThrowError();
});

test('login user success', async () => {
    UserRepository.findByUsername.mockImplementation(() => Promise.resolve({ id: 99, username: 'ahmad' }));

    const result = UserLogic.login('ahmad');
    await expect(result).resolves.not.toThrow();
});

test('login user not found', async () => {
    UserRepository.findByUsername.mockImplementation(() => Promise.resolve(null));

    const result = UserLogic.login('ahmad');
    await expect(result).rejects.toThrow();
});

test('follow user success', async () => {
    UserRepository.findById.mockImplementation(() => Promise.resolve({ id: 99, username: 'ahmad' }));
    UserRepository.upsertFollow.mockImplementation(() => Promise.resolve(true));

    const result = UserLogic.follow(99, 1);
    await expect(result).resolves.not.toThrow();
});

test('follow themself', async () => {
    UserRepository.findById.mockImplementation(() => Promise.resolve({ id: 99, username: 'ahmad' }));
    UserRepository.upsertFollow.mockImplementation(() => Promise.resolve(true));

    const result = UserLogic.follow(99, 99);
    await expect(result).rejects.toThrow();
});

test('follow user not found', async () => {
    UserRepository.findById.mockImplementation(() => Promise.resolve(null));

    const result = UserLogic.follow(1, 99);
    await expect(result).rejects.toThrow();
});
