"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const user_router_1 = __importDefault(require("./user-router"));
const chatroom_router_1 = __importDefault(require("./chatroom-router"));
const auth_router_1 = __importDefault(require("./auth-router"));
class IndexRouter {
    constructor() {
        this._router = new koa_router_1.default();
        this.userRouter = new user_router_1.default();
        this.chatroomRouter = new chatroom_router_1.default();
        this.authRouter = new auth_router_1.default();
        this.initializeRoutes();
    }
    get router() {
        return this._router;
    }
    initializeRoutes() {
        this._router.use('/api/user', this.userRouter.router);
        this._router.use('/api/room', this.chatroomRouter.router);
        this._router.use('/api/auth', this.authRouter.router);
    }
}
exports.default = IndexRouter;
