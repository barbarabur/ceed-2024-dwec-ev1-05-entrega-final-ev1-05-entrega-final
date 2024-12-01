import { positionsWheel } from "./wheel.js";
import { drawnGrids, shuffleArray, solvedPositions, getRandomUnsolvedPosition} from "./utils.js";
import { displacement, game } from "./gameBoard.js";

function shuffle(){
    //hacemos un nuevo array con las posiciones desordenadas
    let shuffledPositions = shuffleArray (positionsWheel);
    let letters = document.querySelectorAll('.wheel-letter');
    letters.forEach ((letter, index) => {
        let newPosition = shuffledPositions[index];
        let leftValue = newPosition.left;
        let topValue = newPosition.top;
        letter.style.top = topValue;
        letter.style.left = leftValue;
    })
}

function solveLetter (targetPosition) {
    let [col, row] = targetPosition.split('/').map(num => num.trim());
    let [despx, despy] = displacement;
    let x= row - despx - 1;
    let y = col - despy - 1;
    let letterHint = game.letterAt(x,y);
    let divLetter = document.querySelector(`.letter[style='grid-area: ${targetPosition};']`);
    divLetter.textContent = letterHint; 
}

function isSolved(){
    let solvedArray = solvedPositions();
    let solvedSet = new Set (solvedArray);
    let drawnGridsSet = drawnGrids();
    
    if (drawnGridsSet.size > solvedSet.size) return false;
    return true;
}

function lightbulb(){
    let randomUnsolvedPosition = getRandomUnsolvedPosition();
    solveLetter(randomUnsolvedPosition);
}

function expand(){
    let solved = false;
    const MaxRepeat = 5;
    let repeat =0;
    while (!solved && repeat < MaxRepeat) {
        lightbulb();
        solved = isSolved();
        repeat ++;
    }
}

//evento cuando hacemos click  desde el hammer
function clickGrid (event){
    let letterDiv = event.target.closest('.letter');
    let solvedArray = solvedPositions();
   //para salir del hammer 
    function exitHammer(){
        let blackDiv = document.getElementById('black');
        blackDiv.removeEventListener('mousedown', clickGrid);
        let divLetter = document.querySelectorAll ('.letter');
        divLetter.forEach (letter=> {
            letter.classList.remove('on-top');  
            letter.removeEventListener('mousedown', clickGrid);
        });
        blackDiv.classList.add('hidden');  
    }
    if (letterDiv){
        let gridArea = letterDiv.style.gridArea;
        if (!solvedArray.includes(gridArea)){
            solveLetter(gridArea);
        } 
        exitHammer();
    } else {
        exitHammer();
    }    
}

function hammer (){
    let blackDiv = document.getElementById('black');
    blackDiv.classList.remove('hidden');
    blackDiv.addEventListener('mousedown', clickGrid);
    let divLetter = document.querySelectorAll ('.letter');
    divLetter.forEach (letter=> {
        letter.classList.add('on-top');  
        letter.addEventListener('mousedown', clickGrid); 
    });

}
export {shuffle, expand, lightbulb, hammer};
