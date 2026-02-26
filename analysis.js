// ============================================================
// analysis.js — Results generation: skill bars, career matches,
//               skill gap analysis
// ============================================================

// ─── Entry Point ─────────────────────────────────────────────

/**
 * Triggers the full analysis pipeline:
 *  1. Shows loading state
 *  2. Generates results
 *  3. Switches to the Results tab
 */
async function runAnalysis() {
  const btn = document.getElementById('analyzeBtn');
  const loadingBar = document.getElementById('loadingBar');

  // Seed some defaults so the demo always shows results
  if (currentSkills.length === 0) {
    ['Python', 'Data Analysis', 'Excel', 'Communication'].forEach(addSkill);
  }

  btn.disabled = true;
  btn.textContent = '⚙ Analyzing your profile...';
  loadingBar.classList.add('active');

  await sleep(2200);

  loadingBar.classList.remove('active');
  btn.disabled = false;
  btn.textContent = '⚡ Analyze My Profile & Generate Roadmap';

  generateResults();
  generateRoadmap();

  // Switch to Results tab
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn')[1].classList.add('active');
  document.getElementById('tab-results').classList.add('active');
}

// ─── Results Renderer ────────────────────────────────────────

/** Renders all result sub-sections. */
function generateResults() {
  const skills = currentSkills.length > 0 ? currentSkills : ['Python', 'Data Analysis', 'Excel'];
  renderSkillBars(skills);
  renderCareerMatches(skills);
  renderGapAnalysis(skills);
}

// ─── Skill Bars ──────────────────────────────────────────────

/**
 * Builds and animates proficiency bars for up to 7 skills.
 * @param {string[]} skills
 */
function renderSkillBars(skills) {
  const container = document.getElementById('skillBars');
  const skillData = buildSkillData(skills);

  container.innerHTML = skillData
    .map(
      s => `
      <div class="skill-bar-item">
        <div class="skill-bar-header">
          <span class="skill-bar-name">${s.name}</span>
          <span class="skill-bar-pct">${s.pct}%</span>
        </div>
        <div class="skill-bar-track">
          <div class="skill-bar-fill" data-target="${s.pct}" style="width:0%"></div>
        </div>
      </div>`
    )
    .join('');

  // Trigger CSS width animation on next frame
  requestAnimationFrame(() => {
    document.querySelectorAll('.skill-bar-fill').forEach(el => {
      el.style.width = el.dataset.target + '%';
    });
  });
}

/**
 * Generates proficiency scores for the provided skills and appends
 * inferred soft skills if there is room.
 * @param {string[]} skills
 * @returns {{ name: string, pct: number }[]}
 */
function buildSkillData(skills) {
  const data = skills.slice(0, 6).map(name => ({
    name,
    pct: Math.floor(Math.random() * 40) + 50,
  }));

  const inferred = ['Problem Solving', 'Analytical Thinking'];
  inferred.forEach(name => {
    if (data.length < 7 && !skills.includes(name)) {
      data.push({ name, pct: Math.floor(Math.random() * 30) + 45 });
    }
  });

  return data.sort((a, b) => b.pct - a.pct);
}

// ─── Career Matching ─────────────────────────────────────────

/**
 * Renders ranked career path cards based on the user's skills.
 * @param {string[]} skills
 */
function renderCareerMatches(skills) {
  const careers = getCareerMatches(skills);
  document.getElementById('careerPaths').innerHTML = careers
    .map(
      (c, i) => `
      <div class="career-card ${i === 0 ? 'selected' : ''}"
           onclick="selectCareer(this, '${c.title}')">
        <div class="career-card-header">
          <div class="career-title">${c.title}</div>
          <span class="career-match ${c.matchClass}">${c.match}% match</span>
        </div>
        <div class="career-desc">${c.desc}</div>
        <div class="career-tags">
          ${c.tags.map(t => `<span class="career-tag-chip">${t}</span>`).join('')}
        </div>
      </div>`
    )
    .join('');
}

/**
 * Returns a ranked list of career matches.
 * @param {string[]} skills
 * @returns {Object[]}
 */
function getCareerMatches(skills) {
  const catalogue = [
    {
      title: 'Data Scientist',
      match: 91,
      matchClass: 'match-high',
      desc: 'Extract insights from large datasets using statistical methods and ML algorithms.',
      tags: ['Python', 'ML', 'Statistics', '₹18–40 LPA'],
    },
    {
      title: 'ML Engineer',
      match: 85,
      matchClass: 'match-high',
      desc: 'Build and deploy machine learning models that power intelligent products at scale.',
      tags: ['PyTorch', 'MLOps', 'Cloud', '₹22–50 LPA'],
    },
    {
      title: 'Full Stack Developer',
      match: 78,
      matchClass: 'match-med',
      desc: 'Design and build end-to-end web applications from database to user interface.',
      tags: ['React', 'Node.js', 'Postgres', '₹12–30 LPA'],
    },
    {
      title: 'Business Analyst',
      match: 72,
      matchClass: 'match-med',
      desc: 'Bridge business needs and data insights to drive strategic decisions.',
      tags: ['Excel', 'SQL', 'Communication', '₹10–22 LPA'],
    },
    {
      title: 'Product Manager',
      match: 61,
      matchClass: 'match-low',
      desc: 'Define product vision and roadmap, coordinating across engineering, design, and business.',
      tags: ['Strategy', 'Analytics', 'Leadership', '₹20–45 LPA'],
    },
  ];

  const hasCode = skills.some(s => ['Python', 'JavaScript', 'Java', 'React', 'SQL', 'C++'].includes(s));
  const hasData = skills.some(s => ['Data Analysis', 'Machine Learning', 'Excel', 'Statistics', 'SQL'].includes(s));

  if (!hasCode && !hasData) {
    catalogue.forEach(c => { c.match = Math.max(30, c.match - 30); });
  }

  return catalogue.slice(0, 4);
}

/**
 * Updates the roadmap title when a career card is clicked.
 * @param {HTMLElement} el
 * @param {string} title
 */
function selectCareer(el, title) {
  document.querySelectorAll('.career-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById('roadmapTitle').textContent = `Roadmap → ${title}`;
}

// ─── Gap Analysis ────────────────────────────────────────────

/**
 * Renders the 3-column skill gap grid (Strengths / Develop / Acquire).
 * @param {string[]} skills
 */
function renderGapAnalysis(skills) {
  const strengths  = skills.slice(0, 3);
  const develop    = ['Statistics', 'Cloud Platforms (AWS)', 'Data Visualization'];
  const acquire    = ['TensorFlow / PyTorch', 'Model Deployment', 'A/B Testing'];

  document.getElementById('gapGrid').innerHTML = `
    ${buildGapCard('strength', '💪', 'Strengths',     strengths, '✓')}
    ${buildGapCard('develop',  '🔧', 'Develop Further', develop, '→')}
    ${buildGapCard('acquire',  '🎯', 'Acquire New',   acquire,   '+')}
  `;
}

/**
 * Returns the HTML for a single gap analysis card.
 * @param {string}   type    - CSS class suffix: 'strength' | 'develop' | 'acquire'
 * @param {string}   icon
 * @param {string}   label
 * @param {string[]} items
 * @param {string}   prefix  - Symbol prepended to each item
 * @returns {string}
 */
function buildGapCard(type, icon, label, items, prefix) {
  return `
    <div class="gap-card">
      <div class="gap-header">
        <div class="gap-icon ${type}">${icon}</div>
        <div class="gap-label ${type}">${label}</div>
      </div>
      <div class="gap-skills">
        ${items.map(s => `<div class="gap-skill ${type}">${prefix} ${s}</div>`).join('')}
      </div>
    </div>`;
}
