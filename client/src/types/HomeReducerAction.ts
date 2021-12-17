import { Chatroom } from "./Chatroom";
import { DirectMessage } from "./DirectMessage";

export enum HomeActionType {
  SET_ACTIVE_CHAT = "set-active-chat",
  SET_CHATROOMS = "set-chatrooms",
}

export type HomeReducerAction =
  | {
      type: HomeActionType.SET_ACTIVE_CHAT;
      payload: Chatroom | DirectMessage;
    }
  | {
      type: HomeActionType.SET_CHATROOMS;
      payload: Chatroom[];
    };
