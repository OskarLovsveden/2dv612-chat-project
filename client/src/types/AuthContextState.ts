import User from "./User";

type AuthContextState = {
    user: User | undefined;
    login: (user: User) => void;
};

export default AuthContextState