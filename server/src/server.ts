import Koa, {BaseContext} from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from 'koa2-cors';
import logger from 'koa-logger';
import { config } from './config';
import { router } from './api/router';

const app = new Koa();

// Middleware
app.use(bodyParser());
app.use(
    cors({
        origin: '*'
    })
);
app.use(logger());
app.use(router.routes());
app.use(router.allowedMethods())

// Connect
const PORT = config.port;

app.listen(PORT, async () => {
    console.log(`Server listening on port: ${PORT}`);
}).on('error', err => {
    console.error(err);
});
