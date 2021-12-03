import { createContext, useReducer } from "react";
import AuthContextState from "../types/AuthContextState";
import reducer from "./AuthReducer";
import User from "../types/User";
import { ActionType } from "../types/AuthReducerAction";

const initialState: AuthContextState = {
  user: undefined,
  login: () => {},
};

export const AuthContext = createContext<AuthContextState>(initialState);

type AuthProviderProps = { children: React.ReactChild[] | React.ReactChild };

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = (user: User) =>
    dispatch({
      type: ActionType.USER_LOGIN,
      payload: user,
    });

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
