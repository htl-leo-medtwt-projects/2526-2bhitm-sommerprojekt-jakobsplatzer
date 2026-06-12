/// <reference path="spritegame_detectCollisions.js" />
/// <reference path="spritegame_keyevents.js" />
/// <reference path="spritegame_player.js" />

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
let game3 = document.getElementById('game-screen3');
let game4 = document.getElementById('game-screen4');
let inventoryBeam = document.getElementById('inventory-beam-container');
let transition1 = document.getElementById('transition-box1');
let lockScreen1 = document.getElementById('lock-screen1');
let video = document.getElementById('intro-video');
let player = document.getElementById('player');
let cageBox1 = document.getElementById('cage-box1');
let cageBox2 = document.getElementById('cage-box2');
let cageBox3 = document.getElementById('cage-box3');
let cageBox4 = document.getElementById('cage-box4');
let cageBox5 = document.getElementById('cage-box5');
let cageBox6 = document.getElementById('cage-box6');
let cage3Box1 = document.getElementById('cage3-box1');
let cage3Box2 = document.getElementById('cage3-box2');
let cage3Box3 = document.getElementById('cage3-box3');
let cage3Box4 = document.getElementById('cage3-box4');
let cage3Box5 = document.getElementById('cage3-box5');
let cage3Box6 = document.getElementById('cage3-box6');
let cage3Box7 = document.getElementById('cage3-box7');
let cage3Box8 = document.getElementById('cage3-box8');
let cage3Box9 = document.getElementById('cage3-box9');
let cage3Box10 = document.getElementById('cage3-box10');
let cage3Box11 = document.getElementById('cage3-box11');
let cage3Box12 = document.getElementById('cage3-box12');
let cage3Box13 = document.getElementById('cage3-box13');
let cage3Box14 = document.getElementById('cage3-box14');
let cage3Box15 = document.getElementById('cage3-box15');
let cage3Box16 = document.getElementById('cage3-box16');
let cage3Box17 = document.getElementById('cage3-box17');
let cage2Box1 = document.getElementById('cage2-box1');
let cage2Box2 = document.getElementById('cage2-box2');
let cage2Box3 = document.getElementById('cage2-box3');
let cage2Box4 = document.getElementById('cage2-box4');
let cage2Box5 = document.getElementById('cage2-box5');
let cage2Box6 = document.getElementById('cage2-box6');
let cage2Box7 = document.getElementById('cage2-box7');
let cage2Box8 = document.getElementById('cage2-box8');
let cage2Box9 = document.getElementById('cage2-box9');
let cage2Box10 = document.getElementById('cage2-box10');
let cage2Box11 = document.getElementById('cage2-box11');
let cage2Box12 = document.getElementById('cage2-box12');
let cage2Box13 = document.getElementById('cage2-box13');
let cage2Box14 = document.getElementById('cage2-box14');
let cage2Box15 = document.getElementById('cage2-box15');
let cage2Box16 = document.getElementById('cage2-box16');
let checkpoint1 = document.getElementById('checkpoint1');
let checkpoint2 = document.getElementById('checkpoint2');
let checkpoint3 = document.getElementById('checkpoint3');
let inventoryItem1 = document.getElementById('inventory-item1');
let inventoryItem2 = document.getElementById('inventory-item2');
let inventoryItem3 = document.getElementById('inventory-item3');
let inventoryItem4 = document.getElementById('inventory-item4');
let inventoryItem5 = document.getElementById('inventory-item5');
let inventoryItem6 = document.getElementById('inventory-item6');
let inventoryItem7 = document.getElementById('inventory-item7');
let inventoryItem8 = document.getElementById('inventory-item8');
let inventoryItem9 = document.getElementById('inventory-item9');
let notePaper = document.getElementById('note-paper');
let ebutton = document.getElementById('e-button');
let notePaperOverlay = document.getElementById('note-paper-overlay');
let inventoryOverlay = document.getElementById('inventory-overlay');
let hay = document.getElementById('hay');
let notePaper2 = document.getElementById('note-paper2');
let notePaper2Overlay = document.getElementById('note-paper2-overlay');
let keyItem = document.getElementById('key-item');
let oilItem = document.getElementById('oil-item');
let transition2 = document.getElementById('transition-box2');
let transition3 = document.getElementById('transition-box3');
let screwdriverItem = document.getElementById('screwdriver-item');
let wrenchItem = document.getElementById('wrench-item');
let gasolineItem = document.getElementById('gasoline-item');
let penItem = document.getElementById('pen-item');
let ebutton2 = document.getElementById('e-button2');
let ebutton3 = document.getElementById('e-button3');
let ebutton4 = document.getElementById('e-button4');
let ebutton5 = document.getElementById('e-button5');
let circuitPlan = document.getElementById('circuit-plan');
let circuitPlanOverlay = document.getElementById('circuit-plan-overlay');
let cp1 = false;
let cp2 = false;
let cp3 = false;
let notePaperOpen = false;
let notePaper2Open = false;
let circuitPlanOpen = false;
let inventoryOpen = false;
let isGameRunning = false;

function openNotePaper() {
    notePaperOpen = true;
    isGameRunning = false;
    notePaperOverlay.style.display = 'flex';
}

function closeNotePaper() {
    notePaperOpen = false;
    isGameRunning = true;
    notePaperOverlay.style.display = 'none';
    _loopId++; gameLoop(_loopId);
}

function openNotePaper2() {
    notePaper2Open = true;
    isGameRunning = false;
    notePaper2Overlay.style.display = 'flex';
}

function closeNotePaper2() {
    notePaper2Open = false;
    isGameRunning = true;
    notePaper2Overlay.style.display = 'none';
    _loopId++; gameLoop(_loopId);
}

function openCircuitPlan() {
    circuitPlanOpen = true;
    isGameRunning = false;
    circuitPlanOverlay.style.display = 'flex';
}

function closeCircuitPlan() {
    circuitPlanOpen = false;
    isGameRunning = true;
    circuitPlanOverlay.style.display = 'none';
    _loopId++; gameLoop(_loopId);
}

function syncInventory() {
    const beamItems = [inventoryItem1, inventoryItem2, inventoryItem3,
                       inventoryItem4, inventoryItem5, inventoryItem6,
                       inventoryItem7, inventoryItem8, inventoryItem9];
    beamItems.forEach((item, i) => {
        const cell = document.getElementById('inv-cell' + (i + 28));
        if (cell) cell.innerHTML = item.innerHTML;
    });
}

function openInventory() {
    inventoryOpen = true;
    isGameRunning = false;
    syncInventory();
    inventoryOverlay.style.display = 'flex';
}

function closeInventory() {
    inventoryOpen = false;
    isGameRunning = true;
    inventoryOverlay.style.display = 'none';
    _loopId++; gameLoop(_loopId);
}

function inGameScreen() {
    return game1.style.display !== 'none' || game2.style.display !== 'none' || game3.style.display !== 'none';
}

let levelMenuOverlay = document.getElementById('level-menu-overlay');

function computeLevelProgress() {
    let p1 = 0, p2 = 0, p3 = 0;

    if (levelFlags.reachedG2 || levelFlags.reachedG3) {
        p1 = 100;
    } else {
        let c = (cp1 ? 1 : 0) + (cp2 ? 1 : 0) + (cp3 ? 1 : 0);
        p1 = c * 20;
    }

    if (levelFlags.reachedG3) {
        p2 = 100;
    } else if (levelFlags.reachedG2) {
        p2 = 50;
    }

    p3 = 0;

    return [p1, p2, p3];
}

function openLevelMenu() {
    const [p1, p2, p3] = computeLevelProgress();
    document.getElementById('level-fill1').style.width = p1 + '%';
    document.getElementById('level-fill2').style.width = p2 + '%';
    document.getElementById('level-fill3').style.width = p3 + '%';
    document.getElementById('level-percent1').textContent = p1 + '%';
    document.getElementById('level-percent2').textContent = p2 + '%';
    document.getElementById('level-percent3').textContent = p3 + '%';
    levelMenuOverlay.style.display = 'flex';
}

function closeLevelMenu() {
    levelMenuOverlay.style.display = 'none';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'e' || e.key === 'E') {
        if (inventoryOpen) {
            closeInventory();
        } else if (ebutton3.style.display !== 'none') {
            Game2ToGame3();
        } else if (ebutton5.style.display !== 'none') {
            penItem.style.display = 'none';
            ebutton5.style.display = 'none';
            inventoryItem5.innerHTML = '<img src="img/pen.avif" alt="pen" class="inv-item-img">';
        } else if (ebutton4.style.display !== 'none' && !circuitPlanOpen) {
            openCircuitPlan();
        } else if (ebutton2.style.display !== 'none' && !notePaper2Open) {
            openNotePaper2();
        } else if (ebutton.style.display !== 'none' && !notePaperOpen) {
            openNotePaper();
        } else if (!notePaperOpen && !notePaper2Open && !circuitPlanOpen && inGameScreen()) {
            openInventory();
        }
    }
    if (e.key === 'Escape') {
        if (levelMenuOverlay.style.display === 'flex') { closeLevelMenu(); return; }
        if (circuitPlanOpen) { closeCircuitPlan(); return; }
        if (notePaper2Open) { closeNotePaper2(); return; }
        if (notePaperOpen) closeNotePaper();
        if (inventoryOpen) closeInventory();
    }
});


homeButton.style.display = 'none';
videoSection.style.display = 'none';
conWithChick1.style.display = 'none';
conWithChick2.style.display = 'none';
conWithChick3.style.display = 'none';
conWithChick4.style.display = 'none';
game1.style.display = 'none';
game2.style.display = 'none';
game3.style.display = 'none';
game4.style.display = 'none';
player.style.display = 'none';
screwdriverItem.style.display = 'none';
wrenchItem.style.display = 'none';
gasolineItem.style.display = 'none';
penItem.style.display = 'none';
ebutton.style.display = 'none';
ebutton2.style.display = 'none';
ebutton4.style.display = 'none';
ebutton5.style.display = 'none';
hay.style.display= 'none';
notePaper.style.display = 'none';


// ---- LocalStorage Spielstand ----
const SAVE_KEY = 'wollysWayHome_save';

let collectedCheckpoints = { cp1: false, cp2: false, cp3: false };
let levelFlags = { reachedG2: false, reachedG3: false };

function saveGame(screen) {
    const data = {
        screen,
        checkpoints: { cp1, cp2, cp3 },
        flags: { ...levelFlags },
        inventory: [
            inventoryItem1.innerHTML,
            inventoryItem2.innerHTML,
            inventoryItem3.innerHTML,
            inventoryItem4.innerHTML,
            inventoryItem5.innerHTML,
            inventoryItem6.innerHTML,
            inventoryItem7.innerHTML,
            inventoryItem8.innerHTML,
            inventoryItem9.innerHTML,
        ]
    };
    if (screen === 'game1' || screen === 'game2') {
        data.playerX = PLAYER.box.style.left;
        data.playerY = PLAYER.box.style.top;
    }
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
}

function restoreCheckpointsAndInventory(data) {
    if (data.flags) levelFlags = { ...levelFlags, ...data.flags };
    if (!data.checkpoints) return;
    collectedCheckpoints = { ...data.checkpoints };

    if (collectedCheckpoints.cp1) { checkpoint1.style.display = 'none'; cp1 = true; }
    if (collectedCheckpoints.cp2) { checkpoint2.style.display = 'none'; cp2 = true; }
    if (collectedCheckpoints.cp3) { checkpoint3.style.display = 'none'; cp3 = true; }

    if (data.inventory) {
        const items = [inventoryItem1, inventoryItem2, inventoryItem3,
                       inventoryItem4, inventoryItem5, inventoryItem6,
                       inventoryItem7, inventoryItem8, inventoryItem9];
        data.inventory.forEach((html, i) => { items[i].innerHTML = html; });

        // Schlüssel ausblenden wenn bereits eingesammelt
        const keyCollected = data.inventory.some(html => html.includes('key.png'));
        if (keyCollected && keyItem) keyItem.style.display = 'none';

        // Öl-Item ausblenden wenn bereits eingesammelt
        const oilCollected = data.inventory.some(html => html.includes('oil.png'));
        if (oilCollected && oilItem) oilItem.style.display = 'none';
    }
}

function deleteSave() {
    localStorage.removeItem(SAVE_KEY);
}

function loadSave() {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return;
    let data;
    try { data = JSON.parse(raw); } catch { return; }

    startSection.style.display = 'none';
    homeButton.style.display = '';

    if (data.flags) levelFlags = { ...levelFlags, ...data.flags };

    switch (data.screen) {
        case 'video':
            videoSection.style.display = '';
            homeButton.style.display = 'none';
            break;
        case 'con1':
            conWithChick1.style.display = '';
            break;
        case 'con2':
            conWithChick2.style.display = '';
            break;
        case 'con3':
            conWithChick3.style.display = '';
            break;
        case 'con4':
            conWithChick4.style.display = '';
            break;
        case 'game1':
            lockScreen1.style.display = 'none';
            game1.style.display = '';
            player.style.display = '';
            inventoryBeam.style.display = '';
            hay.style.display = '';
            notePaper.style.display = '';
            restoreCheckpointsAndInventory(data);
            startGame(data.playerX, data.playerY);
            break;
        case 'lock1':
            game1.style.display = '';
            lockScreen1.style.display = '';
            player.style.display = 'none';
            inventoryBeam.style.display = '';
            restoreCheckpointsAndInventory(data);
            break;
        case 'game2':
            game2.style.display = '';
            player.style.display = '';
            inventoryBeam.style.display = '';
            restoreCheckpointsAndInventory(data);
            startGame(data.playerX, data.playerY);
            break;
        case 'game3':
            game3.style.display = '';
            player.style.display = '';
            inventoryBeam.style.display = '';
            restoreCheckpointsAndInventory(data);
            if (!data.inventory || !data.inventory.some(h => h.includes('screwdriver'))) screwdriverItem.style.display = '';
            if (!data.inventory || !data.inventory.some(h => h.includes('wrench'))) wrenchItem.style.display = '';
            if (!data.inventory || !data.inventory.some(h => h.includes('gasoline'))) gasolineItem.style.display = '';
            if (!data.inventory || !data.inventory.some(h => h.includes('pen'))) penItem.style.display = '';
            startGame(
                Math.round(window.innerWidth * 0.50) + 'px',
                Math.round(window.innerHeight * 0.50) + 'px'
            );
            break;
    }
}

function checkForSave() {
    const continueBtn = document.getElementById('continue-button');
    if (!continueBtn) return;
    const hasSave = !!localStorage.getItem(SAVE_KEY);
    if (hasSave) {
        continueBtn.style.opacity = '1';
        continueBtn.style.cursor = 'pointer';
        continueBtn.style.pointerEvents = 'auto';
    } else {
        continueBtn.style.opacity = '0.7';
        continueBtn.style.cursor = 'not-allowed';
        continueBtn.style.pointerEvents = 'none';
    }
}

function backToHome() {
    if (!confirm('Wirklich zum Start zurück? Der Spielstand wird gelöscht.')) return;
    deleteSave();
    startSection.style.display = '';
    homeButton.style.display = 'none';
    videoSection.style.display = 'none';
    conWithChick1.style.display = 'none';
    conWithChick2.style.display = 'none';
    conWithChick3.style.display = 'none';
    conWithChick4.style.display = 'none';
    game1.style.display = 'none';
    game2.style.display = 'none';
    game3.style.display = 'none';
    inventoryBeam.style.display = 'none';
    player.style.display = 'none';
    reset();
}

function startToVid() {
    startSection.style.display = 'none';
    videoSection.style.display = '';
    video.play();
    saveGame('video');
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
    saveGame('con1');
}

function Con1ToCon2() {
    conWithChick1.style.display = 'none';
    conWithChick2.style.display = '';
    saveGame('con2');
}
function Con2ToCon3() {
    conWithChick2.style.display = 'none';
    conWithChick3.style.display = '';
    saveGame('con3');
}
function Con3ToCon4() {
    conWithChick3.style.display = 'none';
    conWithChick4.style.display = '';
    saveGame('con4');
}
function Con4ToGame1() {
    hay.style.display = '';
    notePaper.style.display = '';
    conWithChick4.style.display = 'none';
    lockScreen1.style.display = 'none';
    game1.style.display = '';
    player.style.display = '';
    inventoryBeam.style.display = '';
    startGame();
}

function Lock1ToGame1() {
    lockScreen1.style.display = 'none';
    game1.style.display = '';
    player.style.display = '';
    hay.style.display = '';
    notePaper.style.display = '';
    passwordInput1.value = '';
    isGameRunning = true;
    saveGame('game1');
    _loopId++; gameLoop(_loopId);
}

function clearInventory() {
    [inventoryItem1, inventoryItem2, inventoryItem3,
     inventoryItem4, inventoryItem5, inventoryItem6,
     inventoryItem7, inventoryItem8, inventoryItem9]
        .forEach(item => item.innerHTML = '');
}


const CORRECT_PASSWORD = '724';
const passwordInput1 = document.getElementById('password-input1');

passwordInput1.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    if (passwordInput1.value === CORRECT_PASSWORD) {
        passwordInput1.value = '';
        lockScreen1.style.display = 'none';
        game1.style.display = 'none';
        game2.style.display = '';
        player.style.display = '';
        PLAYER.box.style.left = '400px';
        PLAYER.box.style.top = '400px';
        clearInventory();
        keyItem.style.display = '';
        levelFlags.reachedG2 = true;
        isGameRunning = true;
        saveGame('game2');
        _loopId++; gameLoop(_loopId);
    } else {
        passwordInput1.style.borderColor = '#B41A34';
        passwordInput1.style.boxShadow = '0 4px 18px rgba(180,26,52,0.6)';
        setTimeout(() => {
            passwordInput1.style.borderColor = '#5C4029';
            passwordInput1.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
            passwordInput1.value = '';
        }, 800);
    }
});

function Game1ToLock1(){
    isGameRunning = false;
    hay.style.display = 'none';
    notePaper.style.display = 'none';
    player.style.display = 'none';
    lockScreen1.style.display = '';
    game1.style.display = '';
    saveGame('lock1');
}

function currentGameScreen() {
    if (game3.style.display !== 'none') return 'game3';
    if (game2.style.display !== 'none') return 'game2';
    return 'game1';
}

window.addEventListener('beforeunload', () => {
    if (isGameRunning) {
        saveGame(currentGameScreen());
    }
});

function reset() {
    isGameRunning = false;
    location.reload();
}

function startGame(savedX, savedY) {
    PLAYER.box.style.left = savedX || '250px';
    PLAYER.box.style.top = savedY || '180px';
    PLAYER.box.style.opacity = '1';
    PLAYER.spriteImg.style.right = '0px';

    isGameRunning = true;
    if (!savedX) saveGame('game1');
    _loopId++;
    gameLoop(_loopId);
}

function Game3ToGame4() {
    isGameRunning = false;
    game3.style.display = 'none';
    game4.style.display = '';
    player.style.display = 'none';
}

function Game2ToGame3() {
    game2.style.display = 'none';
    game3.style.display = '';
    ebutton3.style.display = 'none';
    player.style.display = '';
    inventoryBeam.style.display = '';
    inventoryItem1.innerHTML = inventoryItem2.innerHTML;
    inventoryItem2.innerHTML = '';
    screwdriverItem.style.display = '';
    wrenchItem.style.display = '';
    gasolineItem.style.display = '';
    penItem.style.display = '';
    PLAYER.box.style.left = Math.round(window.innerWidth * 0.50) + 'px';
    PLAYER.box.style.top = Math.round(window.innerHeight * 0.50) + 'px';
    levelFlags.reachedG3 = true;
    isGameRunning = true;
    saveGame('game3');
    _loopId++; gameLoop(_loopId);
}

checkForSave();




