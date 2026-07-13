(function () {
  const facades = document.querySelectorAll(".video-facade");
  if (!facades.length) return;

  // Build the modal once, reuse it for every facade on the page.
  const modal = document.createElement("div");
  modal.className = "video-modal";
  modal.innerHTML = `
    <div class="video-modal__frame-wrap">
      <button class="video-modal__close" aria-label="Close video">✕</button>
      <div class="video-modal__frame-target"></div>
    </div>
  `;
  document.body.appendChild(modal);
  const frameTarget = modal.querySelector(".video-modal__frame-target");
  const closeBtn = modal.querySelector(".video-modal__close");

  function openVideo(youtubeId) {
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`;
    iframe.allow = "autoplay; encrypted-media; picture-in-picture";
    iframe.allowFullscreen = true;
    frameTarget.innerHTML = "";
    frameTarget.appendChild(iframe);
    modal.classList.add("is-open");
  }

  function closeVideo() {
    modal.classList.remove("is-open");
    frameTarget.innerHTML = ""; // stops playback by removing the iframe
  }

  facades.forEach((facade) => {
    facade.addEventListener("click", () => {
      openVideo(facade.dataset.youtubeId);
    });
  });

  closeBtn.addEventListener("click", closeVideo);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeVideo();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeVideo();
  });
})();
