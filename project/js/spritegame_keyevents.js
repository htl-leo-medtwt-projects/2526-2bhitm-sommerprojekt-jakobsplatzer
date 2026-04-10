
/***********************************
 * EVENT EVENTS
 ***********************************/
let KEY_EVENTS = {
    leftArrow: false,
    rightArrow: false,
    upArrow: false,
    downArrow: false
}
document.onkeydown = keyListenerDown;
document.onkeyup = keyListenerUp;

function keyListenerDown(e) {

    if (e.key === "ArrowLeft" || e.key === "a") {
        KEY_EVENTS.leftArrow = true;
        PLAYER.spriteDirection = 'left';
    }

    if (e.key === "ArrowUp" || e.key === "w") {
        KEY_EVENTS.upArrow = true;
        PLAYER.spriteDirection = 'up';
    }

    if (e.key === "ArrowRight" || e.key === "d") {
        KEY_EVENTS.rightArrow = true;
        PLAYER.spriteDirection = 'right';
    }

    if (e.key === "ArrowDown" || e.key === "s") {
        KEY_EVENTS.downArrow = true;
        PLAYER.spriteDirection = 'down';
    }
}


function keyListenerUp(e) {
    if (e.key === "ArrowLeft" || e.key === "a") {
        KEY_EVENTS.leftArrow = false;
    }
    if (e.key === "ArrowUp" || e.key === "w") {
        KEY_EVENTS.upArrow = false;
    }
    if (e.key === "ArrowRight" || e.key === "d") {
        KEY_EVENTS.rightArrow = false;
    }
    if (e.key === "ArrowDown" || e.key === "s") {
        KEY_EVENTS.downArrow = false;
    }
}


