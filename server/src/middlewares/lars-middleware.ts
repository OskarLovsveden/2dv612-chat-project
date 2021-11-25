import { BaseContext } from 'koa';

export default class LarsMiddleware {

    public checkLarsQueryParams (ctx: BaseContext, next: () => Promise<void>): void {
        if (ctx.query.name !== 'lars') {
            ctx.status = 400;
            ctx.body = {
                error: 'You are not lars!'
            };
        } else {
            next();
        }
    }
}