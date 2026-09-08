/* 有朋迅 · 交互 app.js */
(function () {
  'use strict';

  // ---- nav scroll state ----
  var nav = document.querySelector('.nav');
  function onScroll() {
    if (window.scrollY > 24) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- reveal on scroll (scroll-position based; robust across environments) ----
  // Opt into animation only when JS is alive — base CSS keeps content visible.
  document.documentElement.classList.add('has-anim');
  var reveals = [].slice.call(document.querySelectorAll('.reveal'));
  function checkReveal() {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    for (var i = reveals.length - 1; i >= 0; i--) {
      var el = reveals[i];
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > 0) {
        el.classList.add('in');
        reveals.splice(i, 1);
      }
    }
  }
  var ticking = false;
  function onReveal() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { checkReveal(); ticking = false; });
  }
  window.addEventListener('scroll', onReveal, { passive: true });
  window.addEventListener('resize', onReveal, { passive: true });
  window.addEventListener('load', checkReveal);
  checkReveal();
  // safety: never leave content hidden
  setTimeout(function () { document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); }); }, 2600);

  // ---- works filter ----
  var chips = document.querySelectorAll('.chip');
  var works = document.querySelectorAll('.work');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');
      var f = chip.getAttribute('data-f');
      works.forEach(function (w) {
        var show = (f === 'all' || w.getAttribute('data-cat') === f);
        w.style.transition = 'opacity .4s ease, transform .4s ease';
        if (show) { w.style.display = ''; requestAnimationFrame(function(){ w.style.opacity = '1'; w.style.transform=''; }); }
        else { w.style.opacity = '0'; w.style.transform = 'scale(.96)'; setTimeout(function(){ w.style.display = 'none'; }, 320); }
      });
    });
  });

  // ---- FAQ accordion ----
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (other) {
        if (other !== item) { other.classList.remove('open'); var oa = other.querySelector('.faq-a'); if (oa) oa.style.maxHeight = '0px'; }
      });
      if (isOpen) { item.classList.remove('open'); a.style.maxHeight = '0px'; }
      else { item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
    });
  });

  // ---- mobile menu ----
  var burger = document.querySelector('.nav-burger');
  var sheet = document.querySelector('.mobile-sheet');
  if (burger && sheet) {
    burger.addEventListener('click', function () { sheet.classList.toggle('open'); });
    sheet.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { sheet.classList.remove('open'); });
    });
  }

  // ---- smooth anchor (account for fixed nav) ----
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (ev) {
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var t = document.querySelector(id);
      if (!t) return;
      ev.preventDefault();
      var y = t.getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  // ---- subtle parallax on hero blobs ----
  var blobs = document.querySelectorAll('.hero-bg .blob');
  window.addEventListener('mousemove', function (e) {
    var cx = (e.clientX / window.innerWidth - .5);
    var cy = (e.clientY / window.innerHeight - .5);
    blobs.forEach(function (b, i) {
      var f = (i + 1) * 14;
      b.style.transform = 'translate(' + (cx * f) + 'px,' + (cy * f) + 'px)';
    });
  });
})();
