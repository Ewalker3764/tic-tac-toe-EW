const players = ['X', 'O'];
const board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = '';
let boardElem = '';


const createTitle = (title) => {
  const titleHeader = document.createElement('h1');
  titleHeader.innerText = title;
  document.body.appendChild(titleHeader);

  

  const startButton = document.createElement('button');
  startButton.textContent = 'Start';
  document.body.appendChild(startButton);

  startButton.addEventListener('click', () => {
    const player1 = prompt('Enter player X name:');
    const player2 = prompt('Enter player O name:');
    startGame(player1, player2);
  });
};

const startGame = (player1, player2) => {
  const player1Label = document.createElement('label');
  player1Label.innerText = `${player1} X: `;
  document.body.appendChild(player1Label);

  const player2Label = document.createElement('label');
  player2Label.innerText = `${player2} O: `;
  document.body.appendChild(player2Label);


  for (let tile = 0; tile < 9; tile++) {
    boardElem.appendChild();
  }
  currentPlayer = players[0];
  board.fill('');
  document.body.appendChild(boardElem);
};


const makeBoardElem = () => {
  const boardElem = document.createElement('div');
  boardElem.classList.add('board');
  return boardElem;
};

const makeTile = (tileNum) => {
  const tileElem = document.createElement('div');
  tileElem.classList.add('tile');

   
    tileElem.addEventListener('click', (event) => {
      const target = event.target;
      target.innerText = currentPlayer;
      board[tileNum] = currentPlayer;

      gameStatus();
      playerChange();
    }, { once: true });
  

  return tileElem;
};

const playerChange = () => {
  if (currentPlayer === players[1]) {
    currentPlayer = players[0];
  } else {
    currentPlayer = players[1];
  }
};

const gameStatus = () => {
  const winCombo = [ 
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  
  for (let gameWin of winCombo) {
    const [pos1, pos2, pos3] = gameWin;

    if (board[pos1] !== '' && 
        board[pos1] === board[pos2] && 
        board[pos1] === board[pos3]) {
          gameComplete(`${board[pos1]} Wins!`);
          return;
    } 
  }
  
  const allTiles = board.every(tileElem => tileElem !== '');
  
  if (allTiles) {
    gameComplete(`Tie!`);
    return;
  }
};

const gameComplete = message => {
  const endScreen = document.createElement('div3');
  endScreen.classList.add('endGame');
  
  const endMessage = document.createElement('h2');
  endMessage.innerText = message;
  document.body.appendChild(endMessage);
  endScreen.appendChild(endMessage);

  const restartButton = document.createElement('button');
  restartButton.textContent = 'Restart';
  
  restartButton.addEventListener('click', () => {
    resetGame();
    document.body.removeChild(endScreen);
  });
  
  endScreen.appendChild(restartButton);
  document.body.appendChild(endScreen);
};

const resetGame = () => {
  if (boardElem) {
    document.body.removeChild(boardElem);
  }
  boardElem = makeBoardElem();

  for (let tile = 0; tile < 9; tile++) {
    boardElem.appendChild(makeTile(tile));
  }
  currentPlayer = players[0];
  board.fill('');
  document.body.appendChild(boardElem);
};

createTitle('Tic-Tac-Toe!');
resetGame();
