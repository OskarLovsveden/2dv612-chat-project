type MessageProps = {
    message: {
        name: string,
        message: string
    }
}

export default function Message (props : MessageProps) {
    const {name, message} = props.message

    return (
    <div className="px-4 py-4 rounded-md hover:bg-gray-50 dark:hover:bg-coolDark-600 overflow-hidden flex items-start">
        <div className=" items-center mb-1">
            <h3>{name}</h3>
            <p>
            {message}
            </p>
        </div>
    </div>
    )
}