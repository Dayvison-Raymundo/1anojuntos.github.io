// ══════════════════════════════════════════════
//  CONFIGURAÇÕES — edite aqui!
// ══════════════════════════════════════════════

// Senha: a data que vocês começaram a namorar
// Aceita qualquer formato: "12/06/2025", "12062025", "12-06-2025", "1206"
const SENHA = '12/06/2025';

const START_DATE = new Date('2025-06-12T00:00:00');

// Adicione suas fotos aqui:
// { src: 'fotos/foto1.jpg', caption: 'Descrição opcional' }
const PHOTOS = [
  { src: 'fotos/05e4e2d2-94c0-4e69-b1b1-7dfd4304b180.jpg', caption: '' },
  { src: 'fotos/1b4a2dcd-f334-4dfe-a437-27bc25b3b85c.jpg', caption: '' },
  { src: 'fotos/3820c2cf-f865-4609-902a-ca3033acd8dc.jpg', caption: '' },
  { src: 'fotos/384f61df-73e9-423a-b270-7abfa354a140.jpg', caption: '' },
  { src: 'fotos/61ccc31e-eb2b-4971-a37b-7b27299e8206.jpg', caption: '' },
  { src: 'fotos/6ba4bc2e-86c9-4593-8d68-7313da1a3455.jpg', caption: '' },
  { src: 'fotos/7c58b9cb-1551-4153-9475-76bd90d65e77.jpg', caption: '' },
  { src: 'fotos/8b32e18f-e8cc-4b40-b664-46bc46209da3.jpg', caption: '' },
  { src: 'fotos/90191c41-4d21-4ada-a791-46b98aff6563.jpg', caption: '' },
  { src: 'fotos/a10ecb6c-c396-4421-935f-5732bbc156d7.jpg', caption: '' },
  { src: 'fotos/b8759d17-d565-427e-9142-2a3222146bf9.jpg', caption: '' },
  { src: 'fotos/d778335b-c772-4476-b896-3f5fc99e9a3c.jpg', caption: '' },
  { src: 'fotos/d8a57051-96bd-4933-9f0f-350db0945d3c.jpg', caption: '' },
  { src: 'fotos/f61c400a-d6a4-4cc8-8bd3-759c74cdd3c9.jpg', caption: '' },
];

// ══════════════════════════════════════════════
//  TELA DE SENHA
// ══════════════════════════════════════════════

const lockScreen   = document.getElementById('lockScreen');
const mainContent  = document.getElementById('mainContent');
const passwordInput = document.getElementById('passwordInput');
const lockBtn      = document.getElementById('lockBtn');
const lockError    = document.getElementById('lockError');
const lockIcon     = document.getElementById('lockIcon');

// Normaliza string removendo separadores para comparar sem formato
function normalize(str) {
  return str.replace(/[\s\/\-\.]/g, '').trim();
}

// Pétalas na tela de senha
spawnLockPetals();

// Máscara automática: insere "/" enquanto digita (formato DD/MM/AAAA)
passwordInput.addEventListener('input', () => {
  let v = passwordInput.value.replace(/\D/g, '');
  if (v.length > 2)  v = v.slice(0,2) + '/' + v.slice(2);
  if (v.length > 5)  v = v.slice(0,5) + '/' + v.slice(5,9);
  passwordInput.value = v;
  lockError.textContent = '';
  passwordInput.classList.remove('wrong');
});

passwordInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') tryUnlock();
});
lockBtn.addEventListener('click', tryUnlock);

function tryUnlock() {
  const input = passwordInput.value;
  if (normalize(input) === normalize(SENHA)) {
    // Correto!
    lockIcon.classList.add('unlock');
    lockIcon.textContent = '🔓';
    lockError.style.color = '#a8e6a0';
    lockError.textContent = 'Bem-vinda, meu amor ❤️';
    burstHearts();
    setTimeout(() => {
      lockScreen.classList.add('unlocking');
      mainContent.classList.remove('hidden');
      mainContent.classList.add('appearing');
      initMain();
      setTimeout(() => lockScreen.style.display = 'none', 850);
    }, 1200);
  } else {
    // Errado
    passwordInput.classList.add('wrong');
    lockIcon.classList.add('shake');
    lockError.textContent = 'Hmm... tente de novo 🌹';
    lockError.style.color = '#e86a6a';
    setTimeout(() => lockIcon.classList.remove('shake'), 500);
    passwordInput.value = '';
    passwordInput.focus();
  }
}

function burstHearts() {
  const box = document.querySelector('.lock-box');
  const rect = box.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top  + rect.height / 2;
  const symbols = ['❤️','💕','💖','🌸','✨'];
  for (let i = 0; i < 16; i++) {
    const el = document.createElement('div');
    el.className = 'heart-burst';
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    const angle = (i / 16) * Math.PI * 2;
    const dist  = 80 + Math.random() * 80;
    el.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
    el.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
    el.style.left = cx + 'px';
    el.style.top  = cy + 'px';
    el.style.animationDelay = (Math.random() * .3) + 's';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1200);
  }
}

function spawnLockPetals() {
  const container = document.getElementById('lockPetals');
  const syms = ['🌸','🌺','❤️','✨'];
  function create() {
    const el = document.createElement('div');
    el.className = 'petal';
    el.textContent = syms[Math.floor(Math.random() * syms.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.fontSize = (.8 + Math.random() * 1) + 'rem';
    const dur = 7 + Math.random() * 7;
    el.style.animationDuration = dur + 's';
    el.style.animationDelay = (Math.random() * dur) + 's';
    container.appendChild(el);
    setTimeout(() => el.remove(), (dur + parseFloat(el.style.animationDelay)) * 1000 + 500);
  }
  for (let i = 0; i < 10; i++) create();
  setInterval(create, 800);
}

// ══════════════════════════════════════════════
//  INICIALIZA O CONTEÚDO PRINCIPAL
// ══════════════════════════════════════════════

function initMain() {
  initCounter();
  initPetals();
  initMural();
  initLightbox();
  initMusic();
  initReveal();
}

// ── Contador ──
function initCounter() {
  function update() {
    const diff = Math.max(0, new Date() - START_DATE);
    const s = Math.floor(diff / 1000);
    document.getElementById('days').textContent    = Math.floor(s / 86400);
    document.getElementById('hours').textContent   = String(Math.floor(s / 3600) % 24).padStart(2,'0');
    document.getElementById('minutes').textContent = String(Math.floor(s / 60) % 60).padStart(2,'0');
    document.getElementById('seconds').textContent = String(s % 60).padStart(2,'0');
  }
  update();
  setInterval(update, 1000);
}

// ── Pétalas no fundo ──
function initPetals() {
  const container = document.getElementById('petals');
  const syms = ['🌸','🌹','❤️','✨','🌺'];
  function create() {
    const el = document.createElement('div');
    el.className = 'petal';
    el.textContent = syms[Math.floor(Math.random() * syms.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.fontSize = (.8 + Math.random() * 1.2) + 'rem';
    const dur = 6 + Math.random() * 8;
    el.style.animationDuration = dur + 's';
    el.style.animationDelay = (Math.random() * dur) + 's';
    container.appendChild(el);
    setTimeout(() => el.remove(), (dur + parseFloat(el.style.animationDelay)) * 1000 + 500);
  }
  for (let i = 0; i < 12; i++) create();
  setInterval(create, 700);
}

// ── Mural Polaroid ──
const ROTATIONS = [-4, -2, -3, 2, 3, 1, -1, 4];

function initMural() {
  const mural = document.getElementById('mural');
  const hint  = document.getElementById('photosHint');

  if (PHOTOS.length === 0) {
    // Placeholders
    for (let i = 0; i < 6; i++) {
      const ph = document.createElement('div');
      ph.className = 'polaroid-placeholder';
      ph.innerHTML = `<span>📷</span>Adicione sua foto`;
      mural.appendChild(ph);
    }
    return;
  }

  hint.style.display = 'none';

  PHOTOS.forEach(({ src, caption }, i) => {
    const card = document.createElement('div');
    card.className = 'polaroid';
    const rot = ROTATIONS[i % ROTATIONS.length];
    card.style.transform = `rotate(${rot}deg)`;

    card.innerHTML = `
      <img src="${src}" alt="${caption || 'Foto'}">
      <div class="pol-caption">${caption || ''}</div>
    `;

    card.addEventListener('click', () => openLightbox(i));
    mural.appendChild(card);
  });
}

// ── Lightbox ──
let lbIndex = 0;

function initLightbox() {
  document.getElementById('lbClose').addEventListener('click', closeLightbox);
  document.getElementById('lbPrev').addEventListener('click', () => showLb(lbIndex - 1));
  document.getElementById('lbNext').addEventListener('click', () => showLb(lbIndex + 1));
  document.getElementById('lightbox').addEventListener('click', e => {
    if (e.target === document.getElementById('lightbox')) closeLightbox();
  });
  document.addEventListener('keydown', e => {
    if (!document.getElementById('lightbox').classList.contains('open')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowRight')  showLb(lbIndex + 1);
    if (e.key === 'ArrowLeft')   showLb(lbIndex - 1);
  });
}

function openLightbox(index) {
  if (PHOTOS.length === 0) return;
  showLb(index);
  document.getElementById('lightbox').classList.add('open');
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}
function showLb(index) {
  if (PHOTOS.length === 0) return;
  lbIndex = (index + PHOTOS.length) % PHOTOS.length;
  document.getElementById('lbImg').src      = PHOTOS[lbIndex].src;
  document.getElementById('lbCaption').textContent = PHOTOS[lbIndex].caption || '';
}

// ── Música ──
function initMusic() {
  const music  = document.getElementById('bgMusic');
  const btn    = document.getElementById('musicBtn');
  const slider = document.getElementById('volumeSlider');
  let playing = false;

  music.volume = 0.5;
  slider.addEventListener('input', () => { music.volume = slider.value; });

  btn.addEventListener('click', () => {
    if (!music.querySelector('source') && music.src === window.location.href) {
      alert('Adicione o arquivo mp3 e descomente a linha <source> em index.html.');
      return;
    }
    if (playing) {
      music.pause();
      btn.classList.remove('playing');
      btn.textContent = '♪';
    } else {
      music.play().catch(() => alert('Adicione o arquivo de música em index.html.'));
      btn.classList.add('playing');
      btn.textContent = '❚❚';
    }
    playing = !playing;
  });
}

// ── Reveal ao rolar ──
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0 });
  els.forEach(el => obs.observe(el));
  // Fallback: garante visibilidade em browsers mobile que ignoram o observer
  setTimeout(() => els.forEach(el => el.classList.add('visible')), 400);
}
