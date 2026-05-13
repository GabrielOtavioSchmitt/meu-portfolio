/* ========================= */
/* MENU HAMBURGER */
/* ========================= */

const menu = document.getElementById("menu");
const btn = document.getElementById("hamburger");

btn.addEventListener("click", (e) => {
  e.stopPropagation();
  menu.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && !btn.contains(e.target)) {
    menu.classList.remove("active");
  }
});

/* ========================= */
/* CANVAS (PARTÍCULAS PREMIUM) */
/* ========================= */

const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

let w, h;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

const particles = [];
const COUNT = 65;

for (let i = 0; i < COUNT; i++) {
  particles.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    r: Math.random() * 1.2 + 0.3
  });
}

const mouse = { x: null, y: null };

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function animate() {
  ctx.clearRect(0, 0, w, h);

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];

    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;

    if (mouse.x) {
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 150) {
        const force = (150 - dist) / 150;
        p.x -= dx * force * 0.01;
        p.y -= dy * force * 0.01;
      }
    }

    // ponto
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    ctx.fill();

    // linhas
    for (let j = i + 1; j < particles.length; j++) {
      const p2 = particles[j];

      const dx = p.x - p2.x;
      const dy = p.y - p2.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 140) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255,255,255,${1 - dist / 140})`;
        ctx.lineWidth = 0.6;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }
  } // <- FECHA FOR

  requestAnimationFrame(animate);
}

animate();

/* ========================= */
/* MODAL (BOTÃO WHATSAPP) */
/* ========================= */

const modal = document.getElementById("contactModal");
const openBtn = document.querySelector(".whatsapp");
const closeBtn = document.getElementById("closeModal");

if (openBtn && modal) {
  openBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "flex";
  });
}

if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});