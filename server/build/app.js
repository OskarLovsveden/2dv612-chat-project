"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config/config");
const server_1 = __importDefault(require("./server"));
const PORT = config_1.config.port;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const main = async () => {
    try {
        const server = new server_1.default(PORT || 5000);
        server.run();
    }
    catch (error) {
        console.error(error);
    }
};
main();
