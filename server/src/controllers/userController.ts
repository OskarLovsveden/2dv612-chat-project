import { Context } from 'koa';
import { db } from '../db/postgres';

export default class UserController {
    readonly table = 'users'; 
    // private testService: TestService = new TestService();

    public async getAll(ctx: Context): Promise<void> {
        try {
            const users = await db.from(this.table).select('*');
            ctx.body = users;
        } catch (e) {
            console.error(e);
        }
    }

    // Work in progress
    public async add(ctx: Context): Promise<void> {
        try {
            const user = ctx.request.body.data;
            await db(this.table).insert(user);

            ctx.body = { message: 'Success' };
        } catch (e) {
            console.error(e);
        }
    }

    public async get(ctx: Context): Promise<void> {
        try {
            const id = ctx.params.id;
            const user = await db.from(this.table).select('*').where({ id: id });
            
            ctx.body = user;
        } catch (e) {
            console.error(e);
        }
    }
    
    public async remove(ctx: Context): Promise<void> {
        try {
            console.log('IN REMOVE');
            const id = ctx.params.id;
            await db.from(this.table).select('*').where({ id: id }).del();
            ctx.body = { message: 'Success' };
        } catch (e) {
            // TODO proper error response, and handling
            const id = ctx.params.id;
            ctx.status = 404;
            ctx.body = { message: 'No user with id ' + id + ' found' };
        }
    }
}
