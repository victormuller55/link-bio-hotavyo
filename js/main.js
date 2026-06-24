const footerYear = document.getElementById("footer-year");

if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

function applyFadeUp(elements, delayStep = 0.08) {
  elements.forEach((el, index) => {
    el.classList.add("fade-up");
    el.style.setProperty("--delay", `${index * delayStep}s`);
  });
}

function initFadeUp() {
  const heroItems = document.querySelectorAll(
    ".hero .avatar, .hero h1, .hero .tagline, .hero .bio, .hero .social-links"
  );
  const textElements = document.querySelectorAll(
    ".section-label, .story-photo, .story-content p, .testimonial, .video-info"
  );
  const cards = document.querySelectorAll(".gallery-item, .video-wrapper");
  const footer = document.querySelector("footer");

  applyFadeUp(heroItems, 0.1);
  applyFadeUp(textElements, 0.1);
  applyFadeUp(cards, 0.08);

  if (footer) {
    footer.classList.add("fade-up");
  }

  heroItems.forEach((el) => {
    requestAnimationFrame(() => el.classList.add("is-visible"));
  });

  const scrollElements = document.querySelectorAll(
    ".fade-up:not(.is-visible)"
  );

  if (!("IntersectionObserver" in window)) {
    scrollElements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -24px 0px" }
  );

  scrollElements.forEach((el) => observer.observe(el));
}

initFadeUp();
