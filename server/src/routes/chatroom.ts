import { BaseContext, Context } from 'koa';
import Router, { IMiddleware } from 'koa-router';
import ChatroomController from '../controllers/chatroom-controller';


export default class ChatroomRouter {
    private _router: Router = new Router();
    private controller: ChatroomController = new ChatroomController();

    constructor() {
        this.initializeRoutes();
    }

    public get router(): IMiddleware<any, unknown> {
        return this._router.routes();
    }

    private initializeRoutes(): void {
        this._router.post('/', 
            (ctx: Context) => this.controller.chatroomInfo(ctx))
            .allowedMethods();
    }
}