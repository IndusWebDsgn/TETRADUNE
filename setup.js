function setup() {
    playfield = new Playfield(width, height);
    totalWidth = playfield.cellSize * width + playfield.borderSize * 2;
    totalHeight = playfield.cellSize * height + playfield.borderSize * 2;
    const canvas = createCanvas(totalWidth, totalHeight);
    canvas.parent('canvasBox');
    spawnNewPiece();
}
