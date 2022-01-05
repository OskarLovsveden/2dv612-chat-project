import { io, Socket } from 'socket.io-client';
import { createContext, useEffect, useState } from 'react';
<<<<<<< HEAD
import config from '../config';
import { printToConsole } from '../utils/console-printer';
=======
import config from '../config'
>>>>>>> ed2f8089be711c755a89f9ca4a1469e8a3a2674e

const {BASE_URL, SOCKET_PATH} = config

type SocketContextState = {
  socket?: Socket;
  connectUser: (userID: number | string) => void;
  sendMessage: (room_id: number, user_id: number, message: string, username: string) => void;
};

const initialState: SocketContextState = {
    connectUser: (): void => {return;},
    sendMessage: (): void => {return;}
};

export const SocketContext = createContext<SocketContextState>(initialState);

type SocketProviderProps = { children: React.ReactChild[] | React.ReactChild };

export const SocketProvider = ({ children }: SocketProviderProps) => {
    const [socket] = useState(
        io(BASE_URL, { path: SOCKET_PATH })
    );

    useEffect(() => {
        socket.on('connect', () =>
<<<<<<< HEAD
            printToConsole(`Socket connected! ID: ${socket.id}`)
=======
            console.log('Socket connected! ID: ' + socket.id)
>>>>>>> ed2f8089be711c755a89f9ca4a1469e8a3a2674e
        );

        return () => {
            printToConsole(`Socket disconnected! ID: ${socket.id}`);
            socket.disconnect();
        };
    }, [socket]);

    const connectUser = (userID: number | string) => {
        socket.emit('user-connect', { user_id: userID });
    };

    const sendMessage = (room_id: number, user_id: number, message: string, username: string) => {
        socket.emit('chat-message', { room_id, user_id, message, username });
    };

    /* socket.emit("user-connect", { user_id: user?.id }); */
    /* }); */

    /* socket.emit("join-room", {
            room_id: activeChat?.name,
            user_id: username,
          }); */

    /* socket.on("room-message", (data) => {
          printToConsole(data);
    
          const isUser = data.username === username;
          handleNewMessage({
            isUser,
            name: data.username,
            text: data.message,
            roomID: data.room_id,
          });
        }); */

    return (
        <SocketContext.Provider
            value={{
                socket: socket,
                connectUser,
                sendMessage
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};
