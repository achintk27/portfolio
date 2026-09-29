// Progressive enhancement: project content stays readable without JavaScript.
// Add an <article class="project" data-category="…"> in index.html to grow the collection.
(() => {
  const cards = [...document.querySelectorAll('#project-grid > .project')];
  const tools = document.getElementById('project-tools');
  const filters = document.getElementById('project-filters');
  const search = document.getElementById('project-search');
  const more = document.getElementById('show-more');
  const count = document.getElementById('project-count');
  let category = 'All', limit = 6;
  // Keep a small collection simple; reveal discovery controls as it grows.
  tools.hidden = cards.length <= 3;
  document.getElementById('search-label').hidden = cards.length <= 6;
  for (const name of ['All', ...new Set(cards.map(card => card.dataset.category))]) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = name;
    button.setAttribute('aria-pressed', String(name === category));
    button.addEventListener('click', () => {
      category = name;
      limit = 6;
      for (const item of filters.children) item.setAttribute('aria-pressed', String(item === button));
      render();
    });
    filters.append(button);
  }
  function render() {
    const term = search.value.trim().toLowerCase();
    const matches = cards.filter(card => (category === 'All' || card.dataset.category === category) && card.textContent.toLowerCase().includes(term));
    const visible = new Set(matches.slice(0, limit));
    for (const card of cards) card.hidden = !visible.has(card);
    count.textContent = `${Math.min(limit, matches.length)} of ${matches.length} projects`;
    more.hidden = matches.length <= limit;
    document.getElementById('project-empty').hidden = matches.length !== 0;
  }
  search.addEventListener('input', () => { limit = 6; render(); });
  more.addEventListener('click', () => { limit += 6; render(); });
  function revealLinkedProject() {
    const card = cards.find(item => '#' + item.id === location.hash);
    if (!card) return;
    category = 'All'; search.value = ''; limit = Math.max(6, cards.indexOf(card) + 1);
    for (const item of filters.children) item.setAttribute('aria-pressed', String(item.textContent === 'All'));
    render();
    requestAnimationFrame(() => card.scrollIntoView({ block: 'start' }));
  }
  window.addEventListener('hashchange', revealLinkedProject);
  render(); revealLinkedProject();
})();
