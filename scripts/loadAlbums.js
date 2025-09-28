  // --- Elements ---
  const grid   = document.getElementById('grid');
  const search = document.getElementById('search');
  const sortEl = document.getElementById('sort');
  const count  = document.getElementById('album-count');

  // State
  let albums = [];      // raw from albums.json
  let visible = [];     // filtered/sorted view

  // Utilities
  const fmt = (d) => {
    const x = new Date(d);
    return isNaN(x) ? 'Unknown date' : x.toLocaleDateString(undefined, {year:'numeric', month:'short', day:'2-digit'});
  };

  function createAlbumCard(a){
    const article = document.createElement('article');
    article.className = 'album-card';
    article.dataset.title = a.title;
    article.dataset.date  = a.date;

    article.innerHTML = `
      <div class="cover">
        <img src="${a.cover}" alt="${a.title} cover" loading="lazy" />
        <span class="badge">Album</span>
        <div class="meta">
          <h3 class="title">${a.title}</h3>
          <div class="date"><time datetime="${a.date}">${fmt(a.date)}</time></div>
        </div>
        <a class="album-link" href="album.html?album=${encodeURIComponent(a.id)}"
           aria-label="Open album — ${a.title}"></a>
      </div>`;
    return article;
  }

  function render(){
    grid.innerHTML = '';
    visible.forEach(a => grid.appendChild(createAlbumCard(a)));
    count && (count.textContent = `${visible.length} ${visible.length === 1 ? 'album' : 'albums'}`);
  }

  function apply(){
    const q = (search?.value || '').trim().toLowerCase();

    // filter
    visible = albums.filter(a => {
      if (!q) return true;
      return a.title.toLowerCase().includes(q) || fmt(a.date).toLowerCase().includes(q);
    });

    // sort
    const how = sortEl?.value || 'newest';
    visible.sort((a, b) => {
      if (how === 'az') return a.title.localeCompare(b.title);
      if (how === 'za') return b.title.localeCompare(a.title);
      const ad = new Date(a.date).getTime(), bd = new Date(b.date).getTime();
      return how === 'oldest' ? ad - bd : bd - ad; // default newest
    });

    render();
  }

  // Load once from albums.json, then render
  fetch('data/albums.json')
    .then(r => r.json())
    .then(data => {
      // Expect { albums: [...] }
      albums = (data.albums || []).map(a => ({
        id: a.id,
        title: a.title,
        date: a.date,
        cover: a.cover,
        folder: a.folder
      }));
      apply();
    })
    .catch(err => {
      console.error('Failed to load albums.json', err);
      grid.innerHTML = '<p style="opacity:.7">Could not load albums.</p>';
    });

  // Wire up controls
  search && search.addEventListener('input', apply);
  sortEl && sortEl.addEventListener('change', apply);
