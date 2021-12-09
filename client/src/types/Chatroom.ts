type Chatroom = {
    id: number;
    name: string;
    public: Boolean;
    tag: string;
};

type NewChatroom = {
    name: string;
    public: Boolean;
    tag: string;
};

export type { Chatroom, NewChatroom };