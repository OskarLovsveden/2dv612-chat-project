import http from './axios';
import type { User } from '../../types/User';
import type { NewUser } from '../../types/User';

class UserService {
    getAll() {
        return http.get<Array<User>>('/user');
    }
    
    get(id: number) {
        return http.get<User>(`/user/${id}`);
    }
    
    create(data: NewUser) {
        // eslint-disable-next-line
        return http.post<any>('/user', data); // TODO: Set type
    }
    
    update(data: User, id: number) {
        // eslint-disable-next-line
        return http.put<any>(`/user/${id}`, data); // TODO: Set type
    }
  
    delete(id: number) {
        // eslint-disable-next-line
        return http.delete<any>(`/user/${id}`); // TODO: Set type
    }
}
  
export default new UserService();