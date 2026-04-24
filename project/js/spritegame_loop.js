/***********************************
 * SCRIPT REFERENCES
 ***********************************/
/// <reference path="spritegame_detectCollisions.js" />
/// <reference path="spritegame_keyevents.js" />
/// <reference path="spritegame_player.js" />
/// <reference path="spritegame_main.js" />

/***********************************
 * GAME LOOP
 * **********************************/
function gameLoop() {

    if (!isGameRunning) return;

    let dx = 0;
    let dy = 0;

    if (KEY_EVENTS.leftArrow) {
        dx -= GAME_CONFIG.characterSpeed;
    }
    if (KEY_EVENTS.rightArrow) {
        dx += GAME_CONFIG.characterSpeed;
    }
    if (KEY_EVENTS.upArrow) {
        dy -= GAME_CONFIG.characterSpeed;
    }
    if (KEY_EVENTS.downArrow) {
        dy += GAME_CONFIG.characterSpeed;
    }

    if (dx !== 0 && dy !== 0) {
        dx *= 0.707;
        dy *= 0.707;
    }

    if (dx !== 0 || dy !== 0) {


        if (dx < 0) {
            PLAYER.spriteDirection = 'left';
        } else if (dx > 0) {
            PLAYER.spriteDirection = 'right';
        } else if (dy < 0) {
            PLAYER.spriteDirection = 'up';
        } else if (dy > 0) {
            PLAYER.spriteDirection = 'down';
        }

        movePlayer(dx, dy);
        animatePlayer();
    } else {
        resetAnimation();
    }

    setTimeout(gameLoop, 1000 / GAME_CONFIG.gameSpeed);
}

