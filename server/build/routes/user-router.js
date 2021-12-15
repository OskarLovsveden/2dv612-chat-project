"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const user_controller_1 = __importDefault(require("../controllers/user-controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth-middleware"));
const user_middleware_1 = __importDefault(require("../middlewares/user-middleware"));
class UserRouter {
    constructor() {
        this._router = new koa_router_1.default();
        this.controller = new user_controller_1.default();
        this.authMiddleware = new auth_middleware_1.default();
        this.userMiddleware = new user_middleware_1.default();
        this.initializeRoutes();
    }
    get router() {
        return this._router.routes();
    }
    initializeRoutes() {
        this._router.get('/:id', (ctx, next) => this.authMiddleware.requestHasValidToken(ctx, next), (ctx) => this.controller.get(ctx));
        this._router.get('/', 
        // (ctx: Context, next: Next) => this.authMiddleware.requestHasValidToken(ctx, next), 
        (ctx) => this.controller.getAll(ctx));
        this._router.post('/', (ctx, next) => this.userMiddleware.requestHasValidParams(ctx, next), 
        /*  (ctx: Context, next: Next) => this.authMiddleware.requestHasValidToken(ctx, next),
        (ctx: Context, next: Next) => this.authMiddleware.requesterHasAdminRights(ctx, next), */
        (ctx) => this.controller.add(ctx));
        this._router.delete('/:id', 
        // (ctx: Context, next: Next) => this.authMiddleware.requestHasValidToken(ctx, next),
        // (ctx: Context, next: Next) => this.authMiddleware.requesterHasAdminRights(ctx, next),
        (ctx) => this.controller.remove(ctx));
        this._router.put('/:id', (ctx, next) => this.authMiddleware.requestHasValidToken(ctx, next), (ctx, next) => this.authMiddleware.requesterHasAdminRights(ctx, next), (ctx) => this.controller.update(ctx));
    }
}
exports.default = UserRouter;
