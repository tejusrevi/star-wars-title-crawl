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

function cameraReset(){

}
function App() {
  const [userInput, setUserInput] = useState(data.placeholder);
  const [isPlay, setIsPlay] = useState(false);
  const [isReset, setIsReset] = useState(true);
  return (
    <div id ='main-container'>
      <button id="camera-reset" onClick={e=>setIsReset(handleInput(isReset))}>Reset 
      Camera</button>
    <div id ="input-container">
      <div contentEditable="true" id ='user-input' spellCheck ="false">{data.placeholder}</div>
      <div id="button-container">
        <div id="button">
        <button id='submit' onClick ={e=>{setUserInput(getInput(document.getElementById('user-input')))}}><img id="tick-icon" src="./tick.png"></img></button>
        <div id="render-text">Render</div>
        </div>
        <div id="button">
        <button id="play" className="btn" onClick = {e=>{
          setIsPlay(handleInput(isPlay));
          if(!isPlay)document.getElementById("audio").play();
          else{
            document.getElementById("audio").pause();
            document.getElementById("audio").currentTime=0;
          }
          }}><img id="play-icon" src="./play.png"></img></button>
        <div id="play-text">Play</div>
        </div>
      </div>
      <ChangeText text={userInput} play={isPlay} reset={isReset} resetConfirm={setIsReset}/>
      </div>
      
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