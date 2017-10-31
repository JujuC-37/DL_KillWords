const $playerZone = document.querySelector('.player-zone');
const $wordZone = document.querySelector('.word-zone');
let startedGame = false;
let currentInput = '';

// ----------------------------------------------------------------
// ------------------------ Game constants ------------------------
// ----------------------------------------------------------------
const malusScoreWordRemoved = -8;
const malusScoreInvalidCharacter = -5;
const bonusFoundWord = 20;

// ----------------------------------------------------------------
// ----------------------------- Game -----------------------------
// ----------------------------------------------------------------
document.addEventListener('keydown', e => {
    if(e.keyCode === 8) {
        deleteLastCharacter();
        console.log('e.keyCode', e.keyCode);
    }
});

document.addEventListener('keypress', e => {
    if(e.key === 'Enter') return;

    let intermediateValue = currentInput + e.key;
    let foundOneValidElement = hasValidElement($wordZone.children, intermediateValue);
    let foundWord = isValidWord($wordZone.children, intermediateValue);

    if(!startedGame) {
        startedGame = true;
        $playerZone.innerHTML = '';
    }

    if(!foundOneValidElement) {
        modifyScore(malusScoreInvalidCharacter);
        return;
    }

    if(foundWord) {    
        removeFoundWord($wordZone.children, intermediateValue);
        modifyScore(bonusFoundWord);
        intermediateValue = '';
    }
    
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
    let interval = Math.floor(3000 + Math.random() * 4000);
    if($wordZone.firstChild) {
        removeWordOnTime();
        modifyScore(malusScoreWordRemoved);
    }
    setTimeout(removeRandomlyWords, interval);
}

function chooseRandomWord() {
    let i = Math.floor(Math.random() * 100) % words.length;
    return words[i];
}

function removeWordOnTime() {
    $removedWord = $wordZone.firstChild.remove();
}

function removeFoundWord(elementsList, word) {
    for(let $elm of elementsList) {
        if($elm.innerText.toLowerCase() === word.toLowerCase()) {
            $elm.remove();
            return;
        }
    }
}

function modifyScore(variation) {
    let $score = document.querySelector('.score-zone .score');
    let score = parseInt($score.innerHTML);
    score += variation;
    $score.innerHTML = score;
}

function hasValidElement(elementsList, value) {
    let loweredValue = value.toLowerCase();

    for(let $elm of elementsList) {
        let actualText = $elm.innerText.toLowerCase();
        if(actualText.startsWith(loweredValue)) return true;
    }
    return false;
}

function isValidWord(elementsList, word) {
    let loweredWord = word.toLowerCase();

    for(let $elm of elementsList) {
        let actualText = $elm.innerText.toLowerCase();
        if(actualText === loweredWord) return true;
    }
    return false;
}

function deleteLastCharacter() {
    if(currentInput.length > 0){
        currentInput = currentInput.slice(0, -1);
        $playerZone.innerHTML = currentInput;
    }
}