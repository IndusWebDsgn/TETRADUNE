class Playfield { 
    constructor(w, h) {
        this.foreground = "#1074869c";
        this.background = "#1074869c";
        this.cols = w;
        this.rows = h;
        this.grid = Array(h).fill().map(() => Array(w).fill(this.foreground));
        this.cellSize = select('#canvasBox').width / w;
        this.borderSize = 2;
        this.gridlines = false;
    }

    addToGrid(piece) {
        piece.cells.forEach((row, r) => row.forEach((cell, c) => {
            if (cell) this.grid[piece.y + r][piece.x + c] = cell;
        }));
    }

    isValid(piece) {
        return piece.cells.every((row, r) => row.every((cell, c) => {
            if (!cell) return true;
            let [y, x] = [piece.y + r, piece.x + c];
            return y >= 0 && y < this.rows && x >= 0 && x < this.cols && this.grid[y][x] === this.foreground;
        }));
    }

    show() {
        let { cellSize: cs, borderSize: bs } = this;
        let offset = Math.floor(bs / 2);

        fill(this.gridlines ? this.background : this.foreground);
        stroke(this.background);
        strokeWeight(bs);
        rect(offset, offset, cs * this.cols + bs - 1, cs * this.rows + bs - 1);

        this.grid.forEach((row, r) => row.forEach((cell, c) => {
            stroke(cell);
            fill(cell);
            rect(cs * c + offset, cs * r + offset, cs - 1, cs - 1);
        }));
    }

    clearLines() {
        linetest();
    }
}

