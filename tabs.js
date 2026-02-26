// ============================================================
// tabs.js — Tab switching logic
// ============================================================

/**
 * Activates a tab panel and its corresponding button.
 * @param {string} tabId  - ID suffix for the panel (e.g. 'assess')
 * @param {HTMLElement} btn - The clicked tab button element
 */
function switchTab(tabId, btn) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + tabId).classList.add('active');
  btn.classList.add('active');
}
