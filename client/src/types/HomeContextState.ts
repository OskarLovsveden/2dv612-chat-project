import { Chatroom } from './Chatroom';
import { Conversation } from './Conversation';

type HomeContextState = {
    activeChat?: Chatroom | Conversation;
    conversations: Conversation[];
    rooms: Chatroom[];
    setActiveChatView: (
        chatroomOrConversation: Chatroom | Conversation
    ) => void;
};

export default HomeContextState;
