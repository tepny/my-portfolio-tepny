document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const html = document.documentElement;

  // Theme toggle
  if (themeToggle && themeIcon) {
    themeToggle.addEventListener('click', () => {
      html.classList.toggle('dark');
      const isDark = html.classList.contains('dark');
      themeIcon.textContent = isDark ? '☀️' : '🌙';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    if (localStorage.getItem('theme') === 'dark') {
      html.classList.add('dark');
      themeIcon.textContent = '☀️';
    }
  }
  tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        customBlue: '#212691',
                    }
                }
            }
        }

  // Reveal animations
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');

        if (entry.target.id === 'about') {
          document.querySelectorAll('.skill-per').forEach(bar => {
            bar.style.width = bar.dataset.width;
          });
        }
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Typewriter effect
  const typewriterElement = document.getElementById('typewriter');
  if (typewriterElement) {
    const phrases = ["Modern Web Apps", "Creative Solutions"];
    let pIdx = 0, charIdx = 0, isDeleting = false;

    function runTypewriter() {
      const current = phrases[pIdx];
      typewriterElement.textContent = isDeleting
        ? current.substring(0, charIdx - 1)
        : current.substring(0, charIdx + 1);

      charIdx = isDeleting ? charIdx - 1 : charIdx + 1;
      let speed = isDeleting ? 40 : 120;

      if (!isDeleting && charIdx === current.length) {
        isDeleting = true;
        speed = 1200;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        pIdx = (pIdx + 1) % phrases.length;
        speed = 300;
      }
      setTimeout(runTypewriter, speed);
    }
    runTypewriter();
  }

  // Contact form alert
  const form = document.querySelector("#contact form");
  if (form) {
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      alert("✅ Message sent successfully!");
      form.reset();
    });
  }
});
