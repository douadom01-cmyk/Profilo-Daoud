document.addEventListener("DOMContentLoaded", function () {
  const mobileToggle = document.querySelector(".mobile-toggle");
  const navbarNav = document.querySelector(".navbar-nav");
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-link");

  function closeMobileMenu() {
    mobileToggle.classList.remove("active");
    navbarNav.classList.remove("active");
    document.body.style.overflow = "";
  }

  mobileToggle.addEventListener("click", function () {
    mobileToggle.classList.toggle("active");
    navbarNav.classList.toggle("active");
    document.body.style.overflow = navbarNav.classList.contains("active")
      ? "hidden"
      : "";
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  document.addEventListener("click", function (e) {
    if (!navbar.contains(e.target) && navbarNav.classList.contains("active")) {
      closeMobileMenu();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navbarNav.classList.contains("active")) {
      closeMobileMenu();
    }
  });

  function updateActiveLink() {
    const sections = ["home", "projects", "services", "contact"];
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const element = document.getElementById(section);
      const link = document.querySelector(`.nav-link[href="#${section}"]`);

      if (element && link) {
        const top = element.offsetTop;
        const height = element.offsetHeight;

        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach((l) => l.classList.remove("active"));
          link.classList.add("active");
        }
      }
    });
  }

  window.addEventListener("scroll", function () {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
    updateActiveLink();
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: "smooth",
          });
        }
      }
    });
  });

  updateActiveLink();

  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });
});
