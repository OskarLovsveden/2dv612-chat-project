import ROLE from "./Role";

export type User = {
    id: number;
    username: string;
    role: ROLE;
    // status: string;
};

export type NewUser = {
    username: string;
    password: string;
    role: ROLE;
    // status: string;
};

export type LoginUser = {
    username: string;
    password: string;
};

export type LoginResponse = {
    username: string;
    id: number;
    role: ROLE;
    token: string
};