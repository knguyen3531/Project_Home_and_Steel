(function () {
  const animatedElements = document.querySelectorAll('[data-animate]');
  const zoomElements = Array.from(document.querySelectorAll('[data-animate="zoom"]'));

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
      const scale = 1 - Math.abs(normalized) * 0.08;
      const translateY = normalized * -28;

      element.style.setProperty('--motion-scale', scale.toFixed(3));
      element.style.setProperty('--motion-translateY', `${translateY.toFixed(2)}px`);
    });

    window.requestAnimationFrame(animateZoom);
  };

  window.requestAnimationFrame(animateZoom);
})();
