import { useEffect, useState } from 'react';
import chattare from '../../images/chattare.png';
import moderator from '../../images/moderator.png';
import type { User } from '../../types/User';
import UserService from '../../utils/http/user-service';

const ChatroomUserList = () => {
    const [chatroomUsers, setChatroomUsers] = useState<User[]>([]);

    useEffect(() => {
        (async () => {
            // TODO get correct users from chatroom
            const userService = new UserService();
            const resChatroomUsers = await userService.getAll();
            setChatroomUsers(resChatroomUsers.data);
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
