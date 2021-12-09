import http from "./axios";
import type { Chatroom, NewChatroom } from "../../types/Chatroom"

class UserService {
    getAll() {
      return http.get<Array<Chatroom>>("/room");
    }
    
    get(id: Number) {
      return http.get<Chatroom>(`/room/${id}`);
    }
    
    create(data: NewChatroom) {
      return http.post<any>("/room", data);
    }

    update(data: Chatroom, id: Number) {
      return http.put<any>(`/room/${id}`, data);
    }
  
    delete(id: Number) {
      return http.delete<any>(`/room/${id}`);
    }
  }
  
  export default new UserService();