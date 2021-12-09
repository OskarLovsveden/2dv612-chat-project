import type {User} from "./User";

export enum ActionType {
  USER_LOGIN = "USER_LOGIN",
}

type Action = { type: ActionType; payload: User}

export default Action;
