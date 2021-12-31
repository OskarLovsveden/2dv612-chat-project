import {
    useEffect,
    useState
} from 'react';
import adminImg from '../../../images/admin.png';
import ChatroomService from '../../../utils/http/chatroom-service';
import { Chatroom as ChatroomType, AdminPanelChatRooms } from '../../../types/Chatroom';
import Chatroom from '../../Chatroom';
import ListItems from './ListItems';


enum ModalState {
  UPDATE,
  CREATE,
  NONE
}

const RoomList = () => {
    const [chatrooms, setChatrooms] = useState<AdminPanelChatRooms>({ private_rooms: [], public_rooms: [] });
    const [modalState, setModalState] = useState<ModalState>(ModalState.NONE);
    const [activeChatroom, setActiveChatroom] = useState<ChatroomType>();

    const getAllChatrooms = async (): Promise<void> => {
        const chatroomService = new ChatroomService();
        const resChatRoom = await chatroomService.getAll();
        const privateRooms = resChatRoom.filter(
            (pr: ChatroomType) => pr.is_public === false
        );
        const publicRooms = resChatRoom.filter(
            (pr: ChatroomType) => pr.is_public === true
        );
        setChatrooms({
            private_rooms: privateRooms,
            public_rooms: publicRooms,
        });
    };

    useEffect(() => {
        getAllChatrooms();
    }, []);

    const updateChatroom = async (chatroom: ChatroomType) => {
        setActiveChatroom(chatroom);
        if (modalState === ModalState.UPDATE) {
            setModalState(ModalState.NONE);
        } else {
            setModalState(ModalState.UPDATE);
        }
    };

<<<<<<< HEAD
    const removeChatroom = async (id: number, isPublicRoom: boolean) => {
=======
    const updateModal = async (): Promise<void> => {
        setModalState(ModalState.NONE);
        getAllChatrooms();
    };

    const removeChatroom = async (
        id: number,
        isPublicRoom: boolean
    ): Promise<void> => {
>>>>>>> 2695f7ea455415f3a8e7b271f4f215fcb9d35e34
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
<<<<<<< HEAD
            {}
=======
            {modalState === ModalState.UPDATE && (
                <Chatroom
                    chatroom={activeChatroom}
                    updateModal={() => updateModal()}
                />
            )}
>>>>>>> 2695f7ea455415f3a8e7b271f4f215fcb9d35e34
            <div className="rounded overflow-hidden shadow-lg">
                <div className="px-6 py-4">
                    <img className="w-1/4 h-1/4" src={adminImg} alt="Admin" />
                    <div className="font-bold text-xl mb-2">Admin</div>
                    <ListItems 
                        chatrooms={chatrooms.public_rooms}
                        removeChatroom={(id: number) => removeChatroom(id, true)}
                        updateChatroom={updateChatroom}
                        title='Public rooms'
                    />
                    <ListItems 
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

export default RoomList;