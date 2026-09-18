(() => {
  const worlds = ['about', 'education', 'experience', 'projects'];
  const names = ['ABOUT', 'EDUCATION', 'EXPERIENCE', 'PROJECTS'];
  const explored = new Set();
  const counter = document.querySelector('#explored');
  const current = document.querySelector('#current-world');
  const links = [...document.querySelectorAll('.level-grid a')];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const index = worlds.indexOf(entry.target.id);
      if (index < 0) return;
      explored.add(entry.target.id);
      counter.textContent = `${String(explored.size).padStart(2, '0')} / 04`;
      current.textContent = `${String(index + 1).padStart(2, '0')} / ${names[index]}`;
      links[index].classList.add('visited');
      links[index].querySelector('b').textContent = '✓';
      links[index].setAttribute('aria-label', `World ${index + 1}: ${names[index]}, explored`);
    });
  }, { rootMargin: '-10% 0px -35% 0px', threshold: 0 });
  worlds.forEach(id => observer.observe(document.getElementById(id)));
})();
