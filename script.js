const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

menuToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".site-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const copyButton = document.getElementById("copy-email");
const copyStatus = document.getElementById("copy-status");

copyButton?.addEventListener("click", async () => {
  const email = copyButton.dataset.email;

  try {
    await navigator.clipboard.writeText(email);
    copyStatus.textContent = "Booking email copied.";
    copyButton.textContent = "Copied";
  } catch (error) {
    copyStatus.textContent = `Email: ${email}`;
  }

  setTimeout(() => {
    copyStatus.textContent = "";
    copyButton.textContent = "Email Us";
  }, 2200);
});

document.getElementById("year").textContent = new Date().getFullYear();

// =========================================================
// THE DIMLITS — HERO VIDEO TIMING
// Change these values to experiment.
// =========================================================
const heroVideo = document.querySelector(".hero-video");
const heroPoster = document.querySelector(".hero-poster");
const heroMobileLogo = document.querySelector(".hero-mobile-logo");

const heroStartTime = 3;       // seconds: first video frame to use
const heroEndTime = 42;         // seconds: jump back to start here
const heroPosterDelay = 3000;   // milliseconds: still photo hold time

if (heroVideo && heroPoster) {
  heroVideo.muted = true;
  heroVideo.defaultMuted = true;

  let transitionStarted = false;

  const startHeroSequence = () => {
    if (transitionStarted) return;
    transitionStarted = true;

    // Clamp the requested start point so an accidental value beyond the
    // video's duration does not break playback.
    const safeStart = Number.isFinite(heroVideo.duration)
      ? Math.min(heroStartTime, Math.max(0, heroVideo.duration - 0.1))
      : heroStartTime;

    heroVideo.currentTime = safeStart;
    heroVideo.pause();

    window.setTimeout(() => {
      const playPromise = heroVideo.play();

      if (playPromise && typeof playPromise.then === "function") {
        playPromise
          .then(() => {
            // Only remove the still image once the browser confirms playback.
            heroPoster?.classList.add("is-hidden");
            heroMobileLogo?.classList.add("is-hidden");
          })
          .catch(() => {
            // If autoplay is blocked, leave the band photo visible.
            transitionStarted = false;
          });
      } else {
        heroPoster?.classList.add("is-hidden");
        heroMobileLogo?.classList.add("is-hidden");
      }
    }, heroPosterDelay);
  };

  if (heroVideo.readyState >= 1) {
    startHeroSequence();
  } else {
    heroVideo.addEventListener("loadedmetadata", startHeroSequence, { once: true });
  }

  // Custom loop so the clip always returns to heroStartTime rather than 0:00.
  heroVideo.addEventListener("timeupdate", () => {
    const safeEnd = Number.isFinite(heroVideo.duration)
      ? Math.min(heroEndTime, heroVideo.duration)
      : heroEndTime;

    if (heroVideo.currentTime >= safeEnd) {
      heroVideo.currentTime = heroStartTime;
      heroVideo.play().catch(() => { });
    }
  });
}
