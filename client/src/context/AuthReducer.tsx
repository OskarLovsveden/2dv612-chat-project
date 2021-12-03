import { Reducer } from "react";
import AuthContextState from "../types/AuthContextState";
import Action, { ActionType } from "../types/AuthReducerAction";

const reducer: Reducer<AuthContextState, Action> = (state, action) => {
  switch (action.type) {
    case ActionType.USER_LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
