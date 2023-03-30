//make the html
// Title at the top of the page centered
// player 1&2 plus tie box
// 3x3 board
// new game button under

// make css
// add background color
// board color
// styles for x and o
// styles for new game button

// js
//target the board and all 9 blocks

// first click is x player
// add click events for all 9 blocks, and new game button
// add logic for game
// cant click the same block twice
// when user clicks block its placed
// when 3 in a row game is finished
// save the data of who won
// append the data to the score board

// extra save the wins to local store 

// Declare the current player variable, with 1 representing Player 1
let currentPlayer = 1;

// Function to start a new game
function newGame() {
  // Select all block elements and store them in a constant
  const blocks = document.querySelectorAll('.block');
  
  // Iterate over each block element
  blocks.forEach((block) => {
    // Clear the background color of each block
    block.style.backgroundColor = '';
  });

  // Reset the current player to Player 1
  currentPlayer = 1;
}

// Function to check for a win
function checkWin() {
  // Select all block elements and store them in a constant
  const blocks = document.querySelectorAll('.block');
  
  // Define the possible winning combinations for a 3x3 tic-tac-toe board
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  // Iterate over each winning combination
  for (const combination of winningCombinations) {
    // Extract the three indices (a, b, and c) from the current winning combination
    const [a, b, c] = combination;
    console.log(a);//a = to all the first points in the winning combination array
    
    // Check if the current winning combination is present on the board
    if (
      blocks[a].style.backgroundColor &&
      blocks[a].style.backgroundColor === blocks[b].style.backgroundColor &&
      blocks[a].style.backgroundColor === blocks[c].style.backgroundColor
    ) {
      return true; // winning combination 
    }
  }

  return false; // no winning combination
}

// Function to handle the click event on a block
function handleClick(event) {
  // Get the block element that was clicked
  const block = event.target;

  // If the clicked block already has a background color, skip it
  if (block.style.backgroundColor) {
    return;
  }

  // Get the background colors for Player 1 and Player 2 from the CSS custom properties
  const playerOneColor = getComputedStyle(document.documentElement).getPropertyValue('--playerOne').trim();
  const playerTwoColor = getComputedStyle(document.documentElement).getPropertyValue('--playerTwo').trim();

  // Set the background color of the clicked block based on the current player and switch to the other player
  if (currentPlayer === 1) {
    block.style.backgroundColor = playerOneColor;
    currentPlayer = 2;
  } else {
    block.style.backgroundColor = playerTwoColor;
    currentPlayer = 1;
  }

  // Check if there's a win and, if so, show an alert and start a new game
  if (checkWin()) {
    if (currentPlayer === 1) {
        alert('Player 2 wins!');
      } else {
        alert('Player 1 wins!');
      }
      
    newGame();
  }
}

// Add click event listeners to each block
document.querySelectorAll('.block').forEach((block) => {
  block.addEventListener('click', handleClick);
});

// Add a click event listener to the New Game button
document.querySelector('.new-game-button').addEventListener('click', newGame);
