"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = require("../db/postgres");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class User {
    constructor() {
        this.USER_TABLE = 'users';
        this.SALT_ROUNDS = 10;
    }
    async getAll() {
        const users = await (0, postgres_1.db)(this.USER_TABLE);
        if (!users) {
            return [];
        }
        const usersArray = users.map((u) => {
            return {
                active: u.active,
                id: u.id,
                role: u.role,
                username: u.username
            };
        });
        return usersArray;
    }
    async validateLogin(username, password) {
        const user = await (0, postgres_1.db)(this.USER_TABLE).where({ username }).first();
        if (!user || !(await bcryptjs_1.default.compare(password, user.password))) {
            throw new Error('Invalid email or password');
        }
        return user;
    }
    async get(userID) {
        const user = await (0, postgres_1.db)(this.USER_TABLE).where({ id: userID }).first();
        return user;
    }
    async create(clientUser) {
        const hashedPassword = await bcryptjs_1.default.hash(clientUser.password, this.SALT_ROUNDS);
        const userCreated = await (0, postgres_1.db)(this.USER_TABLE).insert({
            username: clientUser.username,
            password: hashedPassword,
            role: clientUser.role,
            active: clientUser.active
        });
        console.log(userCreated);
        if (!userCreated) {
            return false;
        }
        return true;
    }
    async delete(userID) {
        const userDeleted = await postgres_1.db.from(this.USER_TABLE).where({ id: userID }).del();
        if (!userDeleted) {
            return false;
        }
        return true;
    }
    async update(id, active) {
        const updatedUser = await postgres_1.db.from(this.USER_TABLE).where({ id }).update({ active });
        if (!updatedUser) {
            return false;
        }
        return true;
    }
}
exports.default = User;
