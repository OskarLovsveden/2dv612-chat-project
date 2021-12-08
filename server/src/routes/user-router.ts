import { Context } from 'koa';
import Router, { IMiddleware } from 'koa-router';
import UserController from '../controllers/user-controller';

export default class UserRouter {
    private _router: Router = new Router();
    private controller: UserController = new UserController();

    constructor() {
        this.initializeRoutes();
    }

    public get router(): IMiddleware<any, unknown> {
        return this._router.routes();
    }

    private initializeRoutes(): void {
        this._router.get('/:id', (ctx: Context) =>
            this.controller.get(ctx)
        );
        
        this._router.get('/', 
            (ctx: Context) => this.controller.getAll(ctx)
        );
        
        this._router.post('/',
            // TODO Add auth
            (ctx: Context) => this.controller.add(ctx)
        );
        
        this._router.delete('/:id',
            // TODO Add auth
            (ctx: Context) => this.controller.remove(ctx)
        );
        this._router.put('/:id',
            // TODO Add auth
            (ctx: Context) => this.controller.update(ctx)
        );
        
        this._router.allowedMethods();
    }
}
