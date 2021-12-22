import { instance} from "./axios";
import type { User } from "../../types/User"
import type { NewUser } from "../../types/User"

class UserService {
    private http = instance()


    getAll() {
      return this.http.get<Array<User>>("/user");
    }
    
    get(id: number) {
      return this.http.get<User>(`/user/${id}`);
    }
    
    create(data: NewUser) {
      return this.http.post<any>("/user", data);
    }
    
    update(data: User, id: number) {
      return this.http.put<any>(`/user/${id}`, data);
    }
  
    delete(id: number) {
      return this.http.delete<any>(`/user/${id}`);
    }
}
  
  export default UserService;
