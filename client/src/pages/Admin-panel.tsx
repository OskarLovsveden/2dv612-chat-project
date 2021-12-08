import { Key, MouseEvent, ReactChild, ReactFragment, ReactPortal, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import adminImg from '../images/admin.png'
import moderatorImg from '../images/moderator.png'
import chattareImg from '../images/chattare.png'
import addUserImg from '../images/add-user.png'
import deleteImg from '../images/delete.png'
import editUserImg from '../images/edit.png'
import addChatImg from '../images/add-chat.png'
import type {User} from "../types/user";
import userService from "../utils/http/user-service";

const AdminPanel = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "chatter1", role: "chatter", status: "" },
    { id: 2, name: "chatter2", role: "chatter", status: "" },
    { id: 3, name: "admin1", role: "administrator", status: "" },
    { id: 5, name: "mod1", role: "moderator", status: "" },
  ]);

  const [chatRooms, setChatRooms] = useState<any>([
    { id: 1, tag: "#photography", status: "Online" },
    { id: 2, tag: "#travel", status: "Online" },
    { id: 3, tag: "#food",  status: "Online" },
    { id: 4, tag: "#howdy",  status: "Offline" },
  ]);

  const removeUser = async (event: MouseEvent<HTMLButtonElement>, id: Number) => {
    event.preventDefault();

    const res = await userService.delete(id);
    console.log(res);
  };


  return (
    <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5 bg-indigo-600 h-screen">
    <div className="rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <img className="w-1/4 h-1/4" src={adminImg} alt="Admin image" />
        <div className="font-bold text-xl mb-2">Admin</div>
        <ul>
          {users.map(
            (u, i) =>
              u.role === "administrator" && (
                <li  key={i}>
                  <div className="inline-flex space-x-4 ">
                  <h3>{u.name} </h3>
                  <button
                    onClick={(e) => {
                      removeUser(e, u.id);
                    }}
                    className="btn btn-red btn-red:hover"
                  >
                    REMOVE
                  </button>
                  <Link to="/create-user">
                  <img className="w-12 h-12 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" src={editUserImg} alt="Edit" />
                  </Link>
                  </div>
                </li>
              )
          )}
        </ul>

        <div>
        <div className="font-bold text-xl mb-2">Rooms online</div>
        <ul>
        {chatRooms.map(
            (u: { status: string; tag: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; id: Number; }, i: Key | null | undefined) =>
              u.status === "Online" && (
                <li  key={i}>
                  <div className="inline-flex space-x-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                  <h3>{u.tag} </h3>
                  <span className="inline-block align-text-bottom w-4 h-4 bg-green-400 rounded-full border-2 border-white"></span>
                 <img className="w-6 h-6"  src={deleteImg} alt="Delete" />
                  </div>
                </li>
              )
        )}
          </ul>
        </div>

        <div>
        <div className="font-bold text-xl mb-2">Rooms offline</div>
        <ul>
        {chatRooms.map(
            (u: { status: string; tag: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; id: Number; }, i: Key | null | undefined) =>
              u.status === "Offline" && (
                <li  key={i}>
                  <div className="inline-flex space-x-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                  <h3>{u.tag} </h3>
                  <span className="inline-block align-text-bottom w-4 h-4 bg-red-400 rounded-full border-2 border-white"></span>
                 <img className="w-6 h-6"  src={deleteImg} alt="Delete" />
                  </div>
                </li>
              )
        )}
          </ul>
        </div>
        <Link to="/create-chatroom">
         <img className="w-12 h-12 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"src={addChatImg} alt="Add Chat"  />
        </Link>
      </div>
    </div>
  
    <div className="rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <img className="w-1/4 h-1/4" src={moderatorImg} alt="Moderator image" />
        <div className="font-bold text-xl mb-2">Moderator</div>
        <Link to="/create-user">
         <img className="w-12 h-12 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"src={addUserImg} alt="Add Moderator"  />
        </Link>
        <ul>
          {users.map(
            (u, i) =>
              u.role === "moderator" && (
                <li key={i}>
                  <div className="inline-flex space-x-4 ">
                  <h3>{u.name} </h3>
                  <button
                    onClick={(e) => {
                      removeUser(e, u.id);
                    }}
                    className="btn btn-red btn-red:hover"
                  >
                    REMOVE
                  </button>
                  <Link to="/create-user">
                  <img className="w-12 h-12 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" src={editUserImg} alt="Edit" />
                  </Link>
                  </div>
                </li>
              )
          )}
        </ul>
      </div>
    </div>

    
    <div className="rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
          <img className="w-1/4 h-1/4"  src={chattareImg} alt="Chattare image" />
          <div className="font-bold text-xl mb-2">Chattare</div>
          <Link to="/create-user">
          <img className="w-12 h-12 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"src={addUserImg} alt="Add Chattare"  />
          </Link>
        <ul>
          {users.map(
            (u, i) =>
              u.role === "chatter" && (
                <li key={i}>
                  <div className="inline-flex space-x-4 ">
                  <h3>{u.name} </h3>
                  <button
                    onClick={(e) => {
                      removeUser(e, u.id);
                    }}
                    className="btn btn-red btn-red:hover"
                  >
                    REMOVE
                  </button>
                  <Link to="/create-user">
                  <img className="w-12 h-12 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" src={editUserImg} alt="Edit" />
                  </Link>
                  </div>
                  <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">#photography 
                    </span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">#travel

                    </span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">#food
                    </span>
                  </div>
                </li>
              )
          )}
        </ul>
      </div>
    </div>
  </div>
  );

};

export default AdminPanel;
