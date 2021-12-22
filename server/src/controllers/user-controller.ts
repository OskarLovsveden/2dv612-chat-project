import { Context } from 'koa';
import UserService from '../services/user-service';
import User from '../models/User';

export default class UserController {
    readonly table = 'users'; 
    private userService = new UserService();

    public async getAll(ctx: Context): Promise<void> {
        try {
            const users = await this.userService.getAll(User);
            ctx.body = users;
        } catch (e) {
            console.error(e);
        }
    }
    
    public async add(ctx: Context): Promise<void> {
        try {            
            const userCreated = await this.userService.create(ctx.userCreate, User);

            if (!userCreated) {
                ctx.throw(400, { message: 'failed to create user' });
            }

            ctx.body = { message: 'User created' };
        } catch (e) {
            console.error(e);
        }
    }

    public async get(ctx: Context): Promise<void> {
        try {
            const id = ctx.params.id;            
            const user = await this.userService.get(id, User);

            if (!user) {
                ctx.throw(400,{ message: 'Username was missing in the request' });
            }
            
            ctx.body = {
                id: user.id,
                username: user.username,
                role: user.role,
                active: user.active
            };
        } catch (e) {
            console.error(e);
        }
    }
    
    public async remove(ctx: Context): Promise<void> {
        try {
            const id = ctx.params.id;
            /* await db.from(this.table).select('*').where({ id: id }).del(); */

            const user = await this.userService.delete(id, User);

            if (!user) {
                ctx.throw(400, { message: 'Could not delete user...' });
            }

            ctx.body = { message: 'Success' };
        } catch (e) {
            // TODO proper error response, and handling
            const id = ctx.params.id;
            ctx.status = 404;
            ctx.body = { message: 'No user with id ' + id + ' found' };
        }
    }

    public async update(ctx: Context): Promise<void> {
        try {
            const id = ctx.params.id;
            const user = ctx.body;

            const userIsUpdated = await this.userService.update(id, user, User);
            
            if (!userIsUpdated) {
                ctx.throw(400, { message: 'Could not update user' });
            }

            ctx.body = { message: 'User updated' };
        } catch (e) {
            // TODO proper error response, and handling
            const id = ctx.params.id;
            ctx.status = 404;
            ctx.body = { message: 'No user with id ' + id + ' found' };
        }
    }
}
