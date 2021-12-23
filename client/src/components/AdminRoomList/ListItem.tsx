import {
    Key,
    useEffect,
    useState
} from 'react';
import { Chatroom as ChatroomType } from '../../types/Chatroom';
import deleteImg from '../../images/delete.png';
import editUserImg from '../../images/edit.png';

type ListItemProps = {
    name: string;
    tag: string;
    title: string;
    chatrooms: 
    removeChatroom: (id: number) => void;
    setActiveChatroom: (chatroom: ChatroomType) => void;
}

enum ModalState {
    UPDATE,
    CREATE,
    NONE
}


const ListItem = ({ name, tag, title }: ListItemProps) => {
    const [modalState, setModalState] = useState<ModalState>(ModalState.NONE);
    const [activeChatroom, setActiveChatroom] = useState<ChatroomType>();
    
    
    return (

        <div>
            <div className="font-bold text-xl mb-2">{title}</div>
            <ul>
                {chatRoomData.map(
                    (
                        u: {
    is_public: boolean;
    name: string;
    tag: string;
    id: number;
  },
                        i: Key | null | undefined
                    ) => {
                        const chatroom = u;
                        return u.is_public === true && (
  
                            <li key={i}>
                                <div className="inline-flex space-x-4">
                                    <h3>{u.name} </h3>
                                    <h3>{u.tag} </h3>
                                    <span className="inline-block align-text-bottom w-4 h-4 bg-green-400 rounded-full border-2 border-white "></span>
                                    <img
                                        className="w-6 h-6 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                                        src={deleteImg}
                                        alt="Delete"
                                        onClick={() => removeChatroom(u.id)}
                                    />
                                    <img
                                        className="w-6 h-6 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                                        src={editUserImg}
                                        alt="Edit"
                                        onClick={() => {
                                            setActiveChatroom(chatroom);
                                            if (modalState === ModalState.UPDATE) {
                                                setModalState(ModalState.NONE);
                                            } else {
                                                setModalState(ModalState.UPDATE);
                                            }
                                        }}
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