
function shuffleArray(array) {
    // Copiar el array original para no modificar el original
    let shuffledArray = [...array];

    // Aplicar el algoritmo de Fisher-Yates para mezclar el array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));  // Obtener un índice aleatorio entre 0 y i
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];  // Intercambiar los elementos
    }

    return shuffledArray;
}
function drawnGrids (){
    let divs = document.querySelectorAll('.letter');
    let drawnGridsSet = new Set();

    divs.forEach(div => {
        const gridArea = div.style.gridArea;

        if (gridArea) {
            // Extraer los números de grid-area (separados por /)
            const gridNumbers = gridArea.split('/').map(Number);

            if (gridNumbers.length >= 2) {
                //const gridPair = (gridNumbers[0], gridNumbers[1]);  // Tomamos solo el row y column
                drawnGridsSet.add(gridNumbers);  
            }
        }
    });
    return drawnGridsSet;
}

function solvedPositions (){
    const solvedPositions = [];
    let divLetter = Array.from(document.getElementsByClassName('letter'));

    divLetter.forEach (div => {
        if (div.textContent !=='') {
            let gridArea = div.style.gridArea;

            if (gridArea) {
                let [row, col] = gridArea.split('/').map(num => num.trim());  // Dividir por "/" y eliminar espacios
                solvedPositions.push([`${row},${col}`]);  // Unir sin espacios y agregar a la lista
            }
        }
    });
    return solvedPositions;
}
function unSolvedPositions (){
    const unSolvedPositions = [];
    let divLetter = Array.from(document.getElementsByClassName('letter'));

    divLetter.forEach (div => {
        if (div.textContent ==='') {
            let gridArea = div.style.gridArea;
            unSolvedPositions.push(gridArea);
        }
    });
    return unSolvedPositions;
}

function getRandomUnsolvedPosition () {
    let unSolvedArray = unSolvedPositions();
    let randomizedArray = shuffleArray(unSolvedArray);
    return randomizedArray[0];
}


export {drawnGrids, solvedPositions, unSolvedPositions, shuffleArray, getRandomUnsolvedPosition};
