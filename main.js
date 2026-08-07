/* =========================
   GLOBAL SETUP (SAFE)
========================= */

const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d", { alpha: true });

const DPR = Math.min(window.devicePixelRatio || 1, 1.5);
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
const rocketDuration = isMobile ? 6.5 : 10;
let particles = [];
let animationId = null;
let lastFrame = 0;
let bgMusic = null;

function createParticles() {
  const PARTICLE_COUNT = isMobile ? 24 : 60;
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
  if (time - lastFrame < (isMobile ? 50 : 32)) {
    animationId = requestAnimationFrame(animate);
    return;
  }
  lastFrame = time;

  ctx.clearRect(0, 0, cw, ch);
  ctx.fillStyle = "rgba(56, 189, 248, 0.95)";

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
    "if (magic) { createWonder(); }",
    'const glow = "neon";',
    "return <CodeJourney />;",
    "npm run build",
  ];

  const container = document.getElementById("codeParticles");
  if (!container) return;

  // Spawn small bursts (1-2) periodically. Each burst fades in, scales toward viewer, then fades out in place.
  function spawnBurst() {
    // FIX 1: Do not spawn new particles if the user is on another tab
    if (document.hidden) {
      const next = isMobile
        ? 350 + Math.random() * 550
        : 500 + Math.random() * 900;
      setTimeout(spawnBurst, next);
      return;
    }

    const count = isMobile ? 1 : Math.random() < 0.35 ? 2 : 1;
    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      el.className = "code-particle code-burst";
      el.textContent =
        codeSnippets[Math.floor(Math.random() * codeSnippets.length)];

      // position anywhere inside the container (spread across area)
      const left = 8 + Math.random() * 84;
      const top = 8 + Math.random() * 78;
      el.style.setProperty("--start-left", `${left}%`);
      el.style.setProperty("--start-top", `${top}%`);

      // small random size / duration
      el.style.fontSize = `${isMobile ? 0.7 + Math.random() * 0.25 : 0.8 + Math.random() * 0.6}rem`;
      const duration = 1.6 + Math.random() * 1.2;
      el.style.animationDuration = `${duration}s`;

      container.appendChild(el);

      // FIX 2: Use setTimeout for guaranteed cleanup so elements never pile up
      setTimeout(() => {
        if (el.parentNode) el.remove();
      }, duration * 1000);
    }

    // schedule next burst (randomized)
    const next = isMobile
      ? 500 + Math.random() * 700
      : 700 + Math.random() * 1000;
    setTimeout(spawnBurst, next);
  }

  // kick off after slight delay
  setTimeout(spawnBurst, 600);
}

function createHoloCards() {
  const cardTexts = [
    "💻 Full Stack",
    "⚡ Performance",
    "🚀 Modern Web",
    "⚛ React",
    "🐍 Python",
    "🌐 REST APIs",
    "📱 Responsive Design",
    "🧩 Problem Solver",
    "🔒 Secure",
    "♿ Accessibility",
    "☁️ Cloud Ready",
    "🎯 Detail Oriented",
    "📚 Continuous Learning",
    "🤝 Team Player",
    "✨ Interactive",
  ];

  const container = document.getElementById("holoCards");
  if (!container) return;

  const cardCount = isMobile
    ? 6
    : window.matchMedia("(max-width: 1024px)").matches
      ? 8
      : 10;

  const activeCards = [];
  const minSpacing = 30;
  const driftMargin = 12;

  function randomInRange(min, max) {
    return min + Math.random() * (max - min);
  }

  function getContainerBounds() {
    const bounds = container.getBoundingClientRect();
    const style = getComputedStyle(container);
    const paddingLeft = parseFloat(style.paddingLeft) || 0;
    const paddingRight = parseFloat(style.paddingRight) || 0;
    const paddingTop = parseFloat(style.paddingTop) || 0;
    const paddingBottom = parseFloat(style.paddingBottom) || 0;

    return {
      width: bounds.width,
      height: bounds.height,
      minX: paddingLeft + driftMargin,
      maxX: bounds.width - paddingRight - driftMargin,
      minY: paddingTop + driftMargin,
      maxY: bounds.height - paddingBottom - driftMargin,
    };
  }

  function rectsOverlap(a, b) {
    return (
      a.left < b.left + b.width + minSpacing &&
      a.left + a.width + minSpacing > b.left &&
      a.top < b.top + b.height + minSpacing &&
      a.top + a.height + minSpacing > b.top
    );
  }

  function pickValidPosition(cardWidth, cardHeight) {
    const bounds = getContainerBounds();
    const attempts = 100;
    const maxX = Math.max(bounds.minX, bounds.maxX - cardWidth);
    const maxY = Math.max(bounds.minY, bounds.maxY - cardHeight);

    for (let attempt = 0; attempt < attempts; attempt += 1) {
      const leftPx = randomInRange(bounds.minX, maxX);
      const topPx = randomInRange(bounds.minY, maxY);
      const candidate = {
        left: leftPx,
        top: topPx,
        width: cardWidth,
        height: cardHeight,
      };

      const collision = activeCards.some((existing) =>
        rectsOverlap(candidate, existing),
      );
      if (!collision) {
        return {
          leftPx,
          topPx,
          left: (leftPx / bounds.width) * 100,
          top: (topPx / bounds.height) * 100,
        };
      }
    }

    return {
      leftPx: bounds.minX,
      topPx: bounds.minY,
      left: (bounds.minX / bounds.width) * 100,
      top: (bounds.minY / bounds.height) * 100,
    };
  }

  function createCard(index) {
    const card = document.createElement("div");
    card.className = "holo-card";
    card.innerHTML = `<span>${cardTexts[index % cardTexts.length]}</span>`;
    container.appendChild(card);

    const cardWidth = randomInRange(isMobile ? 110 : 170, isMobile ? 150 : 250);
    card.style.setProperty("--card-width", `${cardWidth}px`);
    const cardHeight = card.getBoundingClientRect().height || 52;

    const position = pickValidPosition(cardWidth, cardHeight);
    const rotation = randomInRange(-3, 3);
    const driftX = randomInRange(-8, 8);
    const driftY = randomInRange(-8, 8);
    const rotDelta = randomInRange(-1.2, 1.2);
    const duration = randomInRange(isMobile ? 3.2 : 4.5, isMobile ? 4.2 : 5.8);
    const delay = randomInRange(0, isMobile ? 1.2 : 2.2);

    card.style.setProperty("--card-top", `${position.top}%`);
    card.style.setProperty("--card-left", `${position.left}%`);
    card.style.setProperty("--card-rotation", `${rotation}deg`);
    card.style.setProperty("--card-drift-x", `${driftX}px`);
    card.style.setProperty("--card-drift-y", `${driftY}px`);
    card.style.setProperty("--card-rot-delta", `${rotDelta}deg`);
    card.style.animation = `holoFloat ${duration}s ease-in-out ${delay}s both`;

    activeCards.push({
      element: card,
      left: position.leftPx,
      top: position.topPx,
      width: cardWidth,
      height: cardHeight,
    });

    card.addEventListener("animationend", () => {
      const indexToRemove = activeCards.findIndex(
        (item) => item.element === card,
      );
      if (indexToRemove !== -1) activeCards.splice(indexToRemove, 1);

      if (card.parentNode) {
        card.remove();
        createCard(index + cardCount);
      }
    });
  }

  for (let i = 0; i < cardCount; i += 1) {
    createCard(i);
  }
}

function initPage() {
  createParticles();
  requestAnimationFrame(() => requestAnimationFrame(animate));
  createCodeParticles();
  createHoloCards();
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
  '  name: <span class="token-string">"Abdalla Zahra"</span>,',
  '  role: <span class="token-string">"Front-End Developer"</span>,',
  '  skills: <span class="token-keyword">[</span><span class="token-string">"HTML"</span>, <span class="token-string">"CSS"</span>, <span class="token-string">"JavaScript"</span>, <span class="token-string">"SQL"</span>, <span class="token-string">"Git"</span><span class="token-keyword">]</span>,',
  '  passion: <span class="token-string">"Creating beautiful & magical UIs"</span>',
  "};",
  "",
];

let lineIndex = 0;
let charIndex = 0;
const output = document.getElementById("code-output");

function typeLine() {
  if (!output || lineIndex >= codeLines.length) return;

  const line = codeLines[lineIndex];
  if (charIndex < line.length) {
    output.innerHTML += line[charIndex++];
    setTimeout(typeLine, isMobile ? 60 : 40);
  } else {
    output.innerHTML += "\n";
    charIndex = 0;
    lineIndex++;
    setTimeout(typeLine, isMobile ? 260 : 200);
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

    document.querySelector(".welcome")?.classList.add("launch-started");

    requestAnimationFrame(() => {
      rocket.style.animation = `flyAcross ${rocketDuration}s ease-in-out forwards`;
    });

    sound?.play().catch(() => {});
    startBackgroundMusic(isMobile ? 1500 : 2000);
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

function startBackgroundMusic(delay = 0) {
  if (!bgMusic) return;

  setTimeout(() => {
    bgMusic.currentTime = 0;
    const playPromise = bgMusic.play();
    if (playPromise) {
      playPromise
        .then(() => {
          bgMusic.volume = 0.06;
        })
        .catch(() => {});
    } else {
      bgMusic.volume = 0.06;
    }
  }, delay);
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.__bg_music__) return;
  window.__bg_music__ = true;

  const music = document.createElement("audio");
  music.src = "images/1025.m4a";
  music.loop = true;
  music.volume = 0;
  document.body.appendChild(music);

  bgMusic = music;

  const fadeInMusic = () => {
    const fade = setInterval(() => {
      music.volume = Math.min(0.06, music.volume + 0.008);
      if (music.volume >= 0.06) clearInterval(fade);
    }, 120);
  };

  if (isMobile) {
    startBackgroundMusic(0);
    window.addEventListener(
      "pointerdown",
      () => {
        startBackgroundMusic(0);
      },
      { once: true, passive: true },
    );
  }

  const toggle = document.getElementById("music-toggle");
  toggle?.addEventListener("click", () => {
    if (music.paused) {
      startBackgroundMusic();
      fadeInMusic();
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
    el.style.visibility = "visible";
    el.style.top = "-150px";
    el.style.animation = "fall 11s linear forwards";
  });
}
