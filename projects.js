(() => {
 const search = document.querySelector('#project-search');
 if (!search) return;
 const cards = [...document.querySelectorAll('.project-card')];
 const filters = [...document.querySelectorAll('[data-filter]')];
 let category = 'All';
 function update() {
  const query = search.value.trim().toLowerCase();
  let count = 0;
  cards.forEach(card => {
   const matches = (category === 'All' || card.dataset.category === category) && (card.dataset.search + ' ' + card.textContent).toLowerCase().includes(query);
   card.hidden = !matches;
   if(matches) count++;
  });
  document.querySelector('#project-count').textContent = `${count} project${count === 1 ? '' : 's'}`;
  document.querySelector('#project-empty').hidden = count !== 0;
 }
 filters.forEach(button => button.addEventListener('click', () => {
  category = button.dataset.filter;
  filters.forEach(item => {item.classList.toggle('active', item === button); item.setAttribute('aria-pressed', String(item === button));});
  update();
 }));
 search.addEventListener('input', update);
})();
