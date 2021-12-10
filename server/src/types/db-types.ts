export type DBUser = {
    id: number;
    username: string;
    password: string;
    active: boolean;
    role: string;
}

export type DBChatroom = {
    id: number;
    name: string;
    public: boolean;
    tag: string; 
}
