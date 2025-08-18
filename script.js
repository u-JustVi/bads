// Данные каталога (примеры; образовательные сведения)
const SUPPLEMENTS = [
  {
    id: 'omega3',
    name: 'Омега‑3 (EPA/DHA)',
    benefits: ['сердце', 'мозг', 'воспаление'],
    goals: ['сердце', 'энергия', 'спорт', 'кожа-волосы'],
    forms: 'Триглицерид/этиловый эфир',
    dose: 'Часто 500–2000 мг суммарных EPA+DHA в сутки',
    notes: 'Может взаимодействовать с антикоагулянтами. Выбирайте продукты с низким окислением (анализы TOTOX).',
    tags: ['жиры', 'сердце', 'мозг']
  },
  {
    id: 'vitaminD',
    name: 'Витамин D3 (холекальциферол)',
    benefits: ['иммунитет', 'кости', 'настроение'],
    goals: ['иммунитет', 'сон-стресс', 'сердце'],
    forms: 'Масляные капли/капсулы',
    dose: 'Индивидуально; ориентируются на анализы 25(OH)D и рекомендации врача',
    notes: 'Часто комбинируют с K2. Возможна непереносимость масел-носителей.',
    tags: ['витамин', 'жирорастворимый']
  },
  {
    id: 'magnesium',
    name: 'Магний (разные формы)',
    benefits: ['сон', 'нервная система', 'мышцы'],
    goals: ['сон-стресс', 'спорт', 'суставы'],
    forms: 'Глицинат, цитрат, малат, таурата и др.',
    dose: 'Обычно 100–400 мг элементарного магния/сутки',
    notes: 'Выбор формы по цели: сон/стресс — глицинат; энергообмен — малат; ЖКТ — цитрат (возможен послабляющий эффект).',
    tags: ['минерал']
  },
  {
    id: 'probiotics',
    name: 'Пробиотики',
    benefits: ['микробиота', 'пищеварение', 'иммунитет'],
    goals: ['пищеварение', 'иммунитет'],
    forms: 'Разные штаммы Lactobacillus/Bifidobacterium',
    dose: 'Обычно 1–20 млрд КОЕ/сутки, по инструкции',
    notes: 'Подбирайте штамм-специфично под задачу. Хранение по инструкции (иногда холодильник).',
    tags: ['микробиота']
  },
  {
    id: 'collagen',
    name: 'Коллаген (тип I/II/III)',
    benefits: ['кожа', 'суставы'],
    goals: ['кожа-волосы', 'суставы'],
    forms: 'Пептиды коллагена, UC‑II',
    dose: 'Коллаген-пептиды 5–10 г/сутки, UC‑II ~40 мг/сутки',
    notes: 'Для кожи часто в сочетании с витамином C. Тип II — для суставов.',
    tags: ['белок']
  },
  {
    id: 'creatine',
    name: 'Креатин моногидрат',
    benefits: ['сила', 'выносливость', 'когнитивные эффекты'],
    goals: ['спорт', 'энергия'],
    forms: 'Порошок/капсулы',
    dose: 'Обычно 3–5 г/сутки после фазы насыщения или без неё',
    notes: 'Пейте достаточно воды. Возможна задержка жидкости в мышцах.',
    tags: ['спорт']
  },
  {
    id: 'vitaminC',
    name: 'Витамин C (аскорбиновая кислота/буферные формы)',
    benefits: ['антиоксидант', 'иммунитет'],
    goals: ['иммунитет', 'спорт'],
    forms: 'Аскорбат натрия/кальция, липосомальные формы',
    dose: 'Часто 200–1000 мг/сутки, делёнными дозами',
    notes: 'Может усиливать усвоение железа.',
    tags: ['витамин', 'водорастворимый']
  },
  {
    id: 'iron',
    name: 'Железо (бисглицинат и др.)',
    benefits: ['гемоглобин', 'энергия'],
    goals: ['энергия'],
    forms: 'Бисглицинат, фумарат, сульфат',
    dose: 'По назначению врача и на основании ферритина/ОАК',
    notes: 'Не сочетайте с кальцием и магнием одновременно; используйте витамин C для усвоения.',
    tags: ['минерал']
  }
];

const GOAL_TO_RECOMMENDATIONS = {
  'иммунитет': ['Витамин D3', 'Витамин C', 'Цинк', 'Пробиотики', 'Омега‑3'],
  'энергия': ['Коэнзим Q10', 'Железо (по анализам)', 'Креатин', 'В-complex', 'Омега‑3'],
  'сон-стресс': ['Магний глицинат', 'L‑теанин', 'Мелатонин', 'Ашваганда'],
  'суставы': ['Коллаген тип II', 'ОМЕГА‑3', 'Глюкозамин/Хондроитин'],
  'спорт': ['Креатин', 'Бета-аланин', 'Электролиты', 'Омега‑3'],
  'кожа-волосы': ['Коллаген пептиды', 'Биотин', 'Омега‑3', 'Цинк'],
  'пищеварение': ['Пробиотики', 'Ферменты (по показаниям)', 'Пищевые волокна'],
  'сердце': ['Омега‑3', 'Витамин D3', 'Магний']
};

// Рендер каталога
function renderCatalog(list) {
  const container = document.getElementById('supplementList');
  container.innerHTML = '';
  list.forEach(item => {
    const card = document.createElement('article');
    card.className = 'card supp-card';
    card.innerHTML = `
      <h4>${item.name}</h4>
      <p><strong>Польза:</strong> ${item.benefits.join(', ')}</p>
      <p><strong>Формы:</strong> ${item.forms}</p>
      <p><strong>Дозировка:</strong> ${item.dose}</p>
      <p class="muted">${item.notes}</p>
      <div class="supp-tags">${item.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
    `;
    container.appendChild(card);
  });
}

// Поиск
function setupSearch() {
  const input = document.getElementById('searchInput');
  const normalize = (s) => (s || '').toLowerCase();
  input.addEventListener('input', () => {
    const q = normalize(input.value);
    const filtered = SUPPLEMENTS.filter(s =>
      normalize(s.name).includes(q) ||
      s.benefits.some(b => normalize(b).includes(q)) ||
      s.goals.some(g => normalize(g).includes(q)) ||
      s.tags.some(t => normalize(t).includes(q))
    );
    renderCatalog(filtered);
  });
}

// Подбор по цели
function setupChooser() {
  const chips = document.querySelectorAll('.chip');
  const results = document.getElementById('chooserResults');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('active');
      const activeGoals = Array.from(document.querySelectorAll('.chip.active')).map(c => c.dataset.goal);
      if (activeGoals.length === 0) {
        results.innerHTML = '';
        return;
      }
      const blocks = activeGoals.map(goal => {
        const recs = GOAL_TO_RECOMMENDATIONS[goal] || [];
        const examples = SUPPLEMENTS.filter(s => s.goals.includes(goal)).slice(0, 3);
        return `
          <div class="card">
            <h3>${capitalize(goal)}</h3>
            <p><strong>Категории/подсказки:</strong> ${recs.join(', ') || '—'}</p>
            <p><strong>Примеры:</strong> ${examples.map(e => e.name).join(', ') || '—'}</p>
          </div>
        `;
      });
      results.innerHTML = blocks.join('');
    });
  });
}

// Калькулятор элементарного магния
function setupMagnesiumCalculator() {
  const fractions = { oxide: 0.60, citrate: 0.16, glycinate: 0.14, malate: 0.15, taurate: 0.08 };
  const select = document.getElementById('mgSalt');
  const amount = document.getElementById('mgSaltAmount');
  const button = document.getElementById('calcMg');
  const result = document.getElementById('mgResult');
  button.addEventListener('click', () => {
    const salt = select.value;
    const grams = Number(amount.value);
    if (!isFinite(grams) || grams <= 0) {
      result.textContent = 'Введите положительное число (мг).';
      result.style.color = 'var(--danger)';
      return;
    }
    const mgElemental = Math.round(grams * fractions[salt]);
    result.style.color = 'var(--accent)';
    result.textContent = `Оценочно: ~${mgElemental} мг элементарного магния.`;
  });
}

// Локальный планировщик
const PLAN_KEY = 'supplement-plan-v1';
function loadPlan() { try { return JSON.parse(localStorage.getItem(PLAN_KEY) || '[]'); } catch { return []; } }
function savePlan(plan) { localStorage.setItem(PLAN_KEY, JSON.stringify(plan)); }
function renderPlan() {
  const plan = loadPlan();
  const list = document.getElementById('planList');
  list.innerHTML = '';
  plan.forEach((item, idx) => {
    const row = document.createElement('div');
    row.className = 'plan-item';
    row.innerHTML = `
      <div>
        <div><strong>${escapeHtml(item.name)}</strong></div>
        <div class="muted">Время: ${item.time}</div>
      </div>
      <div>
        <button data-idx="${idx}">Удалить</button>
      </div>
    `;
    row.querySelector('button').addEventListener('click', (e) => {
      const i = Number(e.currentTarget.getAttribute('data-idx'));
      const p = loadPlan();
      p.splice(i, 1);
      savePlan(p);
      renderPlan();
    });
    list.appendChild(row);
  });
}
function setupPlanner() {
  const name = document.getElementById('planName');
  const time = document.getElementById('planTime');
  const add = document.getElementById('addPlan');
  add.addEventListener('click', () => {
    const n = (name.value || '').trim();
    if (!n) return;
    const p = loadPlan();
    p.push({ name: n, time: time.value });
    savePlan(p);
    name.value = '';
    renderPlan();
  });
  renderPlan();
}

// Утилиты
function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
  renderCatalog(SUPPLEMENTS);
  setupSearch();
  setupChooser();
  setupMagnesiumCalculator();
  setupPlanner();
});

