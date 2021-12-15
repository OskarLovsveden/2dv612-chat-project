"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
class UserController {
    constructor() {
        this.table = 'users';
        this.userModel = new user_1.default();
    }
    // private testService: TestService = new TestService();
    async getAll(ctx) {
        try {
            /* const users = await db.from(this.table).select('*'); */
            const users = await this.userModel.getAll();
            ctx.body = users;
        }
        catch (e) {
            console.error(e);
        }
    }
    // TODO Knex implementation?
    async add(ctx) {
        try {
            /* await db(this.table).insert(user); */
            const userCreated = await this.userModel.create(ctx.userCreate);
            if (!userCreated) {
                ctx.throw(400, { message: 'failed to create user' });
            }
            ctx.body = { message: 'User created' };
        }
        catch (e) {
            console.error(e);
        }
    }
    async get(ctx) {
        try {
            const id = ctx.params.id;
            const user = await this.userModel.get(id);
            if (!user) {
                ctx.throw(400, { message: 'Username was missing in the request' });
            }
            ctx.body = {
                id: user.id,
                username: user.username,
                role: user.role,
                active: user.active
            };
        }
        catch (e) {
            console.error(e);
        }
    }
    async remove(ctx) {
        try {
            const id = ctx.params.id;
            /* await db.from(this.table).select('*').where({ id: id }).del(); */
            const user = await this.userModel.delete(id);
            if (!user) {
                ctx.throw(400, { message: 'Could not delete user...' });
            }
            ctx.body = { message: 'Success' };
        }
        catch (e) {
            // TODO proper error response, and handling
            const id = ctx.params.id;
            ctx.status = 404;
            ctx.body = { message: 'No user with id ' + id + ' found' };
        }
    }
    async update(ctx) {
        try {
            const id = ctx.params.id;
            const active = ctx.request.body.active;
            const userIsUpdated = await this.userModel.update(id, active);
            if (!userIsUpdated) {
                ctx.throw(400, { message: 'Could not update user' });
            }
            ctx.body = { message: 'Success' };
        }
        catch (e) {
            // TODO proper error response, and handling
            const id = ctx.params.id;
            ctx.status = 404;
            ctx.body = { message: 'No user with id ' + id + ' found' };
        }
    }
}
exports.default = UserController;
