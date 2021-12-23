import {
    useEffect,
    useState
} from 'react';
import adminImg from '../../images/admin.png';
import ChatroomService from '../../utils/http/chatroom-service';
import { Chatroom as ChatroomType, AdminPanelChatRooms } from '../../types/Chatroom';
import Chatroom from '../Chatroom';
import ListItem from './ListItem';


enum ModalState {
  UPDATE,
  CREATE,
  NONE
}

const AdminRoomList = () => {
    const [chatrooms, setChatrooms] = useState<AdminPanelChatRooms>({ private_rooms: [], public_rooms: [] });
    const [modalState, setModalState] = useState<ModalState>(ModalState.NONE);
    const [activeChatroom, setActiveChatroom] = useState<ChatroomType>();


    useEffect(() => { 
        (async () => {
            const chatroomService = new ChatroomService();
            const resChatRoom = await chatroomService.getAll();
            const privateRooms = resChatRoom.data.filter((pr: any) => pr.is_public === false);
            const publicRooms = resChatRoom.data.filter((pr:any) => pr.is_public === true);
            setChatrooms({
                private_rooms: [...chatrooms?.private_rooms, ...privateRooms],
                public_rooms: [...chatrooms?.public_rooms, ...publicRooms]

            });
        })();
    }, []);

    const updateChatroom = async (chatroom: ChatroomType) => {
        setActiveChatroom(chatroom);
        if (modalState === ModalState.UPDATE) {
            setModalState(ModalState.NONE);
        } else {
            setModalState(ModalState.UPDATE);
        }
    };

    const removeChatroom = async (id: number, isPublicRoom: boolean) => {
        const chatroomService = new ChatroomService();
        await chatroomService.delete(id);

        if(isPublicRoom) {
            setChatrooms({
                public_rooms: [...chatrooms.public_rooms.filter((pr: any) => pr.id != id)],
                private_rooms: [...chatrooms.private_rooms]
            });
        } else {
            setChatrooms({
                private_rooms: [...chatrooms.private_rooms.filter((pr: any) => pr.id != id)],
                public_rooms: [...chatrooms.public_rooms]
            });
        }
    };

    return (
        <>
            {modalState === ModalState.UPDATE && <Chatroom chatroom={activeChatroom}/>}
            <div className="rounded overflow-hidden shadow-lg">
                <div className="px-6 py-4">
                    <img className="w-1/4 h-1/4" src={adminImg} alt="Admin" />
                    <div className="font-bold text-xl mb-2">Admin</div>
                    <ListItem 
                        chatrooms={chatrooms.public_rooms}
                        removeChatroom={(id: number) => removeChatroom(id, true)}
                        updateChatroom={updateChatroom}
                        title='Public rooms'
                    />
                    <ListItem 
                        chatrooms={chatrooms.private_rooms}
                        removeChatroom={(id: number) => removeChatroom(id, false)}
                        updateChatroom={updateChatroom}
                        title='Private rooms'
                    />
                </div>
            </div>
        </>
    );
};

export default AdminRoomList;