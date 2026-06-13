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

function isCollidingWithAnyCage() {
    // Je nach aktivem Screen die passenden Hindernisse prüfen
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

    // Game-Screen 1: Note-Paper + Transition
    if (game2.style.display === 'none' && game3.style.display === 'none') {
        if (isColliding(PLAYER.box, notePaper, 20)) {
            ebutton.style.display = '';
        } else {
            ebutton.style.display = 'none';
        }

        if (isColliding(PLAYER.box, transition1, 10)) {
            Game1ToLock1();
        }
    }

    // Game-Screen 3: Items einsammeln + Ausgang
    if (game3.style.display !== 'none') {
        if (wrenchItem.style.display !== 'none' && isColliding(PLAYER.box, wrenchItem, 10)) {
            wrenchItem.style.display = 'none';
            inventoryItem3.innerHTML = '<img src="img/wrench.png" alt="wrench" class="inv-item-img">';
        }
        if (gasolineItem.style.display !== 'none' && isColliding(PLAYER.box, gasolineItem, 10)) {
            gasolineItem.style.display = 'none';
            inventoryItem4.innerHTML = '<img src="img/gasoline.png" alt="gasoline" class="inv-item-img">';
        }
        // Stift liegt in der Wand-Cage-Box → größere Toleranz, damit E erscheint,
        // wenn der Spieler davor steht (Wand blockiert ihn vorher)
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

        // Aggregat: Tanken / Reparieren / Schmieren (Reihenfolge egal) → Starten
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
        // Aufzug am rechten Rand → ebutton7
        if (isColliding(PLAYER.box, elevatorBox, 20)) {
            ebutton7.style.display = 'block';
        } else {
            ebutton7.style.display = 'none';
        }

        // Offenes Garagentor → raus nach Game-Screen 4
        if (garageDoorOpen && isColliding(PLAYER.box, transition4, 10)) {
            Game3ToGame4();
        }

        if (transition3 && isColliding(PLAYER.box, transition3, 10)) {
            Game3ToGame4();
        }
    }

    // Game-Screen 2: Note-Paper2, Öl einsammeln, Falltür
    if (game2.style.display !== 'none') {
        // Note-Paper 2 → ebutton2
        if (isColliding(PLAYER.box, notePaper2, 20)) {
            ebutton2.style.display = 'block';
        } else {
            ebutton2.style.display = 'none';
        }

        // Schlüssel einsammeln
        if (keyItem.style.display !== 'none' && isColliding(PLAYER.box, keyItem, 10)) {
            keyItem.style.display = 'none';
            inventoryItem1.innerHTML = '<img id="key-img" src="img/key.png" alt="key" class="inv-item-img">';
        }

        // Öl einsammeln
        if (oilItem.style.display !== 'none' && isColliding(PLAYER.box, oilItem, 10)) {
            oilItem.style.display = 'none';
            inventoryItem2.innerHTML = '<img src="img/oil.png" alt="oil" class="inv-item-img">';
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

