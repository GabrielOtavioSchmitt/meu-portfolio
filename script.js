document.addEventListener("DOMContentLoaded", () => {

  /* ================= ELEMENTOS ================= */

  const menu = document.getElementById("menu");
  const hamburger = document.getElementById("hamburger");

  const canvas = document.getElementById("bg");
  const ctx = canvas?.getContext("2d");

  const track = document.querySelector(".project-track");
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");
  const slides = document.querySelectorAll(".project-track img");
  const projectsSection = document.querySelector("#projects");

  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("imgModalContent");
  const closeModal = document.querySelector(".close-modal");

  /* ================= MENU ================= */

  function initMenu() {
    if (!menu || !hamburger) return;

    hamburger.addEventListener("click", () => {
      menu.classList.toggle("active");
    });
  }

  /* ================= PARTICLES ================= */

  function initParticles() {
    if (!canvas || !ctx) return;

    let w, h;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

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

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.35)";
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 140) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,255,255,${1 - dist / 140})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();
  }

  /* ================= SLIDER ================= */

  const state = {
    index: 0,
    dots: []
  };

  function initSlider() {
    if (!track || !slides.length) return;

    const dotsContainer = document.createElement("div");
    dotsContainer.className = "dots";
    projectsSection?.appendChild(dotsContainer);

    slides.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.className = "dot";

      dot.addEventListener("click", () => {
        state.index = i;
        updateSlider();
      });

      dotsContainer.appendChild(dot);
      state.dots.push(dot);
    });

    prev?.addEventListener("click", () => {
      if (state.index > 0) state.index--;
      updateSlider();
    });

    next?.addEventListener("click", () => {
      if (state.index < slides.length - 1) state.index++;
      updateSlider();
    });

    let startX = 0;

    track.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    track.addEventListener("touchend", (e) => {
      const diff = startX - e.changedTouches[0].clientX;

      if (diff > 50 && state.index < slides.length - 1) state.index++;
      if (diff < -50 && state.index > 0) state.index--;

      updateSlider();
    });

    updateSlider();
  }

  function updateSlider() {
    track.style.transform = `translateX(-${state.index * 100}%)`;

    state.dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === state.index);
    });
  }

  /* ================= FULLSCREEN ================= */

  function initFullscreen() {
    if (!modal || !modalImg) return;

    document.querySelectorAll(".project-track img").forEach(img => {
      img.addEventListener("click", () => {
        modal.classList.add("active");
        modalImg.src = img.src;
      });
    });

    closeModal?.addEventListener("click", () => {
      modal.classList.remove("active");
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("active");
    });
  }

  /* ================= INIT ================= */

  initMenu();
  initParticles();
  initSlider();
  initFullscreen();

});