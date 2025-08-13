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

  const getDotY = (box) => {
    const rect = box.getBoundingClientRect();
    return rect.top + rect.height * 0.25 + window.scrollY;
  };

  const firstDotY = getDotY(timelineBoxes[0]);
  const lastDotY = getDotY(timelineBoxes[timelineBoxes.length - 1]);

  const sectionRect = experienceSection.getBoundingClientRect();
  const scrollY = window.scrollY + window.innerHeight / 2;

  const minY = firstDotY;
  const maxY = lastDotY;
  const progress = Math.min(Math.max((scrollY - minY) / (maxY - minY), 0), 1);

  // Offset by half the traveller's height for perfect alignment
  const moveY = (maxY - minY) * progress;

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

  // Get the top position of the first and last dot (using 25% offset as in your CSS)
  const getDotY = (box) => {
    const rect = box.getBoundingClientRect();
    return rect.top + rect.height * 0.25 + window.scrollY;
  };

  const firstDotY = getDotY(timelineBoxes[0]);
  const lastDotY = getDotY(timelineBoxes[timelineBoxes.length - 1]);

  // Set divider top and height relative to its parent
  divider.style.top = `${firstDotY - parentTop}px`;
  divider.style.height = `${lastDotY - firstDotY}px`;
}

// Run on DOMContentLoaded and on window resize
window.addEventListener("DOMContentLoaded", setTimelineDividerHeight);
window.addEventListener("resize", setTimelineDividerHeight);
