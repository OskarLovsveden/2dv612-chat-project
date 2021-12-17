// Unit test the services.
import { expect } from 'chai';
import Room from './models/chatroomMock';
import ChatRoom from '../services/chatroom-service';

const sut = new ChatRoom();
const roomID = 1;

describe('Chatroom service', () => {
    it('Should return chatroom', async () => {
        const actual = await sut.get(roomID, Room);
        
        expect(actual).to.be.not.undefined
            .to.have.key('id')
            .to.have.key('name')
            .to.have.key('public')
            .to.have.key('tag')
            .to.have.key('user_ids');
    });

    it('Should not return room'); 

    it('Should return array of rooms', async () => {
        const actual = await sut.getAll(Room);

        expect(actual).to.be.lengthOf.greaterThan(0)
            .to.have.an('array');
    });
});