'use strict';
// Game variables
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const diceElement = document.querySelector('.dice');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let activePlayer, currentScore, playerScores, playing;
// Set initial state
const init = function () {
	playing = true;
	activePlayer = 0;
	currentScore = 0;
	playerScores = [0, 0];
	score0Element.textContent = 0;
	score1Element.textContent = 0;
	currentScore0.textContent = 0;
	currentScore1.textContent = 0;
	player0.classList.remove('player--winner');
	player1.classList.remove('player--winner');
	player1.classList.remove('player--active');
	player0.classList.add('player--active');
	diceElement.classList.add('hidden');
};
init();
// Switch player

const switchPlayer = function () {
	currentScore = 0;
	document.getElementById(`current--${activePlayer}`).textContent =
		currentScore;
	activePlayer = activePlayer === 0 ? 1 : 0;
	player0.classList.toggle('player--active');
	player1.classList.toggle('player--active');
};

// User rolls dice
btnRoll.addEventListener('click', () => {
	if (playing) {
		console.log(playerScores);
		diceElement.classList.remove('hidden');
		let dice = Math.trunc(Math.random() * 6) + 1;
		diceElement.src = `dice-${dice}.png`;
		if (dice !== 1) {
			currentScore += dice;
			document.getElementById(`current--${activePlayer}`).textContent =
				currentScore;
		} else switchPlayer();
	}
});

//User holds score

btnHold.addEventListener('click', () => {
	if (playing) {
		playerScores[activePlayer] += currentScore;
		document.getElementById(`score--${activePlayer}`).textContent =
			playerScores[activePlayer];
		if (playerScores[activePlayer] >= 100) {
			document
				.querySelector(`.player--${activePlayer}`)
				.classList.add('player--winner');
			diceElement.classList.add('hidden');
			playing = false;
		} else switchPlayer();
	}
});

// Reset game
btnNew.addEventListener('click', init);
