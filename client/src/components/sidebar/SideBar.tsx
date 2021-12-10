import Searchbar from "./Searchbar";
import chatImg from "../../images/chat.png";
import Channel from "../Chatroom/Channel";
import { useState, MouseEvent } from "react";
import { ChannelInfo } from "../../types/ChannelInfo";

const test = [
  {
    name: "Simon Palm",
    message: "SCRUM is nice!",
  },
  {
    name: "Jonas Nilsson",
    message: "Fan va grymt!",
  },
];

const MESSAGES: string = "messages";
const CHAT_ROOMS: string = "chat-rooms";

const SideBar = () => {
  const [activeList, setActiveList] = useState<string>(MESSAGES);
  //   const [chatOpen, setChatOpen] = useState<boolean>(false);
  //   const [currentChannel, setChannels] = useState<ChannelInfo[]>([]);

  //   const onChat = () => {
  //     console.log("Du klickade på mig");
  //     setChatOpen((chatOpen: boolean) => !chatOpen);
  //     setChannels((currentChannel: ChannelInfo[]) => [...currentChannel]);
  //     console.log(currentChannel);
  //   };

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
            Private
          </button>
          <button
            onClick={onSwapListView}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r mx-auto"
          >
            Group Chats
          </button>
        </div>
        <div>
          <div className="sidebar hidden lg:flex w-full flex-2 flex-col pr-6">
            <Searchbar />
            {activeList === MESSAGES
              ? test &&
                test.map((channelInfo: any) => (
                  <Channel
                    name={channelInfo.name}
                    message={channelInfo.message}
                  />
                  //   <Channel
                  //     toggle={onChat}
                  //     name={channelInfo.name}
                  //     message={channelInfo.message}
                  //   />
                ))
              : "HÄR SKA MAN KOLLA OM CHATROOM DATA FINNS" && <div>hej</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
