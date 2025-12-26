const c = document.getElementById('c');
const ctx = c.getContext('2d');
let particles = [];

function resizeCanvas(){
    c.width = window.innerWidth;
    c.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function burst(x,y){
    const colors =[
        "#ff4d4d",
        "#ffd24d",
        "#4da6ff",
        "#8fffb0",
        "#ff66cc"
    ];
    for(let i = 0; i < 120; i++){
        const angle = (Math.PI * 2) * (i / 120);
        const speed = Math.random() * 6 + 2;
        particles.push({
            x,y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 100,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 3 + 1
        });
    }
}

c.addEventListener('click', e => burst(e.offsetX,e.offsetY));

// Auto fireworks every 2 seconds
setInterval(()=>{
    burst(
        Math.random() * c.width,
        Math.random() * c.height * 0.6
    );
},2000);

function loop(){
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(0, 0, c.width, c.height);

    particles.forEach(p => {
        ctx.globalAlpha = p.life / 100;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05; // gravity
        p.life--;
    });

    particles = particles.filter(p => p.life > 0);
    ctx.globalAlpha = 1;

    requestAnimationFrame(loop);
}
loop();