const $playerZone = document.querySelector('.player-zone');
const $wordZone = document.querySelector('.word-zone');
let startedGame = false;

document.addEventListener('keypress', function (event) {
    if(!startedGame) {
        startedGame = true;
        $playerZone.innerHTML = event.key;
    }
    else {
        $playerZone.innerHTML += event.key;
    }
});