import { Socket } from 'socket.io';

export default class SocketRooms {
    
    private _rooms: Map<string, Set<number>> = new Map<string, Set<number>>();

    public addRoom(socketRoom: string, users: Set<number>) {
        this._rooms.set(socketRoom, users);
    }
    
    public hasRoom(room_id: string) {
        return this._rooms.has(room_id);
    }
    
    public joinRooms(userID: number, socket: Socket) {
        for (const room of this._rooms) {
            const users = room[1];
            const roomName = room[0];

            console.log(userID, users);
            console.log(users.has(userID));
            if(users.has(userID)){
                socket.join(roomName);
                console.log(`User: ${userID} joined room: ${roomName}`);
            }
        }
    }
    
}