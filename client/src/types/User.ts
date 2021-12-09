import ROLE from "./Role";

type User = {
    id: Number;
    name: String;
    role: ROLE;
    status: String;
};

type NewUser = {
    name: String;
    password: String;
    role: ROLE;
    status: String;
};

export type { User, NewUser };