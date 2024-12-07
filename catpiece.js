class Piece {
    constructor(type, playfield) {
        this.type = type;
        this.color = random(tetrisColors);
        this.cells = replaceStringIn2DArray(types[type], '#f43', this.color);
        this.size = this.cells.length;
        this.cellSize = playfield.cellSize;
        this.offset = playfield.borderSize;
        this.x = Math.floor((playfield.cols - this.size) / 2);
        this.y = 0;
        this.dropInterval = 200;
        this.dropBuffer = 0;
    }
    update(time) { this.dropBuffer += time; }
    timeToFall() { return this.dropBuffer > this.dropInterval; }
    resetBuffer() { this.dropBuffer = 0; }
    show() {
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (this.cells[row][col]) {
                    const x = this.x + col, y = this.y + row;
                    const cs = this.cellSize, off = this.offset;
                    fill(this.cells[row][col]);
                    stroke(this.cells[row][col]);
                    rect(off + cs * x, off + cs * y, cs - 1, cs - 1);
                }
            }
        }
    }

    moveDown() { this.y++; }
    moveRight() { this.x++; }
    moveLeft() { this.x--; }
    moveUp() { this.y--; }

    rotateCW() {
        this.cells = this.cells[0].map((_, col) =>
            this.cells.map(row => row[col]).reverse()
        );
    }

    rotateCCW() {
        this.cells = this.cells[0].map((_, col) =>
            this.cells.map(row => row[row.length - 1 - col])
        );
    }
}
const types = {
    S: [
        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, "#f43", "#f43", "#f43", null, "#f43", "#f43", "#f43", null, null, null],
        [null, null, null, null, null, "#f43", "#f43", "#f43", null, "#f43", "#f43", "#f43", null, null, null],
        [null, null, null, null, null, "#f43", "#f43", "#f43", null, "#f43", "#f43", "#f43", null, null, null],
        [null, null, "#f43", "#f43", "#f43", null, null, null, null, null, null, null, "#f43", "#f43", "#f43"],
        [null, null, "#f43", "#f43", "#f43", null, null, null, null, null, null, null, "#f43", "#f43", "#f43"],
        [null, null, "#f43", "#f43", "#f43", null, "#f43", "#f43", "#f43", "#f43", "#f43", null, "#f43", "#f43", "#f43"],
        [null, null, null, null, null, "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", null, null, null],
        [null, null, null, null, "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", null, null],
        [null, null, null, null, "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", null, null],
        [null, null, null, null, "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", null, null],
        [null, null, null, null, null, "#f43", "#f43", "#f43", null, "#f43", "#f43", "#f43", null, null, null],
        [null, null, null, null, null, "#f43", "#f43", "#f43", null, "#f43", "#f43", "#f43", null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    ],
    
    
    Z: [
        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, "#f43", "#f43", "#f43", "#f43", null, null, null, null, null, null, null, null],
        [null, null, "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", null, null, null, "#f43", null, null, null],
        [null, "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", null, null, "#f43", null, null, null],
        ["#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", null, null],
        ["#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", null, "#f43", null, null],
        ["#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", null],
        ["#f43", "#f43", "#f43", "#f43", "#f43", null, null, "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43"],
        ["#f43", null, "#f43", "#f43", "#f43", "#f43", null, "#f43", "#f43", "#f43", null, null, null, null, null],
        ["#f43", null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        [null, "#f43", null, null, null, null, null, null, null, null, null, null, null, null, null],
        [null, "#f43", null, null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    ],
    
    
    T: [
        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, "#f43", "#f43", null, null, null, null, null, "#f43", "#f43", null, null, null],
        [null, null, null, "#f43", "#f43", "#f43", null, null, null, "#f43", "#f43", "#f43", null, null, null],
        [null, null, "#f43", "#f43", null, "#f43", "#f43", null, "#f43", "#f43", null, "#f43", "#f43", null, null],
        [null, null, "#f43", "#f43", null, "#f43", "#f43", "#f43", "#f43", "#f43", null, "#f43", "#f43", null, null],
        [null, null, null, "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", null, null, null],
        [null, null, null, "#f43", "#f43", null, null, "#f43", null, null, "#f43", "#f43", null, null, null],
        [null, null, "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", null, null],
        [null, null, "#f43", "#f43", "#f43", "#f43", "#f43", null, "#f43", "#f43", "#f43", "#f43", "#f43", null, null],
        [null, null, null, "#f43", "#f43", "#f43", null, "#f43", null, "#f43", "#f43", "#f43", null, null, null],
        [null, null, null, null, "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", null, null, null, null],
        [null, null, null, null, null, "#f43", "#f43", "#f43", "#f43", "#f43", null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    ],
    
    
    I: [
        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, "#f43", null, null, null, null, null, null],
        [null, null, null, null, null, null, "#f43", null, null, "#f43", null, "#f43", null, null, null],
        ["#f43", "#f43", null, null, "#f43", null, null, "#f43", null, "#f43", null, "#f43", "#f43", null, null],
        ["#f43", "#f43", "#f43", null, null, "#f43", null, "#f43", null, "#f43", null, "#f43", "#f43", "#f43", null],
        [null, "#f43", "#f43", "#f43", null, "#f43", null, "#f43", null, "#f43", null, "#f43", null, "#f43", "#f43"],
        [null, null, "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43", "#f43"],
        [null, "#f43", "#f43", "#f43", null, null, null, null, null, null, null, "#f43", "#f43", "#f43", "#f43"],
        ["#f43", "#f43", "#f43", null, null, "#f43", null, "#f43", null, "#f43", null, "#f43", "#f43", "#f43", null],
        ["#f43", "#f43", null, null, "#f43", null, null, "#f43", null, "#f43", null, "#f43", "#f43", null, null],
        [null, null, null, null, null, null, "#f43", null, null, "#f43", null, "#f43", null, null, null],
        [null, null, null, null, null, null, null, null, "#f43", null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    
    
    ]
};

function replaceStringIn2DArray(arr, textToReplace, replacementText) {
    return arr.map(row =>
        row.map(item => (item === textToReplace ? replacementText : item))
    );
}
