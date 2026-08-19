const root=document.documentElement;const saved=localStorage.getItem('theme');if(saved)root.dataset.theme=saved;
document.querySelectorAll('[data-theme-toggle]').forEach(btn=>btn.addEventListener('click',()=>{const next=root.dataset.theme==='light'?'dark':'light';root.dataset.theme=next;localStorage.setItem('theme',next);btn.textContent=next==='light'?'🌙':'☀️';}));
