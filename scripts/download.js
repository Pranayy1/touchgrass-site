/* ========================================
   TouchGrass Download Page — Interactions
   ======================================== */

(function () {
  'use strict';

  // --- Download click tracking (optional analytics hook) ---
  var exeBtn = document.getElementById('download-exe-btn');
  var msiBtn = document.getElementById('download-msi-btn');

  function trackDownload(format) {
    // Future: send analytics event
    console.log('[TouchGrass] Download started:', format);
  }

  if (exeBtn) {
    exeBtn.addEventListener('click', function () {
      trackDownload('exe');
    });
  }

  if (msiBtn) {
    msiBtn.addEventListener('click', function () {
      trackDownload('msi');
    });
  }

  // --- Card hover tilt micro-interaction ---
  var cards = document.querySelectorAll('.dl-card');

  cards.forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var centerX = rect.width / 2;
      var centerY = rect.height / 2;

      var rotateX = ((y - centerY) / centerY) * -3;
      var rotateY = ((x - centerX) / centerX) * 3;

      card.style.transform = 'translateY(-8px) perspective(600px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });
  });

})();
