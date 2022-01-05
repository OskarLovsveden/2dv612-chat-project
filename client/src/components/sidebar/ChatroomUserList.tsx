import { useContext, useEffect, useState } from 'react';
import chattare from '../../images/chattare.png';
import moderator from '../../images/moderator.png';
import type { User } from '../../types/User';
import ChatroomService from '../../utils/http/chatroom-service';
import { HomeContext } from '../../context/HomeProvider';
import ROLE from '../../types/Role';

const ChatroomUserList: React.FC = () => {
    const [chatroomUsers, setChatroomUsers] = useState<User[]>([]);

    const { activeChat } = useContext(HomeContext);

    useEffect(() => {
        (async () => {
            if (activeChat) {
                const chatroomService = new ChatroomService();
                const resChatroomUsers = await chatroomService.getChatroomUsers(
                    activeChat.id
                );
                setChatroomUsers(resChatroomUsers);
            }
        })();
    }, []);

    return (
        <div className="hidden absolute right-5 xl:block sm:flex-2 w-32 h-96 bg-indigo-500 border-solid border-2 border-indigo-800 overflow-y-auto h-96 ">
            <h2 className="mx-8">Chatroom members</h2>
            <div className="menu mt-8">
                <div className="inline-flex w-full">
                    <ul>
                        {chatroomUsers.map(
                            (user: User) =>
                                user.role === ROLE.MOD && (
                                    <li key={user.id}>
                                        <div className="inline-flex space-x-2 space-y-1">
                                            <h3>{user.username} </h3>
                                            <img
                                                className="w-6 h-6"
                                                src={moderator}
                                                alt="moderator"
                                            />
                                        </div>
                                    </li>
                                )
                        )}
                    </ul>
                </div>

                <div className="inline-flex w-full">
                    <ul>
                        {chatroomUsers.map(
                            (user: User) =>
                                user.role === ROLE.USER && (
                                    <li key={user.id}>
                                        <div className="inline-flex space-x-2 space-y-1">
                                            <h3>{user.username} </h3>
                                            <img
                                                className="w-6 h-6"
                                                src={chattare}
                                                alt="chattare"
                                            />
                                        </div>
                                    </li>
                                )
                        )}
                    </ul>
                </div>
                <div>
                    <div className="sidebar hidden lg:flex w-full flex-2 flex-col pr-6" />
                </div>
            </div>
        </div>
    );
};

export default ChatroomUserList;
