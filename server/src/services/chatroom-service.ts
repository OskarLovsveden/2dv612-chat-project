import { RequestRoomCreate } from '../types/request-types';
import Chatroom from '../models/sequelizeModels/Chatroom';
import { Model } from 'sequelize';
import { dbConfig } from '../db/postgres';

// TODO add sequelize
export default class ChatRoom {
    private ROOM_TABLE = 'chatroom';

    public async create(clientRoom: RequestRoomCreate): Promise<boolean> {
        const roomCreated = await Chatroom.create(clientRoom);

        if (!roomCreated) {
            return false;
        }

        return true;
    }

    public async get(roomID: number): Promise<Model> {
        const room = await Chatroom.findOne({ where: { id: roomID } });

        return room;
    }

    public async getAll(): Promise<Model[]> {
        const rooms = await Chatroom.findAll();

        if (!rooms) {
            return [];
        }

        // const roomsArray: RespondRoom[] = rooms.map((r: DBChatroom) => {
        //     return {
        //         name: r.name,
        //         id: r.id,
        //         public: r.public,
        //         tag: r.tag
        //     };
        // });

        return rooms;
    }

    public async delete(roomID: number): Promise<boolean> {
        const roomDeleted = await Chatroom.destroy({ where: { id: roomID } });

        if (!roomDeleted) {
            return false;
        }

        return true;
    }

    public async update(room: any, roomID: number, newID: number) {
        const updatedRoom = await Chatroom.update({
            name: room.name,
            public: room.public,
            tag: room.tag,
            usersid: dbConfig.fn('array_append', dbConfig.col('usersid'), newID)
        }, { where: { id: roomID } 
        });

        if (!updatedRoom) {
            return false;
        }

        return updatedRoom;
    }
}