/***********************************
 * SCRIPT REFERENCES
 ***********************************/
/// <reference path="spritegame_detectCollisions.js" />
/// <reference path="spritegame_keyevents.js" />

let maxTop = 920;
let maxLeft = 1370;
let lastDirection = 'down';
let counter = document.getElementById('counter');



let PLAYER = {
    box: document.getElementById('player'),
    spriteImg: document.getElementById('spriteImg'),
    spriteImgNumber: 0,
    spriteDirection: 'down',
    coinCount: 0
}

/***********************************
 * MOVE
 * **********************************/
/**
 * @param {number} dx - player x move offset in pixel
 * @param {number} dy - player y move offset in pixel
 * @param {number} dr - player heading direction (-1: look left || 1: look right)
 */
function isCollidingWithCage() {
    return (
        isColliding(PLAYER.box, cageBox1, 0) ||
        isColliding(PLAYER.box, cageBox2, 0) ||
        isColliding(PLAYER.box, cageBox3, 0) ||
        isColliding(PLAYER.box, cageBox4, 0) ||
        isColliding(PLAYER.box, cageBox5, 0) ||
        isColliding(PLAYER.box, cageBox6, 0)
    );
}

function isCollidingWithCage2() {
    return (
        isColliding(PLAYER.box, cage2Box1, 0) ||
        isColliding(PLAYER.box, cage2Box2, 0) ||
        isColliding(PLAYER.box, cage2Box3, 0) ||
        isColliding(PLAYER.box, cage2Box4, 0) ||
        isColliding(PLAYER.box, cage2Box5, 0) ||
        isColliding(PLAYER.box, cage2Box6, 0) ||
        isColliding(PLAYER.box, cage2Box7, 0) ||
        isColliding(PLAYER.box, cage2Box8, 0) ||
        isColliding(PLAYER.box, cage2Box9, 0) ||
        isColliding(PLAYER.box, cage2Box10, 0) ||
        isColliding(PLAYER.box, cage2Box11, 0) ||
        isColliding(PLAYER.box, cage2Box12, 0)
    );
}

function isCollidingWithAnyCage() {
    // Je nach aktivem Screen die passenden Hindernisse prüfen
    if (game2.style.display !== 'none') {
        return isCollidingWithCage2();
    }
    return isCollidingWithCage();
}

function checkCheckpoints(){
    if(cp1 == true &&
        cp2 == true &&
        cp3 == true
    ){
        return true;
    }
}

function movePlayer(dx, dy, direction) {

    let oldLeft = PLAYER.box.style.left;
    let oldTop = PLAYER.box.style.top;
    let nextX = parseFloat(oldLeft) + dx;
    let nextY = parseFloat(oldTop) + dy;

    // Randbegrenzung
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    const playerSize = 64;
    const marginX = 80;  // Abstand von links/rechts
    const marginY = 0;   // Abstand von oben/unten

    // X-Achse prüfen
    PLAYER.box.style.left = nextX + 'px';
    if (isCollidingWithAnyCage() || nextX < marginX || nextX + playerSize > screenW - marginX) {
        PLAYER.box.style.left = oldLeft;
    }

    // Y-Achse prüfen
    PLAYER.box.style.top = nextY + 'px';
    if (isCollidingWithAnyCage() || nextY < marginY || nextY + playerSize > screenH - marginY) {
        PLAYER.box.style.top = oldTop;
    }

    // Richtung merken
    if (direction) {
        PLAYER.spriteDirection = direction;
    }

    // Spiegeln nur für links/rechts
    if (direction === 'left') {
        PLAYER.box.style.transform = 'scaleX(-1)';
    } else if (direction === 'right') {
        PLAYER.box.style.transform = 'scaleX(1)';
    }
    //Game-Screen1
    //checkpoints
    if(isColliding(PLAYER.box, checkpoint1, 10)){
        checkpoint1.style.display = 'none';
        inventoryItem1.innerHTML = '2';
        cp1 = true;
    }
    if(isColliding(PLAYER.box, checkpoint2, 10)){
        checkpoint2.style.display = 'none';
        inventoryItem2.innerHTML = '7';
        cp2 = true;
    }    
    if(isColliding(PLAYER.box, checkpoint3, 10)){
        checkpoint3.style.display = 'none';
        inventoryItem3.innerHTML = '4';
        cp3 = true;
    }

    if(checkCheckpoints()){
        hay.style.zIndex = 1000;
        if(isColliding(PLAYER.box, hay, -70)){
            isGameRunning = false;
            PLAYER.box.style.left = '600px';
            PLAYER.box.style.top = '600px';
            isGameRunning = true;
        }
    }

    //note-paper
    if(isColliding(PLAYER.box, notePaper, 20)){
        ebutton.style.display = '';
    }
    if(!isColliding(PLAYER.box, notePaper, 20)){
        ebutton.style.display = 'none';
    }

    //password-input
    if (isColliding(PLAYER.box, transition1, 10)) {
        Game1ToLock1();
    }
}

function animatePlayer() {

    const directions = {
        down: 0,
        up: 32,
        right: 96,
        left: 64
    };

    PLAYER.spriteImg.style.bottom =
        directions[PLAYER.spriteDirection] + 'px';

    if (PLAYER.spriteImgNumber < 5) {
        PLAYER.spriteImgNumber++;
        let x = parseFloat(PLAYER.spriteImg.style.right);
        x += 32;
        PLAYER.spriteImg.style.right = x + 'px';
    } else {
        PLAYER.spriteImg.style.right = "0px";
        PLAYER.spriteImgNumber = 0;
    }
}

function resetAnimation() {
    PLAYER.spriteImgNumber = 0;
    PLAYER.spriteImg.style.right = '0px';
}

