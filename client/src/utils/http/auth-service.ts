import http from "./axios";
import type { LoginResponse, LoginUser } from "../../types/User"

class AuthService {
    login(user: LoginUser) {
        return http.post<LoginResponse>("/auth/login", user)
    }
  }
  
  export default new AuthService();