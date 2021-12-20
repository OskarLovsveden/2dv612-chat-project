import http from "./axios";
import { AuthResponse, LoginResponse, LoginUser } from "../../types/User";

class AuthService {
  login(user: LoginUser) {
    return http.post<LoginResponse>("/auth/login", user);
  }

  async checkIsAuthenticated() {
    const response = await http.post<AuthResponse>("/auth/authenticate");
    if (response.status !== 200) {
      return null;
    }
    return response.data;
  }
}

export default new AuthService();
