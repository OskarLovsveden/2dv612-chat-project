import { useEffect, useState, MouseEvent, useContext, ReactChild, ReactFragment, ReactPortal } from 'react';
import ChatroomList from './ChatroomList';
import { HomeContext } from '../../context/HomeProvider';
import DirectMessageList from './DirectMessageList';
import chattare from '../../images/chattare.png'
import moderator from '../../images/moderator.png'
import userService from '../../utils/http/user-service';
import type { User } from '../../types/User';

const ChatroomUserList = () => {
    const [chatroomUsers, setChatroomUsers] = useState<User[]>([])

    useEffect(() => {
        (async () => {
            // TODO get correct users from chatroom 
            const resChatroomUsers = await userService.getAll();
            setChatroomUsers(resChatroomUsers.data)
        })();
    }, []);

    return (
        <div className="hidden xl:block sm:flex-2 w-64 bg-indigo-500 border-solid border-2 border-indigo-800 ">
            <h2 className='mx-8'>Chatroom members</h2>
            <div className="menu mt-8">
                <div className="inline-flex w-full">
                    <ul>
                        {chatroomUsers.map((user, i) => 
                            user.role === 'user' && (
                            <li key={i}>
                            <div className="inline-flex space-x-2 space-y-1">
                                <h3>{user.username} </h3>
                                <img className='w-6 h-6' src={chattare}  alt='chattare' />
                            </div>
                            </li>
                            )
                        )}
                    </ul>
                </div>

                <div className="inline-flex w-full">
                    <ul>
                        {chatroomUsers.map((user, i) => 
                            user.role === 'moderator' && (
                            <li key={i}>
                            <div className="inline-flex space-x-2 space-y-1">
                                <h3>{user.username} </h3>
                                <img className='w-6 h-6' src={moderator}  alt='moderator' />
                            </div>
                            </li>
                            )
                        )}
                    </ul>
                </div>
                <div>
                    <div className="sidebar hidden lg:flex w-full flex-2 flex-col pr-6">
                     
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatroomUserList;