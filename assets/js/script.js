/**
 * Synthesis Practice Practice - Core UI Interactions
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
  // Leaf links close the whole menu; dropdown triggers toggle their submenu instead.
  const navLinksItem = document.querySelectorAll(
    ".nav-links a:not(.dropdown-trigger)"
  );
  const dropdowns = document.querySelectorAll(".dropdown");
  const MOBILE_BREAKPOINT = 950;

  if (!burgerToggle || !navLinks) return;

  const closeDropdowns = () => {
    dropdowns.forEach((dropdown) => dropdown.classList.remove("open"));
  };

  const closeMenu = () => {
    navLinks.classList.remove("active");
    burgerToggle.classList.remove("open");
    closeDropdowns();
  };

  // Toggle menu visibility
  burgerToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const isActive = navLinks.classList.toggle("active");
    burgerToggle.classList.toggle("open", isActive);
    if (!isActive) closeDropdowns();
  });

  // On touch/mobile, tapping a dropdown trigger expands its submenu
  // instead of navigating away, since :hover never fires on touch devices.
  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector(".dropdown-trigger");
    if (!trigger) return;

    trigger.addEventListener("click", (e) => {
      if (window.innerWidth > MOBILE_BREAKPOINT) return;

      e.preventDefault();
      const isOpen = dropdown.classList.contains("open");
      closeDropdowns();
      dropdown.classList.toggle("open", !isOpen);
    });
  });

  // Automatically close menu when clicking a leaf link
  navLinksItem.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close menu if clicking anywhere outside the navigation
  document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && !burgerToggle.contains(e.target)) {
      closeMenu();
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
