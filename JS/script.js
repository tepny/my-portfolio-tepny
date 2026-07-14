document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeMenu = () => {
    mobileMenu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });
  mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const setTheme = dark => {
    document.documentElement.classList.toggle('dark', dark);
    themeIcon.textContent = dark ? '☀️' : '🌙';
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  };
  setTheme(localStorage.getItem('theme') === 'dark');
  themeToggle.addEventListener('click', () => setTheme(!document.documentElement.classList.contains('dark')));

  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('active');
  }), { threshold: 0.2 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

  const typewriter = document.getElementById('typewriter');
  const phrases = ['Modern Web Apps', 'Creative Solutions'];
  let phraseIndex = 0, characterIndex = 0, deleting = false;
  const write = () => {
    const phrase = phrases[phraseIndex];
    typewriter.textContent = phrase.slice(0, deleting ? --characterIndex : ++characterIndex);
    let speed = deleting ? 40 : 120;
    if (!deleting && characterIndex === phrase.length) { deleting = true; speed = 1200; }
    else if (deleting && characterIndex === 0) { deleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; speed = 300; }
    setTimeout(write, speed);
  };
  write();

  document.querySelector('.contact-form').addEventListener('submit', event => {
    event.preventDefault();
    alert('✅ Message sent successfully!');
    event.currentTarget.reset();
  });
});
