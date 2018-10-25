// Part 1: Initialization of the game
var scores, roundScore, activePlayer, playerChanged, dice, prevDice, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
 
  if (gamePlaying) {

    // 1. roll the dice 
    prevDice = dice;

    dice = Math.floor(Math.random() * 6 + 1);

    if (!playerChanged && dice === prevDice) {
      scores[activePlayer] = 0;
      
      document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
      
      changPlayer();
      
    } else {
      // 2. display the score
      var diceDOM = document.querySelector('.dice');
      diceDOM.style.display = 'block';
      diceDOM.src = '../assets/dice-'+dice+'.png';

      // 3. add score if dice is not 1
      if (dice !== 1) {
        // show the round score
        roundScore += dice;
        document.getElementById('current-'+activePlayer).textContent = roundScore;
        
        // set the player changed to be false
        playerChanged = false;

      } else {
        changPlayer();
      }
    }


  }

});

document.querySelector('.btn-hold').addEventListener('click', function() {

  if (gamePlaying) {
    // 1. add current score to global score
    scores[activePlayer] += roundScore;

    // 2. update the UI
    document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];


    // 3. check if anyone wins the game
    if (scores[activePlayer] >= 20) {
      document.querySelector('#player-'+activePlayer).textContent = "Winner!";

      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player-' + activePlayer +'-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer +'-panel').classList.remove('active');

      gamePlaying = false;

    } else {
      changPlayer();
    }
  }


});

var changPlayer = function() {

  roundScore = 0;
  activePlayer = activePlayer === 0? 1: 0;

  document.getElementById('current-0').textContent = roundScore;
  document.getElementById('current-1').textContent = roundScore;

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice').style.display = 'none';
  
  playerChanged = true;
}

document.querySelector('.btn-new-game').addEventListener('click', init);

function init(){
  scores = [0,0];
  roundScore = 0;
  dice = 0;
  prevDice = 0;
  activePlayer = 0;
  playerChanged = false;
  gamePlaying = true;

  // textContent set the content, innerHTML can use html element
  //document.querySelector('#current-' + activePlayer).textContent = dice;
  //document.querySelector('#current-'+activePlayer).innerHTML = '<em>' + dice + '</em>';
  //
  //var x = document.querySelector('#score-0').textContent;
  //console.log(x);

  document.querySelector('.dice').style.display= 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  // do not need two active class
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  document.getElementById('player-0').textContent = 'Player 1';
  document.getElementById('player-1').textContent = 'Player 2';

}