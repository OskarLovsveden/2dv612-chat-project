import { db } from '../db/postgres';
// import { RespondRoom } from '../types/respond-types';
import { RequestRoomCreate } from '../types/request-types';

export default class ChatRoom {
    private ROOM_TABLE = 'chatroom';

    public async create(clientRoom: RequestRoomCreate): Promise<boolean> {
        const roomCreated = await db(this.ROOM_TABLE).insert({ 
            name: clientRoom.name, 
            public: clientRoom.public,
            tag: clientRoom.tag 
        });

        console.log(roomCreated);
        if (!roomCreated) {
            return false;
        }

        return true;
    }

    //     public get(roomID: number) {
        
    //     }

    //     public getAll() {

    //     }

    //     public delete(roomID: number) {

    //     }

    //     public update(roomID: number) {

//     }
}