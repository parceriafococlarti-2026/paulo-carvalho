// HAMBURGER MENU
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  mobileMenu.classList.toggle("open");
  document.body.style.overflow = mobileMenu.classList.contains("open")
    ? "hidden"
    : "";
});
document.querySelectorAll(".mob-link, .mob-cta").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    mobileMenu.classList.remove("open");
    document.body.style.overflow = "";
  });
});

// NAV SCROLL
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// REVEAL ON SCROLL
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add("visible"), i * 80);
        revealObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);
document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

// STEP REVEAL
const stepObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const steps = entry.target.querySelectorAll(".step");
        steps.forEach((s, i) =>
          setTimeout(() => s.classList.add("visible"), i * 150),
        );
        stepObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 },
);
document
  .querySelectorAll(".process-track")
  .forEach((t) => stepObserver.observe(t));

// FAQ ACCORDION
document.querySelectorAll(".faq-q").forEach((q) => {
  q.addEventListener("click", () => {
    const item = q.parentElement;
    const wasOpen = item.classList.contains("open");
    document
      .querySelectorAll(".faq-item")
      .forEach((i) => i.classList.remove("open"));
    if (!wasOpen) item.classList.add("open");
  });
});

// COUNTER ANIMATION
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || "+";
  const isFloat = !Number.isInteger(target);
  const duration = 2000;
  const start = performance.now();
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const val = target * ease;
    el.textContent = isFloat
      ? val.toFixed(1) + suffix
      : Math.floor(val) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target
          .querySelectorAll(".number-val[data-target]")
          .forEach(animateCounter);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);
const numbersBar = document.querySelector(".numbers-bar");
if (numbersBar) counterObserver.observe(numbersBar);

// HERO HEADLINE GLITCH EFFECT
const headline = document.querySelector(".hero-headline");
if (headline) {
  setInterval(() => {
    headline.style.textShadow = `${Math.random() * 3 - 1.5}px 0 rgba(0,255,106,0.3)`;
    setTimeout(() => (headline.style.textShadow = ""), 80);
  }, 4000);
}

// Parallax orbs on scroll
const orbs = document.querySelectorAll(".orb");
window.addEventListener("scroll", () => {
  const y = window.scrollY;
  orbs.forEach((orb, i) => {
    const speed = (i + 1) * 0.08;
    orb.style.transform = `translateY(${y * speed}px)`;
  });
});

(function () {
  const player = document.getElementById("mentorPlayer");
  const video = document.getElementById("mentorVideo");
  const overlay = document.getElementById("playerOverlay");
  const playBig = document.getElementById("playBig");
  const ppBtn = document.getElementById("playPauseBtn");
  const iconPlay = ppBtn.querySelector(".icon-play");
  const iconPause = ppBtn.querySelector(".icon-pause");
  const timeEl = document.getElementById("ctrlTime");
  const progress = document.getElementById("ctrlProgress");
  const fill = document.getElementById("progressFill");
  const thumb = document.getElementById("progressThumb");
  const fsBtn = document.getElementById("fullscreenBtn");

  function fmt(s) {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${sec}`;
  }

  function setPlaying(state) {
    if (state) {
      video.play();
      player.classList.add("playing");
      overlay.classList.add("hidden");
      iconPlay.style.display = "none";
      iconPause.style.display = "";
    } else {
      video.pause();
      player.classList.remove("playing");
      iconPlay.style.display = "";
      iconPause.style.display = "none";
    }
  }

  playBig.addEventListener("click", (e) => {
    e.stopPropagation();
    setPlaying(true);
  });
  ppBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    setPlaying(video.paused);
  });
  player.addEventListener("click", () => {
    if (!video.paused) setPlaying(false);
  });

  video.addEventListener("timeupdate", () => {
    if (!video.duration) return;
    const pct = (video.currentTime / video.duration) * 100;
    fill.style.width = pct + "%";
    thumb.style.left = pct + "%";
    timeEl.textContent = `${fmt(video.currentTime)} / ${fmt(video.duration)}`;
  });

  video.addEventListener("ended", () => {
    player.classList.remove("playing");
    overlay.classList.remove("hidden");
    iconPlay.style.display = "";
    iconPause.style.display = "none";
  });

  // Seek ao clicar na barra
  progress.addEventListener("click", (e) => {
    const rect = progress.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    video.currentTime = pct * video.duration;
  });

  // Fullscreen
  fsBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!document.fullscreenElement) {
      player.requestFullscreen?.() || player.webkitRequestFullscreen?.();
    } else {
      document.exitFullscreen?.() || document.webkitExitFullscreen?.();
    }
  });
})();
