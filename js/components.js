(function () {
  // ── 1. Fetch and inject navbar ──────────────────────────────
  const placeholder = document.getElementById("navbar-placeholder");
  if (!placeholder) return;
  fetch("components/navbar.html", { cache: "no-store" })
    .then((res) => res.text())
    .then((html) => {
      // Strip live-server's injected reload script from fetched partials
      html = html.replace(
        /<!-- Code injected by live-server -->[\s\S]*?<\/script>/g,
        "",
      );
      placeholder.innerHTML = html;
      initNavbar();
    })
    .catch((err) => console.error("Navbar load failed:", err));

  // ── 1b. Fetch and inject footer ────────────────────────────
  const footerPlaceholder = document.getElementById("footer-placeholder");
  if (footerPlaceholder) {
    fetch("components/footer.html")
      .then((res) => res.text())
      .then((html) => {
        footerPlaceholder.innerHTML = html;
      })
      .catch((err) => console.error("Footer load failed:", err));
  }

  // ── 2. Init all interactions ────────────────────────────────
  function initNavbar() {
    initLangDropdown();
    initHamburger();
    highlightActiveLink();
    initScrollFrost();
    initMegaMenu();
  }

  // Frost navbar on scroll
  function initScrollFrost() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;

    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        navbar.style.background = "rgba(255, 255, 255, 0.85)";
      } else {
        navbar.style.background = "rgba(255, 255, 255, 0)";
      }
    });
  }

  function initMegaMenu(root = document) {
    const item = root.querySelector(".navbar__has-mega");
    if (!item) return;
    const trigger = item.querySelector(".navbar__products-trigger");
    if (!trigger) return;

    const open = () => {
      item.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
    };
    const close = () => {
      item.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
    };

    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      item.classList.contains("is-open") ? close() : open();
    });

    document.addEventListener("click", (e) => {
      if (!item.contains(e.target)) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  }

  // Language dropdown
  function initLangDropdown() {
    const toggle = document.getElementById("langToggle");
    const dropdown = document.getElementById("langDropdown");
    const currentLabel = document.getElementById("langCurrent");
    if (!toggle || !dropdown) return;

    toggle.addEventListener("click", () => {
      const isOpen = dropdown.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen);
    });

    document.addEventListener("click", (e) => {
      if (!toggle.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", false);
      }
    });

    document.querySelectorAll("[data-lang]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const lang = btn.dataset.lang;
        currentLabel.textContent = btn.textContent.trim();
        dropdown.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", false);

        if (lang === "tw") {
          window.location.href = "/tw.html";
        } else if (lang === "en") {
          window.location.href = "/index.html";
        }
      });
    });

    const params = new URLSearchParams(window.location.search);
    const activeLang = params.get("lang") || "en";
    const map = { en: "EN", tw: "TW", th: "TH", idn: "IDN" };
    if (map[activeLang]) currentLabel.textContent = map[activeLang];
  }

  // Hamburger / drawer
  function initHamburger() {
    const hamburger = document.getElementById("hamburger");
    const drawer = document.getElementById("navDrawer");
    if (!hamburger || !drawer) return;

    function openDrawer() {
      drawer.classList.add("is-open");
    }

    function closeDrawer() {
      drawer.classList.remove("is-open");
    }

    hamburger.addEventListener("click", () => {
      drawer.classList.contains("is-open") ? closeDrawer() : openDrawer();
    });
  }

  // Highlight active nav link
  function highlightActiveLink() {
    const links = document.querySelectorAll(
      ".navbar__links a, .navbar__drawer a",
    );
    const current = window.location.pathname;
    links.forEach((link) => {
      if (link.getAttribute("href") === current) {
        link.style.color = "#1a5ce5";
        link.style.fontWeight = "600";
      }
    });
  }
})();
function toggleSubMenu(button) {
  if (!button) return;

  // 1. Find the parent <li> that wraps this entire drawer item
  const parentContainer = button.closest("li");
  console.log(parentContainer?.outerHTML);
  if (!parentContainer) return; // Safety check

  // 2. Find the submenu inside that specific parent container
  const targetMenu = parentContainer.querySelector(".drawer__submenu");

  // 3. Toggle the grid animation classes
  if (targetMenu) {
    targetMenu.classList.toggle("show");
  } else {
    console.error(
      "Still can't find the menu! Check that the ul has the class 'drawer__submenu'",
    );
  }

  // 4. Toggle the arrow rotation
  button.classList.toggle("rotate");
}

// ── 1c. Fetch and inject CTA ───────────────────────────────
const ctaPlaceholder = document.getElementById("cta-placeholder");
if (ctaPlaceholder) {
  fetch("components/cta.html")
    .then((res) => res.text())
    .then((html) => {
      ctaPlaceholder.innerHTML = html;
    })
    .catch((err) => console.error("CTA load failed:", err));
}
document.querySelectorAll('.toc a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.getElementById(link.getAttribute("href").slice(1));
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
