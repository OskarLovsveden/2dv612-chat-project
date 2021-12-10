import http from "./axios";
import type { Chatroom, NewChatroom } from "../../types/Chatroom"

class ChatroomService {
    getAll() {
      return http.get<Array<Chatroom>>("/room");
    }
    
    get(id: number) {
      return http.get<Chatroom>(`/room/${id}`);
    }
    
    create(data: NewChatroom) {
      return http.post<any>("/room", data);
    }

    update(data: Chatroom, id: number) {
      return http.put<any>(`/room/${id}`, data);
    }
  
    delete(id: number) {
      return http.delete<any>(`/room/${id}`);
    }
  }
  
  export default new ChatroomService();