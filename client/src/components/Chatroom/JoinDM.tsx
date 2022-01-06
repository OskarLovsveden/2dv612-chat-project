import { useContext } from 'react';
import { HomeContext } from '../../context/HomeProvider';
import { User } from '../../types/User';

type joinProps = {
    user: User;
};
const JoinDM: React.FC<joinProps> = ({ user }) => {
    const { setActiveChatView, activeChat } = useContext(HomeContext);

    return (
        <div className="w-full h-full">
            <div>
                <div className="flex items-center">
                    <button
                        type="button"
                        onClick={() => {
                            close();
                        }}
                        className="text-white transition-colors duration-150
                    bg-indigo-700 rounded-lg focus:shadow-outline 
                    hover:bg-indigo-800 mx-auto w-10 h-10"
                    >
                        DM
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JoinDM;
