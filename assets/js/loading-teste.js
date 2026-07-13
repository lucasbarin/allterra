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
    overlay.classList.remove("is-hiding");
    overlay.hidden = false;
    overlay.setAttribute("aria-hidden", "false");
    lockPageScroll(true);
  }

  function hideLoading() {
    if (overlay.hidden || overlay.classList.contains("is-hiding")) {
      return;
    }

    function finalizeHide() {
      overlay.hidden = true;
      overlay.classList.remove("is-hiding");
      overlay.setAttribute("aria-hidden", "true");
      lockPageScroll(false);
      document.dispatchEvent(new CustomEvent("allterra-loading-hidden"));
    }

    overlay.classList.add("is-hiding");

    var fallbackTimer = setTimeout(finalizeHide, 650);
    overlay.addEventListener(
      "transitionend",
      function onFadeEnd(event) {
        if (event.propertyName !== "opacity") {
          return;
        }

        clearTimeout(fallbackTimer);
        overlay.removeEventListener("transitionend", onFadeEnd);
        finalizeHide();
      },
      { once: true }
    );
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
