// landing.js – Handles rendering gift cards and form submission
import { GIFTS } from './config.js';

/**
 * Render the gift cards into the #gift-grid container.
 * Each card is selectable; clicking a card marks it as selected and updates the hidden input.
 */
function renderGiftCards() {
  const grid = document.getElementById('gift-grid');
  if (!grid) return;
  GIFTS.forEach(gift => {
    const card = document.createElement('div');
    card.className = 'gift-card';
    card.dataset.giftId = gift.id;
    card.innerHTML = `
      <img src="${gift.image}" alt="${gift.name}" class="gift-image" />
      <h4 class="gift-name">${gift.name}</h4>
      <p class="gift-desc">${gift.description}</p>
    `;
    card.addEventListener('click', () => selectGift(gift.id, card));
    grid.appendChild(card);
  });
}

/**
 * Mark the chosen gift and store its id in the hidden input.
 */
function selectGift(giftId, cardElement) {
  // Deselect all cards first
  document.querySelectorAll('.gift-card').forEach(c => c.classList.remove('selected'));
  // Mark the clicked card
  cardElement.classList.add('selected');
  // Update hidden field
  const hidden = document.getElementById('selected-gift');
  if (hidden) hidden.value = giftId;
}

/**
 * Simple form validation – ensures a gift is selected before submitting.
 */
function handleFormSubmit(event) {
  const hidden = document.getElementById('selected-gift');
  if (!hidden || !hidden.value) {
    event.preventDefault();
    alert('Please select a gift before submitting the form.');
    return;
  }
  // Here you would normally post the data to a backend endpoint.
  // For demo purposes we just show the success modal.
  event.preventDefault();
  document.getElementById('gift-form').classList.add('hidden');
  document.getElementById('form-success').classList.remove('hidden');
}

// Initialise when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  renderGiftCards();
  const form = document.getElementById('gift-form');
  if (form) form.addEventListener('submit', handleFormSubmit);
});
