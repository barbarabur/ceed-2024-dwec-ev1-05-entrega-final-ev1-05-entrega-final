import {clickLetter, overLetter, releaseLetter, followMouse} from './useWheel.js';
import { shuffle, expand, lightbulb, hammer } from './helpers.js';
function addEvents (){
    const letters = document.querySelectorAll('.wheel-letter');
    letters.forEach(letterDiv => {  
        letterDiv.addEventListener('mousedown', clickLetter);
        letterDiv.addEventListener('mouseover', overLetter); 
    });
    document.addEventListener('mouseup', releaseLetter);
    document.addEventListener('mousemove', followMouse);
}

function addEventsHelp() {
    let shuffleBtn = document.getElementById('fa-shuffle');
    shuffleBtn.addEventListener('mouseup', shuffle);
    let expandBtn = document.getElementById('fa-expand');
    expandBtn.addEventListener('mouseup', expand);
    let lightbulbBtn = document.getElementById('fa-lightbulb');
    lightbulbBtn.addEventListener('mouseup', lightbulb);
    let hammerBtn = document.getElementById('fa-hammer');
    hammerBtn.addEventListener('mouseup', hammer);
   
}


export {addEvents, addEventsHelp};