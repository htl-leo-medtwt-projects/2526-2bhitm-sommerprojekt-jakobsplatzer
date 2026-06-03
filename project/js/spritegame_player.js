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
        isColliding(PLAYER.box, cageBox4, 0)
    );
}

function movePlayer(dx, dy, direction) {

    let oldLeft = PLAYER.box.style.left;
    let oldTop = PLAYER.box.style.top;
    let nextX = parseFloat(oldLeft) + dx;
    let nextY = parseFloat(oldTop) + dy;

    // X-Achse prüfen
    PLAYER.box.style.left = nextX + 'px';
    if (isCollidingWithCage()) {
        PLAYER.box.style.left = oldLeft;
    }

    // Y-Achse prüfen
    PLAYER.box.style.top = nextY + 'px';
    if (isCollidingWithCage()) {
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

