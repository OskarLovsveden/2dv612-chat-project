import { instance } from './axios';
import type { Msg, NewMessage } from '../../types/Message';

class MessageService {
    private http = instance();

    async create(data: NewMessage, id: number): Promise<Msg> {
        return (await this.http.post<any>(`room/${id}/message`, data)).data;
    }

    async getAllForRoom(id: number): Promise<Msg[]> {
        return (await this.http.get<Msg[]>(`room/${id}/message`)).data;
    }

    async delete(id: number, msg_id: number): Promise<any> {
        return (await this.http.delete<any>(`room/${id}/message/${msg_id}`))
            .data;
    }
}

export default MessageService;
