// dynamic year update in footer
document.addEventListener("DOMContentLoaded", function () {
  const currentYear = new Date().getFullYear();
  document.getElementById("currentYear").textContent = currentYear;

  // smooth scroll for navigation links
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href.startsWith("#")) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth" });

          // close mobile menu if open
          const navbarCollapse = document.getElementById("navbarNav");
          if (navbarCollapse.classList.contains("show")) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
          }

          // update active state
          navLinks.forEach((l) => l.classList.remove("active"));
          this.classList.add("active");
        }
      }
    });
  });

  // scroll highlight active section in navbar
  window.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("section[id]");
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  });

  // card animation on scroll
  const cards = document.querySelectorAll(".card");
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const cardObserver = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "0";
        entry.target.style.transform = "translateY(20px)";
        setTimeout(() => {
          entry.target.style.transition =
            "opacity 0.6s ease, transform 0.6s ease";
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, 100);
        cardObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  cards.forEach((card) => {
    cardObserver.observe(card);
  });
});
