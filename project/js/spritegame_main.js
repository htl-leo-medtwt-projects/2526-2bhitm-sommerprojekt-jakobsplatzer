/// <reference path="spritegame_detectCollisions.js" />
/// <reference path="spritegame_keyevents.js" />
/// <reference path="spritegame_player.js" />

// Define missing variables
let GAME_CONFIG = {
    characterSpeed: 5,
    gameSpeed: 60
};

let homeButton = document.getElementById('home-button');
let startSection = document.getElementById('start-section');
let videoSection = document.getElementById('video-section');
let conWithChick1 = document.getElementById('con-with-chick1');
let conWithChick2 = document.getElementById('con-with-chick2');
let conWithChick3 = document.getElementById('con-with-chick3');
let conWithChick4 = document.getElementById('con-with-chick4');
let game1 = document.getElementById('game-screen1');
let game2 = document.getElementById('game-screen2');
let transition1 = document.getElementById('transition-box1');
let lockScreen1 = document.getElementById('lock-screen1');
let video = document.getElementById('intro-video');
let player = document.getElementById('player');
let cageBox1 = document.getElementById('cage-box1');
let cageBox2 = document.getElementById('cage-box2');
let cageBox3 = document.getElementById('cage-box3');
let cageBox4 = document.getElementById('cage-box4');


homeButton.style.display = 'none';
videoSection.style.display = 'none';
conWithChick1.style.display = 'none';
conWithChick2.style.display = 'none';
conWithChick3.style.display = 'none';
conWithChick4.style.display = 'none';
game1.style.display = 'none';
game2.style.display = 'none';
player.style.display = 'none';

function backToHome() {
    if (!confirm('Wirklich zum Start zurück?')) return;
    startSection.style.display = '';
    homeButton.style.display = 'none';
    videoSection.style.display = 'none';
    conWithChick1.style.display = 'none';
    conWithChick2.style.display = 'none';
    conWithChick3.style.display = 'none';
    conWithChick4.style.display = 'none';
    game1.style.display = 'none';
    spriteImg.style.display = 'none';
    reset();
}

function startToVid() {
    startSection.style.display = 'none';
    videoSection.style.display = '';
    video.play();
//    video.play().then(() => {
//        setTimeout(() => {
//            vidToCon();
//        }, 27000);
//   });
}

function vidToCon() {
    videoSection.style.display = 'none';
    conWithChick1.style.display = '';
    homeButton.style.display = '';
}

function Con1ToCon2() {
    conWithChick1.style.display = 'none';
    conWithChick2.style.display = '';
}
function Con2ToCon3() {
    conWithChick2.style.display = 'none';
    conWithChick3.style.display = '';
}
function Con3ToCon4() {
    conWithChick3.style.display = 'none';
    conWithChick4.style.display = '';
}
function Con4ToGame1() {
    conWithChick4.style.display = 'none';
    lockScreen1.style.display = 'none';
    game1.style.display = '';
    player.style.display = '';
    startGame();
}

function Game1ToLock1(){
    isGameRunning = false;
    lockScreen1.style.display = '';
    game1.style.display = '';
    player.style.display = 'none';
}

window.addEventListener('beforeunload', (e) => {
    if (isGameRunning) {
        e.preventDefault();
        e.returnValue = '';
    }
});

function reset() {
    isGameRunning = false;
    location.reload();
}

function startGame() {
    PLAYER.box.style.left = '200px'; // starting position
    PLAYER.box.style.top = '180px'; // starting position
    PLAYER.box.style.opacity = '1'; // show player
    PLAYER.spriteImg.style.right = '0px'; // starting animation


    isGameRunning = true;
    gameLoop();
}




