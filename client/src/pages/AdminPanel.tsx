import { MouseEvent } from "react";
import User from "../types/user";
import userService from "../utils/http/userService";

type AdminPanelProps = {
  users: User[];
};

const AdminPanel = ({ users }: AdminPanelProps) => {
  const removeUser = (event: MouseEvent<HTMLButtonElement>, id: Number) => {
    event.preventDefault();

    const res = userService.delete(id);
    console.log(res);
  };

  return (
    <div className="flex">
      <div className="flex-1">
        <h1>Admins</h1>
        <ul>
          {users.map(
            (u, i) =>
              u.role === "administrator" && (
                <li key={i}>
                  {u.name}
                  <button
                    onClick={(e) => {
                      removeUser(e, u.id);
                    }}
                    className="btn btn-red btn-red:hover"
                  >
                    REMOVE
                  </button>
                </li>
              )
          )}
        </ul>
      </div>
      <div className="flex-1">
        <h1>Mods</h1>
        <ul>
          {users.map(
            (u, i) =>
              u.role === "moderator" && (
                <li key={i}>
                  {u.name}
                  <button
                    onClick={(e) => {
                      removeUser(e, u.id);
                    }}
                    className="btn btn-red btn-red:hover"
                  >
                    REMOVE
                  </button>
                </li>
              )
          )}
        </ul>
      </div>
      <div className="flex-1">
        <h1>Chatter</h1>
        <ul>
          {users.map(
            (u, i) =>
              u.role === "chatter" && (
                <li key={i}>
                  {u.name}
                  <button
                    onClick={(e) => {
                      removeUser(e, u.id);
                    }}
                    className="btn btn-red btn-red:hover"
                  >
                    REMOVE
                  </button>
                </li>
              )
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;
