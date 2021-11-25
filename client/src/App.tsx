import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import grpPic from './grppic.png'
import './App.css';
import {getHello} from './apiCalls'


function App() {
  const [state, setstate] = useState<any>('')

  useEffect(() => {
    async function sayHello() {
      const hej = await getHello()
      console.log(hej);
      
      setstate(hej?.message)
    }
    sayHello()
    console.log(state);
    
    
  }, [state])

  
  return (
    <div className="App">
      <header className="App-header">
        <h1> Welcome to Shaddapp </h1>
        <img src={grpPic} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>
          {state}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
