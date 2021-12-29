import Message, { MessageCreationAttributes } from '../models/message';

export default class MessageService {
    public async create(msg: MessageCreationAttributes): Promise<Message> {
        return Message.create(msg);
    }

    public async get(msgID: number): Promise<Message> {
        return Message.findOne({ where: { id: msgID } });
    }

    public async getAll(userID: number): Promise<Message[]> {
        return Message.findAll({ where: { user_id: userID } });
    }

    public async getRoomsMessages(roomID: number): Promise<Message[]> {
        return Message.findAll({ where: { room_id: roomID } });
    }

    public async updateMsg(msgId: number, newMsg: string) {
        const msgUpdate = await this.get(msgId);

        return msgUpdate.update({
            ...msgUpdate,
            message: newMsg
        });
    }

    public async delete(messageID: number): Promise<number> {
        return Message.destroy({ where: { id: messageID } });
    }
}