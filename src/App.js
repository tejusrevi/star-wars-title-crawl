import React, { useState } from 'react';
import Three from 'three';
import logo from './logo.svg';
import './App.css';
import ChangeText from './components/scene.js'
import ScriptBar from './components/ScriptBar.js'
import {crawl} from './components/movieScript'

var data = {
  numOfChars:50, //100 characters per line
  placeholder: crawl['A New Hope']
}

function getInput(node){
  /*
  var arr = [];
  node.value.split('\n').forEach(e=>{
    var padding = "  ".repeat((data.numOfChars-e.length)/3);
    arr.push(padding+e+padding);
  })
  console.log(arr.forEach(e=>console.log(e.length)))
  return arr.join("\n");
  */
 return node.value;
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
      <div id="credit"><code><div id="name">Made by Tejus Revi</div><div id="tools">Using React & ThreeJS</div></code></div>
      <button id="camera-reset" onClick={e=>{
        setIsReset(handleInput(isReset));
        document.getElementById('camera-reset').disabled = true;
        document.getElementById('camera-reset').style.visibility = "collapse";
        }}>Reset 
      Camera</button>
    <div id ="input-container">
      
      <ScriptBar/>
      <div id="input-items">
      <textarea id ='user-input' spellCheck ="false">{data.placeholder}</textarea>
      <div id="button-container">
        <div id="button">
        <button id='submit' onClick ={e=>setUserInput(getInput(document.getElementById('user-input')))}><img id="tick-icon" src="./tick.png"></img></button>
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