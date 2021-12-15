"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa2_cors_1 = __importDefault(require("koa2-cors"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa_logger_1 = __importDefault(require("koa-logger"));
const index_router_1 = __importDefault(require("./routes/index-router"));
const http_1 = require("http"); // ServerCreate är hittepå bara för att inte krocka med server
const socket_events_1 = __importDefault(require("./utils/socket-events"));
class Server {
    constructor(port) {
        this.indexRouter = new index_router_1.default();
        this.app = new koa_1.default();
        this.port = port;
        this.appServer = (0, http_1.createServer)(this.app.callback());
        this.socketEvents = new socket_events_1.default(this.appServer);
    }
    run() {
        this.setUp();
        this.app.use(this.indexRouter.router.routes());
        this.app.use(this.indexRouter.router.allowedMethods());
        this.listen();
    }
    setUp() {
        this.app.use((0, koa_bodyparser_1.default)());
        this.app.use((0, koa2_cors_1.default)({ origin: '*' }));
        this.app.use((0, koa_logger_1.default)());
    }
    listen() {
        this.appServer.listen(this.port, async () => {
            console.log(`Server listening on port: ${this.port}`);
        }).on('error', (err) => {
            console.error(err);
        });
    }
}
exports.default = Server;
