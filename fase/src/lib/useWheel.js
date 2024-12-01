
import { lengthAndAngle, getElementCenter } from "./line_position.js";
import { displacement, game } from "./gameBoard.js";
export let newWord ='';
export let solvedArray =[];

let lines =[];
let followLine = document.createElement('div');
let isClicked = false;
let firstPosition = null;
let selectedLetter ='';
let selWordPosition =[];
followLine.classList.add('line');
lines.push(followLine);
document.body.appendChild(followLine);

function drawLine(startPosition,endPosition) {    
    const line = document.createElement('div');
    line.classList.add('line');
    const {length, angle } = lengthAndAngle(startPosition, endPosition);
    line.style.position = 'absolute';
    line.style.left = `${startPosition[0]}px`;
    line.style.top = `${startPosition[1]}px`;
    line.style.width = `${length}px`;
    line.style.transform = `rotate(${angle}deg)`;    
    lines.push(line);
    document.body.appendChild(line);
}

//seleccionar las letras 
function selectWord(letterDiv) {
    selectedLetter = letterDiv.textContent;
    newWord += selectedLetter;
    return newWord; 
 }

//evento para cuando se clicka en una letra del wheel
function clickLetter (event) {
    isClicked = true;
    let letterDiv = event.target.closest('.wheel-letter');
    letterDiv.classList.add('selected');
    firstPosition = getElementCenter(letterDiv); 
    newWord ='';
    selectedLetter = '';
    newWord = selectWord(letterDiv);
}

//funcion para llamar al evento por encima de las letters. Selecciona, almacena la posicion y dibuja la linea
function overLetter (event){
    let letterDiv = event.target.closest('.wheel-letter');

    if (isClicked && !letterDiv.classList.contains('selected')) {
        letterDiv.classList.add('selected'); 
        let secondPosition = getElementCenter(letterDiv);
        drawLine(Object.values(firstPosition), Object.values(secondPosition));
        firstPosition = secondPosition;
        newWord = selectWord(letterDiv);
    }
}
//escribir las letras en las casillas
function solveWord (selWordPosition) {
    let divLetter = Array.from(document.getElementsByClassName('letter'));
    let [despx, despy] = displacement;
    let finalOrigin = selWordPosition.origin;
    let col = finalOrigin[0] + despx + 1; //col inicial
    let row = finalOrigin[1] + despy + 1; // row final
   
    for (let i=0; i < newWord.length; i++) {
        divLetter.forEach(currentDivLetter => {
            if (currentDivLetter.style.gridArea == `${row} / ${col}`) {
               currentDivLetter.textContent = newWord[i] ;
            }
        });

        if (selWordPosition.direction == "horizontal") {
           col++;
        } else { //(direction === "vertical")
           row++;
        }  
    solvedArray.push(col,row);
    }
}
 
//función para desleccionar y borrar las lineas al soltar el raton
function releaseLetter (){
    isClicked = false;
    firstPosition = null;
    let idwheel = document.getElementById ('wheel');
    Array.from(idwheel.children).forEach(tempLetterDiv => { 
        tempLetterDiv.classList.remove('selected');   
    });
    lines.forEach(line => {
        line.remove();   
    });
    
    //compara la palabra para ver si está 
    if (newWord !='') {
    try {
        selWordPosition = game.findWord(newWord);    
        if (selWordPosition) {
            solveWord(selWordPosition);
           
        } 
    } catch (error) {
        console.log (error);
        console.log (newWord);
    }
    newWord ='';
}
}

//función para dibujar la linea que sigue al ratón
function followMouse(event){
    if(isClicked) {
        let mousePosition = [event.clientX, event.clientY];
        firstPosition = Object.values(firstPosition);
        const {length, angle } = lengthAndAngle(firstPosition, mousePosition);
        followLine.style.position = 'absolute';
        followLine.style.left = `${firstPosition[0]}px`;
        followLine.style.top = `${firstPosition[1]}px`;
        followLine.style.width = `${length}px`;
        followLine.style.transform = `rotate(${angle}deg)`;    
    }
}

export {clickLetter, overLetter, releaseLetter, followMouse};