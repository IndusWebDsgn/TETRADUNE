let playfield;
let fallingPiece;
let paused = false;
let prev = 0;
let score = 0;
let difficulty = "Intermediate";
let totalWidth;
let totalHeight;
let lastTouchTime = 0;
const debounceDelay = 10;

const width = 40;
const height = 70;
