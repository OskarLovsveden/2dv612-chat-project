"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const socket_services_1 = __importDefault(require("./socket-services"));
class SocketEvents {
    constructor(createServer) {
        this.socketServices = new socket_services_1.default();
        this.createServer = createServer;
        this.initializeConnection();
    }
    initializeConnection() {
        this.io = new socket_io_1.Server(this.createServer, {
            cors: {
                origin: '*'
            }
        });
        this.io.attach(this.createServer);
        this.io.on('connection', (socket) => this.initializeEvents(socket));
    }
    initializeEvents(socket) {
        console.log('Socket is online :)..');
        socket.emit('userConnected', { connected: true });
        socket.on('user-connect', (data) => this.socketServices.handleUserConnect(data, socket));
        socket.on('user-disconnect', () => this.socketServices.handleUserDisconnect(socket));
        socket.on('join-room', (data) => this.socketServices.handleJoinRoom(data, socket));
        socket.on('chat-message', (data) => this.socketServices.handleChatMessage(data, socket, this.io));
        socket.on('room-message', () => console.log('rooom'));
    }
}
exports.default = SocketEvents;
