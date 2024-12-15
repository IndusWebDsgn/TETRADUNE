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
    "#37c1daad",    // Blue
    "#ffd500c0",    // Yellow
    "#20a805dc",    // Green
    "#be3005dc" ,    // Red
    "#b960259c",    // Brown
    "#f7def1c2"
];

function getLeftSideCells(grid) {
    const leftSideCells = [];
    const rows = grid.length;
    for (let row = 0; row < rows; row++) {
        const value = grid[row][0];
        if (value !== "#2210869c") {
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
            connectedCells.forEach(({ row, col }) => playfield.grid[row][col] = "#2210869c");
            score += connectedCells.length;
            scoreui.innerText = score;
        }
    });
}
