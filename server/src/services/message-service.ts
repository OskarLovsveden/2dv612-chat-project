import { RequestMessageCreate } from '../types/request-types';
import Messages from '../models/sequelizeModels/Message';
import { Model } from 'sequelize';
import { dbConfig } from '../db/postgres';


export default class Message {
    public async create(msg: RequestMessageCreate): Promise<boolean> {
        const messageCreated = await Messages.create(msg);

        if(!messageCreated) {
            return false;
        }
        return true;
    }

    public async get(msgID: number): Promise<Model> {
        const message = await Messages.findOne({ where: { id: msgID } });
        return message;
    }

    public async getAll(userID: number): Promise<Model[]> {
        const allMessages = await Messages.findAll({ where: { user_id: userID } });

        if(!allMessages) {
            return [];
        }
        return allMessages;
    }

    public async getRoomsMessages(roomID: number): Promise<Model[]> {
        const roomsMsgs = await Messages.findAll({ where: { room_id: roomID } });

        if(!roomsMsgs) {
            return [];
        }
        return roomsMsgs;
    }

    public async updateMsg(message:any, msgId: number, newMsg: string) {
        const updateMsg = await Messages.update({
            id: msgId,
            name: message.name,
            message: dbConfig.fn('array_append', dbConfig.col('message'), newMsg) ,
            room_id: message.room_id
        }, { where: { id: msgId } }
        );
        return updateMsg;
    }

    public async delete(messageID: number): Promise<boolean> {
        const msgDeleted = await Messages.destroy({ where: { id: messageID } });

        if(!msgDeleted) {
            return false;
        }
        return true;
    }
}