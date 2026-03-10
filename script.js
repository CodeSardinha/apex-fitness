/* ══════════════════════════════════════════════════════════
   APEX FITNESS — script.js
   Módulos: IMC | TDEE | Cronômetro | Descanso | Água | Treino
   Utilitários: Navbar | Toast | Scroll Animations
══════════════════════════════════════════════════════════ */

'use strict';

/* ══════════════════════════════════════
   NAVBAR — scroll + mobile toggle
══════════════════════════════════════ */
(function initNavbar() {
  const navbar   = document.getElementById('navbar');
  const toggle   = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  // Adiciona classe "scrolled" ao rolar
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Toggle menu mobile
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Fecha o menu ao clicar em um link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
})();


/* ══════════════════════════════════════
   SCROLL ANIMATIONS
   Observa elementos e anima ao entrar na tela
══════════════════════════════════════ */
(function initScrollAnimations() {
  // Marca cards e seções para animação
  const targets = document.querySelectorAll('.tool-card, .edu-card, .section-header');
  targets.forEach(el => el.classList.add('animate-on-scroll'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Delay escalonado para cada elemento
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach(el => observer.observe(el));
})();


/* ══════════════════════════════════════
   TOAST NOTIFICATION
   Exibe mensagens de feedback ao usuário
══════════════════════════════════════ */
function showToast(message, type = 'success', duration = 3000) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast ${type} show`;

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}


/* ══════════════════════════════════════
   CALCULADORA DE IMC
══════════════════════════════════════ */
function calcIMC() {
  const peso   = parseFloat(document.getElementById('imc-peso').value);
  const altura = parseFloat(document.getElementById('imc-altura').value) / 100; // cm → m

  // Validação
  if (!peso || !altura || peso <= 0 || altura <= 0) {
    showToast('⚠️ Preencha peso e altura corretamente.', 'warning');
    return;
  }

  const imc = peso / (altura * altura);
  const imcFixed = imc.toFixed(1);

  // Classificação
  let label, colorClass, indicatorPercent;

  if (imc < 18.5) {
    label = 'Abaixo do Peso';
    colorClass = 'imc-abaixo';
    indicatorPercent = (imc / 18.5) * 22; // 0-22% da barra
  } else if (imc < 25) {
    label = 'Peso Normal ✓';
    colorClass = 'imc-normal';
    indicatorPercent = 22 + ((imc - 18.5) / 6.5) * 26; // 22-48%
  } else if (imc < 30) {
    label = 'Sobrepeso';
    colorClass = 'imc-sobrepeso';
    indicatorPercent = 48 + ((imc - 25) / 5) * 26; // 48-74%
  } else {
    label = 'Obesidade';
    colorClass = 'imc-obeso';
    indicatorPercent = Math.min(74 + ((imc - 30) / 10) * 26, 96); // 74-100%
  }

  // Atualiza DOM
  const resultBox = document.getElementById('imc-result');
  const valorEl   = document.getElementById('imc-valor');
  const labelEl   = document.getElementById('imc-label');
  const indicator = document.getElementById('imc-indicator');

  valorEl.textContent = imcFixed;
  labelEl.textContent = label;
  resultBox.className = `result-box ${colorClass}`;
  resultBox.style.display = 'block';

  // Anima o indicador na barra
  setTimeout(() => {
    indicator.style.left = `${indicatorPercent}%`;
  }, 100);

  showToast(`IMC calculado: ${imcFixed} — ${label}`, 'success');
}


/* ══════════════════════════════════════
   CALCULADORA DE CALORIAS (TDEE)
   Fórmula de Mifflin-St Jeor
══════════════════════════════════════ */
function calcTDEE() {
  const idade    = parseFloat(document.getElementById('tdee-idade').value);
  const sexo     = document.getElementById('tdee-sexo').value;
  const peso     = parseFloat(document.getElementById('tdee-peso').value);
  const altura   = parseFloat(document.getElementById('tdee-altura').value);
  const ativ     = parseFloat(document.getElementById('tdee-atividade').value);

  // Validação
  if (!idade || !peso || !altura || isNaN(ativ)) {
    showToast('⚠️ Preencha todos os campos.', 'warning');
    return;
  }

  if (idade < 10 || idade > 100 || peso < 20 || altura < 50) {
    showToast('⚠️ Verifique os valores inseridos.', 'warning');
    return;
  }

  // Taxa Metabólica Basal (TMB)
  let tmb;
  if (sexo === 'm') {
    tmb = (10 * peso) + (6.25 * altura) - (5 * idade) + 5;
  } else {
    tmb = (10 * peso) + (6.25 * altura) - (5 * idade) - 161;
  }

  const tdee        = Math.round(tmb * ativ);
  const emagrecer   = Math.round(tdee - 500);  // déficit de 500 kcal
  const ganharMassa = Math.round(tdee + 300);  // superávit de 300 kcal

  // Atualiza DOM
  document.getElementById('val-manter').textContent  = tdee;
  document.getElementById('val-perder').textContent  = emagrecer;
  document.getElementById('val-ganhar').textContent  = ganharMassa;

  const resultEl = document.getElementById('tdee-result');
  resultEl.style.display = 'block';
  resultEl.style.animation = 'none';
  void resultEl.offsetWidth; // reflow
  resultEl.style.animation = 'fadeUp 0.4s ease both';

  showToast(`TDEE: ${tdee} kcal/dia para manutenção`, 'success');
}


/* ══════════════════════════════════════
   TIMER — CRONÔMETRO
══════════════════════════════════════ */
const cronometro = {
  interval: null,
  seconds: 0,
  running: false,
};

function cronoStart() {
  if (cronometro.running) return;
  cronometro.running = true;

  document.getElementById('btn-crono-start').disabled = true;
  document.getElementById('btn-crono-pause').disabled = false;
  document.getElementById('crono-status').textContent = '⚡ Treinando...';

  cronometro.interval = setInterval(() => {
    cronometro.seconds++;
    updateCronoDisplay();
  }, 1000);
}

function cronoPause() {
  if (!cronometro.running) return;
  cronometro.running = false;
  clearInterval(cronometro.interval);

  document.getElementById('btn-crono-start').disabled = false;
  document.getElementById('btn-crono-pause').disabled = true;
  document.getElementById('crono-status').textContent = '⏸ Pausado';
}

function cronoReset() {
  clearInterval(cronometro.interval);
  cronometro.seconds = 0;
  cronometro.running = false;

  updateCronoDisplay();
  document.getElementById('btn-crono-start').disabled = false;
  document.getElementById('btn-crono-pause').disabled = true;
  document.getElementById('crono-status').textContent = 'Pronto para treinar!';
}

function updateCronoDisplay() {
  const h = Math.floor(cronometro.seconds / 3600);
  const m = Math.floor((cronometro.seconds % 3600) / 60);
  const s = cronometro.seconds % 60;

  document.getElementById('crono-hh').textContent = String(h).padStart(2, '0');
  document.getElementById('crono-mm').textContent = String(m).padStart(2, '0');
  document.getElementById('crono-ss').textContent = String(s).padStart(2, '0');
}


/* ══════════════════════════════════════
   TIMER — DESCANSO (Countdown)
══════════════════════════════════════ */
const restTimer = {
  interval: null,
  totalSeconds: 60,
  remaining: 60,
  running: false,
};

function restStart() {
  if (restTimer.running) return;

  const inputVal = parseInt(document.getElementById('rest-seconds').value);
  if (!restTimer.remaining || restTimer.remaining <= 0) {
    restTimer.totalSeconds = inputVal;
    restTimer.remaining = inputVal;
  }

  restTimer.running = true;
  document.getElementById('btn-rest-start').disabled = true;
  document.getElementById('rest-status').textContent = '😮‍💨 Descansando...';

  const circumference = 314; // 2 * π * 50

  restTimer.interval = setInterval(() => {
    restTimer.remaining--;
    updateRestDisplay();

    // Atualiza o anel de progresso
    const progress = restTimer.remaining / restTimer.totalSeconds;
    const offset = circumference * (1 - progress);
    document.getElementById('ring-progress').style.strokeDashoffset = offset;

    if (restTimer.remaining <= 0) {
      clearInterval(restTimer.interval);
      restTimer.running = false;
      document.getElementById('btn-rest-start').disabled = false;
      document.getElementById('rest-status').textContent = '✅ Descansou! Hora de voltar!';
      showToast('💪 Descansou o suficiente! Vamos lá!', 'success');
    }
  }, 1000);
}

function restReset() {
  clearInterval(restTimer.interval);
  restTimer.running = false;

  const inputVal = parseInt(document.getElementById('rest-seconds').value) || 60;
  restTimer.totalSeconds = inputVal;
  restTimer.remaining = inputVal;

  updateRestDisplay();
  document.getElementById('ring-progress').style.strokeDashoffset = 0;
  document.getElementById('btn-rest-start').disabled = false;
  document.getElementById('rest-status').textContent = 'Configure o tempo e inicie!';
}

function updateRestDisplay() {
  document.getElementById('rest-display').textContent = restTimer.remaining;
}

// Atualiza o countdown ao mudar o input
document.addEventListener('DOMContentLoaded', () => {
  const restInput = document.getElementById('rest-seconds');
  if (restInput) {
    restInput.addEventListener('change', () => {
      if (!restTimer.running) {
        const val = parseInt(restInput.value) || 60;
        restTimer.totalSeconds = val;
        restTimer.remaining = val;
        updateRestDisplay();
        document.getElementById('ring-progress').style.strokeDashoffset = 0;
      }
    });
  }
});


/* ══════════════════════════════════════
   TABS DO TIMER
══════════════════════════════════════ */
function switchTimer(tab) {
  const panels  = ['cronometro', 'descanso'];
  const tabs    = ['tab-cronometro', 'tab-descanso'];
  const panelIds = ['panel-cronometro', 'panel-descanso'];

  // Ativa a tab clicada
  tabs.forEach((t, i) => {
    document.getElementById(t).classList.toggle('active', panels[i] === tab);
  });

  // Mostra o painel correto
  panelIds.forEach((p, i) => {
    document.getElementById(p).style.display = panels[i] === tab ? 'block' : 'none';
  });
}


/* ══════════════════════════════════════
   CONTADOR DE ÁGUA
══════════════════════════════════════ */
const water = {
  current: 0,
  goal: 8,
};

function updateWaterGoal() {
  const newGoal = parseInt(document.getElementById('water-goal').value) || 8;
  water.goal = Math.max(1, Math.min(20, newGoal));
  renderWater();
}

function addWater() {
  if (water.current >= water.goal) {
    showToast('🎉 Você já atingiu sua meta de água!', 'success');
    return;
  }
  water.current++;
  renderWater();

  if (water.current === water.goal) {
    showToast('🏆 Parabéns! Meta de hidratação atingida!', 'success');
  } else {
    showToast(`💧 +1 copo! ${water.current}/${water.goal}`, 'success');
  }
}

function removeWater() {
  if (water.current <= 0) {
    showToast('⚠️ Não há copos para remover.', 'warning');
    return;
  }
  water.current--;
  renderWater();
  showToast(`💧 Removido. ${water.current}/${water.goal}`, 'warning');
}

function renderWater() {
  const percentage = water.goal > 0 ? (water.current / water.goal) * 100 : 0;

  // Barra de progresso
  document.getElementById('water-bar').style.width = `${Math.min(percentage, 100)}%`;

  // Garrafa
  document.getElementById('water-fill').style.height = `${Math.min(percentage, 100)}%`;
  document.getElementById('water-count').textContent = water.current;

  // Fração
  document.getElementById('water-current').textContent = water.current;
  document.getElementById('water-total').textContent   = water.goal;

  // Mensagem motivacional
  const messageEl = document.getElementById('water-message');
  const messages = [
    'Vamos começar a se hidratar! 💧',
    'Boa! Continue bebendo água! 💧',
    'Você está indo bem! 🌊',
    'Metade do caminho! 💪',
    'Quase lá, não pare agora! 🔥',
    'Só um pouquinho mais! 🎯',
    '🎉 Meta atingida! Hidratação perfeita!',
  ];

  const idx = Math.min(
    Math.floor((water.current / water.goal) * (messages.length - 1)),
    messages.length - 1
  );

  if (water.current >= water.goal) {
    messageEl.textContent = messages[messages.length - 1];
    messageEl.style.color = 'var(--green)';
  } else {
    messageEl.textContent = messages[idx] || messages[0];
    messageEl.style.color = '';
  }
}


/* ══════════════════════════════════════
   GERADOR DE TREINO
══════════════════════════════════════ */

// Banco de exercícios por grupo muscular
const exerciseDB = {
  full: {
    iniciante: [
      { name: 'Agachamento Livre', detail: '3x12 reps · Descanso 60s' },
      { name: 'Flexão de Braço',   detail: '3x8 reps · Descanso 60s' },
      { name: 'Prancha Abdominal', detail: '3x30 seg · Descanso 45s' },
      { name: 'Afundo',            detail: '3x10 cada perna · Descanso 60s' },
      { name: 'Elevação Lateral',  detail: '3x12 reps · Descanso 45s' },
      { name: 'Remada Curvada',    detail: '3x10 reps · Descanso 60s' },
    ],
    intermediario: [
      { name: 'Agachamento c/ Barra', detail: '4x10 reps · Descanso 75s' },
      { name: 'Supino Reto',          detail: '4x10 reps · Descanso 90s' },
      { name: 'Levantamento Terra',   detail: '3x8 reps · Descanso 120s' },
      { name: 'Pull-Up (Barra Fixa)', detail: '3x8 reps · Descanso 90s' },
      { name: 'Desenvolvimento',      detail: '3x10 reps · Descanso 75s' },
      { name: 'Abdominal Bicicleta',  detail: '3x20 reps · Descanso 45s' },
    ],
    avancado: [
      { name: 'Agachamento Olímpico', detail: '5x5 reps · Descanso 120s' },
      { name: 'Supino Inclinado c/ Halteres', detail: '4x10 reps · Descanso 90s' },
      { name: 'Terra Romeno',         detail: '4x8 reps · Descanso 120s' },
      { name: 'Muscle-Up',            detail: '4x6 reps · Descanso 120s' },
      { name: 'Clean & Press',        detail: '4x5 reps · Descanso 150s' },
      { name: 'Dragon Flag',          detail: '3x8 reps · Descanso 90s' },
    ],
  },
  upper: {
    iniciante: [
      { name: 'Flexão de Braço',    detail: '3x8 reps · Descanso 60s' },
      { name: 'Remada com Halteres',detail: '3x10 reps · Descanso 60s' },
      { name: 'Elevação Lateral',   detail: '3x12 reps · Descanso 45s' },
      { name: 'Rosca Direta',       detail: '3x12 reps · Descanso 60s' },
      { name: 'Tríceps Testa',      detail: '3x12 reps · Descanso 60s' },
    ],
    intermediario: [
      { name: 'Supino Reto',          detail: '4x10 reps · Descanso 90s' },
      { name: 'Pull-Up',              detail: '4x8 reps · Descanso 90s' },
      { name: 'Desenvolvimento Press',detail: '4x10 reps · Descanso 75s' },
      { name: 'Rosca Martelo',        detail: '3x12 reps · Descanso 60s' },
      { name: 'Tríceps Pulley',       detail: '3x12 reps · Descanso 60s' },
    ],
    avancado: [
      { name: 'Supino Inclinado c/ Barra', detail: '5x5 reps · Descanso 120s' },
      { name: 'Remada Pronada',            detail: '4x8 reps · Descanso 90s' },
      { name: 'Arnold Press',              detail: '4x10 reps · Descanso 90s' },
      { name: 'Rosca Scott',               detail: '4x10 reps · Descanso 75s' },
      { name: 'Mergulho Paralelas',        detail: '4x10 reps · Descanso 90s' },
    ],
  },
  lower: {
    iniciante: [
      { name: 'Agachamento Livre',   detail: '3x15 reps · Descanso 60s' },
      { name: 'Afundo',              detail: '3x10 cada · Descanso 60s' },
      { name: 'Levantamento de Panturrilha', detail: '3x15 reps · Descanso 45s' },
      { name: 'Extensão de Quadril', detail: '3x12 reps · Descanso 45s' },
    ],
    intermediario: [
      { name: 'Agachamento c/ Barra', detail: '4x10 reps · Descanso 90s' },
      { name: 'Leg Press 45°',        detail: '4x12 reps · Descanso 90s' },
      { name: 'Terra Romeno',         detail: '3x10 reps · Descanso 90s' },
      { name: 'Cadeira Extensora',    detail: '3x15 reps · Descanso 60s' },
      { name: 'Panturrilha no Smith', detail: '4x20 reps · Descanso 60s' },
    ],
    avancado: [
      { name: 'Front Squat',          detail: '5x5 reps · Descanso 120s' },
      { name: 'Hack Squat',           detail: '4x10 reps · Descanso 90s' },
      { name: 'Levantamento Terra',   detail: '4x6 reps · Descanso 150s' },
      { name: 'Búlgaro Split Squat',  detail: '4x8 cada · Descanso 90s' },
      { name: 'Afundo Passado',       detail: '3x12 cada · Descanso 75s' },
    ],
  },
  core: {
    iniciante: [
      { name: 'Prancha Frontal',   detail: '3x30 seg · Descanso 30s' },
      { name: 'Abdominal Crunch',  detail: '3x15 reps · Descanso 45s' },
      { name: 'Elevação de Pernas',detail: '3x10 reps · Descanso 45s' },
      { name: 'Superman',          detail: '3x12 reps · Descanso 30s' },
    ],
    intermediario: [
      { name: 'Prancha Lateral',         detail: '3x40 seg cada · Descanso 45s' },
      { name: 'Abdominal Bicicleta',     detail: '3x20 reps · Descanso 45s' },
      { name: 'Russian Twist',           detail: '3x20 reps · Descanso 45s' },
      { name: 'Dead Bug',                detail: '3x12 reps · Descanso 45s' },
      { name: 'Hollow Body Hold',        detail: '3x30 seg · Descanso 45s' },
    ],
    avancado: [
      { name: 'Dragon Flag',         detail: '4x8 reps · Descanso 90s' },
      { name: 'L-Sit',               detail: '4x20 seg · Descanso 60s' },
      { name: 'Ab Wheel Rollout',    detail: '4x10 reps · Descanso 60s' },
      { name: 'Hanging Leg Raise',   detail: '4x12 reps · Descanso 60s' },
      { name: 'Pallof Press',        detail: '3x12 cada · Descanso 60s' },
    ],
  },
  cardio: {
    iniciante: [
      { name: 'Caminhada Rápida',    detail: '20 min · Intensidade baixa' },
      { name: 'Polichinelo',         detail: '3x30 reps · Descanso 30s' },
      { name: 'Step Up na Caixa',    detail: '3x12 cada · Descanso 45s' },
      { name: 'Corrida Leve',        detail: '10 min · Ritmo confortável' },
    ],
    intermediario: [
      { name: 'Burpee',              detail: '4x10 reps · Descanso 60s' },
      { name: 'Mountain Climber',    detail: '4x30 seg · Descanso 45s' },
      { name: 'Sprint Intervalado',  detail: '8x20 seg · Descanso 40s' },
      { name: 'Jump Squat',          detail: '4x12 reps · Descanso 60s' },
    ],
    avancado: [
      { name: 'Tabata Burpee',       detail: '8x20 seg | 10s descanso' },
      { name: 'Sprint 400m',         detail: '6x400m · Descanso 90s' },
      { name: 'Box Jump',            detail: '5x8 reps · Descanso 60s' },
      { name: 'Battle Rope',         detail: '4x40 seg · Descanso 60s' },
      { name: 'Assault Bike',        detail: '5x30 seg máximo · Descanso 90s' },
    ],
  },
};

// Dicas de treino
const workoutTips = [
  'Sempre faça aquecimento antes de iniciar o treino — 5-10 minutos de mobilidade articular.',
  'Hidrate-se durante o treino. Beba água a cada 15-20 minutos.',
  'Foco na execução correta antes de aumentar a carga. Técnica evita lesões.',
  'Respeite os tempos de descanso para garantir a recuperação adequada entre as séries.',
  'Registre seu treino: anotar cargas e repetições acelera sua evolução.',
  'A respiração importa: expire no esforço, inspire no retorno do movimento.',
  'Progrida gradualmente — aumente carga ou volume no máximo 10% por semana.',
];

const typeLabels = {
  full: 'Full Body',
  upper: 'Membros Superiores',
  lower: 'Membros Inferiores',
  core: 'Core / Abdômen',
  cardio: 'Cardio',
};

const levelLabels = {
  iniciante: '🟢 Iniciante',
  intermediario: '🟡 Intermediário',
  avancado: '🔴 Avançado',
};

function generateWorkout() {
  const type  = document.getElementById('workout-type').value;
  const level = document.getElementById('workout-level').value;

  const exercises = exerciseDB[type][level];
  if (!exercises || exercises.length === 0) return;

  // Embaralha e seleciona de 4 a 6 exercícios
  const shuffled = [...exercises].sort(() => Math.random() - 0.5);
  const count = type === 'cardio' ? Math.min(4, shuffled.length) : Math.min(5, shuffled.length);
  const selected = shuffled.slice(0, count);

  // Dica aleatória
  const tip = workoutTips[Math.floor(Math.random() * workoutTips.length)];

  // Atualiza título e badge
  document.getElementById('workout-title-result').textContent = `${typeLabels[type]} · ${levelLabels[level]}`;
  document.getElementById('workout-badge').textContent = typeLabels[type];

  // Renderiza exercícios
  const list = document.getElementById('exercise-list');
  list.innerHTML = '';

  selected.forEach((ex, i) => {
    const item = document.createElement('div');
    item.className = 'exercise-item';
    item.style.animationDelay = `${i * 60}ms`;
    item.innerHTML = `
      <span class="exercise-num">${String(i + 1).padStart(2, '0')}</span>
      <div class="exercise-info">
        <div class="exercise-name">${ex.name}</div>
        <div class="exercise-detail">${ex.detail}</div>
      </div>
    `;
    list.appendChild(item);
  });

  // Dica
  document.getElementById('workout-tip').textContent = tip;

  // Mostra o resultado
  const resultEl = document.getElementById('workout-result');
  resultEl.style.display = 'block';
  resultEl.style.animation = 'none';
  void resultEl.offsetWidth;
  resultEl.style.animation = 'fadeUp 0.5s ease both';

  showToast(`⚡ Treino gerado! ${count} exercícios selecionados.`, 'success');
}


/* ══════════════════════════════════════
   INIT — Inicializa estados ao carregar
══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // Inicializa água
  renderWater();

  // Inicializa display do cronômetro
  updateCronoDisplay();

  // Inicializa display do descanso
  updateRestDisplay();

  // Smooth scroll para âncoras
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = 80; // altura da navbar
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // Enter nos inputs aciona o cálculo
  document.getElementById('imc-peso').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') calcIMC();
  });
  document.getElementById('imc-altura').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') calcIMC();
  });
  document.getElementById('tdee-altura').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') calcTDEE();
  });

  console.log('%c APEX FITNESS ', 'background:#00e676;color:#080b0f;font-weight:bold;font-size:14px;padding:4px 8px;border-radius:4px;');
  console.log('%cPerformance é estilo de vida. 💪', 'color:#00e676;font-size:12px;');
});