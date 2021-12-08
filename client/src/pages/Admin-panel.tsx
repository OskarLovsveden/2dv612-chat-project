import { MouseEvent, useState } from "react";
import type { User } from "../types/user";
import userService from "../utils/http/user-service";

const AdminPanel = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "chatter1", role: "chatter", status: "" },
    { id: 2, name: "chatter2", role: "chatter", status: "" },
    { id: 3, name: "admin1", role: "administrator", status: "" },
    { id: 4, name: "admin2", role: "administrator", status: "" },
    { id: 5, name: "mod1", role: "moderator", status: "" },
  ]);

  const removeUser = async (event: MouseEvent<HTMLButtonElement>, id: Number) => {
    event.preventDefault();

    const res = await userService.delete(id);
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
