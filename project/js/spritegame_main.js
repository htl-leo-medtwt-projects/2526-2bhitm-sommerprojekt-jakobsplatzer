/// <reference path="spritegame_detectCollisions.js" />
/// <reference path="spritegame_keyevents.js" />
/// <reference path="spritegame_player.js" />

// Define missing variables
let GAME_CONFIG = {
    characterSpeed: 5,
    gameSpeed: 60,
    playTime: 30
};

let homeButton = document.getElementById('home-button');
let startSection = document.getElementById('start-section');
let videoSection = document.getElementById('video-section');
let conWithChick1 = document.getElementById('con-with-chick1');
let conWithChick2 = document.getElementById('con-with-chick2');
let conWithChick3 = document.getElementById('con-with-chick3');
let conWithChick4 = document.getElementById('con-with-chick4');
let game1 = document.getElementById('game-screen1');
let player = document.getElementById('player');

homeButton.style.display = 'none';
videoSection.style.display = 'none';
conWithChick1.style.display = 'none';
conWithChick2.style.display = 'none';
conWithChick3.style.display = 'none';
conWithChick4.style.display = 'none';
game1.style.display = 'none';
player.style.display = 'none';

function backToHome(){
    startSection.style.display = '';
    homeButton.style.display = 'none';
    videoSection.style.display = 'none';
    conWithChick1.style.display = 'none';
    conWithChick2.style.display = 'none';
    conWithChick3.style.display = 'none';
    conWithChick4.style.display = 'none';
    game1.style.display = 'none';
    spriteImg.style.display = 'none';
}

function startToVid(){
    startSection.style.display = 'none';
    videoSection.style.display = '';
}

function vidToCon(){
    videoSection.style.display = 'none';
    conWithChick1.style.display = '';
    homeButton.style.display = '';

}

function Con1ToCon2(){
    conWithChick1.style.display = 'none';
    conWithChick2.style.display = '';
}
function Con2ToCon3(){
    conWithChick2.style.display = 'none';
    conWithChick3.style.display = '';
}
function Con3ToCon4(){
    conWithChick3.style.display = 'none';
    conWithChick4.style.display = '';
}
function Con4ToGame1(){
    conWithChick4.style.display = 'none';
    game1.style.display = '';
    player.style.display = '';
    startGame();
}

function reset(){
    gotToStart();
    location.reload();
}


/***********************************
 * GAME SCREEN
 ***********************************/
let GAME_SCREEN = {
    surface: document.getElementById('surface'),
    surfaceScale: '80%',
    clockBox: document.getElementById('clockBox'),
    startButton: document.getElementById('startButton'),
    debug_output: document.getElementById('debug_output')
}

// Pixel-Bewegungsbereich
const moveArea = { left: 0, top: 0, width: 700, height: 300 };

// Flag, ob Name falsch ist
let foxIsWrong = false;

// Hilfsfunktion: Button an zufällige Position setzen
function teleportButton() {
    const rect = nextButton.getBoundingClientRect();

    let newX = Math.random() * (moveArea.width - rect.width) + moveArea.left;
    let newY = Math.random() * (moveArea.height - rect.height) + moveArea.top;

    nextButton.style.left = `${newX}px`;
    nextButton.style.top = `${newY}px`;
}

// Mausbewegung
document.addEventListener("mousemove", (e) => {
    if (!foxIsWrong) return;

    const rect = nextButton.getBoundingClientRect();
    const dx = rect.left + rect.width / 2 - e.clientX;
    const dy = rect.top + rect.height / 2 - e.clientY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 400) { // reagiert extrem früh
        teleportButton();
    }
});




// Check Name Funktion
function checkInputName() {
    const name1 = document.getElementById('name-input-fox').value.trim().toLowerCase();

    if (name1 !== 'fox') {
        foxIsWrong = true;
        alert('USE UR BRAIN (YOU LITTLE [FOX])');
    } else {
        foxIsWrong = false;
        nextButton.style.pointerEvents = '';
        nextButton.style.userSelect = '';
    }
}


//LeaderBoard

function addPlayerToScoreboard(name, chicks = 0) {
  const newPlayer = { name, chicks };

  scoreboardData.push(newPlayer);

  scoreboardData.sort((a, b) => b.chicks - a.chicks);

  if (scoreboardData.length > 4) {
    scoreboardData.pop();
  }

  saveScoreboard();
  renderScoreboard();
}
 
function saveScoreboard() {
  localStorage.setItem("scoreboardData", JSON.stringify(scoreboardData));
}

function renderScoreboard() {
  if (!leaderboard) return;

  scoreboardData.sort((a, b) => b.chicks - a.chicks);

    leaderboard.innerHTML += "";

  scoreboardData.forEach((player) => {
    const row = document.createElement("div");
    row.className = "scoreboard-row";
    row.innerHTML = `
      <span class="scoreboard-name">${player.name}</span>
      <span class="scoreboard-chicks">Score: ${player.chicks}</span>
    `;
    leaderboard.appendChild(row);
  });
}

function startGame() {
    PLAYER.box.style.left = '350px'; // starting position
    PLAYER.box.style.top = '180px'; // starting position
    PLAYER.box.style.opacity = '1'; // show player
    PLAYER.spriteImg.style.right = '0px'; // starting animation


    isGameRunning = true;
    gameLoop();
}



function endGame() {
    isGameRunning = false;
    walkAudio.pause();

    player.style.pointerEvents = 'none';
    player.style.userSelect = 'none';


    startCountdown.innerHTML = `
        <div id="endBox">
            <h2>Your Time is Over</h2>
            <p>Your Score is: ${PLAYER.coinCount}</p>
            <p>What's your real Name?</p>
            <input type="text" id="realName" placeholder="Your Name">
            <img id="save-result" src="img/save-button.png" onclick="saveResult()" alt="saveButton">
        </div>			
    `;

    let realNameInput = document.getElementById("realName");

    realNameInput.addEventListener("input", () => {
        keyboardAudio.play();
    });

    startCountdown.style.display = '';
    startCountdownContainer.style.display = '';
}

function saveResult(){

    const name = document.getElementById("realName").value;

    nextButton.style.display = 'none';
    trees.style.display = 'none';
    player.style.display = 'none';
    nameInput2.style.display = 'none';
    surface.style.display = 'none';
    dashboard.style.display = 'none';
    startSection.style.display = 'none';

    leaderboard.style.display = '';

    addPlayerToScoreboard(name, PLAYER.coinCount);
}


/***********************************
 * DRAW HUD (debugger box)
 * **********************************/
function updateHUD() {
    // print values in debugger box
    GAME_SCREEN.debug_output.innerHTML = `x: ${PLAYER.box.style.left} | y: ${PLAYER.box.style.top} | animation: ${PLAYER.spriteImgNumber} | count: ${PLAYER.coinCount}`;
}

