let playfield;
let fallingPiece;
let paused = false;
const width = 45;
const height = 80;
let prev = 0;
let score = 0;
let difficulty = "Intermediate";
let totalWidth;
let totalHeight;
let lastTouchTime = 0;
const debounceDelay = 50;
let scoreui = document.getElementById("scoreui");
let scrshotbtn = document.getElementById("scrshotbtn");
let pausebtn = document.getElementById("pausebtn");
let resetbtn = document.getElementById("resetbtn");
const radioInputs = document.getElementsByName("difficultyradio");

pausebtn.addEventListener("click", e => {
    paused = !paused;
    pausebtn.innerHTML = paused ? `<i class="bi bi-play"></i> Play` : `<i class="bi bi-pause"></i> Pause`;
});

resetbtn.addEventListener("click", e => {
    spawnNewPiece();
    playfield.resetGrid();
    score = 0;
    scoreui.innerText = score;
});

scrshotbtn.addEventListener("click", e => {
    saveCanvas('screenshot', 'png');
});

radioInputs.forEach(input => {
    input.addEventListener("change", function () {
        if (input.checked) {
            if (input.id === "difficultyradio1") {
                difficulty = "Intermediate";
            } else if (input.id === "difficultyradio2") {
                difficulty = "Expert";
            }
        }
    });
});

function setup() {
    playfield = new Playfield(width, height);
    totalWidth = playfield.cellSize * width + playfield.borderSize * 2;
    totalHeight = playfield.cellSize * height + playfield.borderSize * 2;
    const canvas = createCanvas(totalWidth, totalHeight);
    canvas.parent('canvasBox');
    spawnNewPiece();
}

function draw() {
    for (let i = 0; i < touches.length; i++) {
        let touchX = touches[i].x;
        let touchY = touches[i].y;
        const currentTime = millis();
        const timeSinceLastTouch = currentTime - lastTouchTime;

        if (timeSinceLastTouch > debounceDelay) {
            if (touchY < totalHeight / 4) {
                fallingPiece.rotateCW();
                if (!playfield.isValid(fallingPiece)) fallingPiece.rotateCCW();
            }
        }
        lastTouchTime = currentTime;

        if (touchX < totalWidth / 4) {
            fallingPiece.moveLeft();
            if (!playfield.isValid(fallingPiece)) fallingPiece.moveRight();
        } else if (touchX > (totalWidth / 4) * 3) {
            fallingPiece.moveRight();
            if (!playfield.isValid(fallingPiece)) fallingPiece.moveLeft();
        } else if (touchY > (totalHeight / 4) * 3) {
            fallingPiece.moveDown();
            if (!playfield.isValid(fallingPiece)) fallingPiece.moveUp();
            else fallingPiece.resetBuffer();
        }
    }

    let curr = millis();
    let delta = curr - prev;
    prev = curr;

    if (!paused) {
        fallingPiece.update(delta);
    }

    if (fallingPiece.timeToFall()) {
        fallingPiece.resetBuffer();
        fallingPiece.moveDown();

        if (!playfield.isValid(fallingPiece)) {
            fallingPiece.moveUp();
            spawnNewPiece();
        }
    }
    playfield.clearLines();

    background(251);
    automatonRules(playfield.grid);
    playfield.show();
    fallingPiece.show();
}

function spawnNewPiece() {
    if (fallingPiece) {
        playfield.addToGrid(fallingPiece);
    }
    const pieces = ['O', 'J', 'L', 'S', 'Z', 'T', 'I'];
    const choice = random(pieces);
    fallingPiece = new Piece(choice, playfield);
    redraw();
}

function automatonRules(grid) {
    let case0 = "#2210869c";
    let case1 = '#f43';

    for (let i = height - 2; i >= 0; i--) {
        for (let j = 0; j < width; j++) {
            let topleftcolor, toprightcolor, bottomrightcolor, bottomleftcolor;
            let topLeft = isInArray(tetrisColors, grid[i][j]) ? 1 : grid[i][j] == case0 ? 0 : null;
            let topRight = isInArray(tetrisColors, grid[i][j + 1]) ? 1 : grid[i][j + 1] == case0 ? 0 : null;
            let bottomRight = isInArray(tetrisColors, grid[i + 1][j + 1]) ? 1 : grid[i + 1][j + 1] == case0 ? 0 : null;
            let bottomLeft = isInArray(tetrisColors, grid[i + 1][j]) ? 1 : grid[i + 1][j] == case0 ? 0 : null;

            let block = [topLeft, topRight, bottomRight, bottomLeft];

            if (arraysEqual(block, [0, 0, 0, 0])) {
                grid[i][j] = case0;
                grid[i][j + 1] = case0;
                grid[i + 1][j + 1] = case0;
                grid[i + 1][j] = case0;
            } else if (arraysEqual(block, [0, 0, 1, 0])) {
                grid[i][j] = case0;
                grid[i][j + 1] = case0;
                grid[i + 1][j + 1] = bottomrightcolor;
                grid[i + 1][j] = case0;
            } else if (arraysEqual(block, [0, 0, 0, 1])) {
                grid[i][j] = case0;
                grid[i][j + 1] = case0;
                grid[i + 1][j + 1] = case0;
                grid[i + 1][j] = bottomleftcolor;
            } else if (arraysEqual(block, [0, 0, 1, 1])) {
                grid[i][j] = case0;
                grid[i][j + 1] = case0;
                grid[i + 1][j + 1] = bottomrightcolor;
                grid[i + 1][j] = bottomleftcolor;
            } else if (arraysEqual(block, [0, 1, 0, 0])) {
                grid[i][j] = case0;
                grid[i][j + 1] = case0;
                grid[i + 1][j + 1] = toprightcolor;
                grid[i + 1][j] = case0;
            } else if (arraysEqual(block, [0, 1, 1, 0])) {
                grid[i][j] = case0;
                grid[i][j + 1] = case0;
                grid[i + 1][j + 1] = toprightcolor;
                grid[i + 1][j] = bottomrightcolor;
            } else if (arraysEqual(block, [0, 1, 0, 1])) {
                grid[i][j] = case0;
                grid[i][j + 1] = case0;
                grid[i + 1][j + 1] = toprightcolor;
                grid[i + 1][j] = bottomleftcolor;
            } else if (arraysEqual(block, [0, 1, 1, 1])) {
                grid[i][j] = case0;
                grid[i][j + 1] = toprightcolor;
                grid[i + 1][j + 1] = bottomrightcolor;
                grid[i + 1][j] = bottomleftcolor;
            } else if (arraysEqual(block, [1, 0, 0, 0])) {
                grid[i][j] = case0;
                grid[i][j + 1] = case0;
                grid[i + 1][j + 1] = case0;
                grid[i + 1][j] = topleftcolor;
            } else if (arraysEqual(block, [1, 0, 1, 0])) {
                grid[i][j] = case0;
                grid[i][j + 1] = case0;
                grid[i + 1][j + 1] = bottomrightcolor;
                grid[i + 1][j] = topleftcolor;
            } else if (arraysEqual(block, [1, 0, 0, 1])) {
                grid[i][j] = case0;
                grid[i][j + 1] = case0;
                grid[i + 1][j + 1] = bottomleftcolor;
                grid[i + 1][j] = topleftcolor;
            } else if (arraysEqual(block, [1, 0, 1, 1])) {
                grid[i][j] = topleftcolor;
                grid[i][j + 1] = case0;
                grid[i + 1][j + 1] = bottomrightcolor;
                grid[i + 1][j] = bottomleftcolor;
            } else if (arraysEqual(block, [1, 1, 0, 0])) {
                grid[i][j] = case0;
                grid[i][j + 1] = toprightcolor;
                grid[i + 1][j + 1] = case0;
                grid[i + 1][j] = topleftcolor;
            } else if (arraysEqual(block, [1, 1, 1, 0])) {
                grid[i][j] = topleftcolor;
                grid[i][j + 1] = toprightcolor;
                grid[i + 1][j + 1] = bottomrightcolor;
                grid[i + 1][j] = case0;
            } else if (arraysEqual(block, [1, 1, 0, 1])) {
                grid[i][j] = topleftcolor;
                grid[i][j + 1] = toprightcolor;
                grid[i + 1][j + 1] = case0;
                grid[i + 1][j] = bottomleftcolor;
            } else if (arraysEqual(block, [1, 1, 1, 1])) {
                grid[i][j] = topleftcolor;
                grid[i][j + 1] = toprightcolor;
                grid[i + 1][j + 1] = bottomrightcolor;
                grid[i + 1][j] = bottomleftcolor;
            }
        }
    }
}
