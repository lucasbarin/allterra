(function () {
  "use strict";

  var overlay = document.querySelector("[data-loader-overlay]");
  var isTestPage = document.body && document.body.classList.contains("loading-teste-page");
  var safariIosNudgeAttempts = 0;
  var mobileTopHackAttempts = 0;

  if (!overlay) {
    return;
  }

  function lockPageScroll(shouldLock) {
    if (!document.body) {
      return;
    }

    document.body.style.overflow = shouldLock ? "hidden" : "";
  }

  function isMobileSafari() {
    var ua = window.navigator.userAgent || "";
    var isIosDevice = /iPhone|iPad|iPod/i.test(ua) ||
      (window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1);
    var isWebkitSafari = /Safari/i.test(ua) && !/CriOS|FxiOS|EdgiOS/i.test(ua);
    var isMobile = window.matchMedia("(max-width: 991px)").matches;

    return isIosDevice && isWebkitSafari && isMobile;
  }

  function applySafariIosClass() {
    if (!document.body || !isMobileSafari()) {
      return false;
    }

    document.body.classList.add("safari-ios-fix");
    return true;
  }

  function updateSafariViewportUnit() {
    if (!applySafariIosClass()) {
      return;
    }

    var viewportHeight = window.visualViewport && window.visualViewport.height
      ? window.visualViewport.height
      : window.innerHeight;

    document.documentElement.style.setProperty("--allterra-ios-vh", viewportHeight * 0.01 + "px");
  }

  function applySafariIosNudge() {
    if (!applySafariIosClass()) {
      return;
    }

    // Em mobile landing com top hack ativo, preserva o deslocamento maior ja aplicado.
    var nudgeY = shouldApplyMobileTopHack() ? Math.max(window.scrollY || 0, 2) : 2;
    window.scrollTo(0, nudgeY);
    requestAnimationFrame(function () {
      window.scrollTo(0, nudgeY);
    });
    setTimeout(function () {
      window.scrollTo(0, nudgeY);
    }, 120);

    safariIosNudgeAttempts += 1;
    updateSafariViewportUnit();
  }

  function shouldApplyMobileTopHack() {
    return !!document.body &&
      document.body.classList.contains("landing-page") &&
      window.matchMedia("(max-width: 767px)").matches &&
      !!document.getElementById("home");
  }

  function applyMobileTopHackClass() {
    if (!shouldApplyMobileTopHack()) {
      return false;
    }

    document.body.classList.add("mobile-top-hack-active");
    return true;
  }

  function applyMobileTopHackNudge() {
    if (!applyMobileTopHackClass()) {
      return;
    }

    function forceScrollTo(y) {
      window.scrollTo(0, y);
      if (document.documentElement) {
        document.documentElement.scrollTop = y;
      }
      if (document.body) {
        document.body.scrollTop = y;
      }
    }

    function runNudgeAttempt(y) {
      forceScrollTo(y);
      requestAnimationFrame(function () {
        forceScrollTo(y);
      });
      setTimeout(function () {
        forceScrollTo(y);
      }, 120);
    }

    var previousScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";

    var nudgeY = Math.min(96, Math.max(20, Math.round(window.innerHeight * 0.09)));
    var attempts = 0;
    var maxAttempts = 5;

    function ensureNudgeApplied() {
      attempts += 1;
      runNudgeAttempt(nudgeY);

      setTimeout(function () {
        if (window.scrollY >= nudgeY - 1 || attempts >= maxAttempts) {
          return;
        }

        ensureNudgeApplied();
      }, 80);
    }

    ensureNudgeApplied();

    setTimeout(function () {
      document.documentElement.style.scrollBehavior = previousScrollBehavior || "";
    }, 520);

    mobileTopHackAttempts += 1;
  }

  function runPreRevealNudges(onDone) {
    lockPageScroll(false);
    applyMobileTopHackClass();
    updateSafariViewportUnit();

    applyMobileTopHackNudge();
    applySafariIosNudge();

    setTimeout(function () {
      if (mobileTopHackAttempts < 4) {
        applyMobileTopHackNudge();
      }

      if (safariIosNudgeAttempts < 4) {
        applySafariIosNudge();
      }
    }, 140);

    setTimeout(function () {
      if (typeof onDone === "function") {
        onDone();
      }
    }, 340);
  }

  function showLoading() {
    applyMobileTopHackClass();
    overlay.classList.remove("is-hiding");
    overlay.hidden = false;
    overlay.setAttribute("aria-hidden", "false");
    lockPageScroll(true);
  }

  function hideLoading() {
    if (overlay.hidden || overlay.classList.contains("is-hiding")) {
      return;
    }

    function startFadeOut() {
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

    function finalizeHide() {
      overlay.hidden = true;
      overlay.classList.remove("is-hiding");
      overlay.setAttribute("aria-hidden", "true");
      lockPageScroll(false);

      updateSafariViewportUnit();

      document.dispatchEvent(new CustomEvent("allterra-loading-hidden"));
    }

    runPreRevealNudges(startFadeOut);
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
  updateSafariViewportUnit();

  if (!isTestPage) {
    window.addEventListener("load", function () {
      setTimeout(hideLoading, 1500);
    });
  }

  window.addEventListener("orientationchange", function () {
    setTimeout(function () {
      applyMobileTopHackNudge();
      updateSafariViewportUnit();
      applySafariIosNudge();
    }, 180);
  });

  window.addEventListener("resize", function () {
    applyMobileTopHackClass();
    updateSafariViewportUnit();
  });

  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", updateSafariViewportUnit);
    window.visualViewport.addEventListener("scroll", updateSafariViewportUnit);
  }
})();
