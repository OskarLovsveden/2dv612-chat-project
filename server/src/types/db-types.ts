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

export type DBConfig = {
    client: string,
    connection: {
        host: string,
        user: string,
        password: string,
        database: string,
        port: string
    }
}

export type SequelizeConfig = {
        host: string,
        user: string,
        password: string,
        database: string,
        port: number
}
