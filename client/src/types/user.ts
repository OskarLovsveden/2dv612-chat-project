type User = {
    id: Number;
    name: String;
    role: String;
    status: String;
};

type NewUser = {
    name: String;
    password: String;
    role: String;
    status: String;
};

export type { User, NewUser };