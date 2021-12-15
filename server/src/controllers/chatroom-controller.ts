import { Context } from 'koa';
import Room from '../models/chatroom';
import Chatroom from '../models/sequelizeModels/Chatroom';

export default class ChatroomController {
    readonly table = 'chatroom';
    private roomModel = new Room();

    public async add(ctx: Context): Promise<void> {
        try {
            const room = ctx.request.body;
            const roomCreated = await Chatroom.create(room);

            if (!roomCreated) {
                ctx.throw(400, { message: 'Failed to create room' });
            }

            const createdRoom = roomCreated.toJSON();
            ctx.body = { message: 'Room created', createdRoom };
        } catch (e) {
            console.error(e);
        }
    }

    public async getAll(ctx: Context): Promise<void> {
        try {
            const users = await Chatroom.findAll();
            ctx.body = users;
        } catch (e) {
            console.error(e);
        }
    }
    
    public async get(ctx: Context): Promise<void> {
        try {
            const id = ctx.params.id;
            const room = await Chatroom.findOne({ where: { id: id } });

            ctx.body = room;
        } catch (e) {
            console.error(e);
        }
    }

    public async remove(ctx: Context): Promise<void> {
        try {
            const id = ctx.params.id;
        
            // const roomDeleted = await this.get(ctx);
            const roomDeleted = await Chatroom.destroy({ where: { id: id } });
            
            if (!roomDeleted) {
                ctx.throw(400, { message: 'Failed to delete room' });
            }

            ctx.body = { message: 'Room deleted' };
        } catch (e) {
            console.error(e);
        }
    }

    public async update(ctx: Context): Promise<void> {
        try {
            const id = ctx.params.id;
            const room: any = ctx.body;
        
            // const roomDeleted = await this.get(ctx);
            const roomDeleted = await Chatroom.update({
                name: room.name,
                public: room.public,
                tag: room.tag
            }, { where: { id: id } 
            });
            
            if (!roomDeleted) {
                ctx.throw(400, { message: 'Failed to delete room' });
            }
            
            ctx.body = { message: 'Room deleted' };
        } catch (e) {
            console.error(e);
        }
    }
}