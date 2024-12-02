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
    O: Array(8).fill(Array(8).fill('#f43')),
    J: [
        ...Array(4).fill(Array(12).fill('#f43').slice(0, 4)),
        ...Array(4).fill(Array(12).fill('#f43')),
        ...Array(4).fill(Array(12).fill(null))
    ],
    L: [
        ...Array(4).fill([...Array(8).fill(null), ...Array(4).fill('#f43')]),
        ...Array(4).fill(Array(12).fill('#f43')),
        ...Array(4).fill(Array(12).fill(null))
    ],
    S: [
        ...Array(4).fill([...Array(4).fill(null), ...Array(8).fill('#f43')]),
        ...Array(4).fill([...Array(8).fill('#f43'), ...Array(4).fill(null)]),
        ...Array(4).fill(Array(12).fill(null))
    ],
    Z: [
        ...Array(4).fill([...Array(8).fill('#f43'), ...Array(4).fill(null)]),
        ...Array(4).fill([...Array(4).fill(null), ...Array(8).fill('#f43')]),
        ...Array(4).fill(Array(12).fill(null))
    ],
    T: [
        ...Array(4).fill([...Array(4).fill(null), ...Array(4).fill('#f43'), ...Array(4).fill(null)]),
        ...Array(4).fill(Array(12).fill('#f43')),
        ...Array(4).fill(Array(12).fill(null))
    ],
    I: [
        ...Array(4).fill(Array(12).fill(null)),
        ...Array(4).fill(Array(12).fill('#f43')),
        ...Array(4).fill(Array(12).fill(null))
    ]
};

function replaceStringIn2DArray(arr, textToReplace, replacementText) {
    return arr.map(row =>
        row.map(item => (item === textToReplace ? replacementText : item))
    );
}
