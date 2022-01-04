import Conversation, { ConversationCreationAttributes } from '../models/conversation';
import { MessageCreationAttributes } from '../models/message';

export default class ConversationService {
    private conversation;

    constructor(C?: Conversation) {
        this.conversation = C ? C : Conversation;
    }

    public async createConversation(conversation: ConversationCreationAttributes): Promise<Conversation> {
        return this.conversation.create(conversation);
    }

    public async addMessage(msg: MessageCreationAttributes, conID: number): Promise<void> {
        const conversation = await this.get(conID);
        await conversation.createMessage({
            name: msg.name,
            message: msg.message,
            user_id: msg.user_id
        });
    }

    public async get(conID: number): Promise<Conversation> {
        return this.conversation.findOne({ 
            where: { id: conID }, 
            include: [Conversation.associations.messages],
            rejectOnEmpty: true 
        });
    }

    public async getAll(userID: number): Promise<Conversation[]> {
        const allConversations: Conversation[] = await this.conversation.findAll({
            include: [Conversation.associations.messages],
            rejectOnEmpty: true
        });

        return allConversations.filter((con: Conversation) => con.user_ids.includes(userID));

        /* return this.conversation.findAll({ where: { user_id: userID } }); */
    }

    /*  public async getConversationMessages(roomID: number): Promise<Message[]> {
        return this.conversation.findAll({ where: { room_id: roomID } });
    }

    public async updateMsg(msgId: number, newMsg: string) {
        const msgUpdate = await this.get(msgId);

        return msgUpdate.update({
            ...msgUpdate,
            message: newMsg
        });
    }

    public async delete(messageID: number): Promise<number> {
        return this.conversation({ where: { id: messageID } });
    } */
}