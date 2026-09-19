// Add one entry per project. Filters and the gallery update automatically.
const portfolioProjects = [
  {
    "id": "lab-scheduling",
    "title": "Lab Equipment Scheduling Platform",
    "category": "Full-stack",
    "featured": true,
    "status": "Live",
    "tags": [
      "React",
      "Node.js",
      "Firebase",
      "Vercel"
    ],
    "description": "Lab bookings at college were coordinated manually. I built a platform that gives 200+ users a shared place to reserve equipment, with concurrency controls to prevent conflicting bookings.",
    "metric": "200+",
    "metricLabel": "USERS \u00b7 ONE PLACE TO BOOK",
    "details": "The key engineering challenge was keeping equipment and time-slot reservations consistent when multiple users try to book at once. The platform combines a React interface, Node.js, and Firebase, with Resend in the supporting stack.",
    "liveUrl": "https://pesbiotech-lab.vercel.app",
    "sourceUrl": "",
    "image": "",
    "imageAlt": "",
    "result": ""
  },
  {
    "id": "genome-pipeline",
    "title": "Automated Genome Analysis Pipeline",
    "category": "Data & ML",
    "featured": false,
    "status": "Research",
    "tags": [
      "Python",
      "React",
      "SQL",
      "ML / GWAS"
    ],
    "description": "Built an automated Python pipeline to extract features from raw FASTA and VCF files. Added validation and structured logging to make failures easier to identify across chromosome datasets.",
    "metric": "50%",
    "metricLabel": "FASTER DATA PROCESSING",
    "details": "Combined automated variant filtering with machine learning for SNP classification. The workflow includes data preparation, comparative analysis, and an interactive React interface. Related research has been submitted; publication is pending.",
    "liveUrl": "",
    "sourceUrl": "",
    "image": "",
    "imageAlt": "",
    "result": "85% accuracy in SNP classification"
  }
];

(() => {
 const grid=document.getElementById('project-grid'), search=document.getElementById('project-search'), filters=document.getElementById('project-filters');
 let category='All',limit=6;
 const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const safeUrl=url=>{try{const u=new URL(url,location.href);return ['https:','http:'].includes(u.protocol)?escape(url):'';}catch{return '';}};
 const more=document.createElement('button');more.type='button';more.className='button yellow catalog-more';more.textContent='Show more projects ↓';grid.after(more);more.addEventListener('click',()=>{limit+=6;render();});
 for(const name of ['All',...new Set(portfolioProjects.map(p=>p.category))]) {
  const button=document.createElement('button');button.type='button';button.textContent=name;button.setAttribute('aria-pressed',String(name===category));
  button.addEventListener('click',()=>{category=name;limit=6;for(const b of filters.children)b.setAttribute('aria-pressed',String(b===button));render();});filters.append(button);
 }
 function render(){
  const term=search.value.trim().toLowerCase();
  const found=portfolioProjects.filter(p=>(category==='All'||p.category===category)&&[p.title,p.category,p.description,...p.tags].join(' ').toLowerCase().includes(term)).sort((a,b)=>Number(b.featured)-Number(a.featured));
  grid.replaceChildren();
  for(const p of found.slice(0,limit)){
   const card=document.createElement('article');card.className='project';card.id='project-'+p.id;
   const cover=p.image&&safeUrl(p.image)?`<img class="project-cover" loading="lazy" src="${safeUrl(p.image)}" alt="${escape(p.imageAlt||p.title)}">`:`<div class="project-banner ${p.category==='Data & ML'?'blue':''}"><span>${escape(p.category.toUpperCase())}</span><strong>${escape(p.metric)}</strong><span>${escape(p.metricLabel)}</span></div>`;
   const links=[['View live project ↗',p.liveUrl],['Source code ↗',p.sourceUrl]].filter(([,u])=>u&&safeUrl(u)).map(([label,u])=>`<a class="project-link" href="${safeUrl(u)}" target="_blank" rel="noopener noreferrer">${label}</a>`).join(' ');
   card.innerHTML=`${cover}<div class="project-body"><p class="project-status">${p.featured?'★ FEATURED · ':''}${escape(p.status.toUpperCase())}</p><h3>${escape(p.title)}</h3><p>${escape(p.description)}</p><div class="tags">${p.tags.map(t=>`<span>${escape(t)}</span>`).join('')}</div>${p.result?`<p class="project-result">${escape(p.result)}</p>`:''}<div>${links}</div><details><summary>Behind the build <span>+</span></summary><p>${escape(p.details)}</p><a href="#project-${escape(p.id)}">Link to this project ↗</a></details></div>`;
   grid.append(card);
  }
  document.getElementById('project-count').textContent=found.length+' of '+portfolioProjects.length+' projects';more.hidden=found.length<=limit;
  if(!found.length){const empty=document.createElement('p');empty.className='catalog-empty';empty.textContent='No matching projects. Try a different technology or choose All.';grid.append(empty);}
 }
 search.addEventListener('input',()=>{limit=6;render();});render();
})();
