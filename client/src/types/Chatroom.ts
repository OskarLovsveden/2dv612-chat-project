export type Chatroom = {
  id: number;
  name: string;
  is_public: boolean;
  tag: string;
};

export type NewChatroom = {
  name: string;
  is_public: boolean;
  tag: string;
};
