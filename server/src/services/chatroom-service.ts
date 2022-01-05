import sequelize from '../db/postgres';
import Chatroom, { ChatroomCreationAttributes } from '../models/chatroom';

export default class ChatRoomService {
    private chatroom;

    constructor(R?: Chatroom) {
        this.chatroom = R ? R : Chatroom;
    }
    
    public async create(chatroom: ChatroomCreationAttributes): Promise<Chatroom> {
        return this.chatroom.create(chatroom);
    }

    public async get(id: number): Promise<Chatroom> {
        return this.chatroom.findOne({ where: { id: id } });
    }

    public async getAll(): Promise<Chatroom[]> {
        return this.chatroom.findAll();
    }

    public async delete(roomID: number): Promise<number> {
        return this.chatroom.destroy({ where: { id: roomID } });
    }

    public async update(roomID: number, updates: Chatroom) {
        const room = await this.get(roomID);

        return room.update({
            ...room,
            ...updates
        });
    }

    public async addTag(roomID: number, newTag: string): Promise<Chatroom> {
        const room = await this.get(roomID);
        return room.update({
            ...room,
            user_ids: sequelize.fn('array_append', sequelize.col('tag'), newTag)
        });
    }

    public async addUser(roomID: number, userID: number): Promise<Chatroom> {
        const room = await this.get(roomID);
        return room.update({
            ...room,
            user_ids: sequelize.fn('array_append', sequelize.col('user_ids'), userID)
        });
    }

    public async addMessage(roomID: number, messageID: number): Promise<Chatroom> {
        const room = await this.get(roomID);
        return room.update({
            ...room,
            message_ids: sequelize.fn('array_append', sequelize.col('message_ids'), messageID)
        });
    }
    
    public async removeMessage(roomID: number, messageID: number): Promise<Chatroom> {
        const room = await this.get(roomID);

        return room.update({
            ...room,
            message_ids: sequelize.fn('array_remove', sequelize.col('message_ids'), messageID)
        });
    }
}
