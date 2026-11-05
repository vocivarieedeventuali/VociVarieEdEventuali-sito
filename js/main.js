// =====================================================================
// Associazione Teatrale VOCI VARIE ED EVENTUALI — script del sito
// Vanilla JS, nessuna libreria esterna necessaria.
// =====================================================================

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initActiveNavLink();
  initSliders();
  initLightbox();
  initFooterYear();
});

// --- Menu mobile (hamburger) -------------------------------------------
function initNavToggle() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    document.body.classList.toggle('nav-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Chiudi il menu quando si clicca un link (utile su mobile)
  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('is-open');
      document.body.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// --- Evidenzia la voce di menu ---------------------------------------------
// Nelle pagine "Strad'aria" e "Io leggo per te" la voce attiva e' gia' indicata
// nell'HTML (class="is-active"). Nella Home evidenzia Home / Chi Siamo / Contatti
// in base alla sezione visibile.
function initActiveNavLink() {
  if (document.body.getAttribute('data-page') !== 'home') return;

  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  if (!sections.length || !navLinks.length) return;

  const byId = (id) =>
    Array.from(navLinks).find((a) => {
      const href = a.getAttribute('href') || '';
      return href === `#${id}` || href.endsWith(`#${id}`) || (id === 'home' && href === 'index.html');
    });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const link = byId(entry.target.id);
          if (!link) return; // sezione senza voce di menu (es. Galleria): lascia il menu com'e'
          navLinks.forEach((l) => { l.classList.remove('is-active'); l.removeAttribute('aria-current'); });
          link.classList.add('is-active');
          link.setAttribute('aria-current', 'page');
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

// --- Foto a scorrimento (frecce + swipe) ---------------------------------
function initSliders() {
  document.querySelectorAll('[data-slider]').forEach((slider) => {
    const slides = Array.from(slider.querySelectorAll('.slide'));
    const prev = slider.querySelector('.slider-btn--prev');
    const next = slider.querySelector('.slider-btn--next');
    if (slides.length < 2) {
      slider.setAttribute('data-single', '');
      return;
    }

    let current = slides.findIndex((s) => s.classList.contains('is-active'));
    if (current < 0) current = 0;

    const show = (index) => {
      current = (index + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle('is-active', i === current));
    };

    prev.addEventListener('click', () => show(current - 1));
    next.addEventListener('click', () => show(current + 1));

    // swipe su schermi touch
    let startX = null;
    slider.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
    slider.addEventListener('touchend', (e) => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) show(current + (dx < 0 ? 1 : -1));
      startX = null;
    });
  });
}

// --- Lightbox della galleria ---------------------------------------------
function initLightbox() {
  const grid = document.getElementById('galleriaGrid');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeBtn = document.getElementById('lightboxClose');
  if (!grid || !lightbox || !lightboxImg || !closeBtn) return;

  grid.querySelectorAll('.galleria-item').forEach((item) => {
    item.addEventListener('click', () => {
      const full = item.getAttribute('data-full');
      const alt = item.querySelector('img')?.getAttribute('alt') || '';
      lightboxImg.src = full;
      lightboxImg.alt = alt;
      lightbox.classList.add('is-open');
    });
  });

  const close = () => lightbox.classList.remove('is-open');

  closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

// --- Anno corrente nel footer --------------------------------------------
function initFooterYear() {
  const el = document.getElementById('anno');
  if (el) el.textContent = new Date().getFullYear();
}
