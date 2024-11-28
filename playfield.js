class Playfield {
    constructor(w, h) {
        this.foreground = "#2210869c";
        this.background = "#2210869c";
        this.cols = w;
        this.rows = h;
        this.grid = Array.from({ length: h }, () => Array(w).fill(this.foreground));
        this.cellSize = select('#canvasBox').width / w;
        this.borderSize = 2;
        this.gridlines = false;
    }

    addToGrid(piece) {
        for (let row = 0; row < piece.size; row++) {
            for (let col = 0; col < piece.size; col++) {
                if (piece.cells[row][col] != null) {
                    this.grid[piece.y + row][piece.x + col] = piece.cells[row][col];
                }
            }
        }
    }

    clearLines() {
        linetest();
    }

    isValid(piece) {
        for (let row = 0; row < piece.size; row++) {
            for (let col = 0; col < piece.size; col++) {
                if (piece.cells[row][col] != null) {
                    let gridRow = piece.y + row, gridCol = piece.x + col;
                    if (gridRow < 0 || gridRow >= this.rows || gridCol < 0 || gridCol >= this.cols || this.grid[gridRow][gridCol] != this.foreground)
                        return false;
                }
            }
        }
        return true;
    }

    show() {
        let cs = this.cellSize, bs = this.borderSize;
        let offset = floor(bs / 2);

        fill(this.gridlines ? this.background : this.foreground);
        stroke(this.background);
        strokeWeight(bs);
        rect(offset, offset, cs * this.cols + bs - 1, cs * this.rows + bs - 1);

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                stroke(this.grid[row][col]);
                fill(this.grid[row][col]);
                rect(cs * col + offset, cs * row + offset, cs - 1, cs - 1);
            }
        }
    }
}
