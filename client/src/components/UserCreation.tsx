import {SetStateAction, useState} from "react"
import '../App.css'
import axios from "axios"
import userImg from '../images/user.png'


/**
 * Makes Admin able to create users.
 * @returns HTML for creating a user.
 */
const UserCreation = () => {
    const [username, setUserName] = useState<string>('')
    const [userPassword, setUserPassword] = useState<string>('') 
    const [userRole, setUserRole] = useState<string>('') 

    const options = [
        {
            label: 'Chattare',
            value: 'chattare'
        },
        {
            label: 'Moderator',
            value: 'moderator'
        },
        {
            label: 'Admin',
            value: 'admin'
        }
        
      ]

    const handleUserName = (Event: { target: { value: SetStateAction<string> } }) => {
        setUserName(Event.target.value)
    }

    const handleUserPassword = (Event: { target: { value: SetStateAction<string> } }) => {
        setUserPassword(Event.target.value)
    }
    const handleUserRole = (Event: { target: { value: SetStateAction<string> } }) => {
        setUserRole(Event.target.value)
    }

    const handleOnSubmit = (Event: { preventDefault: () => void }) =>  {
        const userJSON = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: { username: username, password: userPassword, role: userRole }
        }
        axios.post('http://localhost:5000/api/user?role=admin', userJSON)
        Event.preventDefault()
   }

    return(
        <div className="max-w-xs w-full m-auto bg-indigo-100 rounded p-5">   
            <header>
                <img className="w-20 mx-auto mb-5" src={userImg} />
            </header>
            <form onSubmit={handleOnSubmit}>
                <div>
                    <label className="block mb-2 text-indigo-500" htmlFor="Username">Username</label>
                    <input onChange={handleUserName} className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" type="text" name="UserName"/>
                </div>
                <div>
                    <label className="block mb-2 text-indigo-500" htmlFor="UserPassword">Password</label>
                    <input onChange={handleUserPassword} className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" type="password" name="UserPassword" />
                </div>
                <div>
                <label className="block mb-2 text-indigo-500" htmlFor="UserRole">Role</label>
                    <select onChange={handleUserRole} className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300">
                        {options.map((option) => (
                                <option value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    </div>
                <div>          
                    <input className="w-full bg-indigo-700 hover:bg-purple-700 text-white font-bold py-2 px-4 mb-6 rounded" value="Create User" type="submit"/>
                    
                </div>       
            </form>
        </div>
    )
}

export default UserCreation

