
import { Context } from 'koa';
import ConversationService from '../services/conversation-service';
import { ConversationCreationAttributes } from '../models/conversation';
import { MessageCreationAttributes } from '../models/message';
import MessageService from '../services/message-service';

export default class ConversationController {
    private conversationService = new ConversationService();
    private messageService = new MessageService();

    public async add(ctx: Context): Promise<void> {
        try {
            const conversation: ConversationCreationAttributes = ctx.request.body;

            console.log(conversation);

            if (!conversation) {
                console.log('Can not create message, faulty body');
            }

            // const msg: ConversationCreationAttributes = {
            //     user_ids: user_ids
            // };

            const conversationCreated = await this.conversationService.createConversation(conversation);

            console.log(conversationCreated);

            if (!conversationCreated) {
                ctx.throw(400, { message: 'Failed to create message' });
            }

            ctx.body = { message: 'Conversation created', conversationCreated };
        } catch(e) {
            console.error(e);
        }
    }
    // get one conversation
    public async get(ctx: Context): Promise<void> {
        try {
            const id = ctx.params.id;
            const msg = await this.conversationService.get(id);
            console.log(msg);

            ctx.body = msg;
        } catch (e) {
            console.error(e);
        }
    }

    // update one conversation
    // public async update(ctx: Context): Promise<void> {
    //     try {
    //         const id = ctx.params.id;
    //         const newMsg = ctx.request.body;

    //         // let newMsg;
    //         // if(ctx.request.body.length) {
    //         //     newMsg = ctx.request.body.message;
    //         // }
    //         const messageUpdate = await this.conversationService.updateMsg(id, newMsg);

    //         if(!messageUpdate) {
    //             ctx.throw(400, 'Failed to delete message');
    //         }
    //         ctx.body = { message: 'Message deleted' };
    //     } catch (e) {
    //         console.error(e);
    //     }
    // }

    // all messages connected to the room
    // public async getRoomMessages(ctx: Context): Promise<void> {
    //     try {
    //         const roomID = ctx.params.id;
    //         const roomsMsgs = await this.conversationService.getRoomsMessages(roomID);
    //         ctx.body = roomsMsgs;
    //     } catch (e) {
    //         console.error(e);
    //     }
    // } 

    // All conversations for a user.
    public async getAll(ctx: Context): Promise<void> {
        try {
            const userID = ctx.user.id;
            const conversations = await this.conversationService.getAll(userID);

            console.log(conversations);
            ctx.body = conversations;
        } catch (e) {
            console.error(e);
        }
    }

    public async addMessage(ctx: Context): Promise<void> {
        try {
            const id = ctx.params.id;
            const messageAttributes: MessageCreationAttributes = ctx.request.body;
            
            /* const message = await this.messageService.create(messageAttributes);
            console.log(message); */

            await this.conversationService.addMessage(messageAttributes, id);
          
        } catch (e) {
            console.error(e);
        }
    }

    // // remove one message
    // public async remove(ctx: Context): Promise<void> {
    //     try {
    //         const id = ctx.params.id;
    //         const messageDeleted = await this.conversationService.delete(id);

    //         if(!messageDeleted) {
    //             ctx.throw(400, 'Failed to delete message');
    //         }
    //         ctx.body = { message: 'Message deleted' };
    //     } catch (e) {
    //         console.error(e);
    //     }
    // }
}