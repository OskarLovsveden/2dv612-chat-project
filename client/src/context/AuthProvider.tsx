import { createContext, useEffect, useReducer } from "react";
import AuthContextState from "../types/AuthContextState";
import reducer from "./AuthReducer";
import { ActionType } from "../types/AuthReducerAction";
import type { AuthResponse, LoginUser, User } from "../types/User";
import ROLE from "../types/Role";
import authService from "../utils/http/auth-service";
import { useNavigate } from "react-router";

const initialState: AuthContextState = {
  isAuthenticated: false,
  login: (): void => {},
};

export const AuthContext = createContext<AuthContextState>(initialState);

type AuthProviderProps = { children: React.ReactChild[] | React.ReactChild };

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function checkUserAuthenticated() {
      let authResponse = await authService.checkIsAuthenticated();

      if (authResponse === null) {
        return;
      }

      console.log("hej", authResponse);

      console.log("AFTER");

      let userRole: ROLE = ROLE.USER;
      const r = authResponse.role as ROLE;

      if (r === ROLE.ADMIN) {
        userRole = ROLE.ADMIN;
      } else if (r === ROLE.MOD) {
        userRole = ROLE.MOD;
      }

      dispatch({
        type: ActionType.USER_LOGIN,
        payload: {
          id: authResponse.id,
          role: userRole,
          username: authResponse.username,
        },
      });
    }
    checkUserAuthenticated();
  }, []);

  const login = async (user: LoginUser): Promise<void> => {
    // Send login request to server > dispatch (user)
    // const user = serverLogin(); xXddddDD

    const res = await authService.login(user);

    const { username, id, role, token } = res.data;
    localStorage.setItem("token", token);

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
