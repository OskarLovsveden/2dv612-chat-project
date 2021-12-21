import http from './axios';
import type { Chatroom, NewChatroom } from '../../types/Chatroom';

class ChatroomService {
    getAll() {
        return http.get<Array<Chatroom>>('/room');
    }
    
    get(id: number) {
        return http.get<Chatroom>(`/room/${id}`);
    }

    create(data: NewChatroom) {
    // eslint-disable-next-line
        return http.post<any>('/room', data); // TODO: Set type
    }
    update(data: Chatroom, id: number) {
    // eslint-disable-next-line
        return http.put<any>(`/room/${id}`, data); // TODO: Set type
    }
    delete(id: number) {
    // eslint-disable-next-line
        return http.delete<any>(`/room/${id}`); // TODO: Set type
    }
}
  
export default new ChatroomService();