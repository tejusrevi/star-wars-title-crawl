import React from 'react';
import Three from 'three';
import logo from './logo.svg';
import './App.css';
import init from './components/scene.js'

function App() {
  return (
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
  );
}
export default App;
