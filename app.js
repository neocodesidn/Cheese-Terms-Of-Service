(() => {
  'use strict';
  const cfg = window.CHEESE_SITE || {};
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const title = String(cfg.operatorName || 'Pengelola Cheese Bot').trim();
  $$('[data-operator]').forEach(el => { el.textContent = title; });
  $$('[data-updated]').forEach(el => { el.textContent = String(cfg.updatedAt || '25 Oktober 2026'); });
  const currentYear = $('#year');
  if (currentYear) currentYear.textContent = String(new Date().getFullYear());

  const email = String(cfg.contactEmail || '').trim();
  const support = String(cfg.supportUrl || '').trim();
  const contactLabel = email || (support ? 'server dukungan resmi' : 'admin server Discord tempat Bot digunakan');
  $$('[data-contact]').forEach(el => {
    if (email) {
      const a = document.createElement('a');
      a.href = `mailto:${email}`;
      a.textContent = email;
      el.replaceChildren(a);
    } else if (support && /^https:\/\//i.test(support)) {
      const a = document.createElement('a');
      a.href = support; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.textContent = contactLabel;
      el.replaceChildren(a);
    } else { el.textContent = contactLabel; }
  });
  $$('[data-contact-link]').forEach(el => {
    const href = email ? `mailto:${email}` : (support && /^https:\/\//i.test(support) ? support : null);
    if (!href) return;
    el.hidden = false; el.href = href;
    if (href.startsWith('https://')) { el.target = '_blank'; el.rel = 'noopener noreferrer'; }
  });

  // Do not silently publish incomplete operator support information.
  if (!email && !support) {
    const banner = document.createElement('div');
    banner.className = 'config-reminder';
    banner.innerHTML = '<div class="container"><strong>Konfigurasi belum lengkap.</strong><span>Pengelola: isi email dukungan atau URL server resmi di <code>site-config.js</code> sebelum publikasi.</span></div>';
    const header = $('.site-header');
    if (header) header.insertAdjacentElement('afterend', banner);
  }

  const toggle = $('#mobile-nav-toggle');
  const nav = $('#main-navigation');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const opened = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(opened));
      toggle.setAttribute('aria-label', opened ? 'Tutup navigasi' : 'Buka navigasi');
    });
    nav.addEventListener('click', event => {
      if (event.target.closest('a')) { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
    });
  }

  const print = $('#print-page');
  if (print) print.addEventListener('click', () => window.print());
  const copy = $('#copy-link');
  if (copy) copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(location.href);
      copy.textContent = '✓ Tautan tersalin';
      setTimeout(() => { copy.textContent = '↗ Salin tautan'; }, 1800);
    } catch (_) { copy.textContent = 'Salin URL dari address bar'; }
  });
  const progress = $('#reading-progress');
  if (progress && $('.legal-article')) {
    const calculate = () => {
      const limit = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = `${limit <= 0 ? 100 : Math.max(0,Math.min(100,(window.scrollY/limit)*100))}%`;
    };
    calculate();
    window.addEventListener('scroll', calculate, { passive: true });
    window.addEventListener('resize', calculate, { passive: true });
  }
  if ('IntersectionObserver' in window) {
    const sections = $$('.legal-article section[id]');
    const links = $$('.toc-links a');
    const obs = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a,b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible.length) {
        links.forEach(link => link.classList.toggle('current', link.getAttribute('href') === `#${visible[0].target.id}`));
      }
    }, { rootMargin: '-108px 0px -65% 0px', threshold: 0 });
    sections.forEach(s => obs.observe(s));
  }
})();
