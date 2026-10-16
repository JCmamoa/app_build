/**
 * Bento Grid 3D Tilt & Cursor Spotlight Engine
 * Tracks pointer coordinates relative to card bounding boxes to create
 * an Apple-like radial illumination spotlight and subtle 3D tilt.
 */

export function initBentoTilt() {
  const cards = document.querySelectorAll('.bento-card');

  // Skip on touch devices or reduced motion
  if (window.matchMedia('(pointer: coarse)').matches || 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  cards.forEach(card => {
    let bounds;

    function updateBounds() {
      bounds = card.getBoundingClientRect();
    }

    function onMouseMove(e) {
      if (!bounds) updateBounds();
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      // Set CSS variables for spotlight radial glow
      card.style.setProperty('--mouse-x', `${mouseX}px`);
      card.style.setProperty('--mouse-y', `${mouseY}px`);

      // Calculate subtle 3D tilt (max 4.5 degrees)
      const centerX = bounds.width / 2;
      const centerY = bounds.height / 2;
      const rotateX = ((mouseY - centerY) / centerY) * -4.5;
      const rotateY = ((mouseX - centerX) / centerX) * 4.5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    }

    function onMouseEnter() {
      updateBounds();
      window.addEventListener('resize', updateBounds, { passive: true });
    }

    function onMouseLeave() {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      card.style.removeProperty('--mouse-x');
      card.style.removeProperty('--mouse-y');
      window.removeEventListener('resize', updateBounds);
    }

    card.addEventListener('mouseenter', onMouseEnter, { passive: true });
    card.addEventListener('mousemove', onMouseMove, { passive: true });
    card.addEventListener('mouseleave', onMouseLeave, { passive: true });
  });
}
