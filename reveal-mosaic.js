(() => {
  const section = document.querySelector('.manifesto');
  if (!section) return;
  const tiles = [...section.querySelectorAll('.reveal-mosaic img')];
  function reveal(event) {
    const box = section.getBoundingClientRect();
    const columns = innerWidth <= 700 ? 4 : 6;
    const x = Math.floor((event.clientX - box.left) / box.width * columns);
    const y = Math.floor((event.clientY - box.top) / box.height * (24 / columns));
    if (x >= 0 && x < columns && y >= 0 && y < 24 / columns) {
      tiles[y * columns + x].classList.add('seen');
    }
  }
  section.addEventListener('pointermove', reveal, {passive:true});
  section.addEventListener('pointerdown', reveal, {passive:true});
  section.querySelector('.mosaic-show').addEventListener('click', event => {
    tiles.forEach(tile => tile.classList.add('seen'));
    event.currentTarget.textContent = '全部画面已展开';
    event.currentTarget.disabled = true;
  });
})();
