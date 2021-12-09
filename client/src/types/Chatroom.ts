export type Chatroom = {
    id: number;
    name: string;
    public: boolean;
    tag: string;
};

export type NewChatroom = {
    name: string;
    public: boolean;
    tag: string;
};
