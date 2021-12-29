import { AxiosResponse } from 'axios';
import { instance } from './axios';
import type { Chatroom, NewChatroom } from '../../types/Chatroom';

class ChatroomService {
    private http = instance();

    getAll(): Promise<AxiosResponse<Chatroom[], any>> {
        return this.http.get<Array<Chatroom>>('/room');
    }

    get(id: number): Promise<AxiosResponse<Chatroom, any>> {
        return this.http.get<Chatroom>(`/room/${id}`);
    }

    create(data: NewChatroom): Promise<AxiosResponse<any, any>> {
        return this.http.post<any>('/room', data);
    }

    update(data: Chatroom, id: number): Promise<AxiosResponse<any, any>> {
        return this.http.put<any>(`/room/${id}`, data);
    }

    delete(id: number): Promise<AxiosResponse<any, any>> {
        return this.http.delete<any>(`/room/${id}`);
    }
}

export default ChatroomService;
