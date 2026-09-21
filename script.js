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

const revealElements = document.querySelectorAll(".reveal");

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

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
    copyButton.textContent = "Copy booking email";
  }, 2200);
});

document.getElementById("year").textContent = new Date().getFullYear();
