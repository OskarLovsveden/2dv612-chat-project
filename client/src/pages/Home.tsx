import React, { useEffect, useState } from "react";
import Chat from "../components/Chatroom/Chat";
import chatImg from "../images/chat.png";
import Channel from "../components/Chatroom/Channel";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

type ChannelInfo = {
  name: string;
  message: string;
};

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

const Home = () => {
  const { user } = useContext(AuthContext);
  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const [currentChannel, setChannels] = useState<ChannelInfo[]>([]);

  useEffect(() => {});
  const onChat = () => {
    console.log("Du klickade på mig");
    setChatOpen((chatOpen: boolean) => !chatOpen);
    setChannels((currentChannel: ChannelInfo[]) => [...currentChannel]);
    console.log(currentChannel);
  };

  return (
    <>
      <div className="w-screen h-screen">
        <div className="flex">
          <div className="hidden xl:block sm:flex-2 w-64 bg-indigo-500">
            <div className="user-profile text-center">
              <img className="w-32 h-32 mx-auto" src={chatImg} alt="user" />
            </div>

            <div className="menu mt-8">
              <div className="inline-flex w-full">
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l mx-auto">
                  Private
                </button>
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r mx-auto">
                  Group Chats
                </button>
              </div>
              <div>
                <div className="sidebar hidden lg:flex w-full flex-2 flex-col pr-6">
                  <div className="search flex-2 pb-6 px-2">
                    <input
                      type="text"
                      className="outline-none py-2 block w-full bg-transparent border-b-2 border-gray-200"
                      placeholder="Search"
                    />
                  </div>
                  {test &&
                    test.map((channelInfo: any) => (
                      <Channel
                        Toggle={onChat}
                        name={channelInfo.name}
                        message={channelInfo.message}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="main-body container m-auto w-11/12 h-full flex flex-col">
            <div>
              <div className="flex-1">
                <span className="xl:hidden inline-block text-gray-700 hover:text-gray-900 align-bottom">
                  <span className="block h-6 w-6 p-1 rounded-full hover:bg-gray-400">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                  </span>
                </span>
                <span className="lg:hidden inline-block ml-8 text-gray-700 hover:text-gray-900 align-bottom">
                  <span className="block h-6 w-6 p-1 rounded-full hover:bg-gray-400">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </span>
                </span>
              </div>
              <div className="flex-1 bg-indigo-500">
                <div className="flex-1 text-right">
                  <span className="inline-block text-gray-700">
                    Status:{" "}
                    <span className="inline-block align-text-bottom w-4 h-4 bg-green-400 rounded-full border-2 border-white"></span>{" "}
                    <b>Online</b>
                    <span className="inline-block align-text-bottom">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        className="w-4 h-4"
                      >
                        <path d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </span>
                  </span>
                  <span className="inline-block ml-10 text-gray-700 hover:text-gray-900 align-bottom">
                    <span className="block h-6 w-10 p-1 rounded-full hover:bg-gray-400">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        className="w-4 h-4"
                      >
                        <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                      </svg>
                    </span>
                  </span>
                  {user && <Chat Toggle={onChat} username={user.username} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <button onClick={onChat}>open chat</button>
        {chatOpen && <Chat Toggle={ onChat } />} */}
    </>
  );
};

export default Home;
