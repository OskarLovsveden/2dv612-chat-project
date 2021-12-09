import { Reducer } from "react";
import AuthContextState from "../types/AuthContextState";
import { ActionType, LoginAction } from "../types/AuthReducerAction";

const reducer: Reducer<AuthContextState, LoginAction> = (state, action) => {
  switch (action.type) {
    case ActionType.USER_LOGIN:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    default:
      return state;
  }
};

export default reducer;
