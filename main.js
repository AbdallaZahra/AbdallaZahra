// ===================== 🔷 Background Canvas Animation =====================
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
for (let i = 0; i < 100; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5
  });
}

function animate() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#0ff";

  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    // Bounce off edges
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });

  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ===================== 🔷 Typing Code Effect =====================
const codeLines = [
  'const developer = {',
  '  name: "Abdalla Zahra",',
  '  role: "Front-End Developer",',
  '  skills: ["HTML", "CSS", "JavaScript", "React", "Git"],',
  '  passion: "Creating beautiful & magical UIs"',
  '};',
  '',
  'function showCodeLove() {',
  '  console.log("Welcome to my world of code ✨");',
  '}',
  '',
  'showCodeLove();'
];

let lineIndex = 0;
let charIndex = 0;
const output = document.getElementById("code-output");

function typeLine() {
  if (lineIndex < codeLines.length) {
    const line = codeLines[lineIndex];

    if (charIndex < line.length) {
      output.textContent += line[charIndex];
      charIndex++;
      setTimeout(typeLine, 40);
    } else {
      output.textContent += "\n";
      charIndex = 0;
      lineIndex++;
      setTimeout(typeLine, 200);
    }
  }
}
typeLine();

// ===================== 🔷 Floating Code Particles =====================
const codeSnippets = [
  'console.log("Hello World");',
  '<div class="magic"></div>',
  'let x = 42;',
  'const design = "clean";',
  'function animate() {}',
  '.className { color: #0ff; }',
  'const dev = true;',
  'body { margin: 0; }',
  'if (cool) { code(); }',
  'return <CodeSnippet />;'
];

const container = document.getElementById("codeParticles");
for (let i = 0; i < 50; i++) {
  const particle = document.createElement("div");
  particle.className = "code-particle";
  particle.style.left = Math.random() * 100 + "vw";
  particle.style.top = Math.random() * 100 + "vh";
  particle.style.fontSize = Math.random() * 1.5 + 0.8 + "rem";
  particle.style.animationDuration = 5 + Math.random() * 5 + "s";
  particle.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
  container.appendChild(particle);
}

// ===================== 🔷 Scroll-to-Top Button =====================
window.addEventListener("scroll", () => {
  const scrollBtn = document.querySelector(".scroll-top");
  if (window.scrollY > 300) scrollBtn.classList.add("show");
  else scrollBtn.classList.remove("show");
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ===================== 🔷 Fade-In on Scroll =====================
document.addEventListener("DOMContentLoaded", () => {
  const fadeElements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.2 });

  fadeElements.forEach(el => observer.observe(el));
});

// ===================== 🔷 Rocket Launch Animation =====================
window.addEventListener("DOMContentLoaded", () => {
  const rocket = document.getElementById("rocket");
  const sound = document.getElementById("rocketSound");

  rocket.style.display = "none";

  // Create overlay
  const overlay = document.createElement("div");
  overlay.textContent = "Tap to launch the rocket 🚀";
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: sans-serif;
    cursor: pointer;
    z-index: 9999;
  `;

  // Responsive adjustments
  function updateOverlayStyle() {
    overlay.style.textAlign = "center";
    if (window.innerWidth <= 480) {
      overlay.style.fontSize = "1.4rem";
      overlay.style.padding = "1.5rem";
    } else if (window.innerWidth <= 768) {
      overlay.style.fontSize = "2rem";
      overlay.style.padding = "1rem";
    } else {
      overlay.style.fontSize = "2rem";
      overlay.style.padding = "0";
    }
  }

  updateOverlayStyle();
  window.addEventListener("resize", updateOverlayStyle);
  document.body.appendChild(overlay);

  // Launch rocket on click
  overlay.addEventListener("click", () => {
    overlay.remove();
    rocket.style.display = "block";

    sound.currentTime = 0;
    sound.play().catch(err => console.warn("Autoplay blocked:", err));

    rocket.style.animation = "flyAcross 7s ease-in-out forwards";

   rocket.style.display = "block";
rocket.offsetHeight; // reflow
setTimeout(() => {
  rocket.style.animation = "flyAcross 7s ease-in-out forwards";
  sound.currentTime = 0;
  sound.play().catch(err => console.warn("Autoplay blocked:", err));
}, 50);

  }, { once: true });
});

// ===================== 🔷 Background Music Fade-In =====================
window.addEventListener("DOMContentLoaded", () => {
  if (window.__bg_music_initialized__) return;
  window.__bg_music_initialized__ = true;

  // Create and configure background music
  const bgMusic = document.createElement("audio");
  bgMusic.src = "images/1025.MP3"; // Replace with your file
  bgMusic.loop = true;
  bgMusic.preload = "auto";
  bgMusic.volume = 0;
  document.body.appendChild(bgMusic);

  let fadeInterval = null;
  let bgFadedIn = false;

  // Helper: clamp volume between 0 and 1
  function safeVolume(vol) {
    if (typeof vol !== "number" || isNaN(vol) || !isFinite(vol)) return 0;
    return Math.max(0, Math.min(1, vol));
  }

  // Fade-in music function
  function fadeInBackground(targetVolume = 0.6, step = 0.02, stepMs = 100) {
    if (bgFadedIn || !bgMusic) return;
    bgFadedIn = true;

    bgMusic.play().catch(err => console.warn("bgMusic.play() failed:", err));

    if (fadeInterval) clearInterval(fadeInterval);
    let counter = 0;
    const maxSteps = 200;

    fadeInterval = setInterval(() => {
      counter++;
      let currentVol = safeVolume(bgMusic.volume);
      let newVol = safeVolume(currentVol + step);
      bgMusic.volume = newVol;

      if (newVol >= targetVolume || counter > maxSteps) {
        clearInterval(fadeInterval);
        fadeInterval = null;
      }
    }, stepMs);
  }

  // Start fade-in after 8 seconds
  setTimeout(fadeInBackground, 8000);

  // Allow first user click to enable autoplay on mobile
  document.body.addEventListener(
    "click",
    () => {
      if (bgMusic.paused) bgMusic.play().catch(() => {});
    },
    { once: true, passive: true }
  );

  // ---------------------------
  // Music toggle button
  const musicToggle = document.getElementById("music-toggle");
  musicToggle.addEventListener("click", () => {
    if (!bgMusic) return;

    if (bgMusic.paused) {
      bgMusic.play().catch(() => {});
      musicToggle.textContent = "🔊"; // update icon
    } else {
      bgMusic.pause();
      musicToggle.textContent = "🔇"; // update icon
    }
  });
});



// ===================== 🔷 Ships Fly Across =====================
// Wait before launching ships (adjust if needed)
window.addEventListener("load", () => {
  const ships = [document.getElementById("ship1"), document.getElementById("ship2")];

  ships.forEach((ship, index) => {
    if (!ship) return;

    setTimeout(() => {
      ship.style.animation = "fall 11s linear forwards";
    },  5000); // stagger ships
  });
});




// ===================== 🔷 Project Cards Fade-In =====================
document.addEventListener("DOMContentLoaded", () => {
  const projectCards = document.querySelectorAll(".project-card");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.2 });

  projectCards.forEach(card => observer.observe(card));
});





