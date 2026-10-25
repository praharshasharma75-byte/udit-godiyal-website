// Open the requested section while keeping a clean address.
(() => {
  const sections = {about: 'about', work: 'listen', contact: 'contact'};
  const key = location.pathname.split('/').filter(Boolean)[0];
  const target = sections[key];
  if (!target) return;
  if (target !== 'about') {
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      img.loading = 'eager';
    });
  }
  function showSection() {
    const section = document.getElementById(target);
    if (section) section.scrollIntoView({behavior: 'instant', block: 'start'});
  }
  // Wait for images to settle so the section is not displaced afterwards.
  if (document.readyState === 'complete') showSection();
  else window.addEventListener('load', showSection, {once: true});
})();
