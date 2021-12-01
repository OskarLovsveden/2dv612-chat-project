import { BaseContext, Context } from "koa";
import { db } from "../db/postgres";

export default class ChatroomController {
    public async chatroomInfo(ctx: Context): Promise<void> {
        try {
            const {chatroomName,chatroomTag} = ctx.request.body.data;
            console.log(chatroomName);
            console.log(chatroomTag);
        } catch (e) {
            console.log(e)
        }
    }
}