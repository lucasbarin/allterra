"use strict";

document.addEventListener("DOMContentLoaded", function () {
	var faqItems = Array.prototype.slice.call(document.querySelectorAll(".faq-item"));
	var faqButtons = Array.prototype.slice.call(document.querySelectorAll(".faq-toggle"));
	var videoContainer = document.getElementById("videoPlaceholder");
	var playButton = document.getElementById("videoPlayButton");
	var videoPlayer = document.getElementById("videoPlayer");
	var homeSection = document.getElementById("home");
	var homeVideoBanner = document.getElementById("homeVideoBanner");
	var homeVideoSource = homeVideoBanner ? homeVideoBanner.querySelector("source") : null;
	var homeVideoResizeTimer = null;
	var currentHomeVideoSrc = "";
	var scrollButtonLink = document.querySelector("a[href='#introducao'] .rolar")
		? document.querySelector("a[href='#introducao'] .rolar").closest("a")
		: null;
	var navbarCollapse = document.getElementById("navbarNav");
	var menuLinks = navbarCollapse
		? Array.prototype.slice.call(navbarCollapse.querySelectorAll(".nav-link"))
		: [];
	var autoScrollInProgress = false;
	var snapScrollTimer = null;
	var scrollEndUnlockTimer = null;
	var mobileTopNavbarHideThreshold = 100;
	var openingSequenceStarted = false;
	var entranceAnimationsStarted = false;
	var entranceAnimationLock = false;

	function getHashFromLink(link) {
		if (!link) {
			return "";
		}

		var href = link.getAttribute("href") || "";
		if (!href || href.charAt(0) !== "#") {
			return "";
		}

		return href;
	}

	function getElementByHash(hash) {
		if (!hash || hash === "#") {
			return null;
		}

		return document.querySelector(hash);
	}

	function setActiveMenuLinkByHash(hash) {
		menuLinks.forEach(function (menuLink) {
			var isActive = getHashFromLink(menuLink) === hash;
			menuLink.classList.toggle("active", isActive);
		});
	}

	function smoothScrollToHash(hash) {
		var target = getElementByHash(hash);
		if (!target) {
			return;
		}

		autoScrollInProgress = true;
		clearTimeout(scrollEndUnlockTimer);

		target.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});

		scrollEndUnlockTimer = setTimeout(function () {
			autoScrollInProgress = false;
		}, 500);
	}

	function bindSmoothScroll(link) {
		if (!link) {
			return;
		}

		var hash = getHashFromLink(link);
		if (!hash || !getElementByHash(hash)) {
			return;
		}

		link.addEventListener("click", function (event) {
			event.preventDefault();
			smoothScrollToHash(hash);
			setActiveMenuLinkByHash(hash);

			if (isMobileMenuViewport()) {
				hideMobileMenu();
			}
		});
	}

	function updateActiveMenuLinkOnScroll() {
		var candidate = "";

		menuLinks.forEach(function (menuLink) {
			var hash = getHashFromLink(menuLink);
			var target = getElementByHash(hash);

			if (!target) {
				return;
			}

			var rect = target.getBoundingClientRect();
			if (rect.top <= window.innerHeight * 0.35) {
				candidate = hash;
			}
		});

		if (candidate) {
			setActiveMenuLinkByHash(candidate);
		}
	}

	function runSubtleSnapScroll() {
		if (entranceAnimationLock) {
			return;
		}

		if (isMobileTopHackActive() && homeSection && window.scrollY < homeSection.offsetHeight - 10) {
			return;
		}

		if (autoScrollInProgress) {
			return;
		}

		var targets = Array.prototype.slice.call(document.querySelectorAll("[data-snap-target]")).filter(Boolean);

		if (!targets.length) {
			return;
		}

		var nearest = null;
		var nearestDistance = Infinity;

		targets.forEach(function (target) {
			var distance = Math.abs(target.getBoundingClientRect().top);
			if (distance < nearestDistance) {
				nearestDistance = distance;
				nearest = target;
			}
		});

		if (!nearest || nearestDistance > 150) {
			return;
		}

		autoScrollInProgress = true;
		nearest.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});

		clearTimeout(scrollEndUnlockTimer);
		scrollEndUnlockTimer = setTimeout(function () {
			autoScrollInProgress = false;
		}, 500);
	}

	function setupAosTargetsAndInit() {
		function applyAosSequence(nodeList, baseDelay, stepDelay, maxDelay, anchorSelector) {
			Array.prototype.slice.call(nodeList).forEach(function (element, index) {
				element.setAttribute("data-aos", "fade-up");
				element.setAttribute(
					"data-aos-delay",
					String(Math.min(baseDelay + index * stepDelay, maxDelay))
				);

				if (anchorSelector) {
					element.setAttribute("data-aos-anchor", anchorSelector);
				}
			});
		}

		[
			"#introducao",
			"#sobre-nos",
			"#proposito",
			"#principios",
			"#rebranding"
		].forEach(function (sectionSelector) {
			var section = document.querySelector(sectionSelector);
			if (!section) {
				return;
			}

			var desktopBlocks = section.querySelectorAll(".d-none.d-md-block");
			var mobileBlocks = section.querySelectorAll(".d-block.d-md-none");
			var sequenceBlocks = Array.prototype.slice.call(desktopBlocks).concat(
				Array.prototype.slice.call(mobileBlocks)
			);

			if (!sequenceBlocks.length) {
				sequenceBlocks = [section];
			}

			sequenceBlocks.forEach(function (block) {
				applyAosSequence(block.querySelectorAll("h1, h2, h3, strong"), 0, 80, 320, sectionSelector);
				applyAosSequence(block.querySelectorAll("p"), 120, 100, 900, sectionSelector);
			});
		});

		applyAosSequence(document.querySelectorAll("#sessao-faq h1"), 0, 40, 0, "#sessao-faq");
		applyAosSequence(document.querySelectorAll("#sessao-faq .faq-item"), 120, 80, 760, "#sessao-faq");
		applyAosSequence(document.querySelectorAll("#footer .bt-voltar-wrap"), 0, 40, 0, "#footer");
		applyAosSequence(document.querySelectorAll("#footer .footer-contato"), 90, 40, 90, "#footer");
		applyAosSequence(document.querySelectorAll("#footer .footer-redes"), 170, 40, 170, "#footer");

		if (typeof AOS !== "undefined") {
			AOS.init({
				duration: 800,
				offset: 100,
				once: false,
				mirror: false,
				easing: "ease-in-out"
			});
		}
	}

	function runInitialHeroSequence() {
		if (document.body.dataset.heroSequenceDone === "true") {
			return;
		}

		var brand = document.querySelector(".navbar .navbar-brand");
		var navItems = Array.prototype.slice.call(document.querySelectorAll(".navbar .menu-principal .nav-link"));
		var bannerTextDesktop = document.querySelector("#home .d-none.d-md-block .texto-banner");
		var bannerTextMobile = document.querySelector("#home .d-block.d-md-none .texto-banner");
		var bannerText = bannerTextMobile && bannerTextMobile.offsetParent !== null ? bannerTextMobile : bannerTextDesktop;
		var rolar = document.querySelector("#home .rolar");
		var sequence = [];

		if (brand) {
			sequence.push(brand);
		}

		navItems.forEach(function (item) {
			sequence.push(item);
		});

		if (bannerText) {
			sequence.push(bannerText);
		}

		if (rolar) {
			sequence.push(rolar);
		}

		if (!sequence.length) {
			document.body.classList.remove("pre-hero-hidden");
			return;
		}

		sequence.forEach(function (element) {
			element.style.opacity = "0";
			element.style.transform = "translateY(1.2rem)";
			element.style.willChange = "opacity, transform";
		});

		document.body.classList.remove("pre-hero-hidden");

		setTimeout(function () {
			sequence.forEach(function (element, index) {
				setTimeout(function () {
					element.style.transition = "opacity 0.55s ease, transform 0.55s ease";
					element.style.opacity = "1";
					element.style.transform = "translateY(0)";
				}, index * 90);
			});

			document.body.dataset.heroSequenceDone = "true";
		}, 80);
	}

	function runIndexOpeningSequence() {
		if (document.body.dataset.indexOpeningSequenceDone === "true") {
			return;
		}

		var openingSection = document.getElementById("abertura-intro");
		if (!openingSection) {
			return;
		}

		var sequence = Array.prototype.slice.call(
			openingSection.querySelectorAll(".abertura-links a")
		);
		var openingLogo = openingSection.querySelector(".logotipo-abertura");

		if (openingLogo) {
			sequence.push(openingLogo);
		}

		if (!sequence.length) {
			document.body.dataset.indexOpeningSequenceDone = "true";
			return;
		}

		sequence.forEach(function (element) {
			element.style.opacity = "0";
			element.style.transform = "translateY(1.2rem)";
			element.style.willChange = "opacity, transform";
		});

		setTimeout(function () {
			sequence.forEach(function (element, index) {
				setTimeout(function () {
					element.style.transition = "opacity 0.55s ease, transform 0.55s ease";
					element.style.opacity = "1";
					element.style.transform = "translateY(0)";
				}, index * 120);
			});

			document.body.dataset.indexOpeningSequenceDone = "true";
		}, 80);
	}

	function startInitialHeroSequence() {
		if (openingSequenceStarted) {
			return;
		}

		openingSequenceStarted = true;
		runInitialHeroSequence();
	}

	function startEntranceAnimations() {
		if (entranceAnimationsStarted) {
			return;
		}

		entranceAnimationLock = true;

		if (document.body.classList.contains("safari-ios-fix") && !document.body.classList.contains("mobile-top-hack-active")) {
			window.scrollTo(0, 2);
			setTimeout(function () {
				window.scrollTo(0, 2);
			}, 120);
		}

		entranceAnimationsStarted = true;
		setupAosTargetsAndInit();
		runIndexOpeningSequence();
		startInitialHeroSequence();

		setTimeout(function () {
			entranceAnimationLock = false;
		}, 1000);
	}

	function isMobileMenuViewport() {
		return window.matchMedia("(max-width: 767px)").matches;
	}

	function setMenuOpenState(isOpen) {
		document.body.classList.toggle("menu-open", isOpen);
		updateMobileTopNavbarState();
	}

	function isMobileTopHackActive() {
		return document.body.classList.contains("mobile-top-hack-active") &&
			window.matchMedia("(max-width: 767px)").matches;
	}

	function updateMobileTopNavbarState() {
		if (!isMobileTopHackActive()) {
			document.body.classList.remove("navbar-hidden-on-scroll");
			return;
		}

		if (document.body.classList.contains("menu-open")) {
			document.body.classList.remove("navbar-hidden-on-scroll");
			return;
		}

		if (window.scrollY > mobileTopNavbarHideThreshold) {
			document.body.classList.add("navbar-hidden-on-scroll");
		} else {
			document.body.classList.remove("navbar-hidden-on-scroll");
		}
	}

	function getHomeVideoConfig() {
		var isDesktop = window.matchMedia("(min-width: 768px)").matches;

		return {
			src: isDesktop
				? "assets/videos/banner-horizontal-720.mp4"
				: "assets/videos/banner-vertical-720.mp4",
			poster: isDesktop
				? "assets/images/2x/img-bg-banner@2x-80.jpg"
				: "assets/images/2x/banner-mobile@2x-80.jpg"
		};
	}

	function applyHomeVideoSource() {
		if (!homeSection || !homeVideoBanner || !homeVideoSource) {
			return;
		}

		var config = getHomeVideoConfig();
		if (currentHomeVideoSrc === config.src) {
			return;
		}

		currentHomeVideoSrc = config.src;
		homeSection.classList.remove("video-ready");
		homeSection.classList.remove("video-fallback");
		homeVideoBanner.setAttribute("poster", config.poster);
		homeVideoSource.src = config.src;
		homeVideoBanner.load();

		var autoplayPromise = homeVideoBanner.play();
		if (autoplayPromise && typeof autoplayPromise.catch === "function") {
			autoplayPromise.catch(function () {
				homeSection.classList.add("video-fallback");
			});
		}
	}

	function hideMobileMenu() {
		if (!navbarCollapse || typeof bootstrap === "undefined" || !bootstrap.Collapse) {
			setMenuOpenState(false);
			return;
		}

		var collapseInstance = bootstrap.Collapse.getOrCreateInstance(navbarCollapse, {
			toggle: false
		});
		collapseInstance.hide();
	}

	function closeFaqItem(item) {
		var answer = item.querySelector(".faq-answer");
		var button = item.querySelector(".faq-toggle");

		item.classList.remove("active");
		if (answer) {
			answer.style.maxHeight = "0px";
		}
		if (button) {
			button.setAttribute("aria-expanded", "false");
		}
	}

	function openFaqItem(item) {
		var answer = item.querySelector(".faq-answer");
		var button = item.querySelector(".faq-toggle");

		item.classList.add("active");
		if (answer) {
			answer.style.maxHeight = answer.scrollHeight + "px";
		}
		if (button) {
			button.setAttribute("aria-expanded", "true");
		}
	}

	faqButtons.forEach(function (button) {
		button.addEventListener("click", function (event) {
			event.stopPropagation();

			var item = button.closest(".faq-item");
			if (!item) {
				return;
			}

			var isActive = item.classList.contains("active");

			faqItems.forEach(function (otherItem) {
				closeFaqItem(otherItem);
			});

			if (!isActive) {
				openFaqItem(item);
			}
		});
	});

	window.addEventListener("resize", function () {
		faqItems.forEach(function (item) {
			if (!item.classList.contains("active")) {
				return;
			}

			var answer = item.querySelector(".faq-answer");
			if (answer) {
				answer.style.maxHeight = answer.scrollHeight + "px";
			}
		});
	});

	document.querySelectorAll(".faq-question").forEach(function (question) {
		question.addEventListener("click", function () {
			var toggle = question.querySelector(".faq-toggle");
			if (toggle) {
				toggle.click();
			}
		});
	});

	menuLinks.forEach(function (link) {
		bindSmoothScroll(link);
	});

	bindSmoothScroll(document.querySelector(".navbar-brand"));
	bindSmoothScroll(document.querySelector(".bt-voltar-wrap"));
	bindSmoothScroll(scrollButtonLink);

	window.addEventListener("scroll", function () {
		updateMobileTopNavbarState();
		updateActiveMenuLinkOnScroll();
		clearTimeout(snapScrollTimer);
		snapScrollTimer = setTimeout(runSubtleSnapScroll, 150);
	});

	window.addEventListener("resize", updateMobileTopNavbarState);

	if (document.querySelector("[data-loader-overlay]")) {
		document.addEventListener("allterra-loading-hidden", function () {
			startEntranceAnimations();
		}, {
			once: true,
		});
	} else {
		startEntranceAnimations();
	}
	updateActiveMenuLinkOnScroll();
	updateMobileTopNavbarState();

	if (videoContainer && playButton && videoPlayer) {
		playButton.addEventListener("click", function () {
			videoContainer.classList.add("is-playing");

			var playPromise = videoPlayer.play();

			if (playPromise && typeof playPromise.catch === "function") {
				playPromise.catch(function () {
					videoPlayer.setAttribute("controls", "controls");
				});
			}
		});
	}

	if (homeSection && homeVideoBanner && homeVideoSource) {
		homeVideoBanner.addEventListener("canplay", function () {
			homeSection.classList.add("video-ready");
			homeSection.classList.remove("video-fallback");
		});

		homeVideoBanner.addEventListener("error", function () {
			homeSection.classList.remove("video-ready");
			homeSection.classList.add("video-fallback");
		});

		applyHomeVideoSource();

		window.addEventListener("resize", function () {
			clearTimeout(homeVideoResizeTimer);
			homeVideoResizeTimer = setTimeout(function () {
				applyHomeVideoSource();
			}, 150);
		});

		window.addEventListener("orientationchange", applyHomeVideoSource);
	}

	if (navbarCollapse) {
		navbarCollapse.addEventListener("shown.bs.collapse", function () {
			if (isMobileMenuViewport()) {
				setMenuOpenState(true);
			}
		});

		navbarCollapse.addEventListener("hidden.bs.collapse", function () {
			setMenuOpenState(false);
		});

		window.addEventListener("resize", function () {
			if (isMobileMenuViewport()) {
				updateMobileTopNavbarState();
				return;
			}

			setMenuOpenState(false);
			if (navbarCollapse.classList.contains("show")) {
				hideMobileMenu();
			}

			if (typeof AOS !== "undefined") {
				AOS.refresh();
			}
		});
	}
});
