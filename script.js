/* ============================================================
   TitanGYM — script.js
   ============================================================ */

/* ── 1. Dane treningów ── */
const TRAINING_DATA = {
  cardio: {
    img: 'img/cardio.jpg',
    title: 'Treningi cardio',
    desc: '<p>Strefa cardio w TitanGYM to nowoczesne bieżnie, rowery stacjonarne, orbitreki i wioślarze — wszystko w klimatyzowanym, przestronnym wnętrzu.</p><ul><li>Indywidualne programy cardio</li><li>Monitorowanie tętna i spalonych kalorii</li><li>Zajęcia grupowe HIIT i spinning</li><li>Asysta trenera na życzenie</li></ul>'
  },
  silownia: {
    img: 'img/silownia.jpg',
    title: 'Siłownia',
    desc: '<p>Profesjonalna strefa siłowa z wolnymi ciężarami, maszynami izolowanymi i strefą funkcjonalną. Idealna zarówno dla początkujących, jak i zaawansowanych.</p><ul><li>Sztangi, hantle i kettlebelle</li><li>Maszyny do wszystkich partii mięśniowych</li><li>Strefa crossfit i TRX</li><li>Bezpłatna konsultacja z trenerem</li></ul>'
  },
  joga: {
    img: 'img/joga.jpg',
    title: 'Joga i relaks',
    desc: '<p>Zajęcia jogi i relaksu pomagają odzyskać równowagę ciała i umysłu. Prowadzone przez certyfikowanych instruktorów w spokojnej, jasnej sali.</p><ul><li>Joga hatha i vinyasa</li><li>Stretching i mobilność</li><li>Medytacja i techniki oddechowe</li><li>Zajęcia dla każdego poziomu</li></ul>'
  }
};

/* ── 2. Dane opinii ── */
const OPINIONS = [
  { stars: 5, text: 'Świetna atmosfera i profesjonalni trenerzy. Chodzę od roku i czuję ogromną różnicę — zarówno w sile, jak i samopoczuciu.', author: 'Anna K.',    role: 'Członkini od 2024' },
  { stars: 5, text: 'Nowoczesny sprzęt, czyste szatnie i elastyczne godziny otwarcia. Karnet Titan to najlepsza decyzja, jaką podjąłem.',      author: 'Michał W.',  role: 'Członek od 2023'   },
  { stars: 5, text: 'Zajęcia jogi są fantastyczne — idealne po ciężkim dniu w pracy. Polecam każdemu, kto szuka równowagi.',                   author: 'Karolina M.', role: 'Członkini od 2025' },
  { stars: 4, text: 'Bardzo dobra siłownia w centrum miasta. Jedyny minus to czasem tłok wieczorem, ale ogólnie super miejsce.',               author: 'Tomasz R.',   role: 'Członek od 2022'   }
];

/* ── 3. Header: zmiana koloru przy scrollu ──
   Sprawdza, jaka sekcja jest aktualnie pod headerem.
   Tylko jasne sekcje (cennik, kontakt) przełączają go w tryb "on-light".
   Ciemne sekcje (panele, O nas, Opinie, footer) utrzymują białe logo. */
const header = document.getElementById('header');

function updateHeaderColor() {
  const el = document.elementFromPoint(window.innerWidth / 2, header.offsetHeight + 1);
  if (!el) return;
  const isLight = !!el.closest('.section-pricing, .section-contact');
  header.classList.toggle('on-light', isLight);
}

window.addEventListener('scroll', updateHeaderColor, { passive: true });
updateHeaderColor();

/* ── 4. Mobile nav ── */
const navToggle = document.getElementById('navToggle');
const nav       = document.getElementById('nav');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  nav.classList.toggle('open');
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    nav.classList.remove('open');
  });
});

/* ── 5. Modal: trening ── */
const trainingModal = document.getElementById('trainingModal');

function openTrainingModal(type) {
  const data = TRAINING_DATA[type];
  if (!data) return;
  document.getElementById('trainingImg').src      = data.img;
  document.getElementById('trainingImg').alt      = data.title;
  document.getElementById('trainingTitle').textContent = data.title;
  document.getElementById('trainingDesc').innerHTML    = data.desc;
  trainingModal.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeTrainingModal() {
  trainingModal.hidden = true;
  document.body.style.overflow = '';
}

/* ── 6. Modal: kontakt ── */
const contactModal = document.getElementById('contactModal');

function openContactModal() {
  contactModal.hidden = false;
  document.body.style.overflow = 'hidden';
  document.getElementById('imie').focus();
}

function closeContactModal() {
  contactModal.hidden = true;
  document.body.style.overflow = '';
}

/* ── 7. Walidacja formularza kontaktowego ── */
const contactForm = document.getElementById('contactForm');
const contactMsg  = document.getElementById('contactMsg');

const validators = {
  imie:      val => val.trim().length >= 2                            ? '' : 'Podaj imię (min. 2 znaki).',
  email:     val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())   ? '' : 'Podaj poprawny adres e-mail.',
  temat:     val => val                                               ? '' : 'Wybierz temat wiadomości.',
  wiadomosc: val => val.trim().length >= 10                           ? '' : 'Wiadomość musi mieć min. 10 znaków.'
};

function validateField(id) {
  const input = document.getElementById(id);
  const errEl = document.getElementById('err-' + id);
  const msg   = validators[id](input.value);
  errEl.textContent = msg;
  input.classList.toggle('invalid', !!msg);
  return !msg;
}

Object.keys(validators).forEach(id => {
  document.getElementById(id).addEventListener('blur', () => validateField(id));
});

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  contactMsg.textContent = '';
  contactMsg.className   = 'form-msg';

  if (!Object.keys(validators).every(validateField)) {
    contactMsg.textContent = 'Popraw zaznaczone pola.';
    contactMsg.classList.add('error');
    return;
  }

  contactMsg.textContent = 'Dziękujemy! Wiadomość została wysłana. Odpowiemy najszybciej jak to możliwe.';
  contactMsg.classList.add('success');
  contactForm.reset();

  setTimeout(() => {
    closeContactModal();
    contactMsg.textContent = '';
    contactMsg.className   = 'form-msg';
  }, 2500);
});

/* ── 8. Zamykanie modali klawiszem Escape ── */
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (!trainingModal.hidden) closeTrainingModal();
  if (!contactModal.hidden)  closeContactModal();
});

/* ── 9. Renderowanie opinii + karuzela ── */
const opinionsGrid = document.getElementById('opinionsGrid');
const opinionsDots = document.getElementById('opinionsDots');

OPINIONS.forEach((op, i) => {
  /* karta */
  const card = document.createElement('article');
  card.className = 'opinion-card';
  card.innerHTML =
    '<div class="opinion-stars">' + '★'.repeat(op.stars) + '☆'.repeat(5 - op.stars) + '</div>' +
    '<p class="opinion-text">„' + op.text + '"</p>' +
    '<div class="opinion-author">' + op.author + '</div>' +
    '<div class="opinion-role">' + op.role + '</div>';
  opinionsGrid.appendChild(card);

  /* kropka nawigacji */
  const dot = document.createElement('button');
  dot.className = 'opinions-dot' + (i === 0 ? ' active' : '');
  dot.setAttribute('aria-label', 'Opinia ' + (i + 1));
  dot.addEventListener('click', () => scrollToCard(i));
  opinionsDots.appendChild(dot);
});

function getCardWidth() {
  const firstCard = opinionsGrid.querySelector('.opinion-card');
  if (!firstCard) return 0;
  const gap = parseInt(getComputedStyle(opinionsGrid).columnGap || '16', 10);
  return firstCard.offsetWidth + gap;
}

function scrollToCard(index) {
  opinionsGrid.scrollTo({ left: getCardWidth() * index, behavior: 'smooth' });
}

function updateDots() {
  const w = getCardWidth();
  if (!w) return;
  const active = Math.round(opinionsGrid.scrollLeft / w);
  opinionsDots.querySelectorAll('.opinions-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === active);
  });
}

document.getElementById('opinionsPrev').addEventListener('click', () => {
  const current = Math.round(opinionsGrid.scrollLeft / getCardWidth());
  scrollToCard(Math.max(current - 1, 0));
});

document.getElementById('opinionsNext').addEventListener('click', () => {
  const current = Math.round(opinionsGrid.scrollLeft / getCardWidth());
  scrollToCard(Math.min(current + 1, OPINIONS.length - 1));
});

opinionsGrid.addEventListener('scroll', updateDots, { passive: true });

/* ── 10. Scroll-reveal: fade-in + translateY przy wejściu w viewport ──
   Elementy z atrybutem [data-reveal] startują z opacity:0 / translateY(32px)
   i otrzymują klasę .revealed gdy wchodzą w viewport (>12% widoczności). */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('revealed');
    revealObserver.unobserve(entry.target); /* animuj tylko raz */
  });
}, { threshold: 0.12 });

document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

/* ── 11. Count-up: animacja liczb przy wejściu statystyk w viewport ──
   <strong data-count="18" data-suffix="+"> */
function animateCountUp(el, target, suffix, duration = 1400) {
  const start = performance.now();
  (function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3); /* ease-out cubic */
    el.textContent = Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  })(start);
}

const countUpObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el     = entry.target;
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    animateCountUp(el, target, suffix);
    countUpObserver.unobserve(el);
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => countUpObserver.observe(el));

/* ── 12. Magnetic buttons — przyciski podążają za kursorem ── */
const canHover = window.matchMedia('(hover: hover)').matches;

if (canHover) {
  document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transition = 'transform 0.15s ease-out';
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transition = 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)';
      btn.style.transform = 'translate(0, 0)';
    });
  });
}

/* ── 13. Parallax na zdjęciach paneli (hero + oferta) ── */
const panelBgs = document.querySelectorAll('.panel-bg');
let parallaxTicking = false;

function updateParallax() {
  panelBgs.forEach(bg => {
    const rect = bg.parentElement.getBoundingClientRect();
    const vh = window.innerHeight;
    const progress = (rect.top + rect.height / 2 - vh / 2) / vh; /* -1..1 mniej więcej */
    const offset = Math.max(-1, Math.min(1, progress)) * -40;
    bg.style.transform = `translateY(${offset}px) scale(1.12)`;
  });
  parallaxTicking = false;
}

window.addEventListener('scroll', () => {
  if (parallaxTicking) return;
  parallaxTicking = true;
  requestAnimationFrame(updateParallax);
}, { passive: true });

updateParallax();

/* ── 14. Spotlight / glow na kartach cennika podążający za kursorem ── */
if (canHover) {
  document.querySelectorAll('.price-card').forEach(card => {
    const glow = document.createElement('div');
    glow.className = 'card-glow';
    card.prepend(glow);

    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', x + '%');
      card.style.setProperty('--mouse-y', y + '%');
    });
  });
}

/* ── 15. Split-text reveal w hero (słowa wjeżdżają osobno) ── */
const heroH1 = document.querySelector('.split-reveal');

if (heroH1) {
  const html = heroH1.innerHTML;
  const lines = html.split('<br>');
  heroH1.innerHTML = lines.map(line =>
    line.trim().split(' ').map(word => `<span class="word">${word}</span>`).join(' ')
  ).join('<br>');

  const words = heroH1.querySelectorAll('.word');
  words.forEach((word, i) => {
    setTimeout(() => word.classList.add('shown'), 120 + i * 70);
  });
}

/* ── 16. Hero: tilt 3D + ruchome światło podążające za kursorem ── */
const heroPanel = document.querySelector('.panel-hero');

if (heroPanel && canHover) {
  const heroBg      = heroPanel.querySelector('.panel-bg');
  const heroContent = heroPanel.querySelector('.panel-content');
  const heroSpot     = heroPanel.querySelector('.hero-spotlight');

  heroPanel.addEventListener('mousemove', e => {
    const rect = heroPanel.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;   /* 0..1 */
    const py = (e.clientY - rect.top) / rect.height;    /* 0..1 */
    const tiltX = (py - 0.5) * -6;  /* stopnie */
    const tiltY = (px - 0.5) * 8;

    heroBg.style.transform      = `scale(1.12) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    heroContent.style.transform = `translate3d(${(px - 0.5) * -14}px, ${(py - 0.5) * -10}px, 0)`;
    heroSpot.style.setProperty('--hx', (px * 100) + '%');
    heroSpot.style.setProperty('--hy', (py * 100) + '%');
  });

  heroPanel.addEventListener('mouseleave', () => {
    heroBg.style.transform      = 'scale(1.12) rotateX(0) rotateY(0)';
    heroContent.style.transform = 'translate3d(0,0,0)';
  });
}
const liveEl = document.querySelector('[data-count-live]');

/* ── 17. Live badge: licznik osób trenujących teraz ── */
if (liveEl) {
  function randomizeLiveCount() {
    const next = 18 + Math.floor(Math.random() * 17); /* 18–34 */
    const current = parseInt(liveEl.textContent, 10) || 0;
    animateCountUp(liveEl, next, '', 800);
  }
  setInterval(randomizeLiveCount, 6000);
}