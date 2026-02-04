// DOM Elements
const elements = {
  openBtn: document.getElementById('openBtn'),
  yesBtn: document.getElementById('yesBtn'),
  noBtn: document.getElementById('noBtn'),
  screen1: document.getElementById('screen-1'),
  screen2: document.getElementById('screen-2'),
  initialText: document.getElementById('initialText'),
  finalText: document.getElementById('finalText'),
  container: document.querySelector('.container')
};

// Validate all elements exist
const validateElements = () => {
  for (const [key, element] of Object.entries(elements)) {
    if (!element) {
      console.error(`Element not found: ${key}`);
      return false;
    }
  }
  return true;
};

// Transition to message screen
const openMessage = () => {
  elements.screen1.classList.remove('active');
  elements.container.classList.add('mode-message');

  setTimeout(() => {
    elements.screen2.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 350);
};

// Reveal final text
const revealFinalText = () => {
  // Hide initial content with fade out
  elements.initialText.classList.add('fade-out');
  elements.yesBtn.classList.add('fade-out');
  elements.noBtn.classList.add('fade-out');

  setTimeout(() => {
    elements.initialText.style.display = 'none';
    elements.yesBtn.style.display = 'none';
    elements.noBtn.style.display = 'none';

    // Switch to final mode
    elements.container.classList.remove('mode-message');
    elements.container.classList.add('mode-final');

    // Reveal final text
    elements.finalText.classList.remove('hidden');
    elements.finalText.classList.add('show');
    
    // Smooth scroll to final text
    setTimeout(() => {
      elements.finalText.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }, 100);
  }, 400);
};

// Initialize
const init = () => {
  if (!validateElements()) {
    console.error('Failed to initialize: Missing required elements');
    return;
  }

  // Event listeners
  elements.openBtn.addEventListener('click', openMessage);
  elements.yesBtn.addEventListener('click', revealFinalText);
  
  // No button intentionally does nothing
  elements.noBtn.addEventListener('click', () => {
    // Nothing happens - there is no "no" option
  });

  // Keyboard accessibility
  elements.openBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openMessage();
    }
  });

  elements.yesBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      revealFinalText();
    }
  });
};

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}