"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SocketServices {
    constructor() {
        this.onlineUsers = {};
        this.rooms = [
            { room_id: 'room_1' },
            { room_id: 'room_2' }
        ];
    }
    handleUserConnect(data, socket) {
        if (data.user_id) {
            this.onlineUsers[socket.id] = data.user_id;
        }
        console.log('User: ' + data.user_id + ' is now online');
        for (const user of Object.values(this.onlineUsers)) {
            console.log(user);
        }
    }
    handleChatMessage(data, socket, io) {
        const room = this.rooms.find((r) => r.room_id === data.room_id);
        console.log('before sending message', data.message);
        if (room) {
            console.log(`Sending message: ${data.message} to room: ${data.room_id}`);
            io.in(room.room_id).emit('room-message', { username: data.user_id, message: data.message });
        }
    }
    handleUserDisconnect(socket) {
        console.log(`user: ${this.onlineUsers[socket.id]} disconnected`);
        delete this.onlineUsers[socket.id];
        console.log(this.onlineUsers);
    }
    handleJoinRoom(data, socket) {
        const room = this.rooms.find((r) => r.room_id === data.room_id);
        console.log(room);
        console.log(data);
        if (room) {
            console.log(`User: ${data.user_id} joined room: ${data.room_id}`);
            socket.join(room.room_id);
            socket.to(room.room_id).emit('room-message', { username: data.user_id, message: 'Welcome' });
        }
    }
}
exports.default = SocketServices;
