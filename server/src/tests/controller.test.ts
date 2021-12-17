// Unit test the controllers.
// import chai from 'chai';
// import mocha from 'mocha';
import Chatroom from '../services/chatroom-service';

const sut = new Chatroom();
const roomID = 1;

//TODO
describe('Chatroom service', () => {
    it('Should return chatroom', () => {
        sut.get(roomID);
    });
});