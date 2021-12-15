"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
class AuthMiddleware {
    async requestIncludesUsername(ctx, next) {
        console.log(ctx.request.body);
        if (!ctx.request.body.username) {
            ctx.throw(400, { message: 'Username was missing in the request' });
        }
        await next();
    }
    async requestIncludesPassword(ctx, next) {
        if (!ctx.request.body.password) {
            ctx.throw(400, { message: 'Password was missing in the request' });
        }
        await next();
    }
    async requesterHasAdminRights(ctx, next) {
        console.log(ctx.user);
        if (ctx.user.role !== 'admin') {
            ctx.throw(401, { message: 'Unauthorized', role: ctx.user.role });
        }
        await next();
    }
    async requestHasValidToken(ctx, next) {
        if (!(ctx.headers.authorization)) {
            ctx.throw(401, { message: 'Token is missing' });
        }
        const authorization = ctx.headers.authorization.split(' ');
        if (authorization[0] !== 'Bearer') {
            ctx.throw(401, { message: 'Wrong format on headers' });
        }
        const publicKey = await fs_1.default.promises.readFile('./public.pem');
        try {
            const payload = jwt.verify(authorization[1], publicKey);
            ctx.user = payload;
        }
        catch (error) {
            console.log(error);
            ctx.throw(403, { message: 'Whoopsidooopsi something went wrong!' });
        }
        await next();
    }
}
exports.default = AuthMiddleware;
