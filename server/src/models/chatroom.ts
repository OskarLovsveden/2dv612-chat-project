import { db } from '../db/postgres';
import { RespondRoom, RespondRoomUser } from '../types/respond-types';
import { RequestRoomCreate } from '../types/request-types';
import { DBChatroom, DBChatroomUser, DBUser } from '../types/db-types';

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
    public async getUsersInChatroom(roomID: number): Promise<RespondRoomUser[]> {
        // const room = await this.get(roomID);
        const room = await db<DBChatroomUser>(this.ROOM_TABLE).where({ id : roomID }).first();
        console.log('test' + room);
        // usersInRoom.users.map()
        const usersInRoomArray: RespondRoomUser[] = room.users.map((u: DBUser) => {
            return {
                active: u.active,
                id: u.id,
                role: u.role,
                username: u.username
            };
        });
        return usersInRoomArray;
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