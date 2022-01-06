import ROLE from '../../types/Role';

type MessageProps = {
    currentUser?: number;
    currentUserRole?: string;
    user_id: number;
    id: number;
    name: string;
    message: string;
    removeMessage: (id: number) => void;
};

const Message: React.FC<MessageProps> = ({
    currentUser,
    currentUserRole,
    user_id,
    id,
    name,
    message,
    removeMessage,
}) => {
    return (
        <div className="relative px-4 py-4 w-3/4 rounded-md hover:bg-gray-50 dark:hover:bg-coolDark-600 overflow-hidden flex items-start">
            <div className=" items-center mb-1 text-left">
                <h3>{name}</h3>
                <p>{message}</p>
                {currentUser === user_id || currentUserRole === ROLE.ADMIN ? (
                    <button
                        type="button"
                        className="text-white 
                        transition-colors duration-150 
                        bg-red-700 rounded-lg focus:shadow-outline 
                        hover:bg-red-800 mx-auto w-4 h-6 absolute top-0 right-0
                        bottom-0"
                        onClick={() => removeMessage(id)}
                    >
                        X
                    </button>
                ) : null}
            </div>
        </div>
    );
};

export default Message;
