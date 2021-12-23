import { Context } from 'koa';
import SocketServices from '../utils/socket-services';
import ChatRoomService from '../services/chatroom-service';
import UserService from '../services/user-service';
import User from '../models/user';
import Chatroom, { ChatroomCreationAttributes } from '../models/chatroom';

export default class ChatroomController {
    readonly table = 'chatroom';
    private chatroomService = new ChatRoomService();
    private socketServices: SocketServices = new SocketServices();

    public async add(ctx: Context): Promise<void> {
        try {
            const { name, is_public, tag } = ctx.request.body;

            console.log(name, is_public, tag);

            if (!name || !is_public || !tag) {
                console.log('Can not create chatroom, faulty body.');
            }

            const userService = new UserService();
            const users = (await userService.getAll()).map((u: User) => u.id);

            const room: ChatroomCreationAttributes = {
                name: name,
                is_public: is_public,
                tag: [tag],
                user_ids: users
            };

            const roomCreated = await this.chatroomService.create(room);

            if (!roomCreated) {
                ctx.throw(400, { message: 'Failed to create room' });
            }

            await this.socketServices.populateRooms();

            ctx.body = { message: 'Room created', room };
        } catch (e) {
            console.error(e);
        }
    }

    public async getAll(ctx: Context): Promise<void> {
        try {
            const chatroom = await this.chatroomService.getAll();
            ctx.body = chatroom;
        } catch (e) {
            console.error(e);
        }
    }

    public async get(ctx: Context): Promise<void> {
        try {
            const id = ctx.params.id;
            const room = await this.chatroomService.get(id);

            ctx.body = room;
        } catch (e) {
            console.error(e);
        }
    }

    public async remove(ctx: Context): Promise<void> {
        try {
            const id = ctx.params.id;
            const roomDeleted = await this.chatroomService.delete(id);

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
            const { newTag, userID } = ctx.request.body;

            let updatedRoom: Chatroom;

            if (newTag) {
                updatedRoom = await this.chatroomService.addTag(id, newTag);
            }

            if (userID) {
                updatedRoom = await this.chatroomService.addUser(id, userID);
            }

            if (!updatedRoom) {
                ctx.throw(400, { message: 'Failed to update room' });
            }

            ctx.body = { message: 'Room updated' };
        } catch (e) {
            const id = ctx.params.id;
            ctx.status = 404;
            ctx.body = { message: 'No chatroom with id ' + id + ' found' };
        }
    }
}
