// // Unit test the chatroom service.
import { expect } from 'chai';
import mockChatroom from './models/chatroomMock';
import ChatRoomService from '../../services/chatroom-service';
import Chatroom from '../../models/chatroom';

const sut = new ChatRoomService(mockChatroom);
const roomID = 1;

describe('Chatroom service', () => {
    it('Should return chatroom', async () => {
        const actual = (await sut.get(roomID)).toJSON();

        expect(actual)
            .to.be.an('object')
            .to.have.deep.property('name')
            .not.to.be.undefined;
    });

    it('Should return array of rooms', async () => {
        const actual = (await sut.getAll()).map((a: Chatroom) => a.toJSON());
        
        expect(actual).to.be.lengthOf.greaterThan(0).to.be.an('array');
    });

    it('Should return empty room array', async () => {
        mockChatroom.$queryInterface.$useHandler((query: string) => {
            if (query === 'findAll') {
                return [];
            }
        });

        const actual = await sut.getAll();
        expect(actual).to.be.an('array').to.be.lengthOf(0);
    });
});
