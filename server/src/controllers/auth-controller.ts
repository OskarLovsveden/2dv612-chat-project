import { Context } from 'koa';
import User from '../models/user';
import { createToken } from '../utils/jwt-helper';

export default class AuthController {
    private userModel: User = new User();

    public async login(ctx: Context): Promise<void> {
        try {
            
            const { username, password } = ctx.request.body;

            const userModel = await this.userModel.validateLogin(username, password);
            console.log('Yahoo');
            const token = await createToken({
                id: userModel.id,
                role: userModel.role,
                username: userModel.username
            });

            ctx.body = { token };
        } catch (error) {
            console.error(error);
        }
    }

    public async authenticate(ctx: Context): Promise<void> {
        try {
            ctx.body = { user: ctx.user.username, id:ctx.user.id, role: ctx.user.role };
        } catch (error) {
            console.error(error);
        }
    }
}