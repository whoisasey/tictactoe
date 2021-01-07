// HTML Elements
const statusDiv = document.querySelector('.status')
const resetBtn = document.querySelector('button')
const cells = document.querySelectorAll('.game-cell')
const error = document.querySelector('.message')

// game constants
const xSymbol = '×'
const oSymbol = "○"


//Game Variables
let gameIsLive = true;
let xIsNext = true;

// Helper Functions
// const letterToSymbol = (letter) => 	letter === 'x' ? xSymbol : oSymbol

const handleWin = (letter) => {
	gameIsLive = false;
	if (letter === 'x') {
		// statusDiv.innerHTML = `${letterToSymbol(letter)} has won!`;
		statusDiv.innerHTML = `<span>blue has won!</span>`;
		} else {
		// statusDiv.innerHTML = `<span>${letterToSymbol(letter)} has won!</span>`;
		statusDiv.innerHTML = `<span>yellow has won!</span>`
	}
}

const checkGameStatus = ()=> {
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
	if (topLeft && topLeft === topMiddle && topLeft === topRight) {
		handleWin(topLeft)
		// cells[0].classList.add('won');
		// cells[1].classList.add('won');
		// cells[2].classList.add('won');
		} else if (middleLeft && middleLeft === middleMiddle && middleLeft === middleRight) {
			handleWin(middleLeft)
		//   cells[3].classList.add('won');
		//   cells[4].classList.add('won');
		//   cells[5].classList.add('won');
		} else if (bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight) {
			handleWin(bottomRight)
		//   cells[6].classList.add('won');
		//   cells[7].classList.add('won');
		//   cells[8].classList.add('won');
		} else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
			handleWin(topLeft)
		//   cells[0].classList.add('won');
		//   cells[3].classList.add('won');
		//   cells[6].classList.add('won');
		} else if (topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle) {
			handleWin(topMiddle)
		//   cells[1].classList.add('won');
		//   cells[4].classList.add('won');
		//   cells[7].classList.add('won');
		} else if (topRight && topRight === middleRight && topRight === bottomRight) {
			handleWin(topRight)
	//   cells[2].classList.add('won');
	//   cells[5].classList.add('won');
	//   cells[8].classList.add('won');
		} else if( topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
			handleWin(topLeft)
		  cells[0].classList.add('won');
		  cells[4].classList.add('won');
		  cells[8].classList.add('won');
		} else if (topRight && topRight === middleMiddle && topRight === bottomLeft) {
			handleWin(topRight)
		//   cells[2].classList.add('won');
		//   cells[4].classList.add('won');
		//   cells[6].classList.add('won');
		} else if (topLeft && topMiddle && topRight && middleMiddle && middleLeft && middleRight && bottomLeft && bottomMiddle && bottomRight) {
			gameIsLive = false;
			statusDiv.innerHTML = 'No Winner! Game is Tied'
		} else {
			xIsNext = !xIsNext;
			if (xIsNext) {
				statusDiv.innerHTML = `${xSymbol} is next`
			} else {
				statusDiv.innerHTML = `<span>${oSymbol} is next</span>`
			}
		}
  }


// Event Handlers
const handleReset = () => {
	xIsNext = true;
	statusDiv.innerHTML = `${xSymbol} is next`
	for (const cell of cells) {
		cell.classList.remove('x')
		cell.classList.remove('o')
		cell.classList.remove('won')
	}
	gameIsLive = true;
}

const handleCellClick = e => {
	const classList = e.target.classList;
	// console.log(e)
	if (!gameIsLive || classList[1] === 'x' || classList[1] === 'o'){
		error.innerHTML = `<span class="error">Error: You've already clicked the cell!!</span>`;
		return
	}

	if (xIsNext) {
		classList.add('x')
		checkGameStatus()
	} else {
		classList.add('o')
		checkGameStatus()
	}

	// if (classList[1] === 'x' || classList[1] === 'o') {
	// 	console.log(e)
	// }
}

// Event Listeners
resetBtn.addEventListener('click', handleReset)

for (const cell of cells) {
	cell.addEventListener('click', handleCellClick)
}