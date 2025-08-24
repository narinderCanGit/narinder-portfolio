"use strict";

/**
 * element toggle function
 */

const elemToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 10) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }
});

/**
 * navbar toggle
 */

const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");

navToggleBtn.addEventListener("click", function () {
  elemToggleFunc(navToggleBtn);
  elemToggleFunc(navbar);
  elemToggleFunc(document.body);
});

function closeMenu() {
  navbar.classList.remove("active");
  navToggleBtn.classList.remove("active");
  document.body.classList.remove("active");
}

document.querySelectorAll(".navbar-link").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

/**
 * skills toggle
 */

const toggleBtnBox = document.querySelector("[data-toggle-box]");
const toggleBtns = document.querySelectorAll("[data-toggle-btn]");
const skillsBox = document.querySelector("[data-skills-box]");

for (let i = 0; i < toggleBtns.length; i++) {
  toggleBtns[i].addEventListener("click", function () {
    elemToggleFunc(toggleBtnBox);
    for (let i = 0; i < toggleBtns.length; i++) {
      elemToggleFunc(toggleBtns[i]);
    }
    elemToggleFunc(skillsBox);
  });
}

/**
 * dark & light theme toggle
 */

const themeToggleBtn = document.querySelector("[data-theme-btn]");

themeToggleBtn.addEventListener("click", function () {
  elemToggleFunc(themeToggleBtn);

  if (themeToggleBtn.classList.contains("active")) {
    document.body.classList.remove("dark_theme");
    document.body.classList.add("light_theme");

    localStorage.setItem("theme", "light_theme");
  } else {
    document.body.classList.add("dark_theme");
    document.body.classList.remove("light_theme");

    localStorage.setItem("theme", "dark_theme");
  }
});

/**
 * check & apply last time selected theme from localStorage
 */

if (localStorage.getItem("theme") === "light_theme") {
  themeToggleBtn.classList.add("active");
  document.body.classList.remove("dark_theme");
  document.body.classList.add("light_theme");
} else {
  themeToggleBtn.classList.remove("active");
  document.body.classList.remove("light_theme");
  document.body.classList.add("dark_theme");
}

/**
 * Trigger email for contact form
 */

emailjs.init({
  publicKey: "JVkcicDy6v0V6zjUS",
});

function sendEmail(event) {
  event.preventDefault();

  const form = event.target;
  const name = form.querySelector('[name="name"]').value;
  const email = form.querySelector('[name="email"]').value;
  const message = form.querySelector('[name="message"]').value;

  emailjs
    .send("service_3cx599b", "template_pp6vpas", {
      from_name: name,
      from_email: email,
      message: message,
      subject: "Portfolio contact form submission",
    })
    .then(() => {
      alert("Message sent successfully!");
      form.reset();
    })
    .catch((error) => {
      console.error("Error sending email:", error);
      alert("Failed to send message. Please try again later.");
    });
}

// Scroll Work

document.addEventListener("scroll", function () {
  const experienceSection = document.getElementById("experience");
  const traveller = document.querySelector(".timeline-traveller");
  const divider = document.getElementById("timeline-divider");

  if (!experienceSection || !traveller || !divider) return;

  const timelineBoxes = document.querySelectorAll(".timeline-box");
  if (timelineBoxes.length < 2) return;

  const getDotCenter = (box) => {
    const rect = box.getBoundingClientRect();
    const dotTop = rect.top + rect.height * 0.2 + 7.5; // 7.5px is half of 15px dot height
    return dotTop + window.scrollY;
  };

  const getDotEdge = (box, isFirst = true) => {
    const rect = box.getBoundingClientRect();
    // Use the actual dot position from CSS (top: 20% of timeline-box height)
    const dotTop = rect.top + rect.height * 0.2 + window.scrollY;
    // For first dot, start from top edge; for last dot, end at bottom edge
    return isFirst ? dotTop : dotTop + 15; // 15px is the actual dot height from CSS
  };

  const firstDotCenter = getDotCenter(timelineBoxes[0]);
  const lastDotCenter = getDotCenter(timelineBoxes[timelineBoxes.length - 1]);
  const firstDotEdge = getDotEdge(timelineBoxes[0], true);
  const lastDotEdge = getDotEdge(
    timelineBoxes[timelineBoxes.length - 1],
    false
  );

  const sectionRect = experienceSection.getBoundingClientRect();
  const scrollY = window.scrollY + window.innerHeight / 2;

  const minY = firstDotCenter;
  const maxY = lastDotCenter;
  const progress = Math.min(Math.max((scrollY - minY) / (maxY - minY), 0), 1);

  // Calculate movement range based on actual divider height (edge to edge)
  const moveRange = lastDotEdge - firstDotEdge;
  const moveY = moveRange * progress;

  traveller.style.transform = `translateY(${moveY}px)`;
});

// Divider height adjustment
// This function sets the height of the timeline divider based on the first and last dots
// It should be called on DOMContentLoaded and on window resize to ensure it adapts to changes
/**
 * Set the height of the timeline divider based on the first and last timeline boxes
 */
function setTimelineDividerHeight() {
  const timelineBoxes = document.querySelectorAll(".timeline-box");
  const divider = document.getElementById("timeline-divider");
  if (!timelineBoxes.length || !divider) return;

  // Get the parent container's position (relative to document)
  const parent = divider.parentElement;
  const parentRect = parent.getBoundingClientRect();
  const parentTop = parentRect.top + window.scrollY;

  // Get the edge position of the first and last timeline dots (not center)
  const getDotEdge = (box, isFirst = true) => {
    const rect = box.getBoundingClientRect();
    // Use the actual dot position from CSS (top: 20% of timeline-box height)
    const dotTop = rect.top + rect.height * 0.2 + window.scrollY;
    // For first dot, start from top edge; for last dot, end at bottom edge
    return isFirst ? dotTop : dotTop + 15; // 15px is the actual dot height from CSS
  };

  const firstDotEdge = getDotEdge(timelineBoxes[0], true);
  const lastDotEdge = getDotEdge(
    timelineBoxes[timelineBoxes.length - 1],
    false
  );

  console.log("Timeline calculation:", {
    firstDotEdge,
    lastDotEdge,
    parentTop,
    totalHeight: lastDotEdge - firstDotEdge,
    boxCount: timelineBoxes.length,
  });

  // Set divider position and height to span from first dot top to last dot bottom
  const topOffset = firstDotEdge - parentTop;
  const height = Math.max(lastDotEdge - firstDotEdge, 50); // Minimum height of 50px

  divider.style.top = `${topOffset}px`;
  divider.style.height = `${height}px`;
}

// Run on DOMContentLoaded and on window resize
window.addEventListener("DOMContentLoaded", () => {
  // Add multiple delays to handle different loading scenarios
  setTimeout(setTimelineDividerHeight, 100);
  setTimeout(setTimelineDividerHeight, 300);
  setTimeout(setTimelineDividerHeight, 500);
});
window.addEventListener("resize", () => {
  // Debounce resize events
  clearTimeout(window.resizeTimeout);
  window.resizeTimeout = setTimeout(setTimelineDividerHeight, 250);
});
window.addEventListener("load", setTimelineDividerHeight); // Also run on full page load

// Additional trigger for font loading
if (document.fonts) {
  document.fonts.ready.then(setTimelineDividerHeight);
}
