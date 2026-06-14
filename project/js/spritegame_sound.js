const SOUND = {
    click: 'sounds/normal-click.mp3',
    item: 'sounds/item-einsammeln.mp3',
    fuse: 'sounds/sicherungen-sound.mp3',
    garage: 'sounds/garage-door.mp3'
};

let bgMusic = new Audio('sounds/hintergrundmusik.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.35;

let stepSound = new Audio('sounds/sprite-bewegung.mp3');
stepSound.loop = true;
stepSound.volume = 0.5;

function playSound(src, volume = 1) {
    const a = new Audio(src);
    a.volume = volume;
    a.play().catch(() => {});
}

function playClick() { playSound(SOUND.click, 0.6); }
function playItemSound() { playSound(SOUND.item, 0.8); }
function playFuseSound() { playSound(SOUND.fuse, 0.8); }
function playGarageSound() { playSound(SOUND.garage, 0.8); }

function startBgMusic() {
    if (bgMusic.paused) bgMusic.play().catch(() => {});
}

function stopBgMusic() {
    bgMusic.pause();
}

function startSteps() {
    if (stepSound.paused) stepSound.play().catch(() => {});
}

function stopSteps() {
    if (!stepSound.paused) {
        stepSound.pause();
        stepSound.currentTime = 0;
    }
}
