"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const auth_controller_1 = __importDefault(require("../controllers/auth-controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth-middleware"));
class AuthRouter {
    constructor() {
        this._router = new koa_router_1.default();
        this.controller = new auth_controller_1.default();
        this.middleware = new auth_middleware_1.default();
        this.initializeRoutes();
    }
    get router() {
        return this._router.routes();
    }
    initializeRoutes() {
        this._router.post('/login', (ctx, next) => this.middleware.requestIncludesUsername(ctx, next), (ctx, next) => this.middleware.requestIncludesPassword(ctx, next), (ctx) => this.controller.login(ctx));
        this._router.post('/authenticate', (ctx, next) => this.middleware.requestHasValidToken(ctx, next), (ctx) => this.controller.authenticate(ctx));
    }
}
exports.default = AuthRouter;
