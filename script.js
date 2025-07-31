
  const cells = document.querySelectorAll('[data-cell]');
  const message = document.getElementById('message');
  let xTurn = true;
  let gameEnded = false;

  const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
  });

  function handleClick(e) {
    if (gameEnded) return; // no clicks after game ends

    const cell = e.target;
    const currentClass = xTurn ? 'X' : 'O';

    cell.textContent = currentClass;

    if (checkWin(currentClass)) {
      message.textContent = `${currentClass} wins! 🎉`;
      gameEnded = true;
      return;
    }

    xTurn = !xTurn;
  }

  function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
      return combination.every(index => {
        return cells[index].textContent === currentClass;
      });
    });
  }

