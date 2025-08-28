// Lightweight JS for small interactions: mobile menu and basic accessibility
document.addEventListener('DOMContentLoaded', function(){
  const mobileToggle = document.getElementById('mobileMenuToggle');
  if(mobileToggle){
    mobileToggle.addEventListener('click', function(){
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      // simple mobile nav toggle (you can implement slide-in menu if desired)
      const nav = document.querySelector('.nav');
      if(nav){
        nav.style.display = expanded ? 'none' : 'block';
      }
    });
  }

  // Lazy-load images (native attr used; but fallback small lazyloader)
  if('loading' in HTMLImageElement.prototype) return;
  const images = document.querySelectorAll('img[loading="lazy"]');
  const io = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const img = entry.target;
        img.src = img.dataset.src;
        io.unobserve(img);
      }
    });
  });
  images.forEach(img => {
    if(img.dataset && img.dataset.src) io.observe(img);
  });
});
