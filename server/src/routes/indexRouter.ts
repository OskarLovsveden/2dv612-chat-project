import Router, { IMiddleware } from 'koa-router';
import UserRouter from './userRouter';

export default class IndexRouter {
    private _router: Router = new Router();
    private UserRouter: UserRouter = new UserRouter();

    constructor() {
        this.initializeRoutes();
    }
    
    public get router(): IMiddleware<any, unknown> {
        return this._router.routes();
    }
    
    private initializeRoutes(): void {
        this._router.use('/api/users', this.UserRouter.router);

    }

}