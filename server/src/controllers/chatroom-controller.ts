import { Context } from 'koa';
import Room from '../models/chatroom';

export default class ChatroomController {
    readonly table = 'chatroom';
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
            const chatrooms = await this.roomModel.getAll();
            ctx.body = chatrooms;
        } catch (e) {
            console.error(e);
        }
    }
    
    public async get(ctx: Context): Promise<void> {
        try {
            const id = ctx.params.id;
            // const chatroom = await db.from(this.table).select('*').where({ id: id });
            const room = await this.roomModel.get(id);
            
            ctx.body = room;
            // ctx.state.chatroom = room;
        } catch (e) {
            console.error(e);
        }
    }

    public async remove(ctx: Context): Promise<void> {
        try {
            const id = ctx.params.id;
        
            const roomDeleted = await this.roomModel.delete(id);

            if (!roomDeleted) {
                ctx.throw(400, { message: 'Failed to delete room' });
            }

            ctx.body = { message: 'Room deleted' };
        } catch (e) {
            console.error(e);
        }
    }

    public async update(ctx: Context): Promise<void> {
        console.log(ctx.request.body);
    }
}