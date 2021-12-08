import { Context } from 'koa';
import { createToken } from '../utils/jwt-helper';

export default class AuthController {


    public async login(ctx: Context): Promise<void> {
        try {
            const token = await createToken({
                id: 5,
                role: 'Admin',
                username: ctx.request.body.username
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