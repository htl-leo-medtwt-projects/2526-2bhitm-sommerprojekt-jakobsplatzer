let _loopId = 0;

function gameLoop(id) {
    if (id !== _loopId) return;
    if (!isGameRunning) { stopSteps(); return; }

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

        if (typeof _saveThrottle === 'undefined') window._saveThrottle = 0;
        _saveThrottle++;
        if (_saveThrottle >= 180) {
            saveGame(currentGameScreen());
            _saveThrottle = 0;
        }

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
        startSteps();
    } else {
        resetAnimation();
        stopSteps();
    }

    setTimeout(() => gameLoop(id), 1000 / GAME_CONFIG.gameSpeed);
}
