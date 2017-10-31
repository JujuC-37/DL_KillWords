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

// ----------------------------------------------------------------
// -------------------------- Functions ---------------------------
// ----------------------------------------------------------------
function displayRandomWords() {
    setInterval(function() {
        let word = chooseRandomWord();
        $wordZone.innerHTML += `<p>${word}</p>`;
    }, 1000);

    clearInterval(interval);
}

function chooseRandomWord() {
    let i = Math.floor(Math.random() * 100) % words.length;
    return words[i];
}