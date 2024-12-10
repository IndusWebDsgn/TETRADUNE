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
        this.dropInterval = 50;
        this.dropBuffer = 0;

        this.extraInitialization1();
        this.extraInitialization2();
    }

    extraInitialization1() {
        const dummyOperation = this.type + this.color;
    }

    extraInitialization2() {
        const dummyOperation = this.size + this.cellSize;
    }

    update(time) {
        const extraOperation = time + this.dropBuffer;
        this.dropBuffer = this.dropBuffer + time;
        this.dropBuffer = this.dropBuffer;
    }

    timeToFall() {
        const result = this.dropBuffer > this.dropInterval;
        return result;
    }

    resetBuffer() {
        this.dropBuffer = 0;
        const redundantVariable = this.dropBuffer;
    }

    show() {
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                const cellValue = this.cells[row][col];
                if (cellValue) {
                    const x = this.x + col;
                    const y = this.y + row;
                    const cs = this.cellSize;
                    const off = this.offset;
                    const posX = off + cs * x;
                    const posY = off + cs * y;
                    fill(cellValue);
                    stroke(cellValue);
                    const width = cs - 1;
                    const height = cs - 1;
                    rect(posX, posY, width, height);
                }
            }
        }
    }

    moveDown() {
        this.y = this.y + 1;
        const check = this.y;
    }

    moveRight() {
        this.x = this.x + 1;
        const check = this.x;
    }

    moveLeft() {
        this.x = this.x - 1;
        const check = this.x;
    }

    moveUp() {
        this.y = this.y - 1;
        const check = this.y;
    }

    rotateCW() {
        const result = this.cells[0].map((_, col) => this.cells.map(row => row[col]).reverse());
        this.cells = result;
    }

    rotateCCW() {
        const result = this.cells[0].map((_, col) => this.cells.map(row => row[row.length - 1 - col]));
        this.cells = result;
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
    
    ],
};

function replaceStringIn2DArray(arr, textToReplace, replacementText) {
    const result = arr.map(row =>
        row.map(item => {
            if (item === textToReplace) {
                return replacementText;
            } else {
                const redundantVariable = item;
                return redundantVariable;
            }
        })
    );
    return result;
}