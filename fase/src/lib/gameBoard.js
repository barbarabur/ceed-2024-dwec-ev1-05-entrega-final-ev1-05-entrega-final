
import { Game } from "./Game.js";
import center from './center.js';
export const game = new Game();
export const wordPositions = game.wordPositions;
export let displacement;
let gridContainer = document.getElementById('grid');

//calcular posiciones máximas
function mostPosition () {
    let maxX = 0;
    let maxY = 0;
    wordPositions.forEach(word => {
        let {origin, direction,length}  = word;
        let x = origin[0];
        let y = origin[1];
        let currentX = x;
        let currentY = y;

        if (direction === "horizontal") {
            currentX = x + length - 1;
        }
        else {//dirección vertical 
           currentY = y + length - 1;
        }
        if (currentX > maxX) {
            maxX = currentX;
        }
        if (currentY > maxY) {
            maxY = currentY ;
        }
        })
               return [maxX, maxY];
}

//para calcular el desplazamiento
function centerBoard(){   
    const [maxX, maxY]= mostPosition();
 
    let [despx, despy] = center(maxX, maxY, 10, 10);
    displacement = [despx, despy];
    return displacement;
 }
 //para dibujar los divs del tablero en su posición
function createBoard(){
    let tempDrawnGridsSet = new Set();// set temporal para comprobar que no haya divs duplicados en los cruces
    let [despx, despy] = centerBoard();
    wordPositions.forEach (word=>{
        let {origin, direction,length}  = word;
        let x = origin[0];
        let y = origin[1];
        
        for (let i = 0; i < length; i++) {
            let gridXY = '';
            if (direction === "horizontal") {
                gridXY = `${y + 1 + despy} / ${x + i + 1 + despx}`;
            } else { // Si es "vertical"
                gridXY = `${y + i + 1+ despy} / ${x + 1+ despx}`;
            }
            if (tempDrawnGridsSet.has(gridXY)) {// comporbamos que no hayan divs duplicados
                continue; 
            }
            let div = document.createElement('div');
            div.style.gridArea = gridXY;
            div.classList.add('letter');
            gridContainer.appendChild(div);
            tempDrawnGridsSet.add(gridXY);
        }       
    });
}
 export { createBoard, centerBoard };

 
