import { db } from '../db/postgres';
import { RespondRoom } from '../types/respond-types';
import { RequestRoomCreate } from '../types/request-types';
import { DBChatroom } from '../types/db-types';

export default class ChatRoom {
    private ROOM_TABLE = 'chatroom';

    public async create(clientRoom: RequestRoomCreate): Promise<boolean> {
        const roomCreated = await db(this.ROOM_TABLE).insert({ 
            name: clientRoom.name, 
            public: clientRoom.public,
            tag: clientRoom.tag 
        });

        if (!roomCreated) {
            return false;
        }

        return true;
    }

    public async get(roomID: number): Promise<RespondRoom> {
        console.log(await db<DBChatroom>(this.ROOM_TABLE).where({ id: roomID }));
        const room = await db<DBChatroom>(this.ROOM_TABLE).where({ id: roomID }).first();

        return room;
    }

    public async getAll(): Promise<RespondRoom[]> {
        const rooms = await db<DBChatroom>(this.ROOM_TABLE);

        if (!rooms) {
            return [];
        }

        const roomsArray: RespondRoom[] = rooms.map((r: DBChatroom) => {
            return {
                name: r.name,
                id: r.id,
                public: r.public,
                tag: r.tag
            };
        });

        return roomsArray;
    }

    public async delete(roomID: number): Promise<boolean> {
        const roomDeleted = await db<DBChatroom>(this.ROOM_TABLE).where({ id: roomID }).del();

        if (!roomDeleted) {
            return false;
        }

        return true;
    }

    // TODO
    // public update(roomID: number) {

    // }
}