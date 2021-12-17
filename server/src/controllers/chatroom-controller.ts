import { Context } from 'koa';
import User from '../models/user';
import Room from '../services/chatroom-service';
import { RequestRoomCreate } from '../types/request-types';
import SocketServices from '../utils/socket-services';

export default class ChatroomController {
    readonly table = 'chatroom';
    private chatroomService = new Room();
    private userModel = new User();
    private socketServices: SocketServices = new SocketServices();

    public async add(ctx: Context): Promise<void> {
        try {
            const room: RequestRoomCreate = ctx.request.body;
            const users = await this.userModel.getAll();

            const userIDs = users.map((usr:any)=> usr.id);

            room.user_ids = [...userIDs];

            const roomCreated = await this.chatroomService.create(room);

            if (!roomCreated) {
                ctx.throw(400, { message: 'Failed to create room' });
            }

            this.socketServices.populateRooms();

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
            const room = ctx.request.body;
            let newID;
            
            if (ctx.request.body.length) {
                newID = ctx.request.body.usersid;
            }
            
            console.log(room);        
            const roomUpdated = await this.chatroomService.update(room, id, newID);
            
            if (!roomUpdated) {
                ctx.throw(400, { message: 'Failed to update room' });
            }
            
            ctx.body = { message: 'Room updated' };
        } catch (e) {
            console.error(e);
        }
    }
}