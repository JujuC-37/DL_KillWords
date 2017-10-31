const $playerZone = document.querySelector('.player-zone');
const $wordZone = document.querySelector('.word-zone');
let startedGame = false;

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
        console.log(interval);
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