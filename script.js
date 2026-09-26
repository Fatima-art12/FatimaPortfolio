// ================================
// TYPING EFFECT — hero role text
// ================================

const roles = ["Software Developer", "Full-Stack Developer", "React Developer"];
const typedEl = document.getElementById('typed-text');

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typedEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 40 : 90;

    if (!isDeleting && charIndex === currentRole.length) {
        speed = 1500;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 400;
    }

    setTimeout(typeLoop, speed);
}

typeLoop();

// ================================
// PROJECTS CAROUSEL
// ================================

const projectSlides = document.querySelectorAll('.project-slide');
let currentProject = 0;

function showProject(index) {
    projectSlides.forEach(slide => slide.classList.remove('active'));
    projectSlides[index].classList.add('active');
}

function changeProject(direction) {
    currentProject += direction;

    if (currentProject < 0) {
        currentProject = projectSlides.length - 1;
    } else if (currentProject >= projectSlides.length) {
        currentProject = 0;
    }

    showProject(currentProject);
}

// Clicking a thumbnail swaps the main image in that project's gallery
function setMainImage(thumbEl) {
    const gallery = thumbEl.closest('.project-gallery');
    const mainImg = gallery.querySelector('.project-main-img');
    mainImg.src = thumbEl.src;
}

// ================================
// DESIGNS LIGHTBOX
// ================================

const designCards = document.querySelectorAll(".design-card img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

designCards.forEach((img) => {
  img.addEventListener("click", () => {
    lightbox.classList.add("active");
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
  });
});

lightboxClose.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove("active");
  }
});

// ================================
// TIMELINE (JOURNEY) SCROLL ANIMATION
// ================================

const timelineItems = document.querySelectorAll(".timeline-item");

const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.3 });

timelineItems.forEach((item) => {
  timelineObserver.observe(item);
});

// ================================
// CONTACT SECTION SCROLL ANIMATION
// ================================

const contactElements = document.querySelectorAll(".contact-visual, .contact-card");

const contactObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

contactElements.forEach((el) => contactObserver.observe(el));

// ================================
// CONTACT FORM → opens email client
// ================================

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputs = contactForm.querySelectorAll("input, select, textarea");
    const name = inputs[0].value;
    const email = inputs[1].value;
    const subject = inputs[2].value;
    const message = inputs[3].value;

    const mailBody = `Name: ${name}%0AEmail: ${email}%0ASubject: ${subject}%0A%0AMessage:%0A${message}`;
    window.location.href = `mailto:aboulfatima52@gmail.com?subject=Portfolio Contact - ${subject}&body=${mailBody}`;
  });
}