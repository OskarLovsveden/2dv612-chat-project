import { Chatroom } from './Chatroom';
import { Conversation } from './Conversation';

export enum HomeActionType {
    SET_ACTIVE_CHAT = 'set-active-chat',
    SET_CHATROOMS = 'set-chatrooms',
    SET_CONVERSATIONS = 'set-conversations',
}

export type HomeReducerAction =
    | {
          type: HomeActionType.SET_ACTIVE_CHAT;
          payload: Chatroom | Conversation;
      }
    | {
          type: HomeActionType.SET_CHATROOMS;
          payload: Chatroom[];
      }
    | {
          type: HomeActionType.SET_CONVERSATIONS;
          payload: Conversation[];
      };
