// ============================================================
// assessment.js — Persona selection, skill tag input, form
// ============================================================

/** @type {string[]} Stores the user's entered skills */
const currentSkills = [];

/** @type {string} Currently selected persona */
let selectedPersona = 'student';

// ─── Persona ────────────────────────────────────────────────

/**
 * Marks the clicked persona card as selected.
 * @param {HTMLElement} el
 * @param {string} persona
 */
function selectPersona(el, persona) {
  document.querySelectorAll('.persona-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  selectedPersona = persona;
}

// ─── Skill Tags ──────────────────────────────────────────────

/** Wire up the Enter/comma key on the skill text input. */
function initSkillInput() {
  const skillInput = document.getElementById('skillInput');
  skillInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = this.value.trim().replace(/,$/, '');
      if (val) addSkill(val);
      this.value = '';
    }
  });
}

/**
 * Adds a skill tag to the container and to the currentSkills array.
 * @param {string} skill
 */
function addSkill(skill) {
  if (!skill || currentSkills.includes(skill)) return;
  currentSkills.push(skill);

  const container = document.getElementById('skillTagsContainer');
  const input = document.getElementById('skillInput');

  const tag = document.createElement('div');
  tag.className = 'skill-tag';
  tag.innerHTML = `${skill} <button onclick="removeSkill('${skill}', this.parentElement)">×</button>`;
  container.insertBefore(tag, input);
}

/**
 * Removes a skill tag from the DOM and from currentSkills.
 * @param {string} skill
 * @param {HTMLElement} el - The tag element to remove
 */
function removeSkill(skill, el) {
  const idx = currentSkills.indexOf(skill);
  if (idx !== -1) currentSkills.splice(idx, 1);
  el.remove();
}

// ─── Init ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', initSkillInput);
