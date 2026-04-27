const menu = document.getElementById("menu");
const btn = document.getElementById("hamburger");

/* =========================
   MENU HAMBURGER
========================= */

btn.addEventListener("click", (e) => {
  e.stopPropagation();
  menu.classList.toggle("active");
});

/* fechar menu ao clicar em links */
document.querySelectorAll(".menu a").forEach(link => {
  link.addEventListener("click", () => {
    menu.classList.remove("active");
  });
});

/* fechar ao clicar fora */
document.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && !btn.contains(e.target)) {
    menu.classList.remove("active");
  }
});

/* =========================
   REVEAL ANIMATION
========================= */

const items = document.querySelectorAll(".reveal");

function reveal() {
  const trigger = window.innerHeight * 0.85;

  items.forEach(el => {
    const top = el.getBoundingClientRect().top;

    if (top < trigger) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", reveal);
reveal();

/* =========================
   BACKGROUND FUTURISTA (MODERNO)
========================= */

const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

let w, h;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

/* mouse suavizado (efeito premium) */
let mouse = { x: w / 2, y: h / 2 };
let target = { x: w / 2, y: h / 2 };

window.addEventListener("mousemove", (e) => {
  target.x = e.clientX;
  target.y = e.clientY;
});

/* partículas mais leves e modernas */
let particles = Array.from({ length: 100 }, () => ({
  x: Math.random() * w,
  y: Math.random() * h,
  vx: (Math.random() - 0.5) * 0.25,
  vy: (Math.random() - 0.5) * 0.25,
  r: Math.random() * 1.2 + 0.3
}));

function animate() {
  ctx.clearRect(0, 0, w, h);

  /* suaviza movimento do mouse */
  mouse.x += (target.x - mouse.x) * 0.08;
  mouse.y += (target.y - mouse.y) * 0.08;

  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];

    p.x += p.vx;
    p.y += p.vy;

    /* leve atração pelo mouse */
    let dx = mouse.x - p.x;
    let dy = mouse.y - p.y;
    let dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 180) {
      p.x -= dx * 0.0009;
      p.y -= dy * 0.0009;
    }

    /* bordas */
    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;

    /* partículas */
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    ctx.fill();

    /* conexões suaves */
    for (let j = i + 1; j < particles.length; j++) {
      let p2 = particles[j];
      let dx2 = p.x - p2.x;
      let dy2 = p.y - p2.y;
      let d = Math.sqrt(dx2 * dx2 + dy2 * dy2);

      if (d < 140) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255,255,255,${0.08 * (1 - d / 140)})`;
        ctx.lineWidth = 1;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}

animate();

/* =========================
   CARD 3D EFFECT (mantido seguro)
========================= */

document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y / rect.height - 0.5) * -10;
    const rotateY = (x / rect.width - 0.5) * 10;

    card.style.transform = `
      perspective(800px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.05)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "scale(1)";
  });
});