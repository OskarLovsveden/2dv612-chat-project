import {
  Key,
  MouseEvent,
  ReactChild,
  ReactFragment,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import adminImg from "../images/admin.png";
import moderatorImg from "../images/moderator.png";
import chattareImg from "../images/chattare.png";
import addUserImg from "../images/add-user.png";
import deleteImg from "../images/delete.png";
import editUserImg from "../images/edit.png";
import addChatImg from "../images/add-chat.png";
import type { User } from "../types/User";
import { Chatroom } from "../types/Chatroom";
import userService from "../utils/http/user-service";
import chatroomService from "../utils/http/chatroom-service";
import ROLE from "../types/Role";
import updateChatroom from "../components/UpdateChatroom";

const AdminPanel = () => {
  const [chatRoomData, setChatRoomData] = useState<Chatroom[]>([]);
  const [userData, setUserData] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      const resUser = await userService.getAll();
      const resChatRoom = await chatroomService.getAll();
      setUserData(resUser.data);
      setChatRoomData(resChatRoom.data);
    })();
  }, []);

  const removeUser = async (
    event: MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    event.preventDefault();
    const res = await userService.delete(id);
    setUserData(userData.filter((ud) => ud.id !== id));
  };

  const removeChatroom = async (
    event: MouseEvent<HTMLImageElement>,
    id: number
  ) => {
    event.preventDefault();
    const res = await chatroomService.delete(id);
    setChatRoomData(chatRoomData.filter((cr) => cr.id !== id));
  };

  return (
    <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5 bg-indigo-600 h-screen">
      <div className="rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <img className="w-1/4 h-1/4" src={adminImg} alt="Admin" />
          <div className="font-bold text-xl mb-2">Admin</div>
          {/* <div className="inline-flex space-x-4">
            <Link to="/create-user">
              <img
                className="w-12 h-12 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                src={addUserImg}
                alt="Add Users"
              />
            </Link>

            <Link to="/create-chatroom">
              <img
                className="w-12 h-12 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                src={addChatImg}
                alt="Add Chat"
              />
            </Link>
          </div> */}
          {/*  <ul>
            {userData.map(
              (u, i) =>
                u.role === ROLE.ADMIN && (
                  <li key={i}>
                    <div className="inline-flex space-x-4 ">
                      <h3>{u.username} </h3>
                      <button
                        onClick={(e) => {
                          removeUser(e, u.id);
                        }}
                        className="btn btn-red btn-red:hover"
                      >
                        REMOVE
                      </button>
                      <Link to="/create-user">
                        <img
                          className="w-12 h-12 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                          src={editUserImg}
                          alt="Edit"
                        />
                      </Link>
                    </div>
                  </li>
                )
            )}
          </ul> */}

          <div>
            <div className="font-bold text-xl mb-2">Rooms Public</div>
            <ul>
              {chatRoomData.map(
                (
                  u: {
                    public: boolean;
                    name: string;
                    tag:
                      | boolean
                      | ReactChild
                      | ReactFragment
                      | ReactPortal
                      | null
                      | undefined;
                    id: number;
                  },
                  i: Key | null | undefined
                ) =>
                  u.public === true && (
                    <li key={i}>
                      <div className="inline-flex space-x-4">
                        <h3>{u.name} </h3>
                        <h3>{u.tag} </h3>
                        <span className="inline-block align-text-bottom w-4 h-4 bg-green-400 rounded-full border-2 border-white "></span>
                        <img
                          className="w-6 h-6 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                          src={deleteImg}
                          alt="Delete"
                          onClick={(e) => {
                            removeChatroom(e, u.id);
                          }}
                        />
                        <img
                          className="w-6 h-6 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                          src={editUserImg}
                          alt="Edit"
                        />
                      </div>
                    </li>
                  )
              )}
            </ul>
          </div>

          <div>
            <div className="font-bold text-xl mb-2">Rooms Private</div>
            <ul>
              {chatRoomData.map(
                (
                  u: {
                    public: boolean;
                    name: string;
                    tag:
                      | boolean
                      | ReactChild
                      | ReactFragment
                      | ReactPortal
                      | null
                      | undefined;
                    id: number;
                  },
                  i: Key | null | undefined
                ) =>
                  u.public === false && (
                    <li key={i}>
                      <div className="inline-flex space-x-4">
                        <h3>{u.name} </h3>
                        <h3>{u.tag} </h3>
                        <span className="inline-block align-text-bottom w-4 h-4 bg-blue-400 rounded-full border-2 border-white"></span>
                        <img
                          className="w-6 h-6 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                          src={deleteImg}
                          alt="Delete"
                        />
                        {/* <Link to="/update-chatroom"> */}
                        <img
                          className="w-6 h-6 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                          src={editUserImg}
                          alt="Edit"
                          onClick={(e) => {
                            updateChatroom(u);
                          }}
                        />
                        {/* </Link> */}
                      </div>
                    </li>
                  )
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <img className="w-1/4 h-1/4" src={moderatorImg} alt="Moderator" />
          <div className="font-bold text-xl mb-2">Moderator</div>
          <ul>
            {userData.map(
              (u, i) =>
                u.role === ROLE.MOD && (
                  <li key={i}>
                    <div className="inline-flex space-x-4 ">
                      <h3>{u.username} </h3>
                      <button
                        onClick={(e) => {
                          removeUser(e, u.id);
                        }}
                        className="btn btn-red btn-red:hover"
                      >
                        REMOVE
                      </button>
                      <Link to="/create-user">
                        <img
                          className="w-12 h-12 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                          src={editUserImg}
                          alt="Edit"
                        />
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
          <img className="w-1/4 h-1/4" src={chattareImg} alt="Chattare" />
          <div className="font-bold text-xl mb-2">Chattare</div>
          <ul>
            {userData.map(
              (u, i) =>
                u.role === ROLE.USER && (
                  <li key={i}>
                    <div className="inline-flex space-x-4 ">
                      <h3>{u.username} </h3>
                      <button
                        onClick={(e) => {
                          removeUser(e, u.id);
                        }}
                        className="btn btn-red btn-red:hover"
                      >
                        REMOVE
                      </button>
                      <Link to="/create-user">
                        <img
                          className="w-12 h-12 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                          src={editUserImg}
                          alt="Edit"
                        />
                      </Link>
                    </div>
                    {/* <div className="px-6 pt-4 pb-2">
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                        #photography
                      </span>
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                        #travel
                      </span>
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                        #food
                      </span>
                    </div> */}
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
