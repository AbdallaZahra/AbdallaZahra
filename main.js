/* =========================
   GLOBAL SETUP
========================= */
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* =========================
   CANVAS PARTICLES (OPTIMIZED)
========================= */
const particles = [];
for (let i = 0; i < 100; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5,
  });
}

let animationId = null;
let lastFrame = 0;

function animate(time = 0) {
  if (time - lastFrame < 33) {
    animationId = requestAnimationFrame(animate);
    return;
  }
  lastFrame = time;

  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0ff";
  for (const p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if (p.x <= 0 || p.x >= canvas.width) p.dx *= -1;
    if (p.y <= 0 || p.y >= canvas.height) p.dy *= -1;
  }

  animationId = requestAnimationFrame(animate);
}

animate();

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    cancelAnimationFrame(animationId);
  } else {
    animate();
  }
});

window.addEventListener(
  "resize",
  () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  },
  { passive: true }
);

/* =========================
   TYPEWRITER EFFECT
========================= */
const codeLines = [
  "const developer = {",
  '  name: "Abdalla Zahra",',
  '  role: "Front-End Developer",',
  '  skills: ["HTML", "CSS", "JavaScript", "React", "Git"],',
  '  passion: "Creating beautiful & magical UIs"',
  "};",
  "",
  "function showCodeLove() {",
  '  console.log("Welcome to my world of code ✨");',
  "}",
  "",
  "showCodeLove();",
];

let lineIndex = 0;
let charIndex = 0;
const output = document.getElementById("code-output");

function typeLine() {
  if (lineIndex >= codeLines.length) return;

  const line = codeLines[lineIndex];
  if (charIndex < line.length) {
    output.textContent += line[charIndex++];
    setTimeout(typeLine, 40);
  } else {
    output.textContent += "\n";
    charIndex = 0;
    lineIndex++;
    setTimeout(typeLine, 200);
  }
}
typeLine();

/* =========================
   FLOATING CODE PARTICLES
========================= */
const codeSnippets = [
  'console.log("Hello World");',
  '<div class="magic"></div>',
  "let x = 42;",
  'const design = "clean";',
  "function animate() {}",
  ".className { color: #0ff; }",
  "const dev = true;",
  "body { margin: 0; }",
  "if (cool) { code(); }",
  "return <CodeSnippet />;",
];

const container = document.getElementById("codeParticles");
for (let i = 0; i < 50; i++) {
  const el = document.createElement("div");
  el.className = "code-particle";
  el.style.left = Math.random() * 100 + "vw";
  el.style.top = Math.random() * 100 + "vh";
  el.style.fontSize = 0.8 + Math.random() * 1.5 + "rem";
  el.style.animationDuration = 5 + Math.random() * 5 + "s";
  el.textContent =
    codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
  container.appendChild(el);
}

/* =========================
   SCROLL TO TOP (PASSIVE)
========================= */
window.addEventListener(
  "scroll",
  () => {
    const btn = document.querySelector(".scroll-top");
    btn?.classList.toggle("show", window.scrollY > 300);
  },
  { passive: true }
);

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* =========================
   INTERSECTION OBSERVER (REUSED)
========================= */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(
      (e) => e.isIntersecting && e.target.classList.add("visible")
    );
  },
  { threshold: 0.2 }
);

document
  .querySelectorAll(".fade-in, .project-card")
  .forEach((el) => observer.observe(el));

/* =========================
   ROCKET LAUNCH (INP SAFE)
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const rocket = document.getElementById("rocket");
  const sound = document.getElementById("rocketSound");
  rocket.style.display = "none";

  const overlay = document.createElement("div");
  overlay.textContent = "Tap to launch the rocket 🚀";
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,.8);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: sans-serif;
    cursor: pointer;
    z-index: 9999;
    text-align: center;
    padding: 1.5rem;
  `;

  document.body.appendChild(overlay);

  overlay.addEventListener(
    "click",
    () => {
      overlay.remove();
      rocket.style.display = "block";

      requestAnimationFrame(() => {
        rocket.style.animation = "none";
        requestAnimationFrame(() => {
          rocket.style.animation = "flyAcross 7s ease-in-out forwards";
        });
      });

      setTimeout(() => {
        sound.currentTime = 0;
        sound.play().catch(() => {});
      }, 100);
    },
    { once: true }
  );
});

/* =========================
   BACKGROUND MUSIC (SAFE)
========================= */
document.addEventListener("DOMContentLoaded", () => {
  if (window.__bg_music_initialized__) return;
  window.__bg_music_initialized__ = true;

  const music = document.createElement("audio");
  music.src = "images/1025.MP3";
  music.loop = true;
  music.volume = 0;
  document.body.appendChild(music);

  let fadeInterval = null;

  function fadeIn(target = 0.06, step = 0.01) {
    clearInterval(fadeInterval);
    fadeInterval = setInterval(() => {
      music.volume = Math.min(target, music.volume + step);
      if (music.volume >= target) clearInterval(fadeInterval);
    }, 100);
  }

  setTimeout(() => {
    music
      .play()
      .then(() => fadeIn())
      .catch(() => {});
  }, 8000);

  document.body.addEventListener(
    "click",
    () => music.paused && music.play().catch(() => {}),
    { once: true, passive: true }
  );

  const toggle = document.getElementById("music-toggle");
  toggle?.addEventListener("click", () => {
    if (music.paused) {
      music.play().catch(() => {});
      toggle.textContent = "🔊";
    } else {
      music.pause();
      toggle.textContent = "🔇";
    }
  });
});

/* =========================
   FALLING SHIPS
========================= */
window.addEventListener("load", () => {
  ["ship1", "ship2"].forEach((id) => {
    const el = document.getElementById(id);
    el &&
      setTimeout(() => {
        el.style.animation = "fall 11s linear forwards";
      }, 5000);
  });
});





