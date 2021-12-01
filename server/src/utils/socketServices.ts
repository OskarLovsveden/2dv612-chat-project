import { Socket } from 'socket.io';
import { EventLogin } from '../types/eventDataTypes';

export default class SocketServices {
    private onlineUsers = {};

    public handleUserConnect(data: EventLogin, socket: Socket) {
        if (data.user_id) {
            this.onlineUsers[socket.id] = data.user_id;
        }

        console.log('User: ' + data.user_id + ' is now online');

        for (const user of Object.values(this.onlineUsers)) {
            console.log(user);
        }
    }

    public handleUserDisconnect(socket: Socket) {
        console.log(`user: ${this.onlineUsers[socket.id]} disconnected`);

        delete this.onlineUsers[socket.id];

        console.log(this.onlineUsers);

    }
}