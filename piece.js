function replaceStringIn2DArray(arr, textToReplace, replacementText) {
    return arr.map(row => 
        row.map(item => (item === textToReplace ? replacementText : item))
    );
}

// Piece Class
class Piece {
    constructor(type, playfield) {
        // Piece Properties
        this.type = type;
        this.color = random(tetrisColors);
        this.cells = replaceStringIn2DArray(types[type], '#f43', this.color);
        this.size = this.cells.length; // Assumes square matrix
        this.cellSize = playfield.cellSize;
        this.offset = playfield.borderSize;

        // Position and Gravity
        this.x = floor((playfield.cols - this.size) / 2);
        this.y = 0;
        this.dropInterval = 200; // in ms
        this.dropBuffer = 0; // Time since last drop
    }

    // Update Drop Buffer
    update(time) {
        this.dropBuffer += time;
    }

    timeToFall() {
        return this.dropBuffer > this.dropInterval;
    }

    resetBuffer() {
        this.dropBuffer = 0;
    }

    // Show Piece on Playfield
    show() {
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (this.cells[row][col]) {
                    let x = this.x + col;
                    let y = this.y + row;
                    let cs = this.cellSize;
                    let off = this.offset;

                    fill(this.cells[row][col]);
                    stroke(this.cells[row][col]);
                    rect(off + cs * x, off + cs * y, cs - 1, cs - 1);
                }
            }
        }
    }

    // Movement Methods
    moveDown() { this.y++; }
    moveRight() { this.x++; }
    moveLeft() { this.x--; }
    moveUp() { this.y--; }

    // Rotation Methods
    rotateCW() {
        let newCells = [];
        for (let col = 0; col < this.size; col++) {
            let newRow = [];
            for (let row = this.size - 1; row >= 0; row--) {
                newRow.push(this.cells[row][col]);
            }
            newCells.push(newRow);
        }
        this.cells = newCells;
    }

    rotateCCW() {
        let newCells = [];
        for (let col = this.size - 1; col >= 0; col--) {
            let newRow = [];
            for (let row = 0; row < this.size; row++) {
                newRow.push(this.cells[row][col]);
            }
            newCells.push(newRow);
        }
        this.cells = newCells;
    }
}

let types = {

    O: [
        ['#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43'],
        ['#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43'],
        ['#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43'],
        ['#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43'],

        ['#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43'],
        ['#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43'],
        ['#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43'],
        ['#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43'],

    ],


    J: [
        ['#f43', '#f43', '#f43', '#f43', null, null, null, null, null, null, null, null],
        ['#f43', '#f43', '#f43', '#f43', null, null, null, null, null, null, null, null],
        ['#f43', '#f43', '#f43', '#f43', null, null, null, null, null, null, null, null],
        ['#f43', '#f43', '#f43', '#f43', null, null, null, null, null, null, null, null],

        ['#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43'],
        ['#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43'],
        ['#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43'],
        ['#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43'],

        [null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null],

    ],


    L: [
        [null, null, null, null, null, null, null, null, '#f43', '#f43', '#f43', '#f43'],
        [null, null, null, null, null, null, null, null, '#f43', '#f43', '#f43', '#f43'],
        [null, null, null, null, null, null, null, null, '#f43', '#f43', '#f43', '#f43'],
        [null, null, null, null, null, null, null, null, '#f43', '#f43', '#f43', '#f43'],

        ['#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43'],
        ['#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43'],
        ['#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43'],
        ['#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43'],

        [null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null],
    ],


    S: [
        [null, null, null, null, '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43'],
        [null, null, null, null, '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43'],
        [null, null, null, null, '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43'],
        [null, null, null, null, '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43'],

        ['#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', null, null, null, null],
        ['#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', null, null, null, null],
        ['#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', null, null, null, null],
        ['#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', null, null, null, null],

        [null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null],
    ],


    Z: [
        ['#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', null, null, null, null],
        ['#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', null, null, null, null],
        ['#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', null, null, null, null],
        ['#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', null, null, null, null],

        [null, null, null, null, '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43'],
        [null, null, null, null, '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43'],
        [null, null, null, null, '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43'],
        [null, null, null, null, '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43'],

        [null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null],
    ],


    T: [
        [null, null, null, null, '#f43', '#f43', '#f43', '#f43', null, null, null, null],
        [null, null, null, null, '#f43', '#f43', '#f43', '#f43', null, null, null, null],
        [null, null, null, null, '#f43', '#f43', '#f43', '#f43', null, null, null, null],
        [null, null, null, null, '#f43', '#f43', '#f43', '#f43', null, null, null, null],


        ['#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43'],
        ['#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43'],
        ['#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43'],
        ['#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43'],


        [null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null],
    ],


    I: [
        [null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null],


        ['#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43'],
        ['#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43'],
        ['#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43'],
        ['#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43', '#f43'],


        [null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null],


    ]

}


function replaceStringIn2DArray(arr, textToReplace, replacementText) {
    const replacedArray = arr.map(row => {
        return row.map(item => {
            if (item === textToReplace) {
                return replacementText;
            }
            return item;
        });
    });
    return replacedArray;
}
