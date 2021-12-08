import Router, { IMiddleware } from 'koa-router';
import UserRouter from './user-router';
import ChatroomRouter from './chatroom-router';

export default class IndexRouter {
    private _router: Router = new Router();
    private userRouter: UserRouter = new UserRouter();
    private chatroomRouter: ChatroomRouter = new ChatroomRouter();

    constructor() {
        this.initializeRoutes();
    }
    
    public get router(): IMiddleware<any, unknown> {
        return this._router.routes();
    }
    
    private initializeRoutes(): void {
        this._router.use('/api/user', this.userRouter.router);
        this._router.use('/api/room', this.chatroomRouter.router);
    }



}