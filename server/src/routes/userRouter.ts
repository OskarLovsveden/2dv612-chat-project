import { Context } from 'koa';
import Router, { IMiddleware } from 'koa-router';
import UserController from '../controllers/userController';
import UserMiddleware from '../middlewares/userMiddleware';

export default class UserRouter {
    private _router: Router = new Router();
    private controller: UserController = new UserController();
    private middleware: UserMiddleware = new UserMiddleware();

    constructor() {
        this.initializeRoutes();
    }

    public get router(): IMiddleware<any, unknown> {
        return this._router.routes();
    }

    private initializeRoutes(): void {
        this._router
            .get('/', 
                (ctx: Context, next: () => Promise<void>) => this.middleware.adminRightsCheck(ctx, next), (ctx: Context) => this.controller.getUsers(ctx))
            .post('/', (ctx: Context, next: () => Promise<void>) => this.middleware.adminRightsCheck(ctx, next), (ctx: Context) => this.controller.addUser(ctx))
            .allowedMethods();
        this._router.get('/:id', (ctx: Context) =>
            this.controller.getSingleUser(ctx)
        );
    }
}