import { Reducer } from "react";
import HomeContextState from "../types/HomeContextState";
import { HomeActionType, HomeReducerAction } from "../types/HomeReducerAction";

const reducer: Reducer<HomeContextState, HomeReducerAction> = (
  state,
  action
) => {
  switch (action.type) {
    case HomeActionType.SET_ACTIVE_CHAT:
      return {
        ...state,
        activeChat: action.payload,
      };
    case HomeActionType.SET_CHATROOMS:
      return {
        ...state,
        rooms: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
