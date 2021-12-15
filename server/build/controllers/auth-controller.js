"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const jwt_helper_1 = require("../utils/jwt-helper");
class AuthController {
    constructor() {
        this.userModel = new user_1.default();
    }
    async login(ctx) {
        try {
            const { username, password } = ctx.request.body;
            const userModel = await this.userModel.validateLogin(username, password);
            console.log('Yahoo');
            const token = await (0, jwt_helper_1.createToken)({
                id: userModel.id,
                role: userModel.role,
                username: userModel.username
            });
            ctx.body = { token, id: userModel.id, username: userModel.username, role: userModel.role };
        }
        catch (error) {
            console.error(error);
        }
    }
    async authenticate(ctx) {
        try {
            ctx.body = { username: ctx.user.username, id: ctx.user.id, role: ctx.user.role };
        }
        catch (error) {
            console.error(error);
        }
    }
}
exports.default = AuthController;
