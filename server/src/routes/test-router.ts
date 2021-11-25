import { BaseContext } from 'koa';
import Router, { IMiddleware } from 'koa-router';
import TestController from '../controllers/test-controller';
import TestMiddleware from '../middlewares/test-middleware';

export default class TestRouter {
    private _router: Router = new Router();
    private controller: TestController = new TestController();
    private middleware: TestMiddleware = new TestMiddleware();

    constructor() {
        this.initializeRoutes();
    }
    
    public get router(): IMiddleware<any, unknown> {
        return this._router.routes();
    }
    
    private initializeRoutes(): void {
        this._router.get('/', 
            (ctx: BaseContext, next: () => Promise<void>) => this.middleware.checkTestQueryParams(ctx, next),
            (ctx: BaseContext) => this.controller.test(ctx)
        );
    }
}