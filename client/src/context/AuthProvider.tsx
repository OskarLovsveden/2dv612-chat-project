import { createContext, useReducer } from "react";
import AuthContextState from "../types/AuthContextState";
import reducer from "./AuthReducer";
import { ActionType } from "../types/AuthReducerAction";
import type { User } from "../types/User";
import ROLE from "../types/Role";

const initialState: AuthContextState = {
  isAuthenticated: false,
  login: (): void => {},
};

export const AuthContext = createContext<AuthContextState>(initialState);

type AuthProviderProps = { children: React.ReactChild[] | React.ReactChild };

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = (username: string, password: string): void => {
    // Send login request to server > dispatch (user)
    // const user = serverLogin(); xXddddDD

    // FAKE BOI ADMIN
    const user: User = {
      id: 1,
      username: username,
      role: ROLE.ADMIN,
      active: true,
    };

    dispatch({
      type: ActionType.USER_LOGIN,
      payload: user,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
