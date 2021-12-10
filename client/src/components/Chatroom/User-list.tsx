import React, { MouseEvent, useEffect, useState } from "react";
import Chat from "./Chat";
import userImg from "../../images/user.png";
import Channel from "./Channel";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { User } from "../../types/User";

type UserListInfo = {
    id: number;
    name: string;
};

const userlist = [
  {
    id: 1,
    name: "Simon Palm",
  },
  {
    id: 2,
    name: "Jonas Nilsson",
  },
];

const Userlist = () => {
//   const { user } = useContext(AuthContext);
  const [currentUsers, setUsers] = useState<UserListInfo[]>([]);

  useEffect(() => {});

  const handleOnUser = (Event: { preventDefault: () => void }, user: UserListInfo) => {
      Event.preventDefault();
      console.log(user.id)
  }


  return (
    <>
    <div className="menu mt-8">
        <div>
        <div className="sidebar hidden lg:flex w-full flex-2 flex-col pr-6">
        </div>
            {userlist &&
            userlist.map((user: UserListInfo) => (
            <input 
            onClick={(e) => {
                handleOnUser(e, user);
              }} 
            className="w-full bg-indigo-700 hover:bg-purple-700 text-white font-bold py-2 px-4 mb-6 rounded"
            type="submit"
            value={user.name} 
            >
                {/* {userList.name} */}
            </input>

            ))}
        </div>
    </div>
    </>
  );
};

export default Userlist;
