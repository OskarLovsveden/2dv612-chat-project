import { FormEvent, SetStateAction, useRef, useState } from "react";
import "../App.css";
import chatroomService from "../utils/http/chatroom-service";
import chatImg from "../images/chat.png";
import { useNavigate } from "react-router";
import { Chatroom as ChatroomType } from "../types/Chatroom";

type ChatroomProps = {
  chatroom?: ChatroomType
};

/**
 * Makes Admin able to create chat rooms for users.
 * @returns HTML for creating a chatroom.
 */
const Chatroom = ( { chatroom }: ChatroomProps ) => {
  const [chatroomName, setChatroomName] = useState<string>("");
  // const [chatroomPublic, setChatroomPublic] = useState<boolean>(true);
  const [chatroomTag, setChatroomTag] = useState<string>("");
  const navigate = useNavigate();
  const publicRef = useRef<any>();

  const handleChatroomName = (Event: {
    target: { value: SetStateAction<string> };
  }) => {
    setChatroomName(Event.target.value);
  };

  const handleChatroomTag = (Event: {
    target: { value: SetStateAction<string> };
  }) => {
    setChatroomTag(Event.target.value);
  };

  // const handleChatroomPublic = (Event: {
  //   target: { value: SetStateAction<boolean> };
  // }) => {
  //   setChatroomPublic(Event.target.value);
  // };

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (chatroom === undefined) {
      const data = {
        name: chatroomName,
        public: publicRef.current?.checked,
        tag: chatroomTag,
      };
      const res = await chatroomService.create(data);
  
      navigate("/admin");
    }
    else {
      const data = {
        id: chatroom.id,
        name: chatroomName,
        public: publicRef.current?.checked,
        tag: chatroomTag,
      };
      const res = await chatroomService.update(data, chatroom.id);
  
      navigate("/admin");
    }
  };


  return (
    // <div className="bg-indigo-600 h-screen">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-auto bg-indigo-100 rounded p-5 w-96">
        <header>
          <img className="w-20 mx-auto mb-5" alt={chatImg} src={chatImg} />
        </header>
        <form onSubmit={handleOnSubmit}>
          <div>
            <label
              className="block mb-2 text-indigo-500"
              htmlFor="ChatroomName"
            >
              Chatroom Name
            </label>
            <input
              onChange={handleChatroomName}
              className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
              type="text"
              name="ChatroomName"
            />
          </div>
          <div>
            <label className="block mb-2 text-indigo-500" htmlFor="ChatroomTag">
              Chatroom Tag
            </label>
            <input
              onChange={handleChatroomTag}
              className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
              type="text"
              name="ChatroomTag"
            ></input>
          </div>
          <div>
            <label className="block mb-2 text-indigo-500" htmlFor="ChatroomPublic">
              Chatroom Public
            </label>
            <input
              ref={publicRef}
              // onChange={setChatroomPublic(!chatroomPublic)}
              className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
              type="checkbox"
              defaultChecked={true}
              name="ChatroomPublic"
            ></input>
          </div>
          <div>
            <input
              className="w-full bg-indigo-700 hover:bg-purple-700 text-white font-bold py-2 px-4 mb-6 rounded"
              type="submit"
              value="Submit"
            />
          </div>
        </form>
      </div>
    // </div>
  );
};



export default Chatroom;
