
import { Context } from 'koa';
import MessageService from '../services/message-service';
import { MessageCreationAttributes } from '../models/message';

export default class MessageController {
    readonly table = 'message';
    private messageService = new MessageService();

    public async add(ctx: Context): Promise<void> {
        try {
            const { name, message, user_id , room_id }: MessageCreationAttributes = ctx.request.body;

            if (!name || !message || !user_id || !room_id) {
                console.log('Can not create message, faulty body');
            }

            const msg: MessageCreationAttributes = {
                name: name,
                message: message,
                user_id: user_id,
                room_id: room_id
            };

            const messageCreated = await this.messageService.create(msg);

            if (!messageCreated) {
                ctx.throw(400, { message: 'Failed to create message' });
            }

            ctx.body = { message: 'Message created', msg };
        } catch(e) {
            console.error(e);
        }
    }
    // get one message
    public async get(ctx: Context): Promise<void> {
        try {
            const id = ctx.params.id;
            const msg = await this.messageService.get(id);
            console.log(msg);

            ctx.body = msg;
        } catch (e) {
            console.error(e);
        }
    }

    // update one message
    public async update(ctx: Context): Promise<void> {
        try {
            const id = ctx.params.id;
            const newMsg = ctx.request.body;
            const messageUpdate = await this.messageService.updateMsg(id, newMsg);

            if(!messageUpdate) {
                ctx.throw(400, 'Failed to delete message');
            }
            ctx.body = { message: 'Message deleted' };
        } catch (e) {
            console.error(e);
        }
    }

    // all messages connected to the room
    public async getRoomMessages(ctx: Context): Promise<void> {
        try {
            const roomID = ctx.params.id;
            const roomsMsgs = await this.messageService.getRoomsMessages(roomID);
            ctx.body = roomsMsgs;
        } catch (e) {
            console.error(e);
        }
    } 

    // All messages a user has sent.
    public async getAll(ctx: Context): Promise<void> {
        try {
            const userID = ctx.params.id;
            const messages = await this.messageService.getAll(userID);
            ctx.body = messages;
        } catch (e) {
            console.error(e);
        }
    }

    // remove one message
    public async remove(ctx: Context): Promise<void> {
        try {
            const id = ctx.params.id;
            const messageDeleted = await this.messageService.delete(id);

            if(!messageDeleted) {
                ctx.throw(400, 'Failed to delete message');
            }
            ctx.body = { message: 'Message deleted' };
        } catch (e) {
            console.error(e);
        }
    }
}