// =============================================
// INDUCTIVE LLC — SHARED JS
// =============================================

// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
  }

  // Mark active nav link
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
});

// ---- CONTACT FORM (Formspree or mailto fallback) ----
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn     = contactForm.querySelector('button[type="submit"]');
    const success = document.getElementById('form-success');
    const error   = document.getElementById('form-error');

    btn.disabled = true;
    btn.textContent = 'Sending...';

    const formData = new FormData(contactForm);
    const action   = contactForm.getAttribute('action');

    try {
      const res = await fetch(action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        contactForm.reset();
        if (success) { success.style.display = 'block'; }
        if (error)   { error.style.display = 'none'; }
      } else {
        throw new Error('Server error');
      }
    } catch (err) {
      if (error)   { error.style.display = 'block'; }
      if (success) { success.style.display = 'none'; }
    } finally {
      btn.disabled = false;
      btn.textContent = 'Send Message';
    }
  });
}
