import { Server as ServerCreate } from 'http'; // ServerCreate är hittepå bara för att inte krocka med server
import { Server as SocketServer, Socket } from 'socket.io';

type SocketLogin = {
    user_id: string | number;
};

export const socketConnections = {};

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
    io.on('connect', (socket: Socket) => {
        console.log('Hurray');
        socket.emit('userConnected', { connected: true });

        socket.on('login', (data: SocketLogin) => loginUser(data, socket));
    });
};

const loginUser = (loginSocketData: SocketLogin, socket: Socket) => {
    if (loginSocketData.user_id) {
        socketConnections[socket.id] = loginSocketData.user_id;
    }

    for (const user of Object.values(socketConnections)) {
        console.log(user);
    }
};