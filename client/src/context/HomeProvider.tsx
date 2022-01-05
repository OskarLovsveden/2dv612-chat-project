import { createContext, useEffect, useReducer } from 'react';
import HomeContextState from '../types/HomeContextState';
import reducer from './HomeReducer';
import { HomeActionType } from '../types/HomeReducerAction';
import { Chatroom } from '../types/Chatroom';
import { Conversation } from '../types/Conversation';
import ChatroomService from '../utils/http/chatroom-service';
import ConversationService from '../utils/http/conversation-service';

const initialState: HomeContextState = {
    conversations: [],
    rooms: [],
    setActiveChatView: (): void => {return; }
};

export const HomeContext = createContext<HomeContextState>(initialState);

type HomeProviderProps = { children: React.ReactChild[] | React.ReactChild };

export const HomeProvider = ({ children }: HomeProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        async function getAllChatrooms() {
            const chatroomService = new ChatroomService();
            const res = await chatroomService.getAll();

            dispatch({
                type: HomeActionType.SET_CHATROOMS,
                payload: [...res.data]
            });
        }
        getAllChatrooms();

        const getAllConversations = async (): Promise<void> => {
            const conversationService = new ConversationService();
            const conversations = await conversationService.getAll();

            dispatch({
                type: HomeActionType.SET_CONVERSATIONS,
                payload: [...conversations],
            });
        };
        getAllConversations();
    }, []);

    const setActiveChatView = (
<<<<<<< HEAD
        chatroomOrConversation: Chatroom | Conversation
    ): void => {
        dispatch({
            type: HomeActionType.SET_ACTIVE_CHAT,
            payload: chatroomOrConversation,
=======
        chatroomOrDirectMessage: Chatroom | DirectMessage
    ) => {
        dispatch({
            type: HomeActionType.SET_ACTIVE_CHAT,
            payload: chatroomOrDirectMessage
>>>>>>> ed2f8089be711c755a89f9ca4a1469e8a3a2674e
        });
    };

    return (
        <HomeContext.Provider
            value={{
                activeChat: state.activeChat,
                conversations: state.conversations,
                rooms: state.rooms,
                setActiveChatView
            }}
        >
            {children}
        </HomeContext.Provider>
    );
};
