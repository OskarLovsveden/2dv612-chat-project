import {useContext} from 'react'
import {HomeContext } from '../../context/HomeProvider';
import { Chatroom } from '../../types/Chatroom';

type joinProps = {
    chatroom: Chatroom;
    close: () => void;
}
const Join:React.FC<joinProps> = ({close,chatroom}) => {
    const { setActiveChatView, activeChat } = useContext(HomeContext);

    return (
        <div className='w-full h-full bg-indigo-500'>
            <div className='bg-indigo-400 w-96 h-52 mx-auto absolute top-5 text-center border-indigo-600 border-2'>
                <div className='inline-flex'>
                </div>
                    <div className='flex items-center'>
                        <button onClick={() => {
                            setActiveChatView(chatroom) 
                            close()
                        }} className='text-white transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800 mx-auto w-32 h-32'>
                        Join
                        </button>
                        <button onClick={() => close()} className='text-white transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-red-800 mx-auto w-32 h-32'>
                        Don't Join
                        </button>
                    </div>
            </div> 
        </div>
    )
}

export default Join
