import { Context } from 'koa';
import { db } from '../db/postgres';


// Fix this DEMO!
export default class ChatroomController {
    readonly table = 'chatroom';
    chatDatabase = [];

    public async add(ctx: Context): Promise<void> {
        try {
            const room = ctx.request.body.data;
            await db(this.table).insert(ctx.request.body.data);

            ctx.body = { message: 'Success', room };
        } catch (e) {
            console.error(e);
        }
    }

    public async getAll(ctx: Context): Promise<void> {
        try {
            // const chatroom = await db.from(this.table).select('*');
            // ctx.body = chatroom;
            ctx.body = this.chatDatabase;
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