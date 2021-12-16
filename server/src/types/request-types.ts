export type RequestUserCreate = {
    username: string;
    password: string;
    role: string;
    active: boolean;
}

export type RequestRoomCreate = {
    name: string;
    public: boolean;
    tag: string;
}

export type RequestMessageCreate = {
    userID: number;
    message: string;
    id: number;
    roomID: number
}