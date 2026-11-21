/* ==========================================================================
   Everlast Professional Cleaning Services — Interactive Frontend Controller
   Vanilla JavaScript (ES6+), Zero Dependencies, GitHub Pages Ready
   ========================================================================== */

(function () {
  'use strict';

  /* 1. Mobile Navigation Drawer */
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function setDrawerOpen(isOpen) {
    if (!menuToggle || !mobileDrawer) return;
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    if (isOpen) {
      mobileDrawer.removeAttribute('hidden');
    } else {
      mobileDrawer.setAttribute('hidden', '');
    }
  }

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      const currentlyOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      setDrawerOpen(!currentlyOpen);
    });

    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => setDrawerOpen(false));
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        setDrawerOpen(false);
        menuToggle.focus();
      }
    });

    document.addEventListener('click', (event) => {
      const header = document.getElementById('site-header');
      if (
        header &&
        menuToggle.getAttribute('aria-expanded') === 'true' &&
        !header.contains(event.target)
      ) {
        setDrawerOpen(false);
      }
    });
  }

  /* 2. Services Category Filter */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('[data-category]');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetFilter = btn.dataset.filter || 'all';

      filterButtons.forEach((item) => {
        const active = item === btn;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });

      serviceCards.forEach((card) => {
        const categories = (card.dataset.category || '').split(/\s+/);
        const matches = targetFilter === 'all' || categories.includes(targetFilter);
        card.classList.toggle('is-dimmed', !matches);
      });
    });
  });

  /* 3. "Select for Quote" Pre-fill Interaction */
  const serviceSelectButtons = document.querySelectorAll('.js-select-service');
  const quoteServiceSelect = document.getElementById('qb-service');
  const quoteSection = document.getElementById('quote');
  const quoteNameInput = document.getElementById('qb-name');

  serviceSelectButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const chosenService = btn.dataset.service;
      if (quoteServiceSelect && chosenService) {
        const optionMatch = Array.from(quoteServiceSelect.options).find(
          (opt) => opt.value === chosenService
        );
        if (optionMatch) {
          quoteServiceSelect.value = chosenService;
        }
      }
      if (quoteSection) {
        quoteSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (quoteNameInput) {
        setTimeout(() => quoteNameInput.focus({ preventScroll: true }), 420);
      }
    });
  });

  /* 4. Interactive Checklist Explorer Tabs */
  const checklistTabs = Array.from(document.querySelectorAll('.checklist-tab'));
  const checklistPanels = Array.from(document.querySelectorAll('.checklist-panel'));

  function activateChecklistTab(selectedTab) {
    checklistTabs.forEach((tab) => {
      const isSelected = tab === selectedTab;
      tab.classList.toggle('is-active', isSelected);
      tab.setAttribute('aria-selected', String(isSelected));
      tab.tabIndex = isSelected ? 0 : -1;
    });

    const targetPanelId = selectedTab.getAttribute('aria-controls');
    checklistPanels.forEach((panel) => {
      const matches = panel.id === targetPanelId;
      panel.classList.toggle('is-active', matches);
      if (matches) {
        panel.removeAttribute('hidden');
      } else {
        panel.setAttribute('hidden', '');
      }
    });
  }

  checklistTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateChecklistTab(tab));

    tab.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        const direction = event.key === 'ArrowRight' ? 1 : -1;
        const nextIndex = (index + direction + checklistTabs.length) % checklistTabs.length;
        activateChecklistTab(checklistTabs[nextIndex]);
        checklistTabs[nextIndex].focus();
      }
    });
  });

  /* 5. FAQ Accordion */
  const faqTriggers = document.querySelectorAll('.faq-trigger');

  faqTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const panelId = trigger.getAttribute('aria-controls');
      const panel = panelId ? document.getElementById(panelId) : null;

      trigger.setAttribute('aria-expanded', String(!isExpanded));
      if (panel) {
        if (isExpanded) {
          panel.setAttribute('hidden', '');
        } else {
          panel.removeAttribute('hidden');
        }
      }
    });
  });

  /* 6. Honest Static Quote Brief Builder (No Fake Backend Submission) */
  const quoteForm = document.getElementById('quote-builder-form');
  const quoteError = document.getElementById('qb-error');
  const quoteCopyBtn = document.getElementById('qb-copy-btn');
  const quotePreview = document.getElementById('qb-preview');
  const quotePreviewStatus = document.getElementById('qb-preview-status');
  const quotePreviewText = document.getElementById('qb-preview-text');

  function gatherQuoteFields() {
    const name = (document.getElementById('qb-name')?.value || '').trim();
    const phone = (document.getElementById('qb-phone')?.value || '').trim();
    const email = (document.getElementById('qb-email')?.value || '').trim();
    const suburb = (document.getElementById('qb-suburb')?.value || '').trim();
    const service = document.getElementById('qb-service')?.value || 'Residential Cleaning';
    const frequency = document.getElementById('qb-frequency')?.value || 'One-Off Clean';
    const startDate = (document.getElementById('qb-date')?.value || '').trim();
    const details = (document.getElementById('qb-details')?.value || '').trim();
    const includeOffer = Boolean(document.getElementById('qb-offer')?.checked);

    return { name, phone, email, suburb, service, frequency, startDate, details, includeOffer };
  }

  function validateQuoteFields(data) {
    if (!data.name) return 'Please enter your name so Everlast knows who to address the quote to.';
    if (!data.phone) return 'Please enter a phone number.';
    if (!data.email || !data.email.includes('@')) return 'Please enter a valid email address.';
    if (!data.suburb) return 'Please enter your Melbourne suburb and postcode.';
    return '';
  }

  function formatQuoteBrief(data) {
    const lines = [
      'QUOTE ENQUIRY — EVERLAST PROFESSIONAL CLEANING SERVICES',
      '--------------------------------------------------------',
      `Name: ${data.name}`,
      `Phone: ${data.phone}`,
      `Email: ${data.email}`,
      `Suburb / Postcode: ${data.suburb}`,
      `Service Requested: ${data.service}`,
      `Frequency: ${data.frequency}`,
      `Preferred Start Date: ${data.startDate || 'Flexible / To be confirmed'}`,
      `15% Off First Clean Offer: ${data.includeOffer ? 'Yes — please apply if eligible' : 'Not requested'}`,
      '',
      'Property & Cleaning Details:',
      data.details || '(No extra notes entered)'
    ];
    return lines.join('\n');
  }

  function showQuoteError(message) {
    if (!quoteError) return;
    if (message) {
      quoteError.textContent = message;
      quoteError.removeAttribute('hidden');
    } else {
      quoteError.textContent = '';
      quoteError.setAttribute('hidden', '');
    }
  }

  function renderPreview(statusText, bodyText) {
    if (!quotePreview || !quotePreviewStatus || !quotePreviewText) return;
    quotePreviewStatus.textContent = statusText;
    quotePreviewText.textContent = bodyText;
    quotePreview.removeAttribute('hidden');
  }

  if (quoteForm) {
    quoteForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = gatherQuoteFields();
      const err = validateQuoteFields(data);
      if (err) {
        showQuoteError(err);
        return;
      }
      showQuoteError('');

      const formattedBody = formatQuoteBrief(data);
      const subject = `Quote Request: ${data.service} — ${data.suburb}`;
      const mailtoHref =
        `mailto:everlastprofessionalcleaning@gmail.com` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(formattedBody)}`;

      renderPreview(
        'Prepared email draft below (no server submission occurs on this static demo). Opening your mail client...',
        formattedBody
      );

      window.location.href = mailtoHref;
    });
  }

  if (quoteCopyBtn) {
    quoteCopyBtn.addEventListener('click', async () => {
      const data = gatherQuoteFields();
      const err = validateQuoteFields(data);
      if (err) {
        showQuoteError(err);
        return;
      }
      showQuoteError('');

      const formattedBody = formatQuoteBrief(data);
      let copied = false;
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        try {
          await navigator.clipboard.writeText(formattedBody);
          copied = true;
        } catch (_e) {
          copied = false;
        }
      }

      renderPreview(
        copied
          ? 'Quote brief copied to clipboard. Paste into an email to everlastprofessionalcleaning@gmail.com or SMS 0423 679 099.'
          : 'Quote brief prepared below. Copy this text and send to everlastprofessionalcleaning@gmail.com or call 0423 679 099.',
        formattedBody
      );
    });
  }

  /* 7. Dynamic Footer Year */
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();
