import { RequestRoomCreate } from '../types/request-types';
import { Model } from 'sequelize';
import dbConfig from '../db/postgres';

export default class ChatRoomService {
    public async create(clientRoom: RequestRoomCreate, Chatroom: any): Promise<boolean> {
        const roomCreated = await Chatroom.create(clientRoom);

        if (!roomCreated) {
            return false;
        }

        return true;
    }

    public async get(roomID: number, Chatroom: any): Promise<Model> {
        const room = await Chatroom.findOne({ where: { id: roomID } });

        return room;
    }

    public async getAll(Chatroom: any): Promise<Model[]> {
        const rooms = await Chatroom.findAll();

        if (!rooms) {
            return [];
        }

        return rooms;
    }

    public async delete(roomID: number, Chatroom: any): Promise<boolean> {
        const roomDeleted = await Chatroom.destroy({ where: { id: roomID } });

        if (!roomDeleted) {
            return false;
        }

        return true;
    }

    public async update(room: any, roomID: number, newID: number, Chatroom: any) {
        let updatedRoom;
        
        if (newID) {
            updatedRoom = await Chatroom.update({
                name: room.name,
                public: room.public,
                tag: room.tag,
                user_ids: dbConfig.fn('array_append', dbConfig.col('user_ids'), newID)
            }, { where: { id: roomID } 
            });
        } else {
            updatedRoom = await Chatroom.update({
                name: room.name,
                public: room.public,
                tag: room.tag
            }, { where: { id: roomID } 
            });
        }

        return updatedRoom;
    }
}