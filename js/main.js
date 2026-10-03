// =====================================================================
// Associazione Teatrale [NOME] — script del sito
// Vanilla JS, nessuna libreria esterna necessaria.
// =====================================================================

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initActiveNavLink();
  initLightbox();
  initFooterYear();
  initContactForm();
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

// --- Evidenzia la voce di menu della sezione visibile -------------------
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  if (!sections.length || !navLinks.length) return;

  const byId = (id) =>
    document.querySelector(`.nav-links a[href="#${id}"]`);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove('is-active'));
          const link = byId(entry.target.id);
          if (link) link.classList.add('is-active');
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
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

// --- Modulo di contatto (invio via Web3Forms, senza backend) ------------
function initContactForm() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('contactFeedback');
  const submitBtn = document.getElementById('contactSubmitBtn');
  if (!form || !feedback || !submitBtn) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const accessKey = form.elements['access_key']?.value || '';
    if (!accessKey || accessKey.includes('INSERISCI_QUI')) {
      feedback.textContent =
        'Il modulo non è ancora configurato: manca la access key di Web3Forms (vedi README).';
      feedback.className = 'form-feedback is-error';
      return;
    }

    submitBtn.disabled = true;
    const originalLabel = submitBtn.textContent;
    submitBtn.textContent = 'Invio in corso…';
    feedback.textContent = '';
    feedback.className = 'form-feedback';

    try {
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (result.success) {
        feedback.textContent = 'Messaggio inviato! Ti risponderemo al più presto.';
        feedback.className = 'form-feedback is-success';
        form.reset();
      } else {
        feedback.textContent =
          'Non siamo riusciti a inviare il messaggio. Riprova oppure scrivici via email.';
        feedback.className = 'form-feedback is-error';
      }
    } catch (err) {
      feedback.textContent =
        'Errore di connessione. Riprova oppure scrivici via email.';
      feedback.className = 'form-feedback is-error';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalLabel;
    }
  });
}
