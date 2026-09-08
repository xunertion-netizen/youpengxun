// Keep the series quiet until a visitor chooses a film.
document.querySelectorAll('.stem-videos video').forEach(function(video) {
  video.addEventListener('play', function() {
    document.querySelectorAll('.stem-videos video').forEach(function(other) {
      if (other !== video) other.pause();
    });
  });
});
document.querySelectorAll('.works-filter .chip').forEach(function(chip) {
  chip.addEventListener('click', function() {
    if (chip.dataset.f === 'ai') {
      document.querySelectorAll('.stem-videos video').forEach(function(video) { video.pause(); });
    }
  });
});
