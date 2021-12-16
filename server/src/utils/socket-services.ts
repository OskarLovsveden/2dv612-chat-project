import { Server as SocketServer, Socket } from 'socket.io';
import { EventChatMessage, EventJoinRoom, EventLogin } from '../types/event-data-types';
import { rooms, users } from './fake-data';
import SocketRooms from './socket-rooms';
import SocketRoom from './socket-rooms';
import SocketUsers from './socket-users';
import SocketUser from './socket-users';
import {
    EventChatMessage,
    EventJoinRoom,
    EventLogin
} from '../types/event-data-types';

export default class SocketServices {
    private socketRooms: SocketRooms = new SocketRooms();
    private onlineUsers: SocketUsers = new SocketUsers();

    public async populateRooms(socket:Socket) {
        // Fetch rooms with user from db
        for (const room of rooms) {
            const usersForRoom = room.users.map((usr:any) => usr.id);
            console.log(usersForRoom);
            console.log(`Adding room: ${room.roomID}`);
            this.socketRooms.addRoom(room.roomID.toString(), new Set(usersForRoom));
        }

        for (const user of users) {
            console.log(`Adding user: ${user.id}`);
            this.onlineUsers.addUser(user.id);
        }
    } 

    public handleRoomCreation(socket: Socket) {
        // Update rooms and users.
    }

    public handleUserConnect(data: EventLogin, socket: Socket) {
        const userID = this.onlineUsers.connectUser(data.user_id, socket.id);
        console.log('User: ' + userID + ' is now online');

        this.socketRooms.joinRooms(data.user_id, socket);
        this.logOnlineUsers();
    }

    public handleChatMessage(data: EventChatMessage, socket: Socket, io: SocketServer): void {     
        console.log('Chat message', data.room_id);  
        

        if(this.socketRooms.hasRoom(`${data.room_id}`)) {
            console.log(`Sending message: ${data.message} to room: ${data.room_id}`);
            io.in(`${data.room_id}`).emit('room-message', { id: data.user_id, message: data.message });
        }
    }

    public handleUserDisconnect(socket: Socket) {
        const disconnectedUser = this.onlineUsers.disconnectUser(socket.id);

        console.log('User ' + disconnectedUser + ' went offline!');

        this.logOnlineUsers();
    }

    public handleJoinRoom(data: EventJoinRoom, socket: Socket): void {
        /*  const room = this.rooms.find((r: any) => r.room_id === data.room_id);
        console.log(room);
        console.log(data);
        if (room) {
            console.log(`User: ${data.user_id} joined room: ${data.room_id}`);
            socket.join(room.room_id);
            socket.to(room.room_id).emit('room-message', { username: data.user_id, message: 'Welcome' });
        } */
    }

    private logOnlineUsers() {
        console.log('All users online');
        const onlineUsers = this.onlineUsers.getOnlineUsers();
        
        for (const user of onlineUsers) {
            console.log(user);
        }
    }
}
