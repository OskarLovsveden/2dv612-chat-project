import { db } from '../db/postgres';
import { RespondMessage } from '../types/respond-types';
import { RequestMessageCreate } from '../types/request-types';
import { DBMessage } from '../types/db-types';

export default class Message {
    private MESSAGE_TABLE = 'message';

    public async create(message: RequestMessageCreate): Promise<boolean>{
        const messageCreated = await db(this.MESSAGE_TABLE).insert({
            userID: message.userID,
            message: message.message,
            id: message.id,
            roomID: message.roomID
        });
        if(!messageCreated) {
            return false;
        }
        return true;
    }
    public async getMessages(roomID: number): Promise<RespondMessage[]> {
        const usersMsgs = await db<DBMessage>(this.MESSAGE_TABLE).where({ roomID: roomID });
        if (!usersMsgs) {
            return [];
        }
        const usMsgArray: RespondMessage[] = usersMsgs.map((uM: DBMessage) => {
            return {
                userID: uM.userID,
                message: uM.message,
                id: uM.id,
                roomID: uM.roomID
            };
        });
        return usMsgArray;
    }

    public async update(messageID: number, msg: string): Promise<boolean> {
        const updateMsg = await db.from(this.MESSAGE_TABLE).where({ id: messageID }).update({ msg });

        if (!updateMsg) {
            return false;
        }

        return true;
    }

    public async delete(messageID: number): Promise<boolean> {
        const deleteMessage = await db.from(this.MESSAGE_TABLE).where({ id: messageID }).del();

        if (!deleteMessage) {
            return false;
        }
        return true;
    }
}