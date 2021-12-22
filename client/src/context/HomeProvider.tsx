import { createContext, useEffect, useReducer } from 'react';
import HomeContextState from '../types/HomeContextState';
import reducer from './HomeReducer';
import { HomeActionType } from '../types/HomeReducerAction';
import { Chatroom } from '../types/Chatroom';
import { DirectMessage } from '../types/DirectMessage';
import ChatroomService from '../utils/http/chatroom-service';

const initialState: HomeContextState = {
    dms: [],
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
    }, []);

    const setActiveChatView = (
        chatroomOrDirectMessage: Chatroom | DirectMessage
    ) => {
        dispatch({
            type: HomeActionType.SET_ACTIVE_CHAT,
            payload: chatroomOrDirectMessage
        });
    };

    return (
        <HomeContext.Provider
            value={{
                activeChat: state.activeChat,
                dms: state.dms,
                rooms: state.rooms,
                setActiveChatView
            }}
        >
            {children}
        </HomeContext.Provider>
    );
};
