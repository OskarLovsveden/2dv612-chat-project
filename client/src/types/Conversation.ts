import { User } from './User';

export type Conversation = {
    id: number;
    name: string;
    users: User[];
};

export type NewConversation = {
    users_ids: number[];
};
