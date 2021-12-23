import {
} from 'react';
import { Chatroom as ChatroomType } from '../../types/Chatroom';
import deleteImg from '../../images/delete.png';
import editUserImg from '../../images/edit.png';


type ListItemProps = {
    title: string;
    chatrooms: ChatroomType[];
    removeChatroom: (id: number) => void;
    updateChatroom: (chatroom: ChatroomType) => void;
}

const ListItem = ({ title, removeChatroom, updateChatroom, chatrooms }: ListItemProps) => {    
    return (
        
        <div>
            <div className="font-bold text-xl mb-2">{title}</div>
            <ul>
                {chatrooms && chatrooms.map(
                    (chatroom: ChatroomType,i: number) => {
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
                    }
                )}
            </ul>
        </div>
    );
};

export default ListItem;