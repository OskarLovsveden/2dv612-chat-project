import { BaseContext } from 'koa';

export default class TestMiddleware {

    public checkTestQueryParams (ctx: BaseContext, next: () => Promise<void>): void {
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