import { createContext, useReducer } from "react";
import AuthContextState from "../types/AuthContextState";
import reducer from "./AuthReducer";
import { ActionType } from "../types/AuthReducerAction";
import type { LoginUser, User } from "../types/User";
import ROLE from "../types/Role";
import authService from "../utils/http/auth-service";

const initialState: AuthContextState = {
  isAuthenticated: false,
  login: (): void => {},
};

export const AuthContext = createContext<AuthContextState>(initialState);

type AuthProviderProps = { children: React.ReactChild[] | React.ReactChild };

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (user: LoginUser): Promise<void> => {
    // Send login request to server > dispatch (user)
    // const user = serverLogin(); xXddddDD
    const res = await authService.login(user);

    const { username, id, role, token } = res.data;
    localStorage.setItem("token", token);
    // FAKE BOI ADMIN
    // const user: User = {
    //   id: 1,
    //   name: username,
    //   role: ROLE.ADMIN,
    //   status: "active",
    // };

    dispatch({
      type: ActionType.USER_LOGIN,
      payload: { username, id, role },
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
