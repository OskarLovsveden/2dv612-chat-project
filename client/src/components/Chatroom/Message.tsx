type MessageProps = {
  name: string;
  message: string;
};

export default function Message(props: MessageProps) {
  return (
    <div className="px-4 py-4 rounded-md hover:bg-gray-50 dark:hover:bg-coolDark-600 overflow-hidden flex items-start">
      <div className=" items-center mb-1 text-left">
        <h3>{props.name}</h3>
        <p>{props.message}</p>
      </div>
    </div>
  );
}
