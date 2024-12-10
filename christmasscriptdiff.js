
let playfield
let fallingPiece
let paused = false
let prev = 0;
let score = 0
let difficulty = "Intermediate";
let totalWidth
let totalHeight
let lastTouchTime = 0;
const debounceDelay = 10;
let scoreui = document.getElementById("scoreui")
let scrshotbtn = document.getElementById("scrshotbtn")
let pausebtn = document.getElementById("pausebtn")
let resetbtn = document.getElementById("resetbtn")
const radioInputs = document.getElementsByName("difficultyradio");
const width = 45
const height = 80
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
                if (!playfield.isValid(fallingPiece))
                    fallingPiece.rotateCCW();
            }
        }
        lastTouchTime = currentTime;
        if (touchX < totalWidth / 4) {

            fallingPiece.moveLeft();
            if (!playfield.isValid(fallingPiece))
                fallingPiece.moveRight()
        } else if (touchX > (totalWidth / 4) * 3) {
            fallingPiece.moveRight();
            if (!playfield.isValid(fallingPiece))
                fallingPiece.moveLeft()
        } else if (touchY > (totalHeight / 4) * 3) {
            fallingPiece.moveDown();
            if (!playfield.isValid(fallingPiece))
                fallingPiece.moveUp()
            else
                fallingPiece.resetBuffer()
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
    automatonRules(playfield.grid)
    playfield.show();
    fallingPiece.show();
}
function spawnNewPiece() {
    if (fallingPiece) {
        playfield.addToGrid(fallingPiece);
    }
    const pieces = ['S', 'Z', 'T', 'I'];
    const choice = random(pieces);
    fallingPiece = new Piece(choice, playfield);
    redraw();
}
function automatonRules(grid) {
    let case0 = "#1074869c"
    let case1 = '#f43'
    for (let i = height - 2; i >= 0; i--) {
        for (let j = 0; j < width; j++) {
            let topleftcolor
            let toprightcolor
            let bottomrightcolor
            let bottomleftcolor
            let topLeft
            if (isInArray(tetrisColors, grid[i][j])) {
                topLeft = 1
                topleftcolor = grid[i][j]
            } else if (grid[i][j] == case0) {
                topLeft = 0
            }
            let topRight
            if (isInArray(tetrisColors, grid[i][j + 1])) {
                topRight = 1
                toprightcolor = grid[i][j + 1]
            } else if (grid[i][j + 1] == case0) {
                topRight = 0
            }
            let bottomRight
            if (isInArray(tetrisColors, grid[i + 1][j + 1])) {
                bottomRight = 1
                bottomrightcolor = grid[i + 1][j + 1]
            } else if (grid[i + 1][j + 1] == case0) {
                bottomRight = 0
            }
            let bottomLeft
            if (isInArray(tetrisColors, grid[i + 1][j])) {
                bottomLeft = 1
                bottomleftcolor = grid[i + 1][j]
            } else if (grid[i + 1][j] == case0) {
                bottomLeft = 0
            }
            // Create an array to represent the 2x2 block
            let block = [topLeft, topRight, bottomRight, bottomLeft];
            const patternMapping = {
                "0000": [case0, case0, case0, case0],
                "0010": [case0, case0, bottomrightcolor, case0],
                "0001": [case0, case0, case0, bottomleftcolor],
                "0011": [case0, case0, bottomrightcolor, bottomleftcolor],
                "0100": [case0, case0, toprightcolor, case0],
                "0110": [case0, case0, toprightcolor, bottomrightcolor],
                "0101": [case0, case0, toprightcolor, bottomleftcolor],
                "0111": [case0, toprightcolor, bottomrightcolor, bottomleftcolor],
                "1000": [case0, case0, case0, topleftcolor],
                "1010": [case0, case0, bottomrightcolor, topleftcolor],
                "1001": [case0, case0, bottomleftcolor, topleftcolor],
                "1011": [topleftcolor, case0, bottomrightcolor, bottomleftcolor],
                "1100": [case0, case0, toprightcolor, topleftcolor],
                "1110": [case0, toprightcolor, bottomrightcolor, topleftcolor],
                "1101": [topleftcolor, case0, toprightcolor, bottomleftcolor],
                "1111": [topleftcolor, toprightcolor, bottomrightcolor, bottomleftcolor]
            };
            
            function updateGrid(block, i, j, grid) {
                const patternKey = block.join(""); 
                if (patternMapping[patternKey]) {
                    const [topLeft, topRight, bottomRight, bottomLeft] = patternMapping[patternKey];
                    grid[i][j] = topLeft;
                    grid[i][j + 1] = topRight;
                    grid[i + 1][j + 1] = bottomRight;
                    grid[i + 1][j] = bottomLeft;
                }
            }
            
            updateGrid(block, i, j, grid);
        }
    }
}
pausebtn.addEventListener("click", e => {
    paused = !paused
    pausebtn.innerHTML = paused ? `<i class="bi bi-play"></i> Play` : `<i class="bi bi-pause"></i> Pause`;
})
resetbtn.addEventListener("click", e => {
    spawnNewPiece();
    playfield.resetGrid();
    score = 0
    scoreui.innerText = score
})
scrshotbtn.addEventListener("click", e => {
    saveCanvas('screenshot', 'png');
})
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

function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}
function isInArray(arr, value) {
    return arr.includes(value);
}
const tetrisColors = [
    "#9fbe65c5",    // Blue
    "#d30f0fc2",    // Red
    "#b960259c",    // Brown
    "#f7def1c2",    // White
    "#ba82fac5",
    "#f1e533b0"

];
function getLeftSideCells(grid) {
    const leftSideCells = [];
    const rows = grid.length;
    for (let row = 0; row < rows; row++) {
        const value = grid[row][0];
        if (value !== "#1074869c") {
            const previousRow = leftSideCells[leftSideCells.length - 1];
            if (!previousRow || previousRow.color !== value) {
                leftSideCells.push({ row, col: 0, color: value });
            }
        }
    }
    return leftSideCells;
}
function findConnectedCells(grid, startRow, startCol) {
    const rows = grid.length;
    const cols = grid[0].length;
    const targetValue = grid[startRow][startCol];
    const visited = new Array(rows).fill(false).map(() => new Array(cols).fill(false));
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];
    function dfs(row, col, connectedCells) {
        if (row < 0 || row >= rows || col < 0 || col >= cols || visited[row][col]) {
            return;
        }
        visited[row][col] = true;
        if (grid[row][col] === targetValue) {
            connectedCells.push({ row, col });
            for (const [dx, dy] of directions) {
                dfs(row + dx, col + dy, connectedCells);
            }
        }
    }
    const connectedCells = [];
    dfs(startRow, startCol, connectedCells);
    return connectedCells;
}
function findConnectedCellsnodiagonal(grid, startRow, startCol) {
    const rows = grid.length;
    const cols = grid[0].length;
    const targetValue = grid[startRow][startCol];
    const visited = new Array(rows).fill(false).map(() => new Array(cols).fill(false));
    function dfs(row, col, connectedCells) {
        if (row < 0 || row >= rows || col < 0 || col >= cols || visited[row][col]) {
            return;
        }
        visited[row][col] = true;
        if (grid[row][col] === targetValue) {
            connectedCells.push({ row, col });
            dfs(row - 1, col, connectedCells); // Up
            dfs(row + 1, col, connectedCells); // Down
            dfs(row, col - 1, connectedCells); // Left
            dfs(row, col + 1, connectedCells); // Right
        }
    }
    const connectedCells = [];
    dfs(startRow, startCol, connectedCells);
    return connectedCells;
}
function linetest() {
    let uniqueLeftColors = getLeftSideCells(playfield.grid);
    uniqueLeftColors.forEach(({ row, col }) => {
        const findCells = difficulty === "Intermediate" ? findConnectedCells : findConnectedCellsnodiagonal;
        let connectedCells = findCells(playfield.grid, row, col);
        if (connectedCells.some(cell => cell.col === width - 1)) {
            connectedCells.forEach(({ row, col }) => playfield.grid[row][col] = "#1074869c");
            score += connectedCells.length;
            scoreui.innerText = score;
        }
    });
}