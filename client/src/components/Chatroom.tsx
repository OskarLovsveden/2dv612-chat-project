import { FormEvent, SetStateAction, useRef, useState } from 'react';
import '../App.css';
import chatImg from '../images/chat.png';
import { useNavigate } from 'react-router';
import { Chatroom as ChatroomType } from '../types/Chatroom';
import ChatroomService from '../utils/http/chatroom-service';

type ChatroomProps = {
  chatroom?: ChatroomType
};

/**
 * Makes Admin able to create chat rooms for users.
 * @returns HTML for creating a chatroom.
 */
const Chatroom = ({ chatroom }: ChatroomProps) => {
    const [chatroomName, setChatroomName] = useState<string>(chatroom?.name || '');
    const [chatroomTag, setChatroomTag] = useState<string>(chatroom?.tag || '');
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

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const chatroomService = new ChatroomService();
    
        if (chatroom === undefined) {
            const data = {
                name: chatroomName,
                is_public: publicRef.current?.checked,
                tag: chatroomTag
            };
            await chatroomService.create(data);
      
            navigate('/admin');
        }
        else {
            const data = {
                id: chatroom.id,
                name: chatroomName,
                is_public: publicRef.current?.checked,
                tag: chatroomTag
            };
            await chatroomService.update(data, data.id);
  
            navigate('/temporary-adress-which-just-makes-sure-to-reload-admin-page');
            navigate('/admin');
        }
    };


    return (
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
                        defaultValue={chatroom?.name || ''}
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
                        defaultValue={chatroom?.tag || ''}
                    ></input>
                </div>
                <div>
                    <label className="block mb-2 text-indigo-500" htmlFor="ChatroomPublic">
              Chatroom Public
                    </label>
                    <input
                        ref={publicRef}
                        className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
                        type="checkbox"
                        defaultChecked={chatroom?.is_public || true}
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
    );
};



export default Chatroom;
