import { useContext, useEffect, useState } from 'react';
import chattare from '../../images/chattare.png';
import moderator from '../../images/moderator.png';
import type { User } from '../../types/User';
import ChatroomService from '../../utils/http/chatroom-service';
import { HomeContext } from '../../context/HomeProvider';
import ROLE from '../../types/Role';


const ChatroomUserList = () => {
    const [chatroomUsers, setChatroomUsers] = useState<User[]>([]);

    const { activeChat } = useContext(HomeContext);

    useEffect(() => {
        (async () => {
<<<<<<< HEAD
            // TODO get correct users from chatroom
            const userService = new UserService();
            const resChatroomUsers = await userService.getAll();
            setChatroomUsers(resChatroomUsers.data);
=======
            if (activeChat) {
                const chatroomService = new ChatroomService();
                const resChatroomUsers = await chatroomService.getChatroomUsers(
                    activeChat.id
                );
                setChatroomUsers(resChatroomUsers);
            }
>>>>>>> 2695f7ea455415f3a8e7b271f4f215fcb9d35e34
        })();
    }, []);

    return (
        <div className="hidden absolute right-5 xl:block sm:flex-2 w-32 h-96 bg-indigo-500 border-solid border-2 border-indigo-800 overflow-y-auto h-96 ">
            <h2 className="mx-8">Chatroom members</h2>
            <div className="menu mt-8">
                <div className="inline-flex w-full">
                    <ul>
                        {chatroomUsers.map(
<<<<<<< HEAD
                            (user: User, i: number) =>
                                user.role === 'user' && (
                                    <li key={i}>
                                        <div className="inline-flex space-x-2 space-y-1">
                                            <h3>{user.username} </h3>
                                            <img className="w-6 h-6" src={chattare} alt="chattare" />
=======
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
>>>>>>> 2695f7ea455415f3a8e7b271f4f215fcb9d35e34
                                        </div>
                                    </li>
                                )
                        )}
                    </ul>
                </div>

                <div className="inline-flex w-full">
                    <ul>
                        {chatroomUsers.map(
<<<<<<< HEAD
                            (user: User, i: number) =>
                                user.role === 'moderator' && (
                                    <li key={i}>
=======
                            (user: User) =>
                                user.role === ROLE.USER && (
                                    <li key={user.id}>
>>>>>>> 2695f7ea455415f3a8e7b271f4f215fcb9d35e34
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
                    <div className="sidebar hidden lg:flex w-full flex-2 flex-col pr-6"></div>
                </div>
            </div>
        </div>
    );
};

export default ChatroomUserList;
