import React, { useState } from 'react';
import Three from 'three';
import logo from './logo.svg';
import './App.css';
import Init from './components/scene.js'


function App() {
  const [count, setCount] = useState("Teeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");

  return (
    <div>
      <form>
      <input type="text" value={count} onChange = {e=>setCount(e.target.value)}/>
      </form>
      //{console.log(count)}
      <Init text={count}/>
    </div>
    /*
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
          {init()}
        </a>
      </header>
    </div>
    */
  );
}
export default App;