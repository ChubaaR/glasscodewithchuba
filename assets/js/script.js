'use strict';

document.addEventListener('DOMContentLoaded', function () {

  // init icons
  if (window.lucide) lucide.createIcons();



  // ============= mobile menu =============

  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');
  let menuOpen = false;

  const closeMobileMenu = function () {
    menuOpen = false;
    if (!mobileMenu) return;
    mobileMenu.style.maxHeight = '0px';
    mobileMenu.style.opacity = '0';
    if (menuIcon) menuIcon.classList.remove('hidden');
    if (closeIcon) closeIcon.classList.add('hidden');
  };

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () {
      menuOpen = !menuOpen;
      if (menuOpen) {
        mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
        mobileMenu.style.opacity = '1';
        if (menuIcon) menuIcon.classList.add('hidden');
        if (closeIcon) closeIcon.classList.remove('hidden');
      } else {
        closeMobileMenu();
      }
    });
  }



  // ============= page navigation (hash based) =============

  const navigationLinks = document.querySelectorAll('[data-nav-link]');
  const pages = document.querySelectorAll('[data-page]');

  const syncPageFromHash = function () {
    const hash = location.hash.replace('#', '');
    const pageName = hash || 'about';

    pages.forEach(function (page) {
      page.classList.toggle('active', page.dataset.page === pageName);
    });

    navigationLinks.forEach(function (link) {
      link.classList.toggle('active', link.dataset.page === pageName);
    });

    window.scrollTo(0, 0);
  };

  navigationLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeMobileMenu();
      // native hash change handles the actual page swap
    });
  });

  window.addEventListener('hashchange', syncPageFromHash);
  syncPageFromHash();



  // ============= e-book filter =============

  const filterBtns = document.querySelectorAll('[data-filter-btn]');
  const filterItems = document.querySelectorAll('[data-filter-item]');

  const normalizeCategory = function (value) {
    return String(value || '').trim().toLowerCase();
  };

  const filterFunc = function (selectedValue) {
    const normalized = normalizeCategory(selectedValue);

    filterItems.forEach(function (item) {
      const itemCategory = normalizeCategory(item.dataset.category);
      item.style.display = (normalized === 'all' || itemCategory === normalized) ? '' : 'none';
    });
  };

  if (filterBtns.length) {
    let lastActive = filterBtns[0];

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const selectedValue = this.innerText.trim();
        filterFunc(selectedValue);

        lastActive.classList.remove('active');
        lastActive.classList.add('text-white/70');
        lastActive.classList.remove('text-white');

        this.classList.add('active');
        this.classList.remove('text-white/70');
        this.classList.add('text-white');

        lastActive = this;
      });
    });
  }



  // ============= contact form =============

  const form = document.querySelector('[data-form]');
  const formInputs = document.querySelectorAll('[data-form-input]');
  const formBtn = document.querySelector('[data-form-btn]');

  formInputs.forEach(function (input) {
    input.addEventListener('input', function () {
      if (!form || !formBtn) return;

      if (form.checkValidity()) {
        formBtn.removeAttribute('disabled');
      } else {
        formBtn.setAttribute('disabled', '');
      }
    });
  });

  if (form) {
    form.addEventListener('submit', function () {
      if (!formBtn) return;
      const label = formBtn.querySelector('span');
      if (label) label.textContent = 'Sending...';
      formBtn.disabled = true;
      // Formspree handles the rest automatically
    });
  }



  // ============= newsletter capture (hero) =============

  const newsletterForm = document.getElementById('newsletter-form');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = newsletterForm.querySelector('button');
      if (btn) {
        btn.innerHTML = '<i data-lucide="check" class="w-4 h-4"></i>';
        if (window.lucide) lucide.createIcons();
      }
    });
  }

});
