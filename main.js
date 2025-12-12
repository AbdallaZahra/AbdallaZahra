function animate() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0ff";
  particles.forEach((e) => {
    ctx.beginPath();
    ctx.arc(e.x, e.y, e.radius, 0, 2 * Math.PI);
    ctx.fill();

    e.x += e.dx;
    e.y += e.dy;

    if (e.x < 0 || e.x > canvas.width) {
      e.dx *= -1;
    }
    if (e.y < 0 || e.y > canvas.height) {
      e.dy *= -1;
    }
  });

  requestAnimationFrame(animate);
}

function typeLine() {
  if (lineIndex < codeLines.length) {
    const e = codeLines[lineIndex];
    charIndex < e.length
      ? ((output.textContent += e[charIndex]),
        charIndex++,
        setTimeout(typeLine, 40))
      : ((output.textContent += "\n"),
        (charIndex = 0),
        lineIndex++,
        setTimeout(typeLine, 200));
  }
}
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
const canvas = document.getElementById("bgCanvas"),
  ctx = canvas.getContext("2d");
(canvas.width = window.innerWidth), (canvas.height = window.innerHeight);
const particles = [];
for (let e = 0; e < 100; e++)
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: 2 * Math.random(),
    dx: 0.5 * (Math.random() - 0.5),
    dy: 0.5 * (Math.random() - 0.5),
  });
animate(),
  window.addEventListener("resize", () => {
    (canvas.width = window.innerWidth), (canvas.height = window.innerHeight);
  });
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
let lineIndex = 0,
  charIndex = 0;
const output = document.getElementById("code-output");
typeLine();
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
  ],
  container = document.getElementById("codeParticles");
for (let e = 0; e < 50; e++) {
  const e = document.createElement("div");
  (e.className = "code-particle"),
    (e.style.left = 100 * Math.random() + "vw"),
    (e.style.top = 100 * Math.random() + "vh"),
    (e.style.fontSize = 1.5 * Math.random() + 0.8 + "rem"),
    (e.style.animationDuration = 5 + 5 * Math.random() + "s"),
    (e.textContent =
      codeSnippets[Math.floor(Math.random() * codeSnippets.length)]),
    container.appendChild(e);
}
window.addEventListener("scroll", () => {
  const e = document.querySelector(".scroll-top");
  window.scrollY > 300 ? e.classList.add("show") : e.classList.remove("show");
}),
  document.addEventListener("DOMContentLoaded", () => {
    const e = document.querySelectorAll(".fade-in"),
      t = new IntersectionObserver(
        (e) => {
          e.forEach((e) => {
            e.isIntersecting && e.target.classList.add("visible");
          });
        },
        { threshold: 0.2 }
      );
    e.forEach((e) => t.observe(e));
  }),
  window.addEventListener("DOMContentLoaded", () => {
    function e() {
      (o.style.textAlign = "center"),
        window.innerWidth <= 480
          ? ((o.style.fontSize = "1.4rem"), (o.style.padding = "1.5rem"))
          : window.innerWidth <= 768
          ? ((o.style.fontSize = "2rem"), (o.style.padding = "1rem"))
          : ((o.style.fontSize = "2rem"), (o.style.padding = "0"));
    }
    const t = document.getElementById("rocket"),
      n = document.getElementById("rocketSound");
    t.style.display = "none";
    const o = document.createElement("div");
    (o.textContent = "Tap to launch the rocket 🚀"),
      (o.style.cssText =
        "\n    position: fixed;\n    inset: 0;\n    background: rgba(0, 0, 0, 0.8);\n    color: white;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-family: sans-serif;\n    cursor: pointer;\n    z-index: 9999;\n  "),
      e(),
      window.addEventListener("resize", e),
      document.body.appendChild(o),
      o.addEventListener(
        "click",
        () => {
          o.remove(),
            (t.style.display = "block"),
            (n.currentTime = 0),
            n.play().catch((e) => console.warn("Autoplay blocked:", e)),
            (t.style.animation = "flyAcross 7s ease-in-out forwards"),
            (t.style.display = "block"),
            t.offsetHeight,
            setTimeout(() => {
              (t.style.animation = "flyAcross 7s ease-in-out forwards"),
                (n.currentTime = 0),
                n.play().catch((e) => console.warn("Autoplay blocked:", e));
            }, 50);
        },
        { once: !0 }
      );
  }),
  window.addEventListener("DOMContentLoaded", () => {
    function e(e) {
      return "number" != typeof e || isNaN(e) || !isFinite(e)
        ? 0
        : Math.max(0, Math.min(1, e));
    }
    function t(t = 0.06, i = 0.01, d = 100) {
      if (a || !n) return;
      (a = !0),
        n.play().catch((e) => console.warn("bgMusic.play() failed:", e)),
        o && clearInterval(o);
      let s = 0;
      const c = 200;
      o = setInterval(() => {
        s++;
        let a = e(n.volume),
          d = e(a + i);
        (n.volume = d), (d >= t || s > c) && (clearInterval(o), (o = null));
      }, d);
    }
    if (window.__bg_music_initialized__) return;
    window.__bg_music_initialized__ = !0;
    const n = document.createElement("audio");
    (n.src = "images/1025.MP3"),
      (n.loop = !0),
      (n.preload = "auto"),
      (n.volume = 0),
      document.body.appendChild(n);
    let o = null,
      a = !1;
    setTimeout(t, 8e3),
      document.body.addEventListener(
        "click",
        () => {
          n.paused && n.play().catch(() => {});
        },
        { once: !0, passive: !0 }
      );
    const i = document.getElementById("music-toggle");
    i.addEventListener("click", () => {
      n &&
        (n.paused
          ? (n.play().catch(() => {}), (i.textContent = "🔊"))
          : (n.pause(), (i.textContent = "🔇")));
    });
  }),
  window.addEventListener("load", () => {
    const e = [
      document.getElementById("ship1"),
      document.getElementById("ship2"),
    ];
    e.forEach((e, t) => {
      e &&
        setTimeout(() => {
          e.style.animation = "fall 11s linear forwards";
        }, 5e3);
    });
  }),
  document.addEventListener("DOMContentLoaded", () => {
    const e = document.querySelectorAll(".project-card"),
      t = new IntersectionObserver(
        (e) => {
          e.forEach((e) => {
            e.isIntersecting && e.target.classList.add("visible");
          });
        },
        { threshold: 0.2 }
      );
    e.forEach((e) => t.observe(e));
  });



