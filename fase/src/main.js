import './styles/styles.css'
import './lib/fontawesome.js'
import { createBoard } from './lib/gameBoard.js'; 
import { createLettersWheel } from './lib/wheel.js';
import { addEvents, addEventsHelp } from './lib/events.js';

createBoard();
createLettersWheel();
addEvents();
addEventsHelp();
