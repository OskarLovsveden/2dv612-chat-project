import type {AuthResponse, User} from "./User";

export enum ActionType {
  USER_LOGIN = "USER_LOGIN"
}

export type LoginAction = { type: ActionType; payload: User }
