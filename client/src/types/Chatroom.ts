type Chatroom = {
    id: Number;
    name: String;
    public: Boolean;
    tag: String;
};

type NewChatroom = {
    name: String;
    public: Boolean;
    tag: String;
};

export type { Chatroom, NewChatroom };