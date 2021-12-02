import { Context } from 'koa';

export default class UserMiddleware {
    public async adminRightsCheck(
        ctx: Context,
        next: () => Promise<void>
    ): Promise<void> {
        if (ctx.query.role !== 'admin') {
            ctx.status = 500;
            ctx.body = {
                error: 'You are not admin!'
            };
        } else {
            await next();
        }
    }

    public async moderatorRightsCheck(
        ctx: Context,
        next: () => Promise<void>
    ): Promise<void> {
        if (ctx.query.role !== 'moderator') {
            ctx.status = 500;
            ctx.body = {
                error: 'You are not moderator!'
            };
        } else {
            await next();
        }
    }

    public async userRightsCheck(
        ctx: Context,
        next: () => Promise<void>
    ): Promise<void> {
        if (ctx.query.role !== 'user') {
            ctx.status = 500;
            ctx.body = {
                error: 'You are not user!'
            };
        } else {
            await next();
        }
    }
}
