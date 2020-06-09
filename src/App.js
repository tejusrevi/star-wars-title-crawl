import React, { useState } from 'react';
import Three from 'three';
import logo from './logo.svg';
import './App.css';
import ChangeText from './components/scene.js'

var data = {
  numOfChars:100, //100 characters per line
  placeholder: "It is a dark time for the Rebellion."
}

function getInput(node){
  var arr = [];
  if (node.childNodes.length<data.numOfChars){
    node.childNodes.forEach(e=>{
      var padding = "  ".repeat((data.numOfChars-e.textContent.length)/2);
      arr.push(padding+e.textContent+padding)
    })
  }
  console.log(arr)
  return arr.join('\n');
}
function handleInput(bool){
  if (bool) return false;
  return true;
}
function App() {
  const [userInput, setUserInput] = useState(data.placeholder);
  const [isPlay, setIsPlay] = useState(false);
  return (
    <div>
    <div id ="input-container">
      <div contentEditable="true" id ='user-input' spellCheck ="false">{data.placeholder}</div>
      <div id="button-container">
        <input id='submit' type='image' src='./tick.png' onClick = {e=>{setUserInput(getInput(document.getElementById('user-input')))}}/>
        <button id="play" className="btn" onClick = {e=>setIsPlay(handleInput(isPlay))}><img id="play-icon" src="./play.png"></img></button>
      </div>
      <ChangeText text={userInput} play={isPlay}/>
      </div>
      <button id="camera-reset">Camera</button>
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