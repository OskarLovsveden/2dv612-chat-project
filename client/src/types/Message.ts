export type Msg = {
    id: number;
    room_id: number;
    user_id: number;
    username: string;
    message: string;
};

export type NewMessage = {
    room_id: number;
    user_id: number;
    username: string;
    message: string;
}