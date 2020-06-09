import React, { useState } from 'react';
import Three from 'three';
import logo from './logo.svg';
import './App.css';
import ChangeText from './components/scene.js'

var data = {
  numOfChars:100, //100 characters per line
  placeholder: '     A long time ago in \n a galaxy far,far away....'
}
function getInput(){
  var arr = [];
  var node = document.getElementById('user-input')//.textContent;
  if (node.childNodes.length>0){
    node.childNodes.forEach(e=>{
      var padding = "  ".repeat((data.numOfChars-e.textContent.length)/2);
      
      arr.push(padding+e.textContent+padding)
    })
  }
  console.log(arr)
  return arr.join('\n');
}
function App() {
  const [userInput, setUserInput] = useState(data.placeholder);
  return (
    <div id ="input-container">
      <div contentEditable="true" id ='user-input' spellCheck ="false">{data.placeholder}</div>
      <div id="button-container">
        <input id='submit' type='image' src='./tick.png' onClick = {e=>{setUserInput(getInput())}}/>
        <button id="play" class="btn"><img id="play-icon" src="./play.png"></img></button>
      </div>
      <ChangeText text={userInput}/>
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