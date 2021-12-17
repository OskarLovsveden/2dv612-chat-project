import { io } from "socket.io-client";
import React, { useContext, useEffect, useRef, useState } from "react";
import Message from "./Message";
import { HomeContext } from "../../context/HomeProvider";
import { AuthContext } from "../../context/AuthProvider";
import { SocketContext } from "../../context/SocketProvider";

type MessageEvent = {
  name: string;
  text: string;
  isUser: boolean;
  roomID: string;
};

type ChatProps = {
  // toggle: () => void;
  username: string;
  id: number | string;
};

// export default function ChatRoom({ toggle, username }: ChatProps) {
export default function ChatRoom({ username, id }: ChatProps) {
  const [messages, setMessages] = useState<MessageEvent[]>([]);
  const { connectUser, sendMessage, socket } = useContext(SocketContext);
  const { activeChat } = useContext(HomeContext);
  const { user } = useContext(AuthContext);
  const enterPressRef = useRef<any>();
  const messageRef = useRef<any>();

  useEffect(() => {
    const handleNewMessage = (newMessage: MessageEvent) => {
      console.log("haha new message", activeChat);

      const shouldAddNewMessage =
        newMessage.roomID == activeChat?.id.toString();

      console.log(newMessage.roomID, activeChat?.id.toString());

      if (shouldAddNewMessage) {
        console.log("Adding message");
        setMessages((messages: MessageEvent[]) => [...messages, newMessage]);
      }
    };
    connectUser(user?.id || "");

    socket?.on("room-message", (data) => {
      console.log("haha in room");
      console.log(data);

      const isUser = data.username === username;
      handleNewMessage({
        isUser,
        name: data.username,
        text: data.message,
        roomID: data.room_id,
      });
    });
  }, [connectUser, socket, user, username, activeChat]);

  const handleEnter = (e: any) => {
    if (e.code === "Enter" && e.shiftKey === false) {
      e.preventDefault();
      handleOnSubmit(e);
    }
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    sendMessage(activeChat?.id || 0, user?.id || -1, messageRef.current.value);
    messageRef.current.value = "";
  };

  return (
    <div className="max-w-auto h-screen w-full m-auto bg-indigo-300 rounded p-5">
      <div className="h-3/4 overflow-y-scroll">
        <ul>
          {messages &&
            messages.map((messageText: MessageEvent, index: number) => (
              <li>
                <Message
                  name={messageText.name}
                  message={messageText.text}
                  key={index}
                />
              </li>
            ))}
        </ul>
      </div>
      <div className="mb-6 mx-4">
        <form
          onSubmit={handleOnSubmit}
          ref={(el) => (enterPressRef.current = el)}
        >
          <div className="pt-4 absolute pb-0 w-3/4 bottom-0">
            <div className="write bg-white shadow flex rounded-lg">
              <div className="flex-3 flex content-center items-center text-center p-4 pr-0">
                <span className="block text-center text-gray-400 hover:text-gray-800">
                  <svg
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                  >
                    <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </span>
              </div>
              <div className="flex-1">
                <textarea
                  onKeyDown={(e) => handleEnter(e)}
                  ref={messageRef}
                  name="message"
                  className="w-full block outline-none py-4 px-4 bg-transparent"
                  placeholder="Type a message..."
                  autoFocus
                ></textarea>
              </div>
              <div className="flex-2 w-32 p-2 flex content-center items-center">
                <div className="flex-1 text-center">
                  <span className="text-gray-400 hover:text-gray-800">
                    <span className="inline-block align-text-bottom">
                      <svg
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        className="w-6 h-6"
                      >
                        <path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                      </svg>
                    </span>
                  </span>
                </div>
                <div className="flex-1">
                  <button className="bg-blue-400 w-10 h-10 rounded-full inline-block">
                    <span className="inline-block align-text-bottom">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        className="w-4 h-4 text-white"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
