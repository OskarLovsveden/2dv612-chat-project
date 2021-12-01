import { Context } from 'koa';
import TestService from '../services/test-service';
import { db } from '../db/postgres';

export default class TestController {
    // private testService: TestService = new TestService();

    public async getUsers(ctx: Context): Promise<void> {
        try {
            const users = await db.from('users').select('*');
            ctx.body = users;
        } catch (e) {
            console.error(e);
        }
    }

    // Work in progress
    public async addUser(ctx: Context): Promise<void> {
        try {
            const user = ctx.request.body;

            await db('users').insert(user);

            ctx.body = {
                message: 'Success',
            };
        } catch (e) {
            console.error(e);
        }
    }
}
