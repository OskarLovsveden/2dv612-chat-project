import Router, { IMiddleware } from 'koa-router';
import LarsRouter from './lars-router';

export default class IndexRouter {
    private _router: Router = new Router();
    private larsRouter: LarsRouter = new LarsRouter();

    constructor() {
        this.initializeRoutes();
    }
    
    public get router(): IMiddleware<any, unknown> {
        return this._router.routes();
    }
    
    private initializeRoutes(): void {
        this._router.use('/api/lars', this.larsRouter.router);
    }

}