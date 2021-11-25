import Koa from 'koa';
import cors from 'koa2-cors';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import IndexRouter from './routes/indexRouter';

export default class Server {
    private app: Koa = new Koa();
    private indexRouter: IndexRouter = new IndexRouter();
    private port: number | string;

    constructor(port: number | string) {
        this.port = port;
    }

    public run (): void {
        this.setUp();
        this.app.use(this.indexRouter.router);
        this.listen();
    }

    private setUp(): void {
        this.app.use(bodyParser());
        this.app.use(
            cors({
                origin: '*'
            })
        );
        this.app.use(logger());
    }

    private listen(): void {
        this.app.listen(this.port, async () => {
            console.log(`Server listening on port: ${this.port}`);
        }).on('error', (err: Error) => {
            console.error(err);
        });
    }
}