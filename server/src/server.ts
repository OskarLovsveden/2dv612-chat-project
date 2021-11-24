import Koa, {BaseContext} from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import cors from 'koa2-cors';
import logger from 'koa-logger';
import { config } from './config';

const app = new Koa();

// Middleware
app.use(bodyParser());
app.use(
    cors({
        origin: '*'
    })
);
app.use(logger());

// Routes
const router: Router = new Router();

router.get('/', async ctx => {
    try {
        ctx.body = {
            message: 'Hello Lars'
        };
    } catch (e) {
        console.error(e);
    }
});

app.use(router.routes());

// Connect
const PORT = config.port;

app.listen(PORT, async () => {
    console.log(`Server listening on port: ${PORT}`);
}).on('error', err => {
    console.error(err);
});
