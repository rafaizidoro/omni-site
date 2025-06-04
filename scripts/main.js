// Main JavaScript file
console.log('OMNI website loaded');

// Ensure all code runs after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // ====== Form Submission ======
  const form = document.getElementById("omniForm");
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

  // ====== Menu Toggle ======
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.querySelector("#navMenu .nav-links");
  const navLinks = document.querySelectorAll(".nav-links a");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("show");
    });
  }

  // ====== Close Menu on Outside Click ======
  document.addEventListener("click", (event) => {
    const isClickInsideMenu = navMenu && navMenu.contains(event.target);
    const isClickHamburger = hamburger && hamburger.contains(event.target);
    if (!isClickInsideMenu && !isClickHamburger && navMenu) {
      navMenu.classList.remove("show");
    }
  });

  // ✅ Close menu when clicking a nav link
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("show");
    });
  });

  // ====== Scroll to Top Button ======
  const btn = document.getElementById("scrollTopBtn");
  window.addEventListener("scroll", () => {
    if (!btn) return;
    btn.style.display = window.scrollY > 300 ? "flex" : "none";
  });
  

  // ====== Lightbox Modal ======
  const lightboxModal = document.getElementById("lightbox-modal");
  const lightboxMedia = document.querySelector(".lightbox-media");
  const closeBtn = document.querySelector(".lightbox-close");
  const triggers = document.querySelectorAll(".lightbox-trigger");

  // ✅ Utility function to close lightbox
  function closeLightbox() {
    lightboxModal.classList.remove("active");
    lightboxModal.setAttribute("aria-hidden", "true");
    lightboxMedia.setAttribute("src", "");
  }

  if (lightboxModal && lightboxMedia && closeBtn && triggers.length > 0) {
    triggers.forEach(trigger => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        const src = trigger.getAttribute("data-media");
        const alt = trigger.querySelector("img")?.getAttribute("alt") || "Imagem ampliada";

        lightboxMedia.setAttribute("src", src);
        lightboxMedia.setAttribute("alt", alt);
        lightboxModal.classList.add("active");
        lightboxModal.setAttribute("aria-hidden", "false");
      });
    });

    // ✅ Use utility function on all lightbox close events
    closeBtn.addEventListener("click", closeLightbox);

    lightboxModal.addEventListener("click", (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightboxModal.classList.contains("active")) {
        closeLightbox();
      }
    });
  }

  // ====== Highlight Navbar Section While Scrolling ======
  const sections = document.querySelectorAll("main section");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      if (scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });
});
