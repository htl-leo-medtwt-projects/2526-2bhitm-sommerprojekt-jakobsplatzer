/***********************************
 * SCRIPT REFERENCES
 ***********************************/
/// <reference path="spritegame_detectCollisions.js" />
/// <reference path="spritegame_keyevents.js" />

let maxTop = 450;
let maxLeft = 760;
let lastDirection = 'down';
let counter = document.getElementById('counter');



let PLAYER = {
    box: document.getElementById('player'),
    spriteImg: document.getElementById('spriteImg'),
    spriteImgNumber: 0,
    spriteDirection: 'down',
    coinCount: 0
}

let cordinates = [
    {
        top: '34px',
        left: '130px'
    },
    {
        top: '289px',
        left: '739px'
    },
    {
        top: '158px',
        left: '67px'
    },
    {
        top: '91px',
        left: '530px'
    },
    {
        top: '360px',
        left: '301px'
    },
    {
        top: '90px',
        left: '739px'
    },
    {
        top: '244px',
        left: '198px'
    },
    {
        top: '147px',
        left: '642px'
    },
    {
        top: '329px',
        left: '85px'
    },
    {
        top: '59px',
        left: '410px'
    },
    {
        top: '59px',
        left: '410px'
    }

];


/***********************************
 * MOVE
 * **********************************/
/**
 * @param {number} dx - player x move offset in pixel
 * @param {number} dy - player y move offset in pixel
 * @param {number} dr - player heading direction (-1: look left || 1: look right)
 */
function movePlayer(dx, dy, direction) {

    let originalX = parseFloat(PLAYER.box.style.left);
    let originalY = parseFloat(PLAYER.box.style.top);

    if (originalX + dx < 10) {
        return;
    }

    if (originalY + dy < 0) {
        return;
    }

    if (originalX + dx > maxLeft) {
        return;
    }

    if (originalY + dy > maxTop) {
        return;
    }

    PLAYER.box.style.left = (originalX + dx) + 'px';
    PLAYER.box.style.top = (originalY + dy) + 'px';

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

    if (isColliding(PLAYER.box, GAME_SCREEN.redbox, -11)) {
        eatAudio.play();
        PLAYER.coinCount++;
        counter.innerHTML = PLAYER.coinCount;
        let randomValue = Math.floor(Math.random() * 9);
        GAME_SCREEN.redbox.style.top = cordinates[randomValue].top;
        GAME_SCREEN.redbox.style.left = cordinates[randomValue].left;
        if (GAME_CONFIG.characterSpeed <= 20) {
            GAME_CONFIG.characterSpeed += 0.15;
        }
    }

    if (isColliding(PLAYER.box, GAME_SCREEN.clockBox, -11)) {
        clockAudio.play();
        GAME_CONFIG.playTime += 1;
        let randomValue = Math.floor(Math.random() * 9);
        GAME_SCREEN.clockBox.style.top = cordinates[randomValue].top;
        GAME_SCREEN.clockBox.style.left = cordinates[randomValue].left;
    }
}

function animatePlayer() {

    const directions = {
        down: 0,
        up: 32,
        right: 64,
        left: 96
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

