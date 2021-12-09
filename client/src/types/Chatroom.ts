type Chatroom = {
    id: number;
    name: string;
    public: boolean;
    tag: string;
};

type NewChatroom = {
    name: string;
    public: boolean;
    tag: string;
};

export type { Chatroom, NewChatroom };