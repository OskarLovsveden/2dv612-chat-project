import { instance } from './axios';
import type { Chatroom, NewChatroom } from '../../types/Chatroom';
import type { User } from '../../types/User';

class ChatroomService {
    private http = instance()

    getAll() {
        return this.http.get<Array<Chatroom>>('/room');
    }
    
    get(id: number) {
        return this.http.get<Chatroom>(`/room/${id}`);
    }
    getChatroomUsers(id: number) {
        return this.http.get<User[]>(`room/${id}/user`);
    }

    create(data: NewChatroom) {
        return this.http.post<any>('/room', data);
    }
    update(data: Chatroom, id: number) {
        return this.http.put<any>(`/room/${id}`, data);
    }
    delete(id: number) {
        return this.http.delete<any>(`/room/${id}`);
    }
}
  
export default ChatroomService;
