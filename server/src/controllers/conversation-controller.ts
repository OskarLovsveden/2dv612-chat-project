
import { Context } from 'koa';
import ConversationService from '../services/conversation-service';
import { ConversationCreationAttributes } from '../models/conversation';
import MessageService from '../services/message-service';
import { RespondMessage } from '../types/respond-types';
import UserService from '../services/user-service';
import { MessageCreationAttributes } from '../models/message';

export default class ConversationController {
    private conversationService = new ConversationService();
    private userService = new UserService();
    private messageService = new MessageService();

    public async add(ctx: Context): Promise<void> {
        try {
            const conversation: ConversationCreationAttributes = ctx.request.body;

            console.log(conversation);

            if (!conversation) {
                console.log('Can not create message, faulty body');
            }

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

    public async getAllMessages(ctx: Context): Promise<void> {
        try {
            
            const id = ctx.params.id;
            
            const conversation = await this.conversationService.get(id);
            const message_ids = conversation.message_ids;
            
            const messages: RespondMessage[] = [];
            
            for (const message_id of message_ids) {
                const msg = await this.messageService.get(message_id);
                messages.push({
                    id: msg.id,
                    message: msg.message,
                    user_id: msg.user_id,
                    username: (await this.userService.get(msg.user_id)).username,
                    createdAt: msg.createdAt
                });
            }
            
            ctx.body = messages;
        } catch (e) {
            console.log(e);
        }
    }

    public async updateMessage(ctx: Context): Promise<void> {
        try {
            // const id = ctx.params.id;
            const msg_id = ctx.params.msg_id;
            const msg = ctx.request.body;

            const messageUpdate = await this.messageService.updateMsg(msg_id, msg);

            if(!messageUpdate) {
                ctx.throw(400, 'Failed to delete message');
            }
            ctx.body = { message: 'Message deleted' };
        } catch (e) {
            console.log(e);
        }
    }

    public async removeMessage(ctx: Context): Promise<void> {
        try {
            const id = ctx.params.id;
            const msg_id = ctx.params.msg_id;
            
            await this.conversationService.removeMessage(id, msg_id);
            const messageDeleted = await this.messageService.delete(id);
            
            if(!messageDeleted) {
                ctx.throw(400, 'Failed to delete message');
            }
            
            ctx.body = { message: 'Message deleted' };
        } catch (e) {
            console.log(e);
        }
    }
    
    public async addMessage(ctx: Context): Promise<void> {
        try {
            const id = ctx.params.id;
            const { message, user_id }: MessageCreationAttributes = ctx.request.body;

            if (!message || !user_id) {
                console.log('Can not create message, faulty body');
            }

            const msg: MessageCreationAttributes = {
                message: message,
                user_id: user_id
            };

            const messageCreated = await this.messageService.create(msg);

            if (!messageCreated) {
                ctx.throw(400, { message: 'Failed to create message' });
            }

            await this.conversationService.addMessage(id, messageCreated.id);

            ctx.body = { message: 'Message created', msg };
        } catch (e) {
            console.log(e);
        }
    }
}