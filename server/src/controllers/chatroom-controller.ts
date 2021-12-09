import { Context } from 'koa';
import { db } from '../db/postgres';
import Room from '../models/chatroom';


// Fix this DEMO!
export default class ChatroomController {
    readonly table = 'chatroom';
    chatDatabase = [];
    private roomModel = new Room();

    public async add(ctx: Context): Promise<void> {
        try {
            const room = ctx.request.body.data;
            const roomCreated = await this.roomModel.create(ctx.request.body.data);

            if (!roomCreated) {
                ctx.throw(400, { message: 'Failed to create room' });
            }

            ctx.body = { message: 'Room created', room };
        } catch (e) {
            console.error(e);
        }
    }

    public async getAll(ctx: Context): Promise<void> {
        try {
            // const chatroom = await db.from(this.table).select('*');
            // ctx.body = chatroom;
            // ctx.body = this.chatDatabase;
        } catch (e) {
            console.error(e);
        }
    }
    
    public async get(ctx: Context): Promise<void> {
        try {
            const id = ctx.params.id;
            const chatroom = await db.from(this.table).select('*').where({ id: id });
            
            ctx.body = chatroom;
            ctx.state.chatroom = chatroom;
        } catch (e) {
            console.error(e);
        }
    }
}