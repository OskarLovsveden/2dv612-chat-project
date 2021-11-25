import { BaseContext } from 'koa';
import Router, { IMiddleware } from 'koa-router';
import LarsController from '../controllers/lars-controller';
import LarsMiddleware from '../middlewares/lars-middleware';

export default class LarsRouter {
    private _router: Router = new Router();
    private controller: LarsController = new LarsController();
    private middleware: LarsMiddleware = new LarsMiddleware();

    constructor() {
        this.initializeRoutes();
    }
    
    public get router(): IMiddleware<any, unknown> {
        return this._router.routes();
    }
    
    private initializeRoutes(): void {
        this._router.get('/', 
            (ctx: BaseContext, next: () => Promise<void>) => this.middleware.checkLarsQueryParams(ctx, next),
            (ctx: BaseContext) => this.controller.lars(ctx)
        );
    }
}