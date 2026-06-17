(function () {
  const el = document.getElementById('heroSubtitle');
  const text = 'Shuddh Punjabi Khana';
  let i = 0;

  function type() {
    if (i <= text.length) {
      el.textContent = text.slice(0, i++);
      setTimeout(type, 80);
    }
  }

  setTimeout(type, 1200);
})();

(function () {
  const container = document.getElementById('particles');
  const colors = ['#F5A623', '#E8C84A', '#C0392B', '#F5EDD8', '#E07060'];

  for (let i = 0; i < 28; i += 1) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 5 + 2;

    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      bottom:${Math.random() * 30}%;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration:${6 + Math.random() * 8}s;
      animation-delay:${Math.random() * 6}s;
    `;

    container.appendChild(p);
  }
})();

window.addEventListener('scroll', function () {
  document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 60);
});

const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });

revealEls.forEach((el) => observer.observe(el));

function countUp(el) {
  const target = parseFloat(el.dataset.count);
  const dec = parseInt(el.dataset.dec, 10) || 0;
  const duration = 1400;
  const start = performance.now();

  function update(now) {
    const t = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    el.textContent = (target * ease).toFixed(dec);
    if (t < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target.toLocaleString('en-IN', { maximumFractionDigits: dec, minimumFractionDigits: dec });
    }
  }

  requestAnimationFrame(update);
}

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.target.dataset.count) {
      countUp(entry.target);
      countObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach((el) => countObserver.observe(el));

document.querySelectorAll('.menu-tab').forEach((button) => {
  button.addEventListener('click', () => {
    showMenu(button.dataset.menu, button);
  });
});

function showMenu(cat, btn) {
  document.querySelectorAll('.menu-panel').forEach((panel) => {
    panel.classList.remove('active');
    panel.setAttribute('aria-hidden', 'true');
  });

  document.querySelectorAll('.menu-tab').forEach((tab) => {
    tab.classList.remove('active');
    tab.setAttribute('aria-selected', 'false');
  });

  const panel = document.getElementById(`menu-${cat}`);
  panel.classList.add('active');
  panel.setAttribute('aria-hidden', 'false');
  btn.classList.add('active');
  btn.setAttribute('aria-selected', 'true');
}
