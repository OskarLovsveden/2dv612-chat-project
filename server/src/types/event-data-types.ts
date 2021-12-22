export type EventLogin = {
    user_id: number;
};

export type EventChatMessage = {
    room_id: string | number;
    message: string;
    user_id: string | number;
}

export type EventJoinRoom = {
    room_id: string | number;
    user_id: string | number;
}