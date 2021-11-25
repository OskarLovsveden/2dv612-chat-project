import Router from 'koa-router';

export const router: Router = new Router()

router.get('/', async ctx => {
    try {
        ctx.body = {
            message: 'Hello Lars'
        };
    } catch (e) {
        console.error(e);
    }
});