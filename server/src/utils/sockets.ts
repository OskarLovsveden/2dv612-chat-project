import { Server as ServerCreate } from 'http'; // ServerCreate är hittepå bara för att inte krocka med server
import { Server as SocketServer, Socket } from 'socket.io';

export const initializeSocketServer = (server: ServerCreate) => {
    const io = new SocketServer(server, {
        cors: {
            origin: '*'
        }
    });

    io.attach(server);

    handleConnections(io);
};

const handleConnections = (io: SocketServer) => {
    console.log('here');
    io.on('connection', (socket: Socket) => {
        console.log('Hurray');
        socket.emit('userConnected', { connected: true });
    });
};