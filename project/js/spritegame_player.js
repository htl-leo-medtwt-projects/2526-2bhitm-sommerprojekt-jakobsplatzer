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
        isColliding(PLAYER.box, cage2Box12, 0) ||
        isColliding(PLAYER.box, cage2Box13, 0) ||
        isColliding(PLAYER.box, cage2Box14, 0) ||
        isColliding(PLAYER.box, cage2Box15, 0) ||
        isColliding(PLAYER.box, cage2Box16, 0)
    );
}

function isCollidingWithCage3() {
    return (
        isColliding(PLAYER.box, cage3Box1, 0) ||
        isColliding(PLAYER.box, cage3Box2, 0) ||
        isColliding(PLAYER.box, cage3Box3, 0) ||
        isColliding(PLAYER.box, cage3Box4, 0) ||
        isColliding(PLAYER.box, cage3Box5, 0) ||
        isColliding(PLAYER.box, cage3Box6, 0) ||
        isColliding(PLAYER.box, cage3Box7, 0) ||
        isColliding(PLAYER.box, cage3Box8, 0) ||
        isColliding(PLAYER.box, cage3Box9, 0) ||
        isColliding(PLAYER.box, cage3Box10, 0) ||
        isColliding(PLAYER.box, cage3Box11, 0) ||
        isColliding(PLAYER.box, cage3Box12, 0) ||
        isColliding(PLAYER.box, cage3Box13, 0) ||
        isColliding(PLAYER.box, cage3Box14, 0) ||
        isColliding(PLAYER.box, cage3Box15, 0) ||
        isColliding(PLAYER.box, cage3Box16, 0) ||
        isColliding(PLAYER.box, cage3Box17, 0) ||
        (!garageDoorOpen && isColliding(PLAYER.box, garageDoor, 0))
    );
}

function isCollidingWithCageCellar() {
    return (
        isColliding(PLAYER.box, cellarBox1, 0) ||
        isColliding(PLAYER.box, cellarBox2, 0) ||
        isColliding(PLAYER.box, cellarBox3, 0) ||
        isColliding(PLAYER.box, cellarBox4, 0)
    );
}

function isCollidingWithAnyCage() {
    if (cellarScreen.style.display !== 'none') {
        return isCollidingWithCageCellar();
    }
    if (game3.style.display !== 'none') {
        return isCollidingWithCage3();
    }
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

    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    const playerSize = 64;
    const marginX = 80;
    const marginY = 0;

    PLAYER.box.style.left = nextX + 'px';
    if (isCollidingWithAnyCage() || nextX < marginX || nextX + playerSize > screenW - marginX) {
        PLAYER.box.style.left = oldLeft;
    }

    PLAYER.box.style.top = nextY + 'px';
    if (isCollidingWithAnyCage() || nextY < marginY || nextY + playerSize > screenH - marginY) {
        PLAYER.box.style.top = oldTop;
    }

    if (direction) {
        PLAYER.spriteDirection = direction;
    }

    if (direction === 'left') {
        PLAYER.box.style.transform = 'scaleX(-1)';
    } else if (direction === 'right') {
        PLAYER.box.style.transform = 'scaleX(1)';
    }

    if(isColliding(PLAYER.box, checkpoint1, 10)){
        checkpoint1.style.display = 'none';
        inventoryItem1.innerHTML = '2';
        cp1 = true;
        playItemSound();
    }
    if(isColliding(PLAYER.box, checkpoint2, 10)){
        checkpoint2.style.display = 'none';
        inventoryItem2.innerHTML = '7';
        cp2 = true;
        playItemSound();
    }
    if(isColliding(PLAYER.box, checkpoint3, 10)){
        checkpoint3.style.display = 'none';
        inventoryItem3.innerHTML = '4';
        cp3 = true;
        playItemSound();
    }

    if (game1.style.display !== 'none' && checkCheckpoints()) {
        hay.style.zIndex = 1000;
        if (isColliding(PLAYER.box, hay, -70)) {
            // Heuhaufen = Flucht aus dem Gehege (Keller kommt erst nach dem Passwort)
            PLAYER.box.style.left = '600px';
            PLAYER.box.style.top = '600px';
        }
    }

    // Interaktionen im Keller
    if (cellarScreen.style.display !== 'none') {
        if (!cellarHasMatches && matchesItem.style.display !== 'none' && isColliding(PLAYER.box, matchesItem, 30)) {
            ebuttonMatches.style.display = 'block';
        } else {
            ebuttonMatches.style.display = 'none';
        }

        if (!cellarLit && cellarHasMatches && isColliding(PLAYER.box, lanternItem, 40)) {
            ebuttonLantern.style.display = 'block';
        } else {
            ebuttonLantern.style.display = 'none';
        }

        if (isColliding(PLAYER.box, cellarNote, 30)) {
            ebuttonCellarNote.style.display = 'block';
        } else {
            ebuttonCellarNote.style.display = 'none';
        }

        // Ventile per [E] drehen (nur bei Licht) – zeigt das nächste Rad mit Farbe an
        nearValve = -1;
        if (cellarLit && !cellarSolved) {
            for (let i = 0; i < valveEls.length; i++) {
                if (isColliding(PLAYER.box, valveEls[i], 25)) { nearValve = i; break; }
            }
        }
        if (nearValve !== -1) {
            const action = valveState[nearValve] ? 'zudrehen' : 'aufdrehen';
            ebuttonValve.querySelector('p').textContent = '[E] - ' + VALVE_COLORS[nearValve] + ' Rad ' + action;
            ebuttonValve.style.display = 'block';
        } else {
            ebuttonValve.style.display = 'none';
        }

        if (cellarSolved && !cellarHasKey && isColliding(PLAYER.box, cellarKey, 15)) {
            cellarHasKey = true;
            cellarKey.style.display = 'none';
            cellarExit.classList.add('ready');
            playItemSound();
            saveGame('cellar');
        }

        if (cellarHasKey && isColliding(PLAYER.box, cellarExit, 20)) {
            ebuttonCellarExit.style.display = 'block';
        } else {
            ebuttonCellarExit.style.display = 'none';
        }
    }

    if (game2.style.display === 'none' && game3.style.display === 'none' && cellarScreen.style.display === 'none') {
        if (isColliding(PLAYER.box, notePaper, 20)) {
            ebutton.style.display = '';
        } else {
            ebutton.style.display = 'none';
        }

        if (isColliding(PLAYER.box, transition1, 10)) {
            Game1ToLock1();
        }
    }

    if (game3.style.display !== 'none') {
        if (wrenchItem.style.display !== 'none' && isColliding(PLAYER.box, wrenchItem, 10)) {
            wrenchItem.style.display = 'none';
            inventoryItem3.innerHTML = '<img src="img/wrench.png" alt="wrench" class="inv-item-img">';
            playItemSound();
        }
        if (gasolineItem.style.display !== 'none' && isColliding(PLAYER.box, gasolineItem, 10)) {
            gasolineItem.style.display = 'none';
            inventoryItem4.innerHTML = '<img src="img/gasoline.png" alt="gasoline" class="inv-item-img">';
            playItemSound();
        }
        if (penItem.style.display !== 'none' && isColliding(PLAYER.box, penItem, 50)) {
            ebutton5.style.display = 'block';
        } else {
            ebutton5.style.display = 'none';
        }

        if (isColliding(PLAYER.box, circuitPlan, 40)) {
            ebutton4.style.display = 'block';
            fbutton.style.display = 'block';
        } else {
            ebutton4.style.display = 'none';
            fbutton.style.display = 'none';
        }

        if (isColliding(PLAYER.box, aggregateBox, 40)) {
            const label = aggregateLabel();
            if (label) {
                ebutton6.querySelector('p').textContent = label;
                ebutton6.style.display = 'block';
            } else {
                ebutton6.style.display = 'none';
            }
        } else {
            ebutton6.style.display = 'none';
        }

        if (isColliding(PLAYER.box, elevatorBox, 20)) {
            ebutton7.style.display = 'block';
        } else {
            ebutton7.style.display = 'none';
        }

        if (garageDoorOpen && isColliding(PLAYER.box, transition4, 10)) {
            Game3ToGame4();
        }
    }

    if (game2.style.display !== 'none') {
        if (isColliding(PLAYER.box, notePaper2, 20)) {
            ebutton2.style.display = 'block';
        } else {
            ebutton2.style.display = 'none';
        }

        if (keyItem.style.display !== 'none' && isColliding(PLAYER.box, keyItem, 10)) {
            keyItem.style.display = 'none';
            inventoryItem1.innerHTML = '<img id="key-img" src="img/key.png" alt="key" class="inv-item-img">';
            playItemSound();
        }

        if (oilItem.style.display !== 'none' && isColliding(PLAYER.box, oilItem, 10)) {
            oilItem.style.display = 'none';
            inventoryItem2.innerHTML = '<img src="img/oil.png" alt="oil" class="inv-item-img">';
            playItemSound();
        }

        if (isColliding(PLAYER.box, transition2, 10)) {
            const hasKey = inventoryItem1.innerHTML.includes('key.png');
            const hasOil = inventoryItem2.innerHTML.includes('oil.png');
            if (hasKey && hasOil) {
                ebutton3.style.display = '';
            } else {
                ebutton3.style.display = 'none';
            }
        } else {
            ebutton3.style.display = 'none';
        }
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
