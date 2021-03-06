import "../App.css";
import chatImg from "../images/chat.png";
import { useContext, useRef } from "react";
import { AuthContext } from "../context/AuthProvider";
import { LoginUser } from "../types/User";

/**
 * Login form for users.
 * @returns HTML for login form.
 */
const Login = () => {
  const username = useRef() as React.MutableRefObject<HTMLInputElement>;
  const password = useRef() as React.MutableRefObject<HTMLInputElement>;

  const { login } = useContext(AuthContext);

  const handleOnSubmit = (Event: { preventDefault: () => void }) => {
    Event.preventDefault();

    const loginUser: LoginUser = {
      password: password.current.value,
      username: username.current.value,
    };

    login(loginUser);
  };

  return (
    <div className="bg-indigo-600 h-screen">
      <div className="max-w-xs w-full m-auto bg-indigo-100 rounded p-5">
        <header>
          <img className="w-20 mx-auto mb-5" alt={chatImg} src={chatImg} />
          <h3 className="block mb-2 text-indigo-800">Login</h3>
        </header>
        <form>
          <div>
            <label className="block mb-2 text-indigo-500" htmlFor="Username">
              Username
            </label>
            <input
              ref={username}
              placeholder="Enter Username"
              className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
              type="text"
              name="Email"
            />
          </div>
          <div>
            <label className="block mb-2 text-indigo-500" htmlFor="Password">
              Password
            </label>
            <input
              ref={password}
              placeholder="Enter Password"
              className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
              type="password"
              name="Password"
            ></input>
          </div>
          <div>
            <input
              onClick={handleOnSubmit}
              className="w-full bg-indigo-700 hover:bg-purple-700 text-white font-bold py-2 px-4 mb-6 rounded"
              type="submit"
              value="Submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
