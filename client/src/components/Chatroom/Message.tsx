type MessageProps = {
    name: string;
    message: string;
};

const Message: React.FC<MessageProps> = ({ name, message }) => {
    return (
        <div className="px-4 py-4 w-3/4 rounded-md hover:bg-gray-50 dark:hover:bg-coolDark-600 overflow-hidden flex items-start">
            <div className=" items-center mb-1 text-left">
                <h3>{name}</h3>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default Message;
