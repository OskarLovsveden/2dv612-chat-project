
import Message from './Message'

const messages = [
    "hejs",
    "halåå",
    "tjabba"
]
const person1 = {
    name: "Erik",
    message: "Hejsan"
}
const person2 = {
    name: "Pär",
    message: "Nämen tjenare"
}

const testMess = [
    person1,
    person2
]

const handleOnSubmit = (Event: {preventDefault: ()  => void}) => {
    const chatMessage = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }
    Event.preventDefault()
}
export default function ChatRoom({Toggle} : {Toggle: () => void}) {
    return (

        <>
            <div className="max-w-auto h-auto w-full m-auto bg-indigo-100 rounded p-5">
                <header>
                    <div className="relative left-5 top-5">
                        <button onClick={Toggle} type="button" className="absolute bottom-0 right-0 bg-white rounded-md p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Close menu</span>
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </header>

                <ul>
                    {testMess.map(message => (
                    <li>
                        <Message message={message} />
                    </li>
                    ))}
                </ul>
                <div className="mb-6 mx-4">
                    <form onSubmit={handleOnSubmit}>
                        <input
                        type="text"
                        placeholder="Skicka meddelande..."
                        className="rounded-r-lg rounded-l-lg flex-1 appearance-none border border-gray-300 py-2 px-1 lg:px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none"
                        name="message"
                        />
                        <button
                        type="submit"
                        className="uppercase font-semibold text-sm tracking-wider text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}