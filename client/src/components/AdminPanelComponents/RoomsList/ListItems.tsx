import {} from 'react';
import { Chatroom as ChatroomType } from '../../../types/Chatroom';
import deleteImg from '../../../images/delete.png';
import editUserImg from '../../../images/edit.png';

type ListItemsProps = {
  title: string;
  chatrooms: ChatroomType[];
  removeChatroom: (id: number) => void;
  updateChatroom: (chatroom: ChatroomType) => void;
};

const ListItems = ({
    title,
    removeChatroom,
    updateChatroom,
    chatrooms
}: ListItemsProps) => {
    return (
        <div>
            <div className="font-bold text-xl mb-2">{title}</div>
            <ul>
                {chatrooms &&
<<<<<<< HEAD
                    chatrooms.map((chatroom: ChatroomType) => {
                        return (
                            <li key={chatroom.id}>
                                <div className="inline-flex space-x-4">
                                    <h3>{chatroom.name}</h3>
                                    {chatroom.tags.map((item: string) => {
                                        return (
                                            <div
                                                key={item}
                                                className="outerTag"
                                            >
                                                <div className="innerTag">
                                                    {item}
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <span className="inline-block align-text-bottom w-4 h-4 bg-green-400 rounded-full border-2 border-white " />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeChatroom(chatroom.id)
                                        }
                                    >
                                        <img
                                            className="w-6 h-6 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                                            src={deleteImg}
                                            alt="Delete"
                                        />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => updateChatroom(chatroom)}
                                    >
                                        <img
                                            className="w-6 h-6 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                                            src={editUserImg}
                                            alt="Edit"
                                        />
                                    </button>
                                </div>
                            </li>
                        );
                    })}
=======
          chatrooms.map((chatroom: ChatroomType, i: number) => {
              return (
                  <li key={i}>
                      <div className="inline-flex space-x-4">
                          <h3>{chatroom.name} </h3>
                          <h3>{chatroom.tag} </h3>
                          <span className="inline-block align-text-bottom w-4 h-4 bg-green-400 rounded-full border-2 border-white "></span>
                          <img
                              className="w-6 h-6 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                              src={deleteImg}
                              alt="Delete"
                              onClick={() => removeChatroom(chatroom.id)}
                          />
                          <img
                              className="w-6 h-6 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                              src={editUserImg}
                              alt="Edit"
                              onClick={() => updateChatroom(chatroom)}
                          />
                      </div>
                  </li>
              );
          })}
>>>>>>> ed2f8089be711c755a89f9ca4a1469e8a3a2674e
            </ul>
        </div>
    );
};

export default ListItems;
