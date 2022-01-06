import { instance } from './axios';
import type { Message, NewMessage } from '../../types/Message';

class MessageService {
    private http = instance();

    async create(data: NewMessage, id: number): Promise<Message> {
        return (await this.http.post<any>(`room/${id}/message`, data)).data;
    }

    async getAllForRoom(id: number): Promise<Message[]> {
        return (await this.http.get<Message[]>(`room/${id}/message`)).data;
    }

    async delete(id: number, msg_id: number): Promise<any> {
        return (await this.http.delete<any>(`room/${id}/message/${msg_id}`))
            .data;
    }
}

export default MessageService;
