import { Context } from 'koa';
import { db } from '../db/postgres';


// Fix this DEMO!
export default class ChatroomController {
    readonly table = 'chatroom';
    chatDatabase = [];

    public async chatroomInfo(ctx: Context): Promise<void> {
        // try {
        //     const { chatroomName,chatroomTag } = ctx.request.body.data;
        //     console.log(chatroomName);
        //     console.log(chatroomTag);
        // } catch (e) {
        //     console.log(e);
        // }
        try {
            // console.log(ctx.request.body.data);
            this.chatDatabase.push(ctx.request.body.data);
            // const chatroom = ctx.request.body.data;
            // await db(this.table).insert(chatroom);

            ctx.body = { message: 'Success' };
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