import Router, { IMiddleware } from 'koa-router';
import TestRouter from './test-router';

export default class IndexRouter {
    private _router: Router = new Router();
    private testRouter: TestRouter = new TestRouter();

    constructor() {
        this.initializeRoutes();
    }
    
    public get router(): IMiddleware<any, unknown> {
        return this._router.routes();
    }
    
    private initializeRoutes(): void {
        this._router.use('/api/lars', this.testRouter.router);
    }

}