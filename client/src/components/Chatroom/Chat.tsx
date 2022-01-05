import React, { useContext, useEffect, useRef, useState } from 'react';
import Message from './Message';
import { HomeContext } from '../../context/HomeProvider';
import { AuthContext } from '../../context/AuthProvider';
import { SocketContext } from '../../context/SocketProvider';
import ChatroomUserList from '../sidebar/ChatroomUserList';

type MessageEvent = {
    id: number;
    user_id: number;
    username: string;
    message: string;
    room_id: number;
};

const ChatRoom: React.FC = () => {
    const [messages, setMessages] = useState<MessageEvent[]>([]);
    const { connectUser, sendMessage, socket } = useContext(SocketContext);
    const { activeChat } = useContext(HomeContext);
    const { user } = useContext(AuthContext);
    const enterPressRef = useRef<any>();
    const messageRef = useRef<any>();
    const messagesEndRef = useRef<any>(); // Steffe

    useEffect(() => {
        connectUser(user?.id || '');

        socket?.on('room-message', (data: MessageEvent) => {
            const shouldAddNewMessage = data.room_id === activeChat?.id;

            if (shouldAddNewMessage) {
                setMessages((msgs) => [...msgs, data]);
            }
            scrollToBottom();
        });

        return () => {
            socket?.off('room-message');
            setMessages([]);
        };
    }, [connectUser, socket, user, activeChat]);

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (activeChat && user) {
            sendMessage(
                activeChat?.id,
                user?.id,
                messageRef.current.value,
                user?.username
            );
            messageRef.current.value = '';
        }
    };

    const handleEnter = (e: any): void => {
        if (e.code === 'Enter' && e.shiftKey === false) {
            e.preventDefault();
            handleOnSubmit(e);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    };

    return (
        <div className="max-w-auto h-screen w-full m-auto bg-indigo-300 rounded p-5">
            {activeChat && <ChatroomUserList />}
            <div className="h-3/4 overflow-y-scroll">
                <ul>
                    {messages &&
                        messages.map((msg: MessageEvent) => (
                            <li key={msg.id}>
                                <Message
                                    name={msg.username}
                                    message={msg.message}
                                />
                            </li>
                        ))}
                    <li ref={messagesEndRef} key="steffelol">{/* I am here to make the chat scroll down! */}</li>
                </ul>
            </div>
            <div className="mb-6 mx-4">
                <form
                    onSubmit={handleOnSubmit}
                    ref={(el: HTMLFormElement) => {
                        enterPressRef.current = el;
                    }}
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
                                        <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </span>
                            </div>
                            <div className="flex-1">
                                <textarea
                                    onKeyDown={(e: React.KeyboardEvent) =>
                                        handleEnter(e)
                                    }
                                    ref={messageRef}
                                    name="message"
                                    className="w-full block outline-none py-4 px-4 bg-transparent"
                                    placeholder="Type a message..."
                                />
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
                                                <path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                            </svg>
                                        </span>
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <button
                                        type="button"
                                        className="bg-blue-400 w-10 h-10 rounded-full inline-block"
                                    >
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
                                                <path d="M5 13l4 4L19 7" />
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
};

export default ChatRoom;
