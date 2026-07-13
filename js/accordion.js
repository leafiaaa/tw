// Accordion behavior for the "Specialized Techniques" (.tech-group) sections.
// Each .tech-group__accordion contains several .tech-item rows. Clicking a
// row's .tech-item__tab opens it (blue border/label, arrow up, detail shown),
// closes any other open row in the same group, and swaps the group's shared
// .tech-group__image to that item's data-image.

(function () {
  function initTechAccordions(root = document) {
    const groups = root.querySelectorAll("[data-tech-group]");

    groups.forEach((group) => {
      // Skip if already wired up (e.g. re-init after a fetch() injection)
      if (group.dataset.techBound === "true") return;
      group.dataset.techBound = "true";

      const items = Array.from(group.querySelectorAll(".tech-item"));
      const frame = group.closest(".tech-group__frame");
      const media = frame ? frame.querySelector(".tech-group__image") : null;

      items.forEach((item) => {
        const tab = item.querySelector(".tech-item__tab");
        if (!tab) return;

        tab.addEventListener("click", () => {
          if (item.classList.contains("is-open")) return; // already open, nothing to do

          items.forEach((other) => {
            const isTarget = other === item;
            other.classList.toggle("is-open", isTarget);
            const otherTab = other.querySelector(".tech-item__tab");
            if (otherTab) {
              otherTab.setAttribute(
                "aria-expanded",
                isTarget ? "true" : "false",
              );
            }
          });

          if (media) {
            const nextSrc = item.getAttribute("data-image");
            if (nextSrc && media.getAttribute("src") !== nextSrc) {
              media.classList.add("is-fading");
              window.setTimeout(() => {
                media.setAttribute("src", nextSrc);
                media.classList.remove("is-fading");
              }, 150);
            }
          }
        });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => initTechAccordions());

  // Expose so it can be re-run after fetch()-injected components,
  // same pattern as window.initReveal.
  window.initTechAccordions = initTechAccordions;
})();
