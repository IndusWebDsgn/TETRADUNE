function spawnNewPiece() {
    if (fallingPiece) {
        playfield.addToGrid(fallingPiece);
    }
    const pieces = ['O', 'J', 'L', 'S', 'Z', 'T', 'I'];
    const choice = random(pieces);
    fallingPiece = new Piece(choice, playfield);
    redraw();
}
