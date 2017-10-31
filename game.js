const $playerZone = document.querySelector('.player-zone');
const $wordZone = document.querySelector('.word-zone');
let startedGame = false;
let currentInput = '';

// ----------------------------------------------------------------
// ------------------------ Game constants ------------------------
// ----------------------------------------------------------------
const malusScoreWordRemoved = -5;

// ----------------------------------------------------------------
// ----------------------------- Game -----------------------------
// ----------------------------------------------------------------

document.addEventListener('keypress', function (event) {
    let intermediateValue = currentInput + event.key;
    let foundOneValidElement = hasValidElement($wordZone.children, intermediateValue);

    if(!startedGame) {
        startedGame = true;
        $playerZone.innerHTML = '';
    }
    
    if(!foundOneValidElement) return;
    currentInput = intermediateValue;
    $playerZone.innerText = currentInput;
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

function hasValidElement(elementList, value) {
    let loweredValue = value.toLowerCase();

    for(let $elm of elementList) {
        let actualText = $elm.innerText.toLowerCase();
        if(actualText.startsWith(loweredValue)) return true;
    }
    return false;
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