/* ========================================
   TouchGrass Landing Page — Interactions
   ======================================== */

(function () {
  'use strict';

  // --- Page Load Animation ---
  window.addEventListener('DOMContentLoaded', function () {
    requestAnimationFrame(function () {
      document.body.classList.remove('loading');
      document.body.classList.add('loaded');
    });
  });

  // --- Header Scroll Effect ---
  var header = document.getElementById('site-header');
  var scrollThreshold = 40;

  function onScroll() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- Mobile Nav Toggle ---
  var navToggle = document.getElementById('nav-toggle');
  var navLinks = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', isOpen.toString());
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- Scroll Reveal (Intersection Observer) ---
  var revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // --- Smooth scroll for anchor links (fallback for browsers without CSS scroll-behavior) ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        var headerHeight = header.offsetHeight + 16;
        var targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- Lightbox ---
  var lightbox = document.getElementById('lightbox');
  if (lightbox) {
    var lbImg = document.getElementById('lightbox-img');
    var lbCaption = document.getElementById('lightbox-caption');
    var lbClose = document.getElementById('lightbox-close');
    var lbPrev = document.getElementById('lightbox-prev');
    var lbNext = document.getElementById('lightbox-next');

    var lbItems = document.querySelectorAll('[data-lightbox]');
    var lbIndex = 0;

    function openLightbox(index) {
      lbIndex = index;
      var item = lbItems[lbIndex];
      lbImg.src = item.getAttribute('data-lightbox');
      lbImg.alt = item.querySelector('img') ? item.querySelector('img').alt : '';
      lbCaption.textContent = item.getAttribute('data-caption') || '';
      lightbox.removeAttribute('hidden');
      // Force reflow then add class for transition
      void lightbox.offsetWidth;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(function () {
        lightbox.setAttribute('hidden', '');
        lbImg.src = '';
      }, 300);
    }

    function showNext() {
      lbIndex = (lbIndex + 1) % lbItems.length;
      var item = lbItems[lbIndex];
      lbImg.src = item.getAttribute('data-lightbox');
      lbImg.alt = item.querySelector('img') ? item.querySelector('img').alt : '';
      lbCaption.textContent = item.getAttribute('data-caption') || '';
    }

    function showPrev() {
      lbIndex = (lbIndex - 1 + lbItems.length) % lbItems.length;
      var item = lbItems[lbIndex];
      lbImg.src = item.getAttribute('data-lightbox');
      lbImg.alt = item.querySelector('img') ? item.querySelector('img').alt : '';
      lbCaption.textContent = item.getAttribute('data-caption') || '';
    }

    lbItems.forEach(function (item, idx) {
      item.addEventListener('click', function () { openLightbox(idx); });
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(idx);
        }
      });
    });

    lbClose.addEventListener('click', closeLightbox);
    lbNext.addEventListener('click', showNext);
    lbPrev.addEventListener('click', showPrev);

    // Close on backdrop click
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    });
  }

})();
