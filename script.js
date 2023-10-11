'use strict';
//selecting elements
//by using queryselector,we select multiple items
//by using get element by id/class is for specific
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');

score0El.textContent = score1El.textContent = 0;
diceEl.classList.add('hidden');

let scores, curScore, activePlayer, playing;

function init() {
  scores = [0, 0];
  curScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
}
init();
let dice = Math.floor(Math.random() * 6) + 1;

function switchPlayer() {
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');

  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  curScore = 0;
  curScore += dice;
  document.getElementById(`current--${activePlayer}`).textContent = curScore;
}

btnRoll.addEventListener('click', function () {
  if (playing) {
    //Create a random dice element
    dice = Math.floor(Math.random() * 6) + 1;
    console.log(dice);

    //Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //Check whether the dice is 1 and if true switch the player
    if (dice !== 1) {
      //Displa curent score
      curScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        curScore;
    } else {
      switchPlayer();
    }
  }
});
console.log(curScore);

btnHold.addEventListener('click', function () {
  if (playing) {
    //Add current score to the active player score
    scores[activePlayer] += curScore;

    //Setting the score of the current element
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //Check if player's score is >=100
    if (scores[activePlayer] >= 100) {
      //Finish game
      diceEl.classList.add('hidden');
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
    //Switch to the next player
    else switchPlayer();
  }
});

btnNew.addEventListener('click', init);
