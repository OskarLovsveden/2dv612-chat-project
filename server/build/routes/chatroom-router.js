"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const chatroom_controller_1 = __importDefault(require("../controllers/chatroom-controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth-middleware"));
class ChatroomRouter {
    constructor() {
        this._router = new koa_router_1.default();
        this.controller = new chatroom_controller_1.default();
        this.middleware = new auth_middleware_1.default();
        this.initializeRoutes();
    }
    get router() {
        return this._router.routes();
    }
    initializeRoutes() {
        this._router.post('/', 
        // (ctx: Context, next: Next) => this.middleware.requestHasValidToken(ctx, next),
        // (ctx: Context, next: Next) => this.middleware.requesterHasAdminRights(ctx, next),
        (ctx) => this.controller.add(ctx));
        this._router.get('/', 
        // (ctx: Context, next: Next) => this.middleware.requestHasValidToken(ctx, next),
        (ctx) => this.controller.getAll(ctx));
        this._router.get('/:id', (ctx, next) => this.middleware.requestHasValidToken(ctx, next), (ctx) => this.controller.get(ctx));
        this._router.delete('/:id', 
        // (ctx: Context, next: Next) => this.middleware.requestHasValidToken(ctx, next),
        // (ctx: Context, next: Next) => this.middleware.requesterHasAdminRights(ctx, next),
        (ctx) => this.controller.remove(ctx));
        // this._router.put('/:id',
        //     (ctx: Context, next: Next) => this.middleware.requestHasValidToken(ctx, next),
        //     (ctx: Context, next: Next) => this.middleware.requesterHasAdminRights(ctx, next),
        //     (ctx: Context) => this.controller.update(ctx)
        // );
    }
}
exports.default = ChatroomRouter;
