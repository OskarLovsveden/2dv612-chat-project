import { useContext, useEffect, useState } from 'react';
import chattare from '../../images/chattare.png';
import moderator from '../../images/moderator.png';
import type { User, ChatroomUser } from '../../types/User';
import UserService from '../../utils/http/user-service';
import ChatroomService from '../../utils/http/chatroom-service';
import { HomeContext } from '../../context/HomeProvider';

const ChatroomUserList = () => {
    const [chatroomUsers, setChatroomUsers] = useState<User[]>([]);

    const { activeChat } = useContext(HomeContext);


    useEffect(() => {
        (async () => {
            if(activeChat ) {
                console.log('kommer vi hit elelr')
                // TODO get correct users from chatroom
                const chatroomService = new ChatroomService();
                const resChatroomUsers = await chatroomService.getChatroomUsers( activeChat.id);
                console.log( 'hshdasd ' + resChatroomUsers);
                setChatroomUsers(resChatroomUsers.data);
            }
        })();
    }, []);

    return (
        <div className="hidden xl:block sm:flex-2 w-64 bg-indigo-500 border-solid border-2 border-indigo-800 ">
            <h2 className="mx-8">Chatroom members</h2>
            <div className="menu mt-8">
                <div className="inline-flex w-full">
                    <ul>
                        {chatroomUsers.map(
                            (user: User, i: number) =>
                                user.role === 'user' && (
                                    <li key={i}>
                                        <div className="inline-flex space-x-2 space-y-1">
                                            <h3>{user.username} </h3>
                                            <img className="w-6 h-6" src={chattare} alt="chattare" />
                                        </div>
                                    </li>
                                )
                        )}
                    </ul>
                </div>

                <div className="inline-flex w-full">
                    <ul>
                        {chatroomUsers.map(
                            (user: User, i: number) =>
                                user.role === 'moderator' && (
                                    <li key={i}>
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
                <div>
                    <div className="sidebar hidden lg:flex w-full flex-2 flex-col pr-6"></div>
                </div>
            </div>
        </div>
    );
};

export default ChatroomUserList;
