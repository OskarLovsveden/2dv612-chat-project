// // Unit test the message service.
import { expect } from 'chai';
import mockMessage from './models/messageMock';
import MessageService from '../../services/message-service';
// import Message from '../../models/message';

const sut = new MessageService(mockMessage);
// const userID = 1;
const msgID = 1;
const newMsg = {
    name: 'a new message',
    message: 'testing new message',
    user_id: 1,
    room_id: 1
};

describe('Message service', () => {
    it('Should return message', async () => {
        const actual = await (await sut.get(msgID)).toJSON();

        expect(actual)
            .to.be.an('object')
            .to.have.keys(['name', 'message', 'room_id', 'updatedAt', 'user_id', 'id', 'createdAt'])
            .not.to.be.undefined;
    });

    // METHOD NO LONGER EXIST YO
    // it('Should return array of messages', async () => {
    //     const actual = await (await sut.getAll(userID)).map((a: Message) => a.toJSON());
        
    //     expect(actual).to.be.lengthOf.greaterThan(0).to.be.an('array');
    // });

    // METHOD NO LONGER EXIST EITHER YO (:
    // it('Should return empty message array', async () => {
    //     mockMessage.$queryInterface.$useHandler((query: string) => {
    //         if (query === 'findAll') {
    //             return [];
    //         }
    //     });

    //     const actual = await sut.getAll(userID);
    //     expect(actual).to.be.an('array').to.be.lengthOf(0);
    // });

    it('Should create new message', async () => {
        const message = await (await sut.create(newMsg)).toJSON();
        
        expect(message)
            .to.be.an('object')
            .to.have.keys(['name', 'message', 'room_id', 'updatedAt', 'user_id', 'id', 'createdAt'])
            .not.to.be.undefined;
    });
});
