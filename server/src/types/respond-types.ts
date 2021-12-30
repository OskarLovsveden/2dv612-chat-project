export type RespondUser = {
    id: number;
    username: string;
    active: boolean;
    role: string;
}

export type RespondRoom = {
    id: number;
    name: string;
    public: boolean;
    tag: string;
}

export type RespondMessage = {
    userID: number;
    message: string;
    id: number;
    roomID: number;
}
