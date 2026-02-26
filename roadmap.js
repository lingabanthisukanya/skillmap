// ============================================================
// roadmap.js — Learning roadmap timeline generation
// ============================================================

/** Static phase data for the default Data Science roadmap. */
const ROADMAP_PHASES = [
  {
    label: 'Phase 1 · Weeks 1–6',
    title: 'Foundation Strengthening',
    done: true,
    items: [
      { icon: '📚', name: 'Python for Data Science (Intermediate)', detail: 'DataCamp / Coursera · 20 hrs',       badge: 'Your strongest path' },
      { icon: '📐', name: 'Statistics & Probability Fundamentals',  detail: 'Khan Academy · 15 hrs',              badge: 'High Priority' },
      { icon: '🗃',  name: 'Advanced SQL for Analytics',             detail: 'Mode Analytics / Kaggle · 10 hrs',   badge: 'Quick Win' },
    ],
  },
  {
    label: 'Phase 2 · Weeks 7–16',
    title: 'Core ML & Data Skills',
    done: false,
    items: [
      { icon: '🤖', name: 'Machine Learning with scikit-learn',        detail: 'fast.ai / Coursera Andrew Ng · 40 hrs', badge: 'Critical Skill' },
      { icon: '📊', name: 'Data Visualization (Tableau + Python)',     detail: 'Tableau Public · 20 hrs',               badge: 'Portfolio Builder' },
      { icon: '☁️', name: 'Cloud Basics — AWS / GCP',                  detail: 'AWS Free Tier + Labs · 15 hrs',         badge: 'Industry Demand' },
    ],
  },
  {
    label: 'Phase 3 · Weeks 17–26',
    title: 'Applied Projects & Deep Learning',
    done: false,
    items: [
      { icon: '🧠', name: 'Deep Learning with TensorFlow / PyTorch', detail: 'fast.ai Practical DL · 50 hrs',              badge: 'High Salary Impact' },
      { icon: '🏗',  name: 'Build 3 Portfolio Projects',              detail: 'Kaggle competitions + personal · 60 hrs',   badge: 'Must Do' },
      { icon: '🚀', name: 'Model Deployment & MLOps Basics',          detail: 'Streamlit, Docker, GitHub Actions',          badge: 'Job Readiness' },
    ],
  },
  {
    label: 'Phase 4 · Weeks 27–36',
    title: 'Job Readiness & Placement',
    done: false,
    items: [
      { icon: '📝', name: 'Resume & LinkedIn Profile Optimization', detail: 'AI-powered templates · 5 hrs',  badge: 'Action Item' },
      { icon: '🎤', name: 'DS Interview Prep (100 Questions)',       detail: 'LeetCode + System Design · 40 hrs', badge: 'Final Phase' },
      { icon: '🌐', name: 'Network & Apply (targeted list)',         detail: 'Naukri, LinkedIn, AngelList',  badge: 'Launch' },
    ],
  },
];

/**
 * Renders the roadmap timeline into #roadmapTimeline.
 * Called after analysis completes and on initial page load.
 */
function generateRoadmap() {
  document.getElementById('roadmapTimeline').innerHTML = ROADMAP_PHASES
    .map((phase, i) => buildPhaseHTML(phase, i))
    .join('');
}

/**
 * Builds the HTML string for a single roadmap phase.
 * @param {{ label: string, title: string, done: boolean, items: Object[] }} phase
 * @param {number} index - Used for staggered animation delay
 * @returns {string}
 */
function buildPhaseHTML(phase, index) {
  return `
    <div class="roadmap-phase" style="animation-delay:${index * 0.1}s">
      <div class="roadmap-dot ${phase.done ? 'done' : ''}"></div>
      <div class="roadmap-phase-label">${phase.label}</div>
      <div class="roadmap-phase-title">${phase.title}</div>
      <div class="roadmap-items">
        ${phase.items.map(buildItemHTML).join('')}
      </div>
    </div>`;
}

/**
 * Builds the HTML string for a single roadmap item row.
 * @param {{ icon: string, name: string, detail: string, badge: string }} item
 * @returns {string}
 */
function buildItemHTML(item) {
  return `
    <div class="roadmap-item">
      <div class="roadmap-item-icon">${item.icon}</div>
      <div class="roadmap-item-info">
        <div class="roadmap-item-name">${item.name}</div>
        <div class="roadmap-item-detail">${item.detail}</div>
      </div>
      <div class="roadmap-item-badge">${item.badge}</div>
    </div>`;
}
