import Searchbar from "./Searchbar";
import chatImg from "../../images/chat.png";
import { useState, MouseEvent, useContext } from "react";
import ChatroomList from "./ChatroomList";
import { HomeContext } from "../../context/HomeProvider";
import DirectMessageList from "./DirectMessageList";

const MESSAGES: string = "messages";
const CHAT_ROOMS: string = "chat-rooms";

const SideBar = () => {
  const [activeList, setActiveList] = useState<string>(MESSAGES);
  const { rooms, dms } = useContext(HomeContext);

  const showMessages = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setActiveList(MESSAGES);
  };

  const showRooms = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setActiveList(CHAT_ROOMS);
  };

  return (
    <div className="hidden xl:block sm:flex-2 w-64 bg-indigo-500">
      <div className="user-profile text-center">
        <img className="w-32 h-32 mx-auto" src={chatImg} alt="user" />
      </div>

      <div className="menu mt-8">
        <div className="inline-flex w-full">
          <button
            onClick={showMessages}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l mx-auto"
          >
            Messages
          </button>
          <button
            onClick={showRooms}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r mx-auto"
          >
            Rooms
          </button>
        </div>
        <div>
          <div className="sidebar hidden lg:flex w-full flex-2 flex-col pr-6">
            <Searchbar />
            {activeList === MESSAGES && dms && (
              <DirectMessageList messages={dms} />
            )}
            {activeList === CHAT_ROOMS && rooms && (
              <ChatroomList chatrooms={rooms} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
