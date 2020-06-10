import React from 'react';
import {crawl} from './movieScript'

function handleClick(title){
    document.getElementById('user-input').value = crawl[title]
}
function ScriptBar(){

    return(
        <div id ="scriptbar">
            <button class="episode-button" onClick={e=>handleClick("A New Hope")}>A New Hope</button>
            <button class="episode-button" onClick={e=>handleClick("The Empire Strikes Back")}>The Empire Strikes Back</button>
            <button class="episode-button" onClick={e=>handleClick("Return of the Jedi")}>Return of the Jedi</button>
            <button class="episode-button" onClick={e=>handleClick("The Phantom Menace")}>The Phantom Menace</button>
            <button class="episode-button" onClick={e=>handleClick("Attack of the Clones")}>Attack of the Clones</button>
            <button class="episode-button" onClick={e=>handleClick("Revenge of the Sith")}>Revenge of the Sith</button>
            <button class="episode-button" onClick={e=>handleClick("The Force Awakens")}>The Force Awakens</button>
            <button class="episode-button" onClick={e=>handleClick("The Last Jedi")}>The Last Jedi</button>
            <button class="episode-button" onClick={e=>handleClick("The Rise of Skywalker")}>The Rise of Skywalker</button>
        </div>
    )
}

export default ScriptBar;