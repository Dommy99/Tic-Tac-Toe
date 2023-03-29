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

let currentPlayer = 1;

function newGame() {
    const blocks = document.querySelectorAll('.block');
  blocks.forEach((block) => {
    // Clear the background color of each block
    block.style.backgroundColor = '';
  });

  // Reset the current player
  currentPlayer = 1;
}

function handleClick(event) {
  // Handle the click event here
  const block = event.target;
  
  if (block.style.backgroundColor) {
    // Skip if the block is already colored
    return;
  }
  
  const playerOneColor = getComputedStyle(document.documentElement).getPropertyValue('--playerOne').trim();
  const playerTwoColor = getComputedStyle(document.documentElement).getPropertyValue('--playerTwo').trim();

  if (currentPlayer === 1) {
    block.style.backgroundColor = playerOneColor;
    currentPlayer = 2;
  } else {
    block.style.backgroundColor = playerTwoColor;
    currentPlayer = 1;
  }
//   game logic
}
  
  // Add click event listeners to each block
  document.getElementById('block1').addEventListener('click', handleClick);
  document.getElementById('block2').addEventListener('click', handleClick);
  document.getElementById('block3').addEventListener('click', handleClick);
  document.getElementById('block4').addEventListener('click', handleClick);
  document.getElementById('block5').addEventListener('click', handleClick);
  document.getElementById('block6').addEventListener('click', handleClick);
  document.getElementById('block7').addEventListener('click', handleClick);
  document.getElementById('block8').addEventListener('click', handleClick);
  document.getElementById('block9').addEventListener('click', handleClick);

  // new game button
  document.querySelector('.new-game-button').addEventListener('click', newGame);
  