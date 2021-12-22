import Chatroom, { ChatroomCreationAttributes } from '../models/chatroom';
import sequelize from '../db/postgres';

export default class ChatRoomService {
    public async create(chatroom: ChatroomCreationAttributes): Promise<Chatroom> {
        return Chatroom.create(chatroom);
    }

    public async get(id: number): Promise<Chatroom> {
        return Chatroom.findByPk(id);
    }

    public async getAll(): Promise<Chatroom[]> {
        return Chatroom.findAll();
    }

    public async delete(roomID: number): Promise<number> {
        return Chatroom.destroy({ where: { id: roomID } });
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
}
