import Router from 'koa-router';
import { db } from '../db/postgres';

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

router.get('/users', async ctx => {
  try {
    const users = (await db.from('users').select('*'))
    ctx.body = users
  } catch(e) {
    console.error(e)
  }
})

router.post('/create', async ctx => {
  try {
    ctx.body = ctx.request.body;
  } catch (e) {
    console.error(e);
  } 
})