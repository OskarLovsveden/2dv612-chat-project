type User = {
  id: Number;
  name: String;
  role: String;
};

type AdminPanelProps = {
  users: User[];
};

const AdminPanel = ({ users }: AdminPanelProps) => {
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
                  <button className="btn btn-red btn-red:hover">REMOVE</button>
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
                  <button className="btn btn-red btn-red:hover">REMOVE</button>
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
                  <button className="btn btn-red btn-red:hover">REMOVE</button>
                </li>
              )
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;
