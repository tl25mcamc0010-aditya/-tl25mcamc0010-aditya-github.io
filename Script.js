// Active tab / sidebar file highlighting based on current page
(function highlightActive(){
  const current = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('[data-page]').forEach(el=>{
    if(el.getAttribute('data-page') === current){
      el.classList.add('active');
    }
  });
})();

// Mobile sidebar toggle
(function sidebarToggle(){
  const btn = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');
  if(!btn || !sidebar) return;
  btn.addEventListener('click', ()=> sidebar.classList.toggle('open'));
  document.addEventListener('click', (e)=>{
    if(sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== btn){
      sidebar.classList.remove('open');
    }
  });
})();

// Home page terminal typing effect
(function typeHero(){
  const el = document.getElementById('typed-out');
  if(!el) return;
  const text = el.getAttribute('data-text') || '';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduceMotion){ el.textContent = text; return; }
  let i = 0;
  (function typeChar(){
    if(i < text.length){
      el.textContent += text.charAt(i);
      i++;
      setTimeout(typeChar, 42);
    }
  })();
})();

// Contact page: copy email + status bar feedback
(function copyEmail(){
  const btn = document.getElementById('copyEmailBtn');
  const sb = document.getElementById('sb-msg');
  if(!btn) return;
  btn.addEventListener('click', async ()=>{
    const email = btn.getAttribute('data-email');
    try{
      await navigator.clipboard.writeText(email);
      btn.textContent = 'copied ✓';
      if(sb) sb.textContent = 'email copied to clipboard';
    }catch(e){
      btn.textContent = 'select & copy';
    }
    setTimeout(()=>{ btn.textContent = 'copy'; if(sb) sb.textContent = 'ready'; }, 2200);
  });
})();
