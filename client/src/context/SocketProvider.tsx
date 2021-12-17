import { io, Socket } from "socket.io-client";
import { createContext, useEffect, useReducer, useState } from "react";

type SocketContextState = {
  socket?: Socket;
  connectUser: (userID: number | string) => void;
  sendMessage: (room_id: number, user_id: number, message: string) => void;
};

const initialState: SocketContextState = {
  connectUser: (): void => {},
  sendMessage: (): void => {},
};

export const SocketContext = createContext<SocketContextState>(initialState);

type SocketProviderProps = { children: React.ReactChild[] | React.ReactChild };

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState(
    io("http://localhost:5000", { path: "/socket.io" })
  );

  useEffect(() => {
    socket.on("connect", () =>
      console.log("Socket connected! ID: " + socket.id)
    );

    return () => {
      console.log("Jag drar");
      socket.disconnect();
    };
  }, [socket]);

  const connectUser = (userID: number | string) => {
    socket.emit("user-connect", { user_id: userID });
  };

  const sendMessage = (room_id: number, user_id: number, message: string) => {
    socket.emit("chat-message", { room_id, user_id, message });
  };

  /* socket.emit("user-connect", { user_id: user?.id }); */
  /* }); */

  /* socket.emit("join-room", {
            room_id: activeChat?.name,
            user_id: username,
          }); */

  /* socket.on("room-message", (data) => {
          console.log(data);
    
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
        sendMessage,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
