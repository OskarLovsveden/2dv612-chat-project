export type DBUser = {
    id: number;
    username: string;
    password: string;
    active: boolean;
    role: string;
}

export type SequelizeConfig = {
        host: string,
        user: string,
        password: string,
        database: string,
        port: number
}
