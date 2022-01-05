import { useContext } from 'react';
import { HomeContext } from '../../context/HomeProvider';
import { Chatroom } from '../../types/Chatroom';

type joinProps = {
    chatroom: Chatroom;
    close: () => void;
};
const Join: React.FC<joinProps> = ({ close, chatroom }) => {
    const { setActiveChatView, activeChat } = useContext(HomeContext);

    return (
        <div className=" w-full h-full bg-indigo-500 ">
            <div>
                <div className=" flex items-center ">
                    <button
                        type="button"
                        onClick={() => {
                            setActiveChatView(chatroom);
                            close();
                        }}
                        className="text-white transition-colors duration-150
                    bg-indigo-700 rounded-lg focus:shadow-outline 
                    hover:bg-indigo-800 mx-auto w-12 h-12"
                    >
                        Join
                    </button>
                    <button
                        type="button"
                        onClick={() => close()}
                        className="text-white transition-colors duration-150
                    bg-red-700 rounded-lg focus:shadow-outline
                    hover:bg-red-800 mx-auto w-12 h-12"
                    >
                        Dont Join
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Join;
