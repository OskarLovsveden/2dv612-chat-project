import { Context } from 'koa';
import Message from '../models/message';

export default class MessageController {
    readonly table = 'message';
    private messageModel = new Message();

    public async add(ctx: Context): Promise<void> {
        try {
            const msg = ctx.request.body;

            const messageCreated = await this.messageModel.create(msg);

            if (!messageCreated) {
                ctx.throw(400, { message: 'Failed to create message' });
            }

            ctx.body = { message: 'Message created', msg };
        } catch(e) {
            console.error(e);
        }
    }
}