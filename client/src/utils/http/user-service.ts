import { AxiosResponse } from 'axios';
import { instance } from './axios';
import type { User, NewUser } from '../../types/User';

class UserService {
    private http = instance();

    getAll(): Promise<AxiosResponse<User[], any>> {
        return this.http.get<Array<User>>('/user');
    }

    get(id: number): Promise<AxiosResponse<User, any>> {
        return this.http.get<User>(`/user/${id}`);
    }

    create(data: NewUser): Promise<AxiosResponse<any, any>> {
        return this.http.post<any>('/user', data);
    }

    update(data: User, id: number): Promise<AxiosResponse<any, any>> {
        return this.http.put<any>(`/user/${id}`, data);
    }

    delete(id: number): Promise<AxiosResponse<any, any>> {
        return this.http.delete<any>(`/user/${id}`);
    }
}

export default UserService;
