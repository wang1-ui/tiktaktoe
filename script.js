const board = document.getElementById('board');
const statusText = document.getElementById('status');

const bgMusic = new Audio('background.mp3');
const winSound = new Audio('win.mp3');
const drawSound = new Audio('draw.mp3');
const clickSound = new Audio('click.mp3');

bgMusic.loop = true;
bgMusic.volume = 0.3;

let cells = [];
let currentPlayer = 'maya';
let gameOver = false;



function createBoard() {
  board.innerHTML = '';
  cells = [];
  gameOver = false;
  statusText.textContent = `${currentPlayer}'s turn`;
  if (bgMusic.paused) {
    bgMusic.play().catch(err => {console.log('Background music blocked until user interacts.');
    });
  }

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click', () => handleClick(i));
    board.appendChild(cell);
    cells.push(cell);
  }
}

function handleClick(index) {
  if (cells[index].hasChildNodes() || gameOver) return;
  clickSound.play();

  const img = document.createElement('img');
  img.src = currentPlayer === 'maya' ? 'x.png' : 'o.png';
  img.alt = currentPlayer;

  cells[index].appendChild(img);
  cells[index].classList.add('taken');

  if (checkWin()) {
    statusText.textContent = `${currentPlayer} wins!`;
    winSound.play();
    gameOver = true;
    return;
  }

  if (cells.every(cell => cell.hasChildNodes())) {
    statusText.textContent = "It's a draw!";
    drawSound.play();
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === 'maya' ? 'baba' : 'maya';
  statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWin() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    const imgA = cells[a].querySelector('img');
    const imgB = cells[b].querySelector('img');
    const imgC = cells[c].querySelector('img');

    return (
      imgA && imgB && imgC &&
      imgA.alt === currentPlayer &&
      imgB.alt === currentPlayer &&
      imgC.alt === currentPlayer
    );
  });
}
document.getElementById('playBtn').addEventListener('click', (e) => {
  e.preventDefault(); 
  resetGame();
});

function resetGame() {
  currentPlayer = 'maya';
  createBoard();
}

createBoard();
