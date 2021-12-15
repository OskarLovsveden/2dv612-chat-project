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

export type RespondRoomUser = {
    id: number;
    username: string;
    active: boolean;
    role: string;
}