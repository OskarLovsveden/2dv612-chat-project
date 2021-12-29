import { AxiosResponse } from 'axios';
import { instance } from './axios';
import { AuthResponse, LoginResponse, LoginUser } from '../../types/User';

class AuthService {
    private http = instance();

    login(user: LoginUser): Promise<AxiosResponse<LoginResponse, any>> {
        return this.http.post<LoginResponse>('/auth/login', user);
    }

    async checkIsAuthenticated(): Promise<AuthResponse | null> {
        const response = await this.http.post<AuthResponse>(
            '/auth/authenticate'
        );

        if (response.status !== 200) {
            return null;
        }

        return response.data;
    }
}

export default AuthService;
