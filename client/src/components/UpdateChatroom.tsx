import { FormEvent, SetStateAction, useState } from "react";
import "../App.css";
import chatroomService from "../utils/http/chatroom-service";
import chatImg from "../images/chat.png";
import { useNavigate } from "react-router";
import { Chatroom } from "../types/Chatroom";

/**
 * Makes Admin able to update chat rooms for users.
 * @returns HTML for creating a chatroom.
 */
const UpdateChatroom = ( chatroom: Chatroom) => {
    const [chatroomName, setChatroomName] = useState<string>("");
    const [chatroomTag, setChatroomTag] = useState<string>("");
    const [chatroomPublic, setChatroomPublic] = useState<boolean>(true);
  const navigate = useNavigate();

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

  const handleChatroomPublic = (Event: {
    target: { value: SetStateAction<boolean> };
  }) => {
    setChatroomPublic(Event.target.value);
  };

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
        id: chatroom.id,
      name: chatroomName,
      public: chatroomPublic,
      tag: chatroomTag,
    };
    const res = await chatroomService.update(data, chatroom.id);

    navigate("/admin");
  };

  return (
    <div className="bg-indigo-600 h-screen">
      <div className="max-w-xs w-full m-auto bg-indigo-100 rounded p-5">
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
              onChange={handleChatroomPublic}
              defaultChecked={true}
              className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
              type="checkbox"
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
    </div>
  );
};

export default UpdateChatroom;
