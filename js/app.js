const state = { current: 0, data: null, previous: 0 };
const slides = Array.from(document.querySelectorAll('.slide'));
const presentation = document.getElementById('presentation');
const counter = document.getElementById('slide-counter');
const sectionChip = document.getElementById('section-chip');
const progressFill = document.getElementById('progress-fill');
const helpPanel = document.getElementById('help-panel');

function classifySection(section) {
  const attackSections = ['Attack Flow', 'Technical', 'ATM Fraud', 'SWIFT-related', 'Timeline', 'Impact'];
  const detectSections = ['SOC', 'Weaknesses', 'Techniques'];
  const responseSections = ['Response', 'Lessons', 'Conclusion'];
  const defenseSections = ['Defense-in-Depth', 'Recommendations'];

  if (attackSections.includes(section)) return 'section-attack';
  if (detectSections.includes(section)) return 'section-detect';
  if (responseSections.includes(section)) return 'section-response';
  if (defenseSections.includes(section)) return 'section-defense';
  return '';
}

function applySectionTheme(activeSlide) {
  const section = activeSlide.dataset.section || 'INTRO';
  sectionChip.textContent = section.toUpperCase();
  document.body.classList.remove('section-attack', 'section-detect', 'section-response', 'section-defense');
  const sectionClass = classifySection(section);
  if (sectionClass) document.body.classList.add(sectionClass);
}

async function loadData() {
  const response = await fetch('./data/case-study.json');
  state.data = await response.json();
  renderSummaryCards();
  renderTimeline();
  renderAttackOverview();
  renderATMGrid();
  renderTechniqueMatrix();
  renderImpact();
  renderVulnMap();
  renderLifecycle();
  renderDefenseLayers();
  renderRecommendations();
  renderLessons();
  renderReferences();
}

function showSlide(index) {
  state.previous = state.current;
  state.current = Math.max(0, Math.min(index, slides.length - 1));
  presentation.dataset.direction = state.current >= state.previous ? 'next' : 'prev';

  slides.forEach((slide, i) => slide.classList.toggle('active', i === state.current));

  const activeSlide = slides[state.current];
  applySectionTheme(activeSlide);

  const current = String(state.current + 1).padStart(2, '0');
  const total = String(slides.length).padStart(2, '0');
  counter.textContent = `${current} / ${total}`;
  progressFill.style.width = `${((state.current + 1) / slides.length) * 100}%`;
}

function nextSlide() { showSlide(state.current + 1); }
function prevSlide() { showSlide(state.current - 1); }

function renderSummaryCards() {
  const container = document.getElementById('summary-cards');
  container.innerHTML = state.data.executiveSummary.map(item => `
    <article class="card" tabindex="0" title="${item.label}">
      <div>${item.label}</div>
      <strong>${item.value}</strong>
    </article>
  `).join('');
}

function renderTimeline() {
  const container = document.getElementById('timeline');
  container.innerHTML = state.data.timeline.map((event, i) => `
    <article class="timeline-event ${event.type}" data-index="${i}" tabindex="0" title="Click to expand timeline event">
      <strong>${event.title}</strong>
      <div class="note">${event.date}</div>
      <div class="details">${event.detail}</div>
    </article>
  `).join('');

  container.querySelectorAll('.timeline-event').forEach((node, i) => {
    setTimeout(() => node.classList.add('revealed'), i * 85);
    const toggle = () => node.classList.toggle('open');
    node.addEventListener('click', toggle);
    node.addEventListener('keypress', e => {
      if (e.key === 'Enter') toggle();
    });
  });
}

function renderAttackOverview() {
  const container = document.getElementById('attack-overview');
  container.innerHTML = state.data.attackOverview.map((step, i) => `
    <article class="flow-step ${step.tag}" data-step="${i}" tabindex="0" title="Click for details">
      <strong>${step.stage}</strong>
      <small>${step.label}</small>
      <div class="details">${step.detail}</div>
    </article>
  `).join('');

  container.querySelectorAll('.flow-step').forEach((node, i) => {
    setTimeout(() => node.classList.add('revealed'), 230 * (i + 1));
    const toggle = () => node.classList.toggle('open');
    node.addEventListener('click', toggle);
    node.addEventListener('keypress', e => {
      if (e.key === 'Enter') toggle();
    });
  });
}

function renderATMGrid() {
  const container = document.getElementById('atm-grid');
  const atms = Array.from({ length: 12 }, (_, i) => i + 1);
  container.innerHTML = atms.map(num => {
    const alert = num % 3 === 0 || num % 5 === 0;
    return `<div class="atm ${alert ? 'alert' : ''}" title="Conceptual ATM node">ATM-${String(num).padStart(2, '0')}</div>`;
  }).join('');
}

function renderTechniqueMatrix() {
  const container = document.getElementById('technique-matrix');
  container.innerHTML = `
    <div class="matrix-head"><div>Technique</div><div>Purpose</div><div>Security Impact</div><div>Detection Opportunity</div></div>
    ${state.data.techniques.map(row => `
      <div class="matrix-row">
        <div>${row.technique}</div>
        <div>${row.purpose}</div>
        <div>${row.impact}</div>
        <div>${row.detection}</div>
      </div>
    `).join('')}
  `;
}

function renderImpact() {
  const container = document.getElementById('impact-dashboard');
  container.innerHTML = state.data.impact.map(item => `
    <article class="impact-card">
      <h3>${item.category}</h3>
      <p>${item.summary}</p>
      <div class="impact-bar"><i style="--bar-width:${item.severity}%;"></i></div>
      <small class="note">${item.evidence}</small>
    </article>
  `).join('');

  const cards = container.querySelectorAll('.impact-card');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  cards.forEach(card => observer.observe(card));
}

function renderVulnMap() {
  const container = document.getElementById('vuln-map');
  container.innerHTML = state.data.vulnerabilityAnalysis.map(v => `
    <article class="vuln-item">
      <strong>${v.category}</strong>
      <div class="chain">${v.potentialWeakness} → ${v.attackOpportunity} → ${v.control}</div>
      <small class="note">${v.note}</small>
    </article>
  `).join('');
}

function renderLifecycle() {
  const container = document.getElementById('ir-lifecycle');
  container.innerHTML = state.data.incidentResponse.map(step => `
    <article class="life-stage" tabindex="0" title="Click for stage details"><strong>${step.stage}</strong><p>${step.description}</p></article>
  `).join('');

  container.querySelectorAll('.life-stage').forEach(node => {
    const toggle = () => node.classList.toggle('open');
    node.addEventListener('click', toggle);
    node.addEventListener('keypress', e => { if (e.key === 'Enter') toggle(); });
  });
}

function renderDefenseLayers() {
  const container = document.getElementById('defense-layers');
  container.innerHTML = state.data.defenseLayers.map(layer => `
    <article class="layer" tabindex="0" title="Click for layer details"><strong>${layer.name}</strong><p>${layer.description}</p></article>
  `).join('');

  container.querySelectorAll('.layer').forEach(node => {
    const toggle = () => node.classList.toggle('open');
    node.addEventListener('click', toggle);
    node.addEventListener('keypress', e => { if (e.key === 'Enter') toggle(); });
  });
}

function renderRecommendations() {
  const container = document.getElementById('recommendations');
  container.innerHTML = state.data.recommendations.map(r => `
    <article class="recommend"><h3>${r.title}</h3><p>${r.detail}</p></article>
  `).join('');
}

function renderLessons() {
  const container = document.getElementById('lessons');
  container.innerHTML = state.data.lessons.map((l, i) => `
    <article class="lesson"><h3>${i + 1}. ${l.title}</h3><p>${l.detail}</p></article>
  `).join('');
}

function renderReferences() {
  const container = document.getElementById('references');
  container.innerHTML = state.data.references.map(ref => `
    <article class="ref-item">
      <strong>${ref.organization}</strong><br />
      <span>${ref.title}</span><br />
      <small>${ref.date}</small><br />
      <a href="${ref.link}" target="_blank" rel="noopener noreferrer">${ref.link}</a>
    </article>
  `).join('');
}

async function toggleFullscreen() {
  if (!document.fullscreenElement) {
    await document.documentElement.requestFullscreen();
  } else {
    await document.exitFullscreen();
  }
}

function setupControls() {
  document.getElementById('next-btn').addEventListener('click', nextSlide);
  document.getElementById('prev-btn').addEventListener('click', prevSlide);

  document.getElementById('fullscreen-btn').addEventListener('click', async () => {
    try {
      await toggleFullscreen();
    } catch {
      // Fullscreen can be blocked by browser policies.
    }
  });

  document.addEventListener('fullscreenchange', () => {
    document.body.classList.toggle('presentation-mode', Boolean(document.fullscreenElement));
  });

  document.getElementById('help-toggle').addEventListener('click', () => {
    helpPanel.hidden = !helpPanel.hidden;
  });

  document.getElementById('motion-toggle').addEventListener('click', () => {
    document.body.classList.toggle('reduced-motion');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'Home') {
      e.preventDefault();
      showSlide(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      showSlide(slides.length - 1);
    } else if (e.key.toLowerCase() === 'f') {
      document.getElementById('fullscreen-btn').click();
    } else if (e.key === '?') {
      helpPanel.hidden = !helpPanel.hidden;
    }
  });
}

setupControls();
showSlide(0);
loadData().catch(() => {
  document.getElementById('references').innerHTML = '<p>Unable to load case-study data file.</p>';
});
