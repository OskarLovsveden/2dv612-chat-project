import { useContext } from 'react';
import Chat from '../components/Chatroom/Chat';
import { AuthContext } from '../context/AuthProvider';
import SideBar from '../components/sidebar/SideBar';
import { HomeProvider } from '../context/HomeProvider';
import { SocketProvider } from '../context/SocketProvider';
import Logout from '../components/Logout';
import RenderChat from '../components/RenderChat';

const Home: React.FC = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <HomeProvider>
            <SocketProvider>
                <div className="w-screen h-screen bg-indigo-600">
                    <div className="flex">
                        <SideBar />
                        <div className="main-body container m-auto w-11/12 h-full flex flex-col shadow-lg">
                            <div>
                                <div className="flex-1">
                                    <span className="xl:hidden inline-block text-gray-700 hover:text-gray-900 align-bottom" />
                                    <span className="lg:hidden inline-block ml-8 text-gray-700 hover:text-gray-900 align-bottom">
                                        <span className="block h-6 w-6 p-1 rounded-full hover:bg-gray-400">
                                            <svg
                                                className="h-4 w-4"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        </span>
                                    </span>
                                </div>
                                <div className="flex-1 bg-indigo-500">
                                    <div className="flex-1 text-right">
                                        <span className="inline-block text-gray-700">
                                            <Logout />
                                            <span className="inline-block align-text-bottom" />
                                        </span>
                                        <span className="inline-block ml-10 text-gray-700 hover:text-gray-900 align-bottom" />
                                        <RenderChat />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SocketProvider>
        </HomeProvider>
    );
};

export default Home;
