import ROLE from "./Role";

type User = {
    id: number;
    username: string;
    role: ROLE;
    active: boolean;
};

type NewUser = {
    username: string;
    password: string;
    role: string;
    active: boolean;
};

export type { User, NewUser };