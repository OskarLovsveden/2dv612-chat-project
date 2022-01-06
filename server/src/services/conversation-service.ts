import sequelize from '../db/postgres';
import Conversation, { ConversationCreationAttributes } from '../models/conversation';

export default class ConversationService {
    private conversation;

    constructor(C?: Conversation) {
        this.conversation = C ? C : Conversation;
    }

    public async createConversation(conversation: ConversationCreationAttributes): Promise<Conversation> {
        return this.conversation.create(conversation);
    }

    public async addMessage(convoID: number, messageID: number): Promise<Conversation> {
        const conversation = await this.get(convoID);

        return conversation.update({
            ...conversation,
            message_ids: sequelize.fn('array_append', sequelize.col('message_ids'), messageID)
        });
    }

    public async get(conID: number): Promise<Conversation> {
        return this.conversation.findOne({ where: { id: conID } });
    }

    public async getUserConversations(userID: number): Promise<Conversation[]> {
        const allConversations: Conversation[] = await this.conversation.findAll();
        return allConversations.filter((con: Conversation) => con.user_ids.includes(userID));
    }

    public async getAll(): Promise<Conversation[]> {
        return await this.conversation.findAll();
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
    }*/
        
    public async removeMessage(convoID: number, messageID: number): Promise<Conversation> {
        const conversation = await this.get(convoID);

        return conversation.update({
            ...conversation,
            message_ids: sequelize.fn('array_remove', sequelize.col('message_ids'), messageID)
        });
    }
}