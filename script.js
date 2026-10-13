// Select the hero banner and its title content for the scroll effect.
const cover = document.querySelector(".cover");
const heroText = document.querySelector("#container");

// Move the banner background and fade its title as the page scrolls.
if (cover && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
	let ticking = false;

	const updateParallax = () => {
		const offset = Math.min(window.scrollY * 0.35, 210);
		cover.style.setProperty("--parallax-offset", `${offset}px`);

		if (heroText) {
			const fadeStart = cover.offsetTop + cover.offsetHeight * 0.2;
			const fadeEnd = cover.offsetTop + cover.offsetHeight * 0.9;
			const scrollY = window.scrollY;
			let opacity = 1;

			if (scrollY > fadeStart) {
				opacity = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);
			}

			cover.style.setProperty("--hero-opacity", `${Math.max(opacity, 0)}`);
			heroText.style.opacity = Math.max(opacity, 0);
		}

		ticking = false;
	};

	window.addEventListener("scroll", () => {
		if (!ticking) {
			window.requestAnimationFrame(updateParallax);
			ticking = true;
		}
	}, { passive: true });

	updateParallax();
}
