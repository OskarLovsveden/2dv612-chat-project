import http from "./axios";
import type { User } from "../../types/User"
import type { NewUser } from "../../types/User"

class UserService {
    getAll() {
      return http.get<Array<User>>("/user");
    }
    
    get(id: Number) {
      return http.get<User>(`/user/${id}`);
    }
    
    create(data: NewUser) {
      return http.post<any>("/user", data);
    }
    
    update(data: User, id: Number) {
      return http.put<any>(`/user/${id}`, data);
    }
  
    delete(id: Number) {
      return http.delete<any>(`/user/${id}`);
    }
  }
  
  export default new UserService();