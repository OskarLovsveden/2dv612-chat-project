import User from "./User";

type AuthContextState = {
    user?: User;
    isAuthenticated:  boolean,
    login: (username: String, password: String) => void;
};

export default AuthContextState