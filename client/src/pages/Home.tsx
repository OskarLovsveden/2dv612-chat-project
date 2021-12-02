
import React, { useEffect, useState } from 'react';
import Chat from '../components/Chatroom/Chat'


const Home = () => {
  const [chatOpen, setChatOpen] = useState<boolean>(false)
  const onChat = () => {
    setChatOpen((chatOpen: boolean) => !chatOpen);
  }
  return(
    <>
    <div>Detta är hem!</div>
    {/* <button onClick={onChat}>open chat</button>
        {chatOpen && <Chat Toggle={ onChat } />} */}
    <Chat Toggle={onChat} /> 
    </>
  ) 
};

export default Home;
