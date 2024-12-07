function draw() {
    for (let i = 0; i < touches.length; i++) {
        let touchX = touches[i].x;
        let touchY = touches[i].y;
        const currentTime = millis();
        const timeSinceLastTouch = currentTime - lastTouchTime;
        if (timeSinceLastTouch > debounceDelay) {
            if (touchY < totalHeight / 4) {
                fallingPiece.rotateCW();
                if (!playfield.isValid(fallingPiece)) fallingPiece.rotateCCW();
            }
        }
        lastTouchTime = currentTime;
        if (touchX < totalWidth / 4) {
            fallingPiece.moveLeft();
            if (!playfield.isValid(fallingPiece)) fallingPiece.moveRight();
        } else if (touchX > (totalWidth / 4) * 3) {
            fallingPiece.moveRight();
            if (!playfield.isValid(fallingPiece)) fallingPiece.moveLeft();
        } else if (touchY > (totalHeight / 4) * 3) {
            fallingPiece.moveDown();
            if (!playfield.isValid(fallingPiece)) fallingPiece.moveUp();
            else fallingPiece.resetBuffer();
        }
    }
    let curr = millis();
    let delta = curr - prev;
    prev = curr;
    if (!paused) {
        fallingPiece.update(delta);
    }
    if (fallingPiece.timeToFall()) {
        fallingPiece.resetBuffer();
        fallingPiece.moveDown();
        if (!playfield.isValid(fallingPiece)) {
            fallingPiece.moveUp();
            spawnNewPiece();
        }
    }
    playfield.clearLines();
    background(251);
    automatonRules(playfield.grid);
    playfield.show();
    fallingPiece.show();
}
