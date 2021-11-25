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

router.post('/create', async ctx => {
  try {
    console.log(ctx.request.body)
    ctx.body = ctx.request.body;
  } catch (e) {
    console.error(e);
  } 
})