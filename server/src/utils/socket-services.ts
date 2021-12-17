import { Server as SocketServer, Socket } from 'socket.io';
import {
    EventChatMessage,
    EventJoinRoom,
    EventLogin
} from '../types/event-data-types';

export default class SocketServices {
    private onlineUsers = {};

    private rooms = [{ room_id: 'room_1' }, { room_id: 'room_2' }];

    public handleUserConnect(data: EventLogin, socket: Socket) {
        if (data.user_id) {
            this.onlineUsers[socket.id] = data.user_id;
        }

        console.log('User: ' + data.user_id + ' is now online');

        for (const user of Object.values(this.onlineUsers)) {
            console.log(user);
        }
    }

    public handleChatMessage(
        data: EventChatMessage,
        socket: Socket,
        io: SocketServer
    ): void {
        const room = this.rooms.find((r: any) => r.room_id === data.room_id);
        console.log('before sending message', data.message);
        if (room) {
            console.log(`Sending message: ${data.message} to room: ${data.room_id}`);
            io.in(room.room_id).emit('room-message', {
                username: data.user_id,
                message: data.message
            });
        }
    }

    public handleUserDisconnect(socket: Socket) {
        console.log(`user: ${this.onlineUsers[socket.id]} disconnected`);

        delete this.onlineUsers[socket.id];

        console.log(this.onlineUsers);
    }

    public handleJoinRoom(data: EventJoinRoom, socket: Socket): void {
        const room = this.rooms.find((r: any) => r.room_id === data.room_id);
        console.log(room);
        console.log(data);
        if (room) {
            console.log(`User: ${data.user_id} joined room: ${data.room_id}`);
            socket.join(room.room_id);
            socket
                .to(room.room_id)
                .emit('room-message', { username: data.user_id, message: 'Welcome' });
        }
    }
}
