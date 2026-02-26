// ============================================================
// app.js — Entry point: shared utilities, scroll reveal,
//           stat counter animation
// ============================================================

// ─── Shared Utilities ────────────────────────────────────────

/**
 * Returns a Promise that resolves after `ms` milliseconds.
 * Used to simulate async AI processing delays.
 * @param {number} ms
 * @returns {Promise<void>}
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ─── Scroll Reveal ───────────────────────────────────────────

/**
 * Uses IntersectionObserver to fade-up elements with the
 * `.reveal` class as they enter the viewport.
 */
function initScrollReveal() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ─── Stat Counter Animation ──────────────────────────────────

/** Final display values for each stat number element. */
const STAT_TEXTS = ['94%', '3.2×', '50+', '12k+'];

/**
 * Animates stat numbers into view when the stats bar
 * scrolls into the viewport. Fires only once.
 */
function initStatCounters() {
  const statNums = document.querySelectorAll('.stat-num');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        statNums.forEach((el, i) => {
          setTimeout(() => {
            // Fade out
            el.style.opacity = '0';
            el.style.transform = 'translateY(10px)';
            el.style.transition = 'all 0.3s ease';

            // Swap text and fade back in
            setTimeout(() => {
              el.textContent = STAT_TEXTS[i];
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            }, 200 + i * 100);
          }, i * 80);
        });

        observer.disconnect(); // Run only once
      });
    },
    { threshold: 0.5 }
  );

  const statsSection = document.querySelector('.stats');
  if (statsSection) observer.observe(statsSection);
}

// ─── Bootstrap ───────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initStatCounters();
  generateRoadmap(); // Render the roadmap on initial load
});
