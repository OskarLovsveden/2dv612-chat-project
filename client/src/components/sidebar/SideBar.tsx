import Searchbar from "./Searchbar";
import chatImg from "../../images/chat.png";
import { useState, MouseEvent } from "react";
import List from "./List";

const dms = [
  {
    name: "Simon Palm",
    id: 1,
  },
  {
    name: "Jonas Nilsson",
    id: 2,
  },
];

const rooms = [
  {
    name: "Random",
    id: 1,
  },
  {
    name: "FUNFUNFUN",
    id: 2,
  },
];

const MESSAGES: string = "messages";
const CHAT_ROOMS: string = "chat-rooms";

const SideBar = () => {
  const [activeList, setActiveList] = useState<string>(MESSAGES);

  const onSwapListView = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    activeList === MESSAGES
      ? setActiveList(CHAT_ROOMS)
      : setActiveList(MESSAGES);
  };

  return (
    <div className="hidden xl:block sm:flex-2 w-64 bg-indigo-500">
      <div className="user-profile text-center">
        <img className="w-32 h-32 mx-auto" src={chatImg} alt="user" />
      </div>

      <div className="menu mt-8">
        <div className="inline-flex w-full">
          <button
            onClick={onSwapListView}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l mx-auto"
          >
            Messages
          </button>
          <button
            onClick={onSwapListView}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r mx-auto"
          >
            Rooms
          </button>
        </div>
        <div>
          <div className="sidebar hidden lg:flex w-full flex-2 flex-col pr-6">
            <Searchbar />
            {/* TODO "type = dms/rooms" bad! FIX BETTER */}
            {activeList === MESSAGES && dms && <List type="dms" data={dms} />}
            {activeList === CHAT_ROOMS && rooms && (
              <List type="rooms" data={rooms} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
