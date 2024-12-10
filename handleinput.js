document.addEventListener('keydown', event => {
    if ([32, 37, 38, 39, 40, 65, 87, 68, 83].includes(event.keyCode)) {
        event.preventDefault();
    }

    switch (event.keyCode) {
        case 40: // Arrow Down
        case 83: // S
            fallingPiece.moveDown();
            if (!playfield.isValid(fallingPiece)) fallingPiece.moveUp();
            else fallingPiece.resetBuffer();
            break;

        case 38: // Arrow Up
        case 87: // W
            fallingPiece.rotateCW();
            if (!playfield.isValid(fallingPiece)) fallingPiece.rotateCCW();
            break;

        case 37: // Arrow Left
        case 65: // A
            fallingPiece.moveLeft();
            if (!playfield.isValid(fallingPiece)) fallingPiece.moveRight();
            break;

        case 39: // Arrow Right
        case 68: // D
            fallingPiece.moveRight();
            if (!playfield.isValid(fallingPiece)) fallingPiece.moveLeft();
            break;
    }
});
