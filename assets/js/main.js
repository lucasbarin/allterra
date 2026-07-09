"use strict";

document.addEventListener("DOMContentLoaded", function () {
	var faqItems = Array.prototype.slice.call(document.querySelectorAll(".faq-item"));
	var faqButtons = Array.prototype.slice.call(document.querySelectorAll(".faq-toggle"));
	var videoContainer = document.getElementById("videoPlaceholder");
	var playButton = document.getElementById("videoPlayButton");
	var videoPlayer = document.getElementById("videoPlayer");
	var navbarCollapse = document.getElementById("navbarNav");
	var menuLinks = navbarCollapse
		? Array.prototype.slice.call(navbarCollapse.querySelectorAll(".nav-link"))
		: [];

	function isMobileMenuViewport() {
		return window.matchMedia("(max-width: 767px)").matches;
	}

	function setMenuOpenState(isOpen) {
		document.body.classList.toggle("menu-open", isOpen);
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

	if (navbarCollapse) {
		navbarCollapse.addEventListener("shown.bs.collapse", function () {
			if (isMobileMenuViewport()) {
				setMenuOpenState(true);
			}
		});

		navbarCollapse.addEventListener("hidden.bs.collapse", function () {
			setMenuOpenState(false);
		});

		menuLinks.forEach(function (link) {
			link.addEventListener("click", function () {
				if (!isMobileMenuViewport()) {
					return;
				}

				hideMobileMenu();
			});
		});

		window.addEventListener("resize", function () {
			if (isMobileMenuViewport()) {
				return;
			}

			setMenuOpenState(false);
			if (navbarCollapse.classList.contains("show")) {
				hideMobileMenu();
			}
		});
	}
});
