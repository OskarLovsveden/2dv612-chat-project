import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import grpPic from './grppic.png'
import './App.css';
import {getHello} from './apiCalls'

import Chat from './components/Chatroom/Chat'


function App() {
  const [state, setstate] = useState<string>('')
  const [chatOpen, setChatOpen] = useState<boolean>(false)


  // useEffect(() => {
  //   async function sayHello() {
  //     const hej = await getHello()
  //     console.log(hej);
      
  //     setstate(hej?.message)
  //   }
  //   sayHello()
  //   console.log(state);
    
    
  // }, [state])

  const onChat = () => {
    setChatOpen((chatOpen: any) => !chatOpen);
  }
  
  return (
    <div className="App">
      <header className="App-header">
       
      </header>
        {/* <button onClick={onChat}>open chat</button>
        {chatOpen
        ? <Chat Toggle={ onChat } />
        : null
        } */}
        {<Chat Toggle={onChat}/>}
    </div>
  );
}

export default App;
