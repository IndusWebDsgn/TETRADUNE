const emojis = document.querySelectorAll('.emoji');
const emojiData = Array.from(emojis).map((_, i) => ({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    vx: 0,
    vy: 0,
    offsetX: (i - 4.5) * 30
}));

const cursor = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const speed = 1;
const friction = 0.95;

document.addEventListener('mousemove', (e) => {
    cursor.x = e.clientX;
    cursor.y = e.clientY;
});

function animate() {
    emojiData.forEach((emoji, index) => {
        const dx = cursor.x + emoji.offsetX - emoji.x;
        const dy = cursor.y - emoji.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 1) {
            emoji.vx += dx * speed / distance;
            emoji.vy += dy * speed / distance;
        }

        emoji.vx *= friction;
        emoji.vy *= friction;

        emoji.x += emoji.vx;
        emoji.y += emoji.vy;

        emojis[index].style.transform = `translate(${emoji.x}px, ${emoji.y}px)`;
    });

    requestAnimationFrame(animate);
}

animate();

