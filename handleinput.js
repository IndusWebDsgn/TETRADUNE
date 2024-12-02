document.addEventListener('keydown', event => {
    if ([32, 37, 38, 39, 40].includes(event.keyCode)) event.preventDefault();
    switch (event.keyCode) {
        case 40:
            fallingPiece.moveDown();
            if (!playfield.isValid(fallingPiece)) fallingPiece.moveUp();
            else fallingPiece.resetBuffer();
            break;
        case 38:
            fallingPiece.rotateCW();
            if (!playfield.isValid(fallingPiece)) fallingPiece.rotateCCW();
            break;
        case 37:
            fallingPiece.moveLeft();
            if (!playfield.isValid(fallingPiece)) fallingPiece.moveRight();
            break;
        case 39:
            fallingPiece.moveRight();
            if (!playfield.isValid(fallingPiece)) fallingPiece.moveLeft();
            break;
    }
});
