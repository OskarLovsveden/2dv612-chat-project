"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chatroom_1 = __importDefault(require("../models/chatroom"));
class ChatroomController {
    constructor() {
        this.table = 'chatroom';
        this.roomModel = new chatroom_1.default();
    }
    async add(ctx) {
        try {
            const room = ctx.request.body;
            const roomCreated = await this.roomModel.create(room);
            if (!roomCreated) {
                ctx.throw(400, { message: 'Failed to create room' });
            }
            ctx.body = { message: 'Room created', room };
        }
        catch (e) {
            console.error(e);
        }
    }
    async getAll(ctx) {
        try {
            const chatrooms = await this.roomModel.getAll();
            ctx.body = chatrooms;
        }
        catch (e) {
            console.error(e);
        }
    }
    async get(ctx) {
        try {
            const id = ctx.params.id;
            // const chatroom = await db.from(this.table).select('*').where({ id: id });
            const room = await this.roomModel.get(id);
            ctx.body = room;
            // ctx.state.chatroom = room;
        }
        catch (e) {
            console.error(e);
        }
    }
    async remove(ctx) {
        try {
            const id = ctx.params.id;
            const roomDeleted = await this.roomModel.delete(id);
            if (!roomDeleted) {
                ctx.throw(400, { message: 'Failed to delete room' });
            }
            ctx.body = { message: 'Room deleted' };
        }
        catch (e) {
            console.error(e);
        }
    }
    async update(ctx) {
        console.log(ctx.request.body);
    }
}
exports.default = ChatroomController;
