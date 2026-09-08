/* 有朋迅 · goo 渐变氛围层注入 + 鼠标跟随 */
(function () {
  'use strict';

  // 1) 注入一次 SVG goo 滤镜
  if (!document.getElementById('goo-filter-svg')) {
    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('id', 'goo-filter-svg');
    svg.setAttribute('width', '0'); svg.setAttribute('height', '0');
    svg.style.cssText = 'position:absolute;width:0;height:0;pointer-events:none';
    svg.innerHTML =
      '<defs><filter id="goo-blur">' +
      '<feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"/>' +
      '<feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo"/>' +
      '<feBlend in="SourceGraphic" in2="goo"/>' +
      '</filter></defs>';
    document.body.appendChild(svg);
  }

  var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  document.querySelectorAll('[data-goo]').forEach(function (host) {
    var scene = document.createElement('div');
    scene.className = 'goo-scene' + (isSafari ? ' is-safari' : '');
    scene.setAttribute('aria-hidden', 'true');
    scene.innerHTML =
      '<div class="blobs">' +
      '<div class="b b1"></div><div class="b b2"></div><div class="b b3"></div>' +
      '<div class="b b4"></div><div class="b b5"></div>' +
      '<div class="b bp"></div></div>';
    host.insertBefore(scene, host.firstChild);

    // 2) 鼠标跟随光晕（lerp 平滑）
    var pointer = scene.querySelector('.bp');
    var curX = 0, curY = 0, tgX = 0, tgY = 0, raf = null;
    function loop() {
      curX += (tgX - curX) / 20;
      curY += (tgY - curY) / 20;
      pointer.style.transform = 'translate(' + Math.round(curX) + 'px,' + Math.round(curY) + 'px)';
      if (Math.abs(tgX - curX) > 0.5 || Math.abs(tgY - curY) > 0.5) raf = requestAnimationFrame(loop);
      else raf = null;
    }
    host.addEventListener('mousemove', function (e) {
      var rect = host.getBoundingClientRect();
      tgX = e.clientX - rect.left - rect.width / 2;
      tgY = e.clientY - rect.top - rect.height / 2;
      if (!raf) raf = requestAnimationFrame(loop);
    }, { passive: true });
  });
})();
