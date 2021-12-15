"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = require("../db/postgres");
class ChatRoom {
    constructor() {
        this.ROOM_TABLE = 'chatroom';
        // TODO
        // public update(roomID: number) {
        // }
    }
    async create(clientRoom) {
        const roomCreated = await (0, postgres_1.db)(this.ROOM_TABLE).insert({
            name: clientRoom.name,
            public: clientRoom.public,
            tag: clientRoom.tag
        });
        if (!roomCreated) {
            return false;
        }
        return true;
    }
    async get(roomID) {
        console.log(await (0, postgres_1.db)(this.ROOM_TABLE).where({ id: roomID }));
        const room = await (0, postgres_1.db)(this.ROOM_TABLE).where({ id: roomID }).first();
        return room;
    }
    async getAll() {
        const rooms = await (0, postgres_1.db)(this.ROOM_TABLE);
        if (!rooms) {
            return [];
        }
        const roomsArray = rooms.map((r) => {
            return {
                name: r.name,
                id: r.id,
                public: r.public,
                tag: r.tag
            };
        });
        return roomsArray;
    }
    async delete(roomID) {
        const roomDeleted = await (0, postgres_1.db)(this.ROOM_TABLE).where({ id: roomID }).del();
        if (!roomDeleted) {
            return false;
        }
        return true;
    }
}
exports.default = ChatRoom;
