// ============================================================
// chat.js — AI career counselor chat logic
// ============================================================

// ─── Canned Responses ────────────────────────────────────────

/** Pre-written responses for the quick-prompt buttons. */
const AI_RESPONSES = {
  'What career should I focus on?':
    `Based on your skill profile, I recommend focusing on **Data Science** as your primary target. Your combination of Python, Data Analysis skills, and analytical background gives you a strong foundation. The field has robust demand in India (Hyderabad/Bangalore especially) with 35% YoY job growth. Your next immediate action should be completing the Statistics and ML fundamentals in Phase 1 of your roadmap.`,

  'How long will it take to become job-ready?':
    `With consistent effort of 10–15 hours per week, you're looking at approximately **8–10 months** to reach job-ready status. Your existing skills save you roughly 3 months compared to someone starting from scratch. Breaking it down: 6 weeks for foundation strengthening, 10 weeks for core ML skills, and the final phase for portfolio and interviews.`,

  'What skills are most in demand right now?':
    `In the current market (2025–26), the highest-demand skills in Data/AI roles are: (1) **LLM Fine-tuning & Prompt Engineering** — huge demand post-GPT era, (2) **MLOps / Model Deployment** — companies need engineers who can ship models, (3) **Python + PyTorch** — industry standard for ML research and production, and (4) **Cloud ML Services** — AWS SageMaker, Google Vertex AI. I'd add at least skills 1 and 2 to your roadmap.`,

  'How do I build a portfolio?':
    `A strong portfolio needs **3 projects** with increasing complexity: (1) An **EDA + Visualization** project — pick a domain you care about (sports, finance, health), clean messy data and tell a story with charts. (2) A **predictive model** project — build end-to-end: data → feature engineering → model → deployment via Streamlit app. (3) A **real-world problem** project — contribute to a Kaggle competition or build something that solves a personal problem. Host everything on GitHub with clear READMEs.`,

  'Tell me about salary expectations':
    `For Data Science roles in India, here's the realistic breakdown by experience: **Fresher (0–1 yr):** ₹6–12 LPA, **Junior (1–3 yrs):** ₹12–22 LPA, **Mid-level (3–5 yrs):** ₹20–35 LPA. In Hyderabad specifically, major employers include Amazon, Microsoft, Google, Deloitte, and hundreds of startups. With your target skills fully developed, you should aim for ₹10–15 LPA as a fresher at product-based companies. Upskilling in LLMs can push this to ₹15–20 LPA.`,
};

// ─── Public API ──────────────────────────────────────────────

/**
 * Pre-fills the chat input with a quick prompt and sends it.
 * @param {string} prompt
 */
function sendQuickPrompt(prompt) {
  document.getElementById('chatInput').value = prompt;
  sendChat();
}

/** Reads the chat input, adds user message, gets AI reply. */
async function sendChat() {
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if (!msg) return;
  input.value = '';

  addMessage('user', msg);

  const typingEl = addTypingIndicator();
  await sleep(1200 + Math.random() * 800);
  typingEl.remove();

  const response = AI_RESPONSES[msg] ?? generateGenericResponse(msg);
  addMessage('ai', response);
}

// ─── Response Generation ─────────────────────────────────────

/**
 * Generates a contextual fallback response based on keywords.
 * @param {string} msg
 * @returns {string}
 */
function generateGenericResponse(msg) {
  const lower = msg.toLowerCase();

  if (lower.includes('python') || lower.includes('code') || lower.includes('programming')) {
    return `Python is definitely a core skill for your path! Based on your current level, I'd recommend focusing on Pandas, NumPy, and then transitioning to scikit-learn for ML. The roadmap includes a dedicated Python for Data Science module in Phase 1. Would you like me to suggest specific exercises to build fluency faster?`;
  }

  if (lower.includes('certif') || lower.includes('course')) {
    return `For your career target, the highest ROI certifications are: (1) **Google Professional Data Engineer** — recognized by most MNCs, (2) **AWS Certified Machine Learning Specialty** — great for cloud-oriented roles, (3) **Coursera Deep Learning Specialization** (Andrew Ng) — foundational for ML/AI. Certifications matter less than portfolio projects for most companies, but they signal baseline competency to HR filters.`;
  }

  if (lower.includes('interview') || lower.includes('job')) {
    return `For Data Science interviews, expect 3 rounds: (1) **Technical Screening** — Python, SQL, statistics (2) **Case Study / Take-home** — you'll be given a dataset to analyze (3) **System Design** — how you'd build an ML pipeline. Your weakest area right now is probably statistics & probability — I'd spend 2 weeks there before applying. Practice on LeetCode Easy/Medium SQL, and review Bayes theorem, A/B testing, and regression diagnostics.`;
  }

  return `That's a great question! Based on your current skill profile and your target in Data Science, I'd say the most important thing you can do right now is focus on closing your statistics gap — it's the foundation everything else builds on. Would you like me to suggest specific resources or a more detailed breakdown?`;
}

// ─── DOM Helpers ─────────────────────────────────────────────

/**
 * Appends a chat message bubble to the messages list.
 * @param {'ai'|'user'} role
 * @param {string} text  - Supports **bold** markdown
 */
function addMessage(role, text) {
  const container = document.getElementById('chatMessages');
  const isAI = role === 'ai';
  const formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  const div = document.createElement('div');
  div.className = `msg ${role}`;
  div.innerHTML = `
    <div class="msg-avatar">${isAI ? '🤖' : '👤'}</div>
    <div class="msg-bubble">${formatted}</div>
  `;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

/**
 * Appends an animated typing indicator and returns the element
 * so the caller can remove it when the response arrives.
 * @returns {HTMLElement}
 */
function addTypingIndicator() {
  const container = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'msg ai';
  div.innerHTML = `
    <div class="msg-avatar">🤖</div>
    <div class="msg-bubble">
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    </div>
  `;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
  return div;
}
