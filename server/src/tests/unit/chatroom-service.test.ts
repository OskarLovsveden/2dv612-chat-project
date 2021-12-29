// // Unit test the services.
import { expect } from 'chai';
import mockChatroom from './models/chatroomMock';
import ChatRoomService from '../../services/chatroom-service';
import Chatroom from '../../models/chatroom';

const sut = new ChatRoomService(mockChatroom);
const roomID = 1;

describe('Chatroom service', () => {
    it('Should return chatroom', async () => {
        const actual = await sut.get(roomID);

        expect(actual)
            .to.be.not.undefined.to.have.key('id')
            .to.have.key('name')
            .to.have.key('is_ublic')
            .to.have.key('tag')
            .to.have.key('user_ids')
            .not.to.be.an('array');
    });

    it('Should return array of rooms', async () => {
        const actual = await (await sut.getAll()).map((a: Chatroom) => a.toJSON());
        
        expect(actual).to.be.lengthOf.greaterThan(0).to.have.an('array');
    });

    it('Should return empty room array', async () => {
        mockChatroom.$queryInterface.$useHandler((query: string) => {
            if (query === 'findAll') {
                return [];
            }
        });

        const actual = await sut.getAll();
        expect(actual).to.have.an('array').to.be.lengthOf(0);
    });
});
