import { Context } from 'koa';
import Message from '../services/message-service';

export default class MessageController {
    readonly table = 'message';
    private messageService = new Message();

    public async add(ctx: Context): Promise<void> {
        console.log('hejsan');
        try {
            const msg = ctx.request.body;

            const messageCreated = await this.messageService.create(msg);

            if (!messageCreated) {
                ctx.throw(400, { message: 'Failed to create message' });
            }

            ctx.body = { message: 'Message created', msg };
        } catch(e) {
            console.error(e);
        }
    }

    public async update(ctx: Context): Promise<void> {
        try {
            const id = ctx.params.id;
            const message = ctx.request.body;

            let newMsg;
            if(ctx.request.body.length) {
                newMsg = ctx.request.body.message;
            }
            const messageUpdate = await this.messageService.updateMsg(message, id, newMsg);

            if(!messageUpdate) {
                ctx.throw(400, 'Failed to delete message');
            }
            ctx.body = { message: 'Message deleted' };
        } catch (e) {
            console.error(e);
        }
    }


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