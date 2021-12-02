import {SetStateAction, useState} from "react"
import '../App.css'
import axios from "axios"
import chatImg from '../images/chat.png'


/**
 * Login form for users.
 * @returns HTML for login form.
 */
const Login = () => {
    const [username, setUsername] = useState<string>('')
    const [userPassword, setUserPassword] = useState<string>('') 

    const handleUserName = (Event: { target: { value: SetStateAction<string> } }) => {
        setUsername(Event.target.value)
    }

    const handleUserPassword = (Event: { target: { value: SetStateAction<string> } }) => {
        setUserPassword(Event.target.value)
    }

    const handleOnSubmit = (Event: { preventDefault: () => void }) =>  {
        const loginUserJSON = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: { Username: username, Password: userPassword }
        }
        axios.post('http://localhost:5000/api/login', loginUserJSON)
        Event.preventDefault()
   }

    return(
        <div className="max-w-xs w-full m-auto bg-indigo-100 rounded p-5">   
        <header>
            <img className="w-20 mx-auto mb-5" src={chatImg} />
            <h3 className="block mb-2 text-indigo-800">Login</h3>
        </header>
        <form>
        <div>
            <label className="block mb-2 text-indigo-500" htmlFor="Username">Username</label>
            <input onChange={handleUserName} placeholder="Enter Username" className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" type="text" name="Email"/>
       </div>
        <div>
            <label className="block mb-2 text-indigo-500" htmlFor="Password">Password</label>
            <input onChange={handleUserPassword} placeholder="Enter Password" className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" type="password" name="Password">
            
            </input>
        </div>
        <div>          
         <input onClick={handleOnSubmit} className="w-full bg-indigo-700 hover:bg-purple-700 text-white font-bold py-2 px-4 mb-6 rounded" type="submit"/>
        </div>       
     </form>
     </div>
    )
}

export default Login

