// Main JavaScript file
console.log('OMNI website loaded');

// Global variables
const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector("#navMenu .nav-links");

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("omniForm");

  // Form submission
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      try {
        const response = await fetch("https://formspree.io/f/xpzekvql", {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" }
        });

        if (response.ok) {
          window.open("obrigado.html", "_blank");
          form.reset();
        } else {
          alert("Erro ao enviar. Tente novamente.");
        }
      } catch (err) {
        console.error(err);
        alert("Erro ao enviar. Verifique sua conexão.");
      }
    });
  }

  // Hamburguer Menu toggle
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("show");
    });
  }
});

// Close menu on outside click
document.addEventListener("click", (event) => {
  const isClickInsideMenu = navMenu && navMenu.contains(event.target);
  const isClickHamburger = hamburger && hamburger.contains(event.target);

  if (!isClickInsideMenu && !isClickHamburger) {
    navMenu.classList.remove("show");
  }
});

// Scroll to top button
window.addEventListener("scroll", () => {
  const btn = document.getElementById("scrollTopBtn");
  if (window.scrollY > 300) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
});
