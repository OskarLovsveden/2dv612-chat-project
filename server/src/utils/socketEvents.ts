import { Server as ServerCreate } from 'http'; // ServerCreate är hittepå bara för att inte krocka med server
import { Server as SocketServer, Socket } from 'socket.io';
import { EventLogin } from '../types/eventDataTypes';
import SocketServices from './socketServices';

export default class SocketEvents {
    private socketServices = new SocketServices();
    private createServer: ServerCreate;
    private io: SocketServer;

    constructor(createServer: ServerCreate) {
        this.createServer = createServer;
        this.initializeConnection();
    }

    public initializeConnection() {
        this.io = new SocketServer(this.createServer, {
            cors: {
                origin: '*'
            }
        });

        this.io.attach(this.createServer);
        this.io.on('connect', (socket: Socket) => this.initializeEvents(socket));
    }

    private initializeEvents(socket: Socket) {
        console.log('Socket is online :)..');
        socket.emit('userConnected', { connected: true });

        socket.on('user-connect', (data: EventLogin) => this.socketServices.handleUserConnect(data, socket));
        socket.on('disconnect', () => this.socketServices.handleUserDisconnect(socket));
    }
}