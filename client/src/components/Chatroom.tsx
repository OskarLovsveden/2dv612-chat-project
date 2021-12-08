import {SetStateAction, useState} from "react"
import '../App.css'
import axios from "axios"
import chatImg from '../images/chat.png'


/**
 * Makes Admin able to create chat rooms for users.
 * @returns HTML for creating a chatroom.
 */
const Chatroom = () => {
    const [chatroomName, setChatroomName] = useState<string>('')
    const [chatroomTag, setChatroomTag] = useState<string>('') 

    const handleChatroomName = (Event: { target: { value: SetStateAction<string> } }) => {
        setChatroomName(Event.target.value)
    }

    const handleChatroomTag = (Event: { target: { value: SetStateAction<string> } }) => {
        setChatroomTag(Event.target.value)
    }

    const handleOnSubmit = (Event: { preventDefault: () => void }) =>  {
        const chatroomJSON = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: { name: chatroomName, public: true, tag: chatroomTag }
        }
        axios.post('http://localhost:5000/api/room', chatroomJSON)
        Event.preventDefault()
   }

    return(
        <div className="bg-indigo-600 h-screen">
        <div className="max-w-xs w-full m-auto bg-indigo-100 rounded p-5">   
        <header>
            <img className="w-20 mx-auto mb-5" src={chatImg} />
        </header>
        <form onSubmit={handleOnSubmit}>
        <div>
            <label className="block mb-2 text-indigo-500" htmlFor="ChatroomName">Chatroom Name</label>
            <input onChange={handleChatroomName} className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" type="text" name="ChatroomName"/>
       </div>
        <div>
            <label className="block mb-2 text-indigo-500" htmlFor="ChatroomTag">Chatroom Tag</label>
            <input onChange={handleChatroomTag} className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" type="text" name="ChatroomTag">
            
            </input>
        </div>
        <div>          
         <input className="w-full bg-indigo-700 hover:bg-purple-700 text-white font-bold py-2 px-4 mb-6 rounded" type="submit" value="Submit"/>
        </div>       
     </form>
     </div>
     </div>
     
    )
}

export default Chatroom

