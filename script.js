/* ================================================================
   SEMA — script.js
   Slider control · UI functions · Dynamic content injection
   ================================================================ */

'use strict';

/* ── DATA ──────────────────────────────────────────────────────── */

const EX_CASES = [
  '防爆電気機器の設計（耐圧・内圧・本質安全・安全増・非点火・樹脂充填・粉じん・特殊）、工場監査から認証までコンサルしてほしい',
  '防爆非電気機器の設計、工場監査から認証までコンサルしてほしい（IECEx / ATEX）',
  '客先から防爆仕様を要求されたが、設計するのは初めて',
  '一般仕様で設計・設置した装置が爆発危険箇所だった。防爆仕様に改造する必要がある',
  '弊社製品を利益率の高い防爆対応製品として、新たに防爆市場に参入したい',
  '外国製の防爆品を輸入し、国内販売したい',
  '防爆品を世界同時発売するための手順を知りたい',
  '国内外認証機関との交渉がうまくできない',
  '適切な防爆品の選定・ゾーニング（危険場所の分類）を依頼したい',
  'ATEX・IECEx・CCCなどの工場監査に向けた準備について知りたい',
  '稼働中の設備の防爆状態を定期的にメンテナンスしたい',
  '防爆に関する社内セミナーを開催してほしい',
];

const EX_FLOW = [
  { num: '01', title: 'メールでお問い合わせ', body: 'お名前・組織名・電話番号・困りごとを簡潔にご記入ください（sema@sema.or.jp）' },
  { num: '02', title: '初回カウンセリング（無料）', body: 'メール返信またはお電話にて、次のステップへの協議を開始します' },
  { num: '03', title: '方針決定・見積もり', body: '協議で方針が決まれば見積もり作業へ。納得いただいてから業務開始' },
  { num: '04', title: '業務開始・伴走支援', body: '認証取得・稼働後のメンテナンスまで一貫してサポートします' },
];

const FS_APPROACH = [
  {
    head: '第1段階',
    title: '安全な状態（Safe State）の定義',
    body: 'EUC（被制御機器）がどのような入力に対しどのような出力をしているとき安全状態なのかを定義します。EUCの停止が必ずしも安全とは限らないため、慎重な定義が必須です。',
  },
  {
    head: '第2段階',
    title: '故障要因の排除',
    body: '①ランダムハードウェア故障→FMEDA実施、②決定論的原因故障→マニュアル・手順書によるヒューマンエラー回避方策の採用。この2点だけがFocusです。',
  },
  {
    head: '証明段階',
    title: 'SEMAによるStep-by-Step評価',
    body: '安全計画書・FMEDA検証・ハードウェアFITテスト・ソフトウェア検査・安全要求仕様に基づく試験（温度・湿度・振動・EMC等）を順次評価・確認します。',
  },
];

const STANDARDS = [
  'IEC 61508',
  'ISO 13849-1/-2',
  'IEC 62061',
  'IEC 61511',
  'ISO 22201',
  'IEC 61784',
  'IEC 60079s（防爆電気機器）',
  'EN 80079s（防爆非電気機器）',
  'ISO 10218s（ロボット）',
  'EN 50402（ガス検知）',
  'IEC 61800-5-2',
];

const SERVICES = [
  { icon: '🏛️', num: '01', title: '機能安全適合性証明', body: '機能安全証明機関として、機能安全指針・IEC 61508等に基づく適合性証明を実施。ハードウェア・ソフトウェア・事業者システムの3種別に対応します。' },
  { icon: '🔥', num: '02', title: '防爆関連業務', body: '危険場所のゾーニング（区分け）、電気機器・非電気機器の防爆化対応コンサルティング。IECEx / ATEX / JPEx対応。2026年3月に範囲を大幅拡大強化しました。' },
  { icon: '⚠️', num: '03', title: 'リスクアセスメント', body: '厚労省包括安全指針およびISO 12100に基づくリスクアセスメント、妥当性確認・評価を実施します。' },
  { icon: '🌐', num: '04', title: '組織・個人の安全コミット評価', body: '組織・個人が安全・環境にどれだけコミットしているかを評価し、継続的な改善を支援します。' },
  { icon: '🎯', num: '05', title: '認証の窓口', body: '投資効率を配慮した最適な認証取得方法と維持のご提案。国内外の認証機関との交渉支援、申請代行も承ります。' },
  { icon: '📚', num: '06', title: '技術情報の公開・教育', body: '次世代人材の育成のため、技術情報の公開・セミナー開催（出張型）・資料作成・配布を行います。' },
];

const POLICY_ITEMS = [
  { icon: '🎯', title: '目標（Vision）', body: '労働安全衛生に関する知識の普及と技術のさらなる向上を図り、事故・災害を防止すること。また、産業界の活動により生じる地球環境負荷を低減すること。' },
  { icon: '💡', title: '理念（Philosophy）', body: '職員は仕事を通して自らの夢を実現する努力を怠らず、社会への貢献と感謝を忘れません。たとえ狭い世界であっても第一人者であることを目指し、常に共通の目的の達成に努めます。' },
  { icon: '⚡', title: '存在価値（Value）', body: '社会指向・顧客志向・革新（イノベーション）・スペシャリスト・プロフェッショナル。この5つの価値観を軸に、世界の関係者と直結する体制を構築し、常に結果を追求します。' },
];

const TOPICS = [
  {
    date: '2026/3/30',
    isNew: true,
    html: '<strong>防爆コンサルの範囲を拡大強化しました</strong><br>防爆電気機器の設計（耐圧・内圧・本質安全・安全増・非点火・樹脂充填・粉じん・特殊）、工場監査から認証までのコンサル、および防爆非電気機器の設計・工場監査から認証（IECEx / ATEX）まで範囲を拡大。設計製造販売から危険場所の分類・防爆化・稼働後メンテナンスまで一貫したサービスを提供できるようになりました。',
  },
  {
    date: '2026/3/1',
    isNew: false,
    html: '<a href="https://www.nikko-pb.co.jp/nk_sem/sem_260319.html" target="_blank">日工セミナー2026（3月19日開催）のご案内</a><br>外国立地の検定機関として新たに登録されたKSC（韓国）、UL（Taiwan）の代表が「新たな外国立地の防爆電気機器検定機関の最新動向」で講演。SEMA代表の石田もIECEx認証申請に要求される資料と手続きについて講演します。',
  },
  {
    date: '2025/7/31',
    isNew: false,
    html: '<a href="https://www.nikko-pb.co.jp/nk_sem/sem_250911.html" target="_blank">日工セミナー2025（9月11日開催）のご案内</a><br>SEMA代表の石田が「初めての防爆（国際標準に基づく防爆方策）」で講演しました。',
  },
  {
    date: '2023/7/1',
    isNew: false,
    html: '<strong>本店を移転しました</strong><br>〒108–0075 東京都港区港南2–16–4 品川グランドセントラルタワー８F',
  },
  {
    date: '2022/3/23',
    isNew: false,
    html: 'SEMA代表の石田が、日本工業出版主催オンラインセミナーにて「爆発危険区域の精緻な設定方法と防爆機器」を講演しました。',
  },
];

/* ── LOADER ─────────────────────────────────────────────────────── */
(function initLoader() {
  const loader = document.getElementById('loader');
  const fill   = document.getElementById('loaderFill');
  if (!loader || !fill) return;

  let progress = 0;
  const timer = setInterval(() => {
    progress += Math.random() * 18 + 4;
    if (progress >= 100) {
      progress = 100;
      clearInterval(timer);
      setTimeout(() => loader.classList.add('hidden'), 300);
    }
    fill.style.width = progress + '%';
  }, 60);
})();

/* ── CUSTOM CURSOR ──────────────────────────────────────────────── */
(function initCursor() {
  const c  = document.getElementById('cursor');
  const cf = document.getElementById('cursorFollower');
  if (!c || !cf) return;
  if (!matchMedia('(pointer:fine)').matches) return;

  let mx = 0, my = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    c.style.left  = mx + 'px';
    c.style.top   = my + 'px';
    cf.style.left = mx + 'px';
    cf.style.top  = my + 'px';
  });
})();

/* ── HEADER SCROLL ───────────────────────────────────────────────── */
(function initHeader() {
  const hdr = document.getElementById('siteHeader');
  if (!hdr) return;
  const onScroll = () => {
    hdr.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ── MOBILE NAV ─────────────────────────────────────────────────── */
(function initMobileNav() {
  const btn = document.getElementById('hamburger');
  const nav = document.getElementById('mobileNav');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      nav.classList.remove('open');
    });
  });
})();

/* ── SLIDESHOW ──────────────────────────────────────────────────── */
(function initSlideshow() {
  const container = document.getElementById('heroSlides');
  const dotsEl    = document.getElementById('slideDots');
  const numEl     = document.getElementById('slideNum');
  const progBar   = document.getElementById('slideProgBar');
  if (!container || !dotsEl) return;

  const slides = Array.from(container.querySelectorAll('.slide'));
  const TOTAL  = slides.length;
  const INTERVAL = 2000; // 2秒
  let current = 0;
  let timer   = null;
  let progTimer = null;

  // Build dots
  slides.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'sdot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', `スライド ${i + 1}`);
    d.addEventListener('click', () => { goTo(i); resetAuto(); });
    dotsEl.appendChild(d);
  });
  const dots = dotsEl.querySelectorAll('.sdot');

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  function goTo(idx) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (idx + TOTAL) % TOTAL;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    if (numEl) numEl.textContent = pad(current + 1);
    startProg();
  }

  function startProg() {
    if (!progBar) return;
    clearInterval(progTimer);
    progBar.style.transition = 'none';
    progBar.style.width = '0%';
    requestAnimationFrame(() => {
      progBar.style.transition = `width ${INTERVAL}ms linear`;
      progBar.style.width = '100%';
    });
  }

  function next() { goTo(current + 1); }

  function startAuto() { timer = setInterval(next, INTERVAL); }
  function stopAuto()  { clearInterval(timer); }
  function resetAuto() { stopAuto(); startAuto(); }

  const hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('mouseenter', stopAuto);
    hero.addEventListener('mouseleave', startAuto);
  }

  startProg();
  startAuto();
})();

/* ── INJECT EX CASES ─────────────────────────────────────────────── */
(function renderExCases() {
  const grid = document.getElementById('exCasesGrid');
  if (!grid) return;
  EX_CASES.forEach(txt => {
    const d = document.createElement('div');
    d.className = 'ex-case-card reveal';
    d.textContent = txt;
    grid.appendChild(d);
  });
})();

/* ── INJECT EX FLOW ──────────────────────────────────────────────── */
(function renderExFlow() {
  const wrap = document.getElementById('exFlow');
  if (!wrap) return;
  EX_FLOW.forEach(s => {
    const d = document.createElement('div');
    d.className = 'ex-flow-step reveal';
    d.innerHTML = `<div class="flow-num">${s.num}</div><strong>${s.title}</strong><p>${s.body}</p>`;
    wrap.appendChild(d);
  });
})();

/* ── INJECT FS APPROACH ──────────────────────────────────────────── */
(function renderFsApproach() {
  const wrap = document.getElementById('fsApproach');
  if (!wrap) return;
  FS_APPROACH.forEach(s => {
    const d = document.createElement('div');
    d.className = 'fs-step reveal';
    d.innerHTML = `<div class="fs-step-head">${s.head}</div><strong>${s.title}</strong><p>${s.body}</p>`;
    wrap.appendChild(d);
  });
})();

/* ── INJECT STANDARDS ────────────────────────────────────────────── */
(function renderStandards() {
  const grid = document.getElementById('standardsGrid');
  if (!grid) return;
  STANDARDS.forEach(s => {
    const span = document.createElement('span');
    span.className = 'std-badge';
    span.textContent = s;
    grid.appendChild(span);
  });
})();

/* ── INJECT SERVICES ─────────────────────────────────────────────── */
(function renderServices() {
  const grid = document.getElementById('servicesGrid');
  if (!grid) return;
  SERVICES.forEach(s => {
    const d = document.createElement('div');
    d.className = 'svc-card reveal';
    d.innerHTML = `
      <div class="svc-icon">${s.icon}</div>
      <div class="svc-num">${s.num}</div>
      <h3>${s.title}</h3>
      <p>${s.body}</p>
    `;
    grid.appendChild(d);
  });
})();

/* ── INJECT POLICY ───────────────────────────────────────────────── */
(function renderPolicy() {
  const grid = document.getElementById('policyGrid');
  if (!grid) return;
  POLICY_ITEMS.forEach(p => {
    const d = document.createElement('div');
    d.className = 'policy-card glass-card reveal';
    d.innerHTML = `<div class="policy-icon">${p.icon}</div><h3>${p.title}</h3><p>${p.body}</p>`;
    grid.appendChild(d);
  });
})();

/* ── INJECT TOPICS ───────────────────────────────────────────────── */
(function renderTopics() {
  const list = document.getElementById('topicsList');
  if (!list) return;
  TOPICS.forEach(t => {
    const d = document.createElement('div');
    d.className = 'topic-item reveal';
    d.innerHTML = `
      <div class="topic-date">${t.date}${t.isNew ? '<span class="topic-new">NEW</span>' : ''}</div>
      <div class="topic-text">${t.html}</div>
    `;
    list.appendChild(d);
  });
})();

/* ── COUNTER ANIMATION ──────────────────────────────────────────── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  if (isNaN(target)) return;
  let start = 0;
  const step = Math.ceil(target / 40);
  const timer = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = start;
    if (start >= target) clearInterval(timer);
  }, 30);
}

/* ── INTERSECTION OBSERVER — reveal + counters ──────────────────── */
(function initObserver() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
    document.querySelectorAll('.stat-num').forEach(animateCounter);
    return;
  }

  // Reveal
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('in'), i * 60);
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  // Counters
  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-num[data-target]').forEach(el => counterObs.observe(el));
})();

/* ── CONTACT FORM ────────────────────────────────────────────────── */
(function initForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled  = true;
    btn.textContent = '送信中…';
    // Simulate send
    setTimeout(() => {
      btn.textContent = '✔ 送信しました';
      btn.style.background = '#16a34a';
      form.reset();
      setTimeout(() => {
        btn.textContent = '送信する';
        btn.style.background = '';
        btn.disabled = false;
      }, 4000);
    }, 1200);
  });
})();

/* ── BACK TO TOP ─────────────────────────────────────────────────── */
(function initBackTop() {
  const btn = document.getElementById('backTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ── ACTIVE NAV HIGHLIGHT ─────────────────────────────────────────── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id], div[id]');
  const links = document.querySelectorAll('.nav-link');
  if (!links.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove('active-link'));
        const match = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
        if (match) match.classList.add('active-link');
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => obs.observe(s));
})();
