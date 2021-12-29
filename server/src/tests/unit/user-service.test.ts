// // Unit test the services.
import { expect } from 'chai';
import mockUser from './models/userMock';
import UserService from '../../services/chatroom-service';
import User from '../../models/chatroom';

const sut = new UserService(mockUser);
const userID = 1;

describe('User service', () => {
    it('Should return a user', async () => {
        const actual = await (await sut.get(userID)).toJSON();

        expect(actual)
            .to.be.not.undefined.to.have.key('id')
            .to.have.key('name')
            .to.have.key('is_ublic')
            .to.have.key('tag')
            .to.have.key('user_ids')
            .not.to.be.an('array');
    });

    it('Should return array of users', async () => {
        const actual = await (await sut.getAll()).map((a: User) => a.toJSON());

        expect(actual).to.be.lengthOf.greaterThan(0).to.have.an('array');
    });

    it('Should return empty user array', async () => {
        mockUser.$queryInterface.$useHandler((query: string) => {
            if (query === 'findAll') {
                return [];
            }
        });

        const actual = await sut.getAll();
        expect(actual).to.have.an('array').to.be.lengthOf(0);
    });
});
