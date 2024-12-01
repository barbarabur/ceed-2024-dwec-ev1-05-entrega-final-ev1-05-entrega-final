import { game } from './gameBoard.js'; 
import calculateLetterPositions from './letter_positions.js'

//crear los divs con las letras del círculo

let positionsWheel
function createLettersWheel () {
    let letters = game.letters.split('');
    positionsWheel = calculateLetterPositions (letters.length);
    let idwheel = document.getElementById ('wheel');

    letters.forEach ((letter, index) => {
        let letterDiv = document.createElement ('div');
        let position = positionsWheel[index];
        letterDiv.classList.add('wheel-letter');
        letterDiv.textContent = letter;
        letterDiv.style.position = 'absolute';
        letterDiv.style.left = position.left;
        letterDiv.style.top = position.top;

        idwheel.appendChild(letterDiv);
    });
    return positionsWheel;
} 
export {createLettersWheel, positionsWheel};