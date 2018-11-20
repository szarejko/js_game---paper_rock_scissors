const gameSummary = {
  numbers: 0,
  wins: 0,
  losses: 0,
  draws: 0
};

const game = {
  playerHand: '',
  aiHand: ''
};

const icons = [...document.querySelectorAll('.select img')];

function iconSelection() {
  game.playerHand = this.dataset.option;
  icons.forEach(icon => (icon.style.boxShadow = ''));
  this.style.boxShadow = '0 0 0 4px #ffc600';
  this.style.borderRadius = '10px';
}

function aiChoice() {
  return (aiHand = icons[Math.floor(Math.random() * 3)].dataset.option);
}

function checkResult(player, ai) {
  if (player === ai) {
    return 'draw';
  } else if (
    (player === 'papier' && ai === 'kamień') ||
    (player === 'kamień' && ai === 'nożyczki') ||
    (player === 'nożyczki' && ai === 'papier')
  ) {
    return 'win';
  } else {
    return 'loss';
  }
}

function publishResult(player, ai, result) {
  document.querySelector('[data-summary="your-choice"]').textContent = player;

  document.querySelector('[data-summary="ai-choice"]').textContent = ai;

  document.querySelector('p.numbers span').textContent = ++gameSummary.numbers;

  if (result === 'win') {
    document.querySelector('p.wins span').textContent = ++gameSummary.wins;
    document.querySelector('[data-summary="who-win"]').textContent = 'Gracz!';
    document.querySelector('[data-summary="who-win"]').style.color = 'green';
  } else if (result === 'loss') {
    document.querySelector('p.losses span').textContent = ++gameSummary.losses;
    document.querySelector('[data-summary="who-win"]').textContent = 'Komputer';
    document.querySelector('[data-summary="who-win"]').style.color = 'red';
  } else {
    document.querySelector('p.draws span').textContent = ++gameSummary.draws;
    document.querySelector('[data-summary="who-win"]').textContent = 'Remis';
    document.querySelector('[data-summary="who-win"]').style.color = 'blue';
  }
}

function endGame() {
  document.querySelector(`[data-option="${game.playerHand}"]`).style.boxShadow =
    '';
  game.playerHand = '';
}

function startGame() {
  if (!game.playerHand) {
    return alert('Wybierz papier, nożyce lub kamień');
  }
  game.aiHand = aiChoice();
  const gameResult = checkResult(game.playerHand, game.aiHand);
  publishResult(game.playerHand, game.aiHand, gameResult);

  endGame();
}

icons.forEach(icon => icon.addEventListener('click', iconSelection));

document.querySelector('.start').addEventListener('click', startGame);
