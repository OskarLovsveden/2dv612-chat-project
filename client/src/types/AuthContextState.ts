import type {User} from "./User";

type AuthContextState = {
    user?: User;
    isAuthenticated:  boolean,
    login: (username: string, password: string) => void;
};

export default AuthContextState