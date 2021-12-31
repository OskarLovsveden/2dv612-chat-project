import { AxiosResponse } from 'axios';
import { instance } from './axios';
import type { Chatroom, NewChatroom } from '../../types/Chatroom';
import type { User } from '../../types/User';

class ChatroomService {
    private http = instance();

    getAll(): Promise<AxiosResponse<Chatroom[], any>> {
        return this.http.get<Array<Chatroom>>('/room');
    }

    get(id: number): Promise<AxiosResponse<Chatroom, any>> {
        return this.http.get<Chatroom>(`/room/${id}`);
    }

    async getChatroomUsers(id: number): Promise<User[]> {
        return (await this.http.get<User[]>(`room/${id}/user`)).data;
    }

    async create(data: NewChatroom): Promise<any> {
        return (await this.http.post<any>('/room', data)).data;
    }

    update(data: Chatroom, id: number): Promise<AxiosResponse<any, any>> {
        return this.http.put<any>(`/room/${id}`, data);
    }

    delete(id: number): Promise<AxiosResponse<any, any>> {
        return this.http.delete<any>(`/room/${id}`);
    }
}

export default ChatroomService;
