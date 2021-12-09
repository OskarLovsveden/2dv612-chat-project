import ROLE from "./Role";

type User = {
    id: number;
    name: string;
    role: ROLE;
    active: boolean;
};

type NewUser = {
    name: string;
    password: string;
    role: ROLE;
    active: boolean;
};

export type { User, NewUser };