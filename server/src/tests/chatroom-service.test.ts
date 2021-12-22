// Unit test the services.
import { expect } from 'chai';
import Room from './models/chatroomMock';
import ChatRoomService from '../services/chatroom-service';

const sut = new ChatRoomService();
const roomID = 1;

describe('Chatroom service', () => {
    it('Should return chatroom', async () => {
        const actual = await sut.get(roomID);

        expect(actual)
            .to.be.not.undefined.to.have.key('id')
            .to.have.key('name')
            .to.have.key('public')
            .to.have.key('tag')
            .to.have.key('user_ids');
    });

    it('Should return array of rooms', async () => {
        const actual = await sut.getAll();

        expect(actual).to.be.lengthOf.greaterThan(0).to.have.an('array');
    });

    it('Should return empty room array', async () => {
        Room.$queryInterface.$useHandler((query: string) => {
            if (query === 'findAll') {
                return null;
            }
        });

        const actual = await sut.getAll();
        expect(actual).to.have.an('array').to.be.lengthOf(0);
    });
});
