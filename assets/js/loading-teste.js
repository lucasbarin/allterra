(function () {
  "use strict";

  var overlay = document.querySelector("[data-loader-overlay]");
  var isTestPage = document.body && document.body.classList.contains("loading-teste-page");

  if (!overlay) {
    return;
  }

  function lockPageScroll(shouldLock) {
    if (!document.body) {
      return;
    }

    document.body.style.overflow = shouldLock ? "hidden" : "";
  }

  function showLoading() {
    overlay.hidden = false;
    overlay.setAttribute("aria-hidden", "false");
    lockPageScroll(true);
  }

  function hideLoading() {
    overlay.hidden = true;
    overlay.setAttribute("aria-hidden", "true");
    lockPageScroll(false);
    document.dispatchEvent(new CustomEvent("allterra-loading-hidden"));
  }

  function toggleLoading(forceState) {
    if (typeof forceState === "boolean") {
      if (forceState) {
        showLoading();
      } else {
        hideLoading();
      }
      return;
    }

    if (overlay.hidden) {
      showLoading();
      return;
    }

    hideLoading();
  }

  window.AllterraLoadingTest = {
    show: showLoading,
    hide: hideLoading,
    toggle: toggleLoading,
  };

  showLoading();

  if (!isTestPage) {
    window.addEventListener("load", function () {
      setTimeout(hideLoading, 1500);
    });
  }
})();
