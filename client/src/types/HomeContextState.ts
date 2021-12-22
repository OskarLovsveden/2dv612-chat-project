import { Chatroom } from './Chatroom';
import { DirectMessage } from './DirectMessage';

type HomeContextState = {
  activeChat?: Chatroom | DirectMessage;
  dms: DirectMessage[];
  rooms: Chatroom[];
  setActiveChatView: (
    chatroomOrDirectMessage: Chatroom | DirectMessage
  ) => void;
};

export default HomeContextState;
