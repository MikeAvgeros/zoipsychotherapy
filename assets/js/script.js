/**
 * MindSpace Practice - Core UI Interactions
 * Engineered for performance, error resilience, and smooth UX.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize UI Components
  initSmoothScroll();
  initMobileNavigation();
  initHeaderScrollEffect();
});

/**
 * 1. Safe Smooth Scroll for Hero Call-to-Action
 * Uses defensive checks to prevent script execution crashes.
 */
function initSmoothScroll() {
  const learnMoreBtn = document.getElementById("learnMore");
  const aboutSection = document.getElementById("about");

  if (learnMoreBtn && aboutSection) {
    learnMoreBtn.addEventListener("click", () => {
      aboutSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }
}

/**
 * 2. Mobile Navigation Toggle (Burger Menu)
 * Toggles the mobile menu state and handles click-away behavior.
 */
function initMobileNavigation() {
  const burgerToggle = document.getElementById("burgerToggle");
  const navLinks = document.querySelector(".nav-links");
  const navLinksItem = document.querySelectorAll(".nav-links a");

  if (!burgerToggle || !navLinks) return;

  // Toggle menu visibility
  burgerToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    navLinks.classList.toggle("active");
    burgerToggle.classList.toggle("open");
  });

  // Automatically close menu when clicking a link
  navLinksItem.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      burgerToggle.classList.remove("open");
    });
  });

  // Close menu if clicking anywhere outside the navigation
  document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && !burgerToggle.contains(e.target)) {
      navLinks.classList.remove("active");
      burgerToggle.classList.remove("open");
    }
  });
}

/**
 * 3. Dynamic Header Scroll Effect
 * Adds a premium solid/blur background to the header when the user scrolls down.
 */
function initHeaderScrollEffect() {
  const header = document.querySelector("header");
  if (!header) return;

  const toggleHeaderBackground = () => {
    // Adds class if scrolled past 50px, otherwise removes it
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  // Run on scroll event
  window.addEventListener("scroll", toggleHeaderBackground, { passive: true });

  // Run once on initial page load to verify starting position
  toggleHeaderBackground();
}
