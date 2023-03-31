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
//add google fonts

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

// textcontent for the modal
const playerOneWinModal = document.querySelector(
  ".modal-content .player-one-wins"
);
const playerTwoWinModal = document.querySelector(
  ".modal-content .player-two-wins"
);
const tieModal = document.querySelector(".modal-content .tie");

//player color box
const playerOneIndicator = document.querySelector(".player-one");
const playerTwoIndicator = document.querySelector(".player-two");

// Retrieve data from localStorage
const storedPlayerOneWins = parseInt(localStorage.getItem("player1Wins")) || 0;// if the local storage is null set to zero
const storedPlayerTwoWins = parseInt(localStorage.getItem("player2Wins")) || 0;
const storedTies = parseInt(localStorage.getItem("tie")) || 0;

// Update the text content of the elements
document.querySelector(".player-one-wins").textContent = `Player 1 Win(s):${storedPlayerOneWins}`;
document.querySelector(".player-two-wins").textContent = `Player 2 Win(s):${storedPlayerTwoWins}`;
document.querySelector(".tie").textContent = `Tie:${storedTies}`;


// Declare the current player variable, with 1 representing Player 1
let currentPlayer = 1;
let playerOneWin = 0;
let playerTwoWin = 0;
let tie = 0;

// adds Player1/2 or tie to the modal
const statusModal = document.createElement("p");
statusModal.classList.add("status");
const modalContent = document.querySelector(".modal-content");
modalContent.appendChild(statusModal);


// Function to start a new game
function newGame() {
  // Select all block elements and store them in a constant
  const blocks = document.querySelectorAll(".block");
  //resets the player color box
  playerTwoIndicator.classList.add("player-two");
  playerOneIndicator.classList.add("player-one");
  //resets modal
  statusModal.textContent = ''
  // Iterate over each block element
  blocks.forEach((block) => {
    // Clear the background color of each block
    block.style.backgroundColor = "";
  });

  // Reset the current player to Player 1
  currentPlayer = 1;
}

// Function to check for a win
function checkWin() {
  // Select all block elements and store them in a constant
  const blocks = document.querySelectorAll(".block");

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
    // Extract the three indices (a, b, and c) from the current winning combination
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

  blocks.forEach((block) => {
    if (block.style.backgroundColor) {
      clickedBlocks++;
    }
  });

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

  // Get the background colors for Player 1 and Player 2 from the CSS custom properties
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
  

  // Check if there's a win and, if so, show an alert and start a new game
  if (checkWin()) {
    if (currentPlayer === 1) {
      playerTwoIndicator.classList.add("player-two");
      playerOneIndicator.classList.remove("player-one");
      currentPlayer = 2;
      playerTwoWin++;
      modal.style.display = "block";
    //   const player2 = parseInt(localStorage.getItem('player2Wins')) ;
      playerTwoWinModal.textContent = `Player 2 Win(s):${playerTwoWin}`;
      statusModal.textContent = 'Player 2 Wins!'; 

    //   localStorage.setItem('currentplayer',currentPlayer);
    //   localStorage.setItem('player2Wins',playerTwoWin);
      
    //   console.log(typeof(playerTwoWin + player2));
      
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

// Add click event listeners to each block
document.querySelectorAll(".block").forEach((block) => {
  block.addEventListener("click", handleClick);
});

// https://www.w3schools.com/howto/howto_css_modals.asp
document.querySelector(".new-game-button").addEventListener("click", newGame);

let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// add a delay
//  If i cant find 3 in a row for each player the its a tie
