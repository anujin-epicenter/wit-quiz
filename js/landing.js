// landing.js – Gift card rendering and form submission (no ES module syntax)

(function () {
  // ── Gift selection state ──────────────────────────────────────────────────
  var selectedGiftId = '';

  // ── Render gift cards from GIFTS global (defined in config.js) ───────────
  function renderGiftCards() {
    var grid = document.getElementById('gift-grid');
    if (!grid || typeof GIFTS === 'undefined') return;

    GIFTS.forEach(function (gift) {
      var card = document.createElement('div');
      card.className = 'gift-card';
      card.dataset.giftId = gift.id;
      card.innerHTML =
        '<div class="gift-emoji">' + gift.emoji + '</div>' +
        '<h4 class="gift-name">' + gift.name + '</h4>' +
        '<p class="gift-desc">' + gift.description + '</p>' +
        '<div class="gift-select-indicator"><span>✓ Selected</span></div>';

      card.addEventListener('click', function () {
        selectGift(gift.id, card);
      });

      grid.appendChild(card);
    });
  }

  // ── Mark the chosen gift ──────────────────────────────────────────────────
  function selectGift(giftId, cardElement) {
    document.querySelectorAll('.gift-card').forEach(function (c) {
      c.classList.remove('selected');
    });
    cardElement.classList.add('selected');
    selectedGiftId = giftId;
    var hidden = document.getElementById('selected-gift');
    if (hidden) hidden.value = giftId;

    // Smooth scroll to form
    var form = document.getElementById('gift-form');
    if (form) form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ── Form validation & success modal ──────────────────────────────────────
  function handleFormSubmit(event) {
    event.preventDefault();
    var hidden = document.getElementById('selected-gift');
    if (!hidden || !hidden.value) {
      showError('Please select a gift before submitting.');
      return;
    }
    // Show success state
    var formEl = document.getElementById('gift-form');
    var successEl = document.getElementById('form-success');
    if (formEl) formEl.classList.add('hidden');
    if (successEl) successEl.classList.remove('hidden');
  }

  function showError(msg) {
    var existing = document.getElementById('gift-form-error');
    if (existing) existing.remove();
    var err = document.createElement('p');
    err.id = 'gift-form-error';
    err.className = 'form-error';
    err.textContent = msg;
    var btn = document.querySelector('#gift-form button[type="submit"]');
    if (btn) btn.parentNode.insertBefore(err, btn);
    setTimeout(function () { if (err.parentNode) err.remove(); }, 4000);
  }

  // ── Init ──────────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    renderGiftCards();
    var form = document.getElementById('gift-form');
    if (form) form.addEventListener('submit', handleFormSubmit);
  });
})();
