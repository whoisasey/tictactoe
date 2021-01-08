// HTML Elements
const statusDiv = document.querySelector('.status')
const resetBtn = document.querySelector('button')
const cells = document.querySelectorAll('.game-cell')
const error = document.querySelector('.message')


// Game Constants
const xSymbol = '×'
const oSymbol = "○"


//Game Variables
let gameIsLive = true; //the game is automatically started in the initial phase
let xIsNext = true; //x is always the first player

// Helper Functions

// if cell position passed is x or o, show winner
const handleWin = (letter) => {
	gameIsLive = false;
	if (letter === 'x') {
		statusDiv.innerHTML = `<span>blue has won!</span>`;
		} else {
		statusDiv.innerHTML = `<span>yellow has won!</span>`
	}
}

const checkGameStatus = ()=> {
	// here we are declaring each cell on the 3x3 grid
	const topLeft = cells[0].classList[1]
	const topMiddle = cells[1].classList[1]
	const topRight = cells[2].classList[1]
	const middleLeft = cells[3].classList[1]
	const middleMiddle = cells[4].classList[1]
	const middleRight = cells[5].classList[1]
	const bottomLeft = cells[6].classList[1]
	const bottomMiddle = cells[7].classList[1]
	const bottomRight = cells[8].classList[1]

	// is there a winner?

	// if top vertical horizontal matches
	if (topLeft && topLeft === topMiddle && topLeft === topRight) {
		handleWin(topLeft) // if topLeft is x, x is winner. if topLeft is o, o is winner
		// then add the class of "won" for the winning cell combination 
		cells[0].classList.add('won');
		cells[1].classList.add('won');
		cells[2].classList.add('won');

		// if middle vertical horizontal matches
		} else if (middleLeft && middleLeft === middleMiddle && middleLeft === middleRight) {
			handleWin(middleLeft)
		  cells[3].classList.add('won');
		  cells[4].classList.add('won');
			cells[5].classList.add('won');
			
			// if bottom horizontal row matches
		} else if (bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight) {
			handleWin(bottomRight)
		  cells[6].classList.add('won');
		  cells[7].classList.add('won');
			cells[8].classList.add('won');
			
			// if left vertical row matches
		} else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
			handleWin(topLeft)
		  cells[0].classList.add('won');
		  cells[3].classList.add('won');
			cells[6].classList.add('won');
			
			// if middle vertical row matches
		} else if (topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle) {
			handleWin(topMiddle)
		  cells[1].classList.add('won');
		  cells[4].classList.add('won');
			cells[7].classList.add('won');
			
			// if right vertical row matches
		} else if (topRight && topRight === middleRight && topRight === bottomRight) {
			handleWin(topRight)
	  cells[2].classList.add('won');
	  cells[5].classList.add('won');
		cells[8].classList.add('won');
		
		//  if diagonal matches from top left to bottom right
		} else if( topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
			handleWin(topLeft)
		  cells[0].classList.add('won');
		  cells[4].classList.add('won');
			cells[8].classList.add('won');
			
			// if diagonal matches from top right to bottom left
		} else if (topRight && topRight === middleMiddle && topRight === bottomLeft) {
			handleWin(topRight)
		  cells[2].classList.add('won');
		  cells[4].classList.add('won');
		  cells[6].classList.add('won');
		} else if (topLeft && topMiddle && topRight && middleMiddle && middleLeft && middleRight && bottomLeft && bottomMiddle && bottomRight) {

			// if no winner
			gameIsLive = false;
			statusDiv.innerHTML = 'No Winner! Game is Tied'
		} else {

			// if the cells haven't been played
			xIsNext = !xIsNext;
			if (xIsNext) {
				statusDiv.innerHTML = `<span class="blue">${xSymbol} is next<span>`
			} else {
				statusDiv.innerHTML = `<span class="yellow">${oSymbol} is next</span>`
			}
		}
  }


// Event Handlers

const handleCellClick = e => {
	const classList = e.target.classList;

	// if the cell already has a player in it, show error
	if (!gameIsLive || classList[1] === 'x' || classList[1] === 'o'){
		error.innerHTML = `<span class="error">Error: You've already clicked the cell!!</span>`;
		return
	}

	// if the cell is empty, add an x or o
	if (xIsNext) {
		classList.add('x')
		checkGameStatus()
	} else {
		classList.add('o')
		checkGameStatus()
	}
}

const handleReset = () => {
	xIsNext = true;
	//when game is reset, set x to the first player (blue)
	statusDiv.innerHTML = `<span class="blue">${xSymbol} is next</span>`
	for (const cell of cells) {
		// remove all players from the board, clear additional classes and clear winner
		cell.classList.remove('x')
		cell.classList.remove('o')
		cell.classList.remove('won')
	}
	gameIsLive = true;

	//remove error message
	const span = document.querySelector('.error')

	error.removeChild(span)
}

// Event Listeners
resetBtn.addEventListener('click', handleReset)

for (const cell of cells) {
	cell.addEventListener('click', handleCellClick)
}