/* =========================
   GLOBAL SETUP (SAFE)
========================= */

const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d", { alpha: false });

const DPR = Math.min(window.devicePixelRatio || 1, 2);
let cw = 0;
let ch = 0;

function resizeCanvas() {
  cw = window.innerWidth;
  ch = window.innerHeight;

  canvas.style.width = cw + "px";
  canvas.style.height = ch + "px";

  canvas.width = Math.floor(cw * DPR);
  canvas.height = Math.floor(ch * DPR);

  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
}
resizeCanvas();

/* =========================
   CANVAS PARTICLES (MOBILE AWARE)
========================= */

const isMobile = window.matchMedia("(max-width: 768px)").matches;
const rocketDuration = isMobile ? 4.5 : 7;
let particles = [];
let animationId = null;
let lastFrame = 0;
let bgMusic = null;

function createParticles() {
  const PARTICLE_COUNT = isMobile ? 40 : 100;
  particles = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * cw,
      y: Math.random() * ch,
      r: Math.random() * 2,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
    });
  }
}

function animate(time = 0) {
  if (time - lastFrame < 32) {
    animationId = requestAnimationFrame(animate);
    return;
  }
  lastFrame = time;

  ctx.clearRect(0, 0, cw, ch);
  ctx.fillStyle = "#0ff";

  for (const p of particles) {
    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > cw) p.dx *= -1;
    if (p.y < 0 || p.y > ch) p.dy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  }

  animationId = requestAnimationFrame(animate);
}

function createCodeParticles() {
  const codeSnippets = [
    'console.log("Hello World");',
    '<div class="magic"></div>',
    "let x = 42;",
    'const design = "clean";',
    "function animate() {}",
    ".className { color: #0ff; }",
  ];

  const container = document.getElementById("codeParticles");
  const CODE_PARTICLES = isMobile ? 20 : 50;
  if (!container) return;

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < CODE_PARTICLES; i++) {
    const el = document.createElement("div");
    el.className = "code-particle";
    el.style.left = Math.random() * 100 + "vw";
    el.style.top = Math.random() * 100 + "vh";
    el.style.fontSize = 0.8 + Math.random() * 1.2 + "rem";
    el.style.animationDuration = 6 + Math.random() * 4 + "s";
    el.textContent =
      codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    fragment.appendChild(el);
  }

  container.appendChild(fragment);
}

function initPage() {
  createParticles();
  requestAnimationFrame(() => requestAnimationFrame(animate));
  createCodeParticles();
  setupIntersectionObserver();
  setupRocketLaunch();
}

function scheduleStartup() {
  const safeIdleCallback =
    window.requestIdleCallback?.bind(window) ||
    ((callback) => window.setTimeout(callback, 300));

  requestAnimationFrame(initPage);
  safeIdleCallback(typeLine);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", scheduleStartup);
} else {
  scheduleStartup();
}

function setupIntersectionObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) e.target.classList.add("visible");
      }
    },
    { threshold: 0.2 },
  );

  document
    .querySelectorAll(".fade-in, .project-card")
    .forEach((el) => observer.observe(el));
}

window.addEventListener("visibilitychange", () => {
  if (document.hidden) cancelAnimationFrame(animationId);
  else requestAnimationFrame(animate);
});

/* Debounced resize (no reflow spam) */
let resizeTimer = null;
window.addEventListener(
  "resize",
  () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resizeCanvas, 150);
  },
  { passive: true },
);

/* =========================
   TYPEWRITER EFFECT (IDLE SAFE)
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

/* =========================
   SCROLL TO TOP (PASSIVE)
========================= */

const scrollBtn = document.querySelector(".scroll-top");
window.addEventListener(
  "scroll",
  () => {
    if (!scrollBtn) return;
    scrollBtn.classList.toggle("show", window.scrollY > 300);
  },
  { passive: true },
);

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* =========================
   ROCKET LAUNCH (INP SAFE)
========================= */

function setupRocketLaunch() {
  if (document.getElementById("rocket-launch-overlay")) return;

  const rocket = document.getElementById("rocket");
  const sound = document.getElementById("rocketSound");
  if (!rocket) return;

  rocket.style.display = "none";

  const overlay = document.createElement("div");
  overlay.id = "rocket-launch-overlay";
  overlay.textContent = "Tap to launch the rocket 🚀";
  overlay.style.cssText = `
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.85);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(1rem, 4vw, 1.6rem);
  font-weight: 600;
  z-index: 100000;
  cursor: pointer;
  pointer-events: auto;
`;

  document.body.appendChild(overlay);

  const launchRocket = (event) => {
    event.preventDefault();
    overlay.remove();
    rocket.style.display = "block";
    rocket.style.opacity = "1";
    rocket.style.visibility = "visible";

    requestAnimationFrame(() => {
      rocket.style.animation = `flyAcross ${rocketDuration}s ease-in-out forwards`;
    });

    sound?.play().catch(() => {});
    bgMusic?.play().catch(() => {});
    startFallingShips();
  };

  overlay.addEventListener("click", launchRocket, {
    once: true,
    passive: false,
  });
  overlay.addEventListener("touchstart", launchRocket, {
    once: true,
    passive: false,
  });
}

/* =========================
   BACKGROUND MUSIC (SAFE)
========================= */

document.addEventListener("DOMContentLoaded", () => {
  if (window.__bg_music__) return;
  window.__bg_music__ = true;

  const music = document.createElement("audio");
  music.src = "images/1025.MP3";
  music.loop = true;
  music.volume = 0;
  document.body.appendChild(music);

  bgMusic = music;

  const fadeInMusic = () => {
    const fade = setInterval(() => {
      music.volume = Math.min(0.06, music.volume + 0.01);
      if (music.volume >= 0.06) clearInterval(fade);
    }, 100);
  };

  music
    .play()
    .then(fadeInMusic)
    .catch(() => {
      /* will start on user interaction */
    });

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
   FALLING SHIPS (IDLE)
========================= */

function startFallingShips() {
  ["ship1", "ship2"].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.opacity = "1";
    el.style.animation = "fall 11s linear forwards";
  });
}

window.addEventListener("load", () => {
  const safeIdleCallback =
    window.requestIdleCallback?.bind(window) ||
    ((callback) => window.setTimeout(callback, 200));

  safeIdleCallback(startFallingShips);
});
