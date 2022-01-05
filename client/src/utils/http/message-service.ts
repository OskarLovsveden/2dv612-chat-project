import { instance } from './axios';
import type { Msg, NewMessage } from '../../types/Message';

class MessageService {
    private http = instance();

    async create(data: NewMessage): Promise<Msg> {
        return (await this.http.post<any>('message', data)).data;
    }

    async getAllForRoom(id: number): Promise<Msg[]> {
        return (await this.http.get<Msg[]>(`message/room/${id}`)).data;
    }
}

export default MessageService;
