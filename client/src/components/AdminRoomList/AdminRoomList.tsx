import {
    Key,
    useEffect,
    useState
} from 'react';
import adminImg from '../../images/admin.png';
import deleteImg from '../../images/delete.png';
import ChatroomService from '../../utils/http/chatroom-service';
import { Chatroom as ChatroomType, AdminPanelChatRooms } from '../../types/Chatroom';
import Chatroom from '../Chatroom';
import ListItem from './ListItem';



type AdminRoomListProps = {
    editUserImg: string
}

const AdminRoomList = ({ editUserImg }: AdminRoomListProps) => {
    /*  const [chatRoomData, setChatRoomData] = useState<ChatroomType[]>([]); */
    const [chatrooms, setChatrooms] = useState<AdminPanelChatRooms>({ private: [], public: [] });
    const [modalState, setModalState] = useState<ModalState>(ModalState.NONE);
    const [activeChatroom, setActiveChatroom] = useState<ChatroomType>();


    useEffect(() => { 
        (async () => {
            const chatroomService = new ChatroomService();
            const resChatRoom = await chatroomService.getAll();
            const privateRooms = resChatRoom.data.filter((pr: any) => pr.is_public === false);
            const publicRooms = resChatRoom.data.filter((pr:any) => pr.is_public === true);
            setChatrooms({
                private: [...chatrooms?.private, ...privateRooms],
                public: [...chatrooms?.public, ...publicRooms]

            });
            /* setChatRoomData(resChatRoom.data); */
        })();
    }, []);

    const removeChatroom = async (id: number) => {
        const chatroomService = new ChatroomService();
        await chatroomService.delete(id);
        setChatRoomData(chatRoomData.filter((cr: ChatroomType) => cr.id !== id));
    };

    return (
        <>
            {modalState === ModalState.UPDATE && <Chatroom chatroom={activeChatroom}/>}
            <div className="rounded overflow-hidden shadow-lg">
                <div className="px-6 py-4">
                    <img className="w-1/4 h-1/4" src={adminImg} alt="Admin" />
                    <div className="font-bold text-xl mb-2">Admin</div>
                    {}
                    <ListItem 
                        rooms={chatrooms.public}
                    />
                    <ListItem 
                        rooms={chatrooms.private}
                    />
                </div>
            </div>
        </>
    );
};

export default AdminRoomList;