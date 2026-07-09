(function () {
  "use strict";

  var overlay = document.querySelector("[data-loader-overlay]");

  if (!overlay) {
    return;
  }

  function showLoading() {
    overlay.hidden = false;
    overlay.setAttribute("aria-hidden", "false");
  }

  function hideLoading() {
    overlay.hidden = true;
    overlay.setAttribute("aria-hidden", "true");
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
})();
