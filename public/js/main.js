(function () {
  const animatedElements = document.querySelectorAll('[data-animate]');
  const zoomElements = Array.from(document.querySelectorAll('[data-animate="zoom"]'));
  const scrollyFrames = Array.from(document.querySelectorAll('[data-scrolly]'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -10% 0px'
    }
  );

  animatedElements.forEach((element) => {
    if (element.dataset.animate === 'hero') {
      element.classList.add('is-visible');
      return;
    }
    observer.observe(element);
  });

  const animateZoom = () => {
    zoomElements.forEach((element) => {
      if (!element.classList.contains('is-visible')) {
        return;
      }

      const rect = element.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const distanceFromCenter = elementCenter - viewportCenter;
      const normalized = Math.max(Math.min(distanceFromCenter / viewportCenter, 1), -1);
      const focusProgress = Math.max(0, 1 - Math.min(Math.abs(normalized), 1));
      const easedFocus = Math.pow(focusProgress, 1.5);
      const cardScale = 0.9 + easedFocus * 0.22;
      const translateY = normalized * -60 * (1 - easedFocus * 0.35);
      const tilt = normalized * -8;
      const imageScale = 1.05 + easedFocus * 0.35;
      const imageShift = easedFocus * -18;

      element.style.setProperty('--motion-scale', cardScale.toFixed(3));
      element.style.setProperty('--motion-translateY', `${translateY.toFixed(2)}px`);
      element.style.setProperty('--motion-tilt', `${tilt.toFixed(2)}deg`);
      element.style.setProperty('--focus-intensity', easedFocus.toFixed(3));

      const imageWrapper = element.querySelector('.product-card__image');
      if (imageWrapper) {
        imageWrapper.style.setProperty('--image-zoom', imageScale.toFixed(3));
        imageWrapper.style.setProperty('--image-shift', `${imageShift.toFixed(2)}px`);
      }
    });

    scrollyFrames.forEach((frame) => {
      const rect = frame.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const total = rect.height + viewportHeight * 0.65;
      const distance = viewportHeight - rect.top;
      const rawProgress = distance / total;
      const clamped = Math.min(Math.max(rawProgress, 0), 1);
      const eased = Math.pow(clamped, 1.22);

      frame.style.setProperty('--scrolly-progress', eased.toFixed(3));
      frame.classList.toggle('is-active', eased > 0.55);
    });

    window.requestAnimationFrame(animateZoom);
  };

  window.requestAnimationFrame(animateZoom);
})();
