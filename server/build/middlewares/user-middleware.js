"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserMiddleware {
    async requestHasValidParams(ctx, next) {
        if (!ctx.request.body.username) {
            ctx.throw(400, { message: 'Username was missing in the request' });
        }
        if (!ctx.request.body.password) {
            ctx.throw(400, { message: 'password was missing in the request' });
        }
        if (!ctx.request.body.role) {
            ctx.throw(400, { message: 'role was missing in the request' });
        }
        const userCreate = {
            password: ctx.request.body.password,
            username: ctx.request.body.username,
            role: ctx.request.body.role,
            active: true
        };
        ctx.userCreate = userCreate;
        await next();
    }
}
exports.default = UserMiddleware;
