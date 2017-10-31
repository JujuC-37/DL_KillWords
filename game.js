const $playerZone = document.querySelector('.player-zone');
const $wordZone = document.querySelector('.word-zone');
let startedGame = false;

// ----------------------------------------------------------------
// ------------------------ Game constants ------------------------
// ----------------------------------------------------------------
const malusScoreWordRemoved = -5;

// ----------------------------------------------------------------
// ----------------------------- Game -----------------------------
// ----------------------------------------------------------------

document.addEventListener('keypress', function (event) {
    if(!startedGame) {
        startedGame = true;
        $playerZone.innerHTML = event.key;
    }
    else {
        $playerZone.innerHTML += event.key;
    }
});

displayRandomWords();
removeRandomlyWords();

// ----------------------------------------------------------------
// -------------------------- Functions ---------------------------
// ----------------------------------------------------------------
function displayRandomWords() {
    setInterval(function() {
        let word = chooseRandomWord();
        $wordZone.innerHTML += `<p>${word}</p>`;
    }, 1000);

    clearInterval();
}

function removeRandomlyWords() {
    let interval = Math.floor(Math.random() * 4000);
    if($wordZone.firstChild) {
        removeWord();
        modifyScore(malusScoreWordRemoved);
    }
    setTimeout(removeRandomlyWords, interval);
}

// ----------------------------------------------------------------

function chooseRandomWord() {
    let i = Math.floor(Math.random() * 100) % words.length;
    return words[i];
}

function removeWord() {
    $removedWord = $wordZone.firstChild.remove();
}

function modifyScore(variation) {
    let $score = document.querySelector('.score-zone .score');
    let score = parseInt($score.innerHTML);
    score += variation;
    $score.innerHTML = score;
}