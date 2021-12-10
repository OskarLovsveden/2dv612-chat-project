import { SetStateAction, useState } from "react";
import "../App.css";
import userService from "../utils/http/user-service";
import userImg from "../images/user.png";
import ROLE from "../types/Role";
import { useNavigate } from "react-router";

/**
 * Makes Admin able to create users.
 * @returns HTML for creating a user.
 */
const UserCreation = () => {
  const [username, setUserName] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [userRole, setUserRole] = useState<string>(ROLE.USER);
  const navigate = useNavigate();

  const options = [
    {
      label: "Chattare",
      value: ROLE.USER,
    },
    {
      label: "Moderator",
      value: ROLE.MOD,
    },
    {
      label: "Admin",
      value: ROLE.ADMIN,
    },
  ];

  const handleUserName = (Event: {
    target: { value: SetStateAction<string> };
  }) => {
    setUserName(Event.target.value);
  };

  const handleUserPassword = (Event: {
    target: { value: SetStateAction<string> };
  }) => {
    setUserPassword(Event.target.value);
  };
  const handleUserRole = (Event: {
    target: { value: SetStateAction<string> };
  }) => {
    setUserRole(Event.target.value);
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      username: username,
      password: userPassword,
      role: userRole,
      active: true,
    };
    const res = await userService.create(data);
    console.log(res);

    navigate("/admin");
  };

  return (
    <div className="bg-indigo-600 h-screen">
      <div className="max-w-xs w-full m-auto bg-indigo-100 rounded p-5">
        <header>
          <img className="w-20 mx-auto mb-5" alt={userImg} src={userImg} />
        </header>
        <form onSubmit={handleOnSubmit}>
          <div>
            <label className="block mb-2 text-indigo-500" htmlFor="Username">
              Username
            </label>
            <input
              onChange={handleUserName}
              className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
              type="text"
              name="UserName"
            />
          </div>
          <div>
            <label
              className="block mb-2 text-indigo-500"
              htmlFor="UserPassword"
            >
              Password
            </label>
            <input
              onChange={handleUserPassword}
              className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
              type="password"
              name="UserPassword"
            />
          </div>
          <div>
            <label className="block mb-2 text-indigo-500" htmlFor="UserRole">
              Role
            </label>
            <select
              onChange={handleUserRole}
              className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
            >
              {options.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div>
            <input
              className="w-full bg-indigo-700 hover:bg-purple-700 text-white font-bold py-2 px-4 mb-6 rounded"
              value="Create User"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserCreation;
