import '../App.css';
import React, { FormEvent, useContext, useRef } from 'react';
import chatImg from '../images/chat.png';
import { AuthContext } from '../context/AuthProvider';
import { LoginUser } from '../types/User';

/**
 * Login form for users.
 * @returns HTML for login form.
 */
const Login: React.FC = () => {
    const username = useRef() as React.MutableRefObject<HTMLInputElement>;
    const password = useRef() as React.MutableRefObject<HTMLInputElement>;

    const { login } = useContext(AuthContext);

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

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
                    <img
                        className="w-20 mx-auto mb-5"
                        alt={chatImg}
                        src={chatImg}
                    />
                    <h3 className="block mb-2 text-indigo-800">Login Hej</h3>
                </header>
                <form onSubmit={handleOnSubmit}>
                    <label
                        className="block mb-2 text-indigo-500"
                        htmlFor="username"
                    >
                        Username
                        <input
                            ref={username}
                            placeholder="Enter Username"
                            className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
                            type="text"
                            id="username"
                        />
                    </label>
                    <label
                        className="block mb-2 text-indigo-500"
                        htmlFor="password"
                    >
                        Password
                        <input
                            ref={password}
                            placeholder="Enter Password"
                            className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
                            type="password"
                            id="password"
                        />
                    </label>
                    <button
                        type="submit"
                        className="w-full bg-indigo-700 hover:bg-purple-700 text-white font-bold py-2 px-4 mb-6 rounded"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
