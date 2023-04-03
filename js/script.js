// Selectors
//modal start
const playerOneWinModal = document.querySelector(".modal-content .player-one-wins");
const playerTwoWinModal = document.querySelector(".modal-content .player-two-wins");
const tieModal = document.querySelector(".modal-content .tie");
const playerOneIndicator = document.querySelector(".player-one");
const playerTwoIndicator = document.querySelector(".player-two");
const statusModal = document.createElement("p");
const modalContent = document.querySelector(".modal-content");
const modal = document.getElementById("myModal");
const openModalBtn = document.getElementById("myBtn");
const closeModalBtn = document.getElementsByClassName("close")[0];
// modal end
// select all blocks on the board
const blocks = document.querySelectorAll(".block");
const newGameButton = document.querySelector(".new-game-button");


// Local storage data
const storedPlayerOneWins = parseInt(localStorage.getItem("player1Wins")) || 0;
const storedPlayerTwoWins = parseInt(localStorage.getItem("player2Wins")) || 0;
const storedTies = parseInt(localStorage.getItem("tie")) || 0;

// Initialize variables
let currentPlayer = 1;
let playerOneWin = 0;
let playerTwoWin = 0;
let tie = 0;

// Modal configuration
statusModal.classList.add("status");
modalContent.appendChild(statusModal);

// Initial state setup
updateWinCounts();

// Function declarations
function updateWinCounts() {
  playerOneWinModal.textContent = `Player 1 Win(s):${storedPlayerOneWins}`;
  playerTwoWinModal.textContent = `Player 2 Win(s):${storedPlayerTwoWins}`;
  tieModal.textContent = `Tie:${storedTies}`;
}

// resets all the game funtions to the starting state
function newGame() {
  resetPlayerColorBox();
  resetModal();
  clearBlockColors();
  currentPlayer = 1;
}

function resetPlayerColorBox() {
  playerTwoIndicator.classList.add("player-two");
  playerOneIndicator.classList.add("player-one");
}

function resetModal() {
  statusModal.textContent = '';
}

function clearBlockColors() {
  blocks.forEach((block) => {
    block.style.backgroundColor = "";
  });
}

// Function to check for a win
function checkWin() {
  // Define the possible winning combinations for a 3x3 tic-tac-toe board
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let clickedBlocks = 0;

  // Iterate over each winning combination
  for (const combination of winningCombinations) {
    // Extract (a, b, and c) from the current winning combination
    const [a, b, c] = combination;

    // Check if the current winning combination is present on the board
    if (
      blocks[a].style.backgroundColor &&
      blocks[a].style.backgroundColor === blocks[b].style.backgroundColor &&
      blocks[a].style.backgroundColor === blocks[c].style.backgroundColor
    ) {
      return true; // winning combination
    }
  }
//If the block has a background color, it means that a player has already marked it
  blocks.forEach((block) => {
    if (block.style.backgroundColor) {
      //increment by one
      clickedBlocks++;
    }
  });
// If a wining combo is not found,and all the blocks are clicked = tie
  if (clickedBlocks === blocks.length) {
    tie++;
    modal.style.display = "block";
    tieModal.textContent = `Tie:${tie}`;
    statusModal.textContent = "It's a Tie!";
    localStorage.setItem('tie',tie);
    setTimeout(function () {
      newGame();
    }, 2000);
  }
  

  return false; // no winning combination or tie
}

// Function to handle the click event on a block
function handleClick(event) {
  // Get the block element that was clicked
  const block = event.target;

  // If the clicked block already has a background color, skip it
  if (block.style.backgroundColor) {
    return;
  }

  // Get the background colors for Player 1 and Player 2 from CSS
  const playerOneColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--playerOne")
    .trim();
  const playerTwoColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--playerTwo")
    .trim();

  // Set the background color of the clicked block based on the current player and switch to the other player
  if (currentPlayer === 1) {
    block.style.backgroundColor = playerOneColor;
    currentPlayer = 2;
    playerOneIndicator.classList.remove("player-one");
    playerTwoIndicator.classList.add("player-two");
  } else {
    block.style.backgroundColor = playerTwoColor;
    currentPlayer = 1;
    playerTwoIndicator.classList.remove("player-two");
    playerOneIndicator.classList.add("player-one");
  }
  

  // Check if there's a win and, if so, show a modal and start a new game
  if (checkWin()) {
    if (currentPlayer === 1) {
      playerTwoIndicator.classList.add("player-two");
      playerOneIndicator.classList.remove("player-one");
      currentPlayer = 2;
      playerTwoWin++;
      // displays the modal after a win
      modal.style.display = "block";

      playerTwoWinModal.textContent = `Player 2 Win(s):${playerTwoWin}`;
      statusModal.textContent = 'Player 2 Wins!'; 
      
    } else {
      playerTwoIndicator.classList.remove("player-two");
      playerOneIndicator.classList.add("player-one");
      currentPlayer = 1;
      playerOneWin++;
      modal.style.display = "block";
      playerOneWinModal.textContent = `Player 1 Win(s):${playerOneWin}`;
      statusModal.textContent = 'Player 1 Wins!';

      localStorage.setItem('currentplayer',currentPlayer);
      localStorage.setItem('player1Wins',playerOneWin);
    }
  
    setTimeout(function () {
      newGame();
    }, 2000);
  }
  
}

// Event listeners
blocks.forEach((block) => {
  block.addEventListener("click", handleClick);
});

newGameButton.addEventListener("click", newGame);

// https://www.w3schools.com/howto/howto_css_modals.asp
openModalBtn.onclick = function () {
  modal.style.display = "block";
};

closeModalBtn.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};