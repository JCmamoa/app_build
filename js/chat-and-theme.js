/**
 * Theme Switcher & Interactive Support Chat Controller
 * Manages Apple light/dark theme persistence and responsive concierge chat.
 */

export function initThemeSwitcher() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const root = document.documentElement;

  // Retrieve saved preference or check system preference
  const savedTheme = localStorage.getItem('apex-theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
    root.setAttribute('data-theme', 'light');
    toggleBtn?.setAttribute('aria-label', 'Switch to dark theme');
  } else {
    root.setAttribute('data-theme', 'dark');
    toggleBtn?.setAttribute('aria-label', 'Switch to light theme');
  }

  toggleBtn?.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('apex-theme', newTheme);
    toggleBtn.setAttribute('aria-label', `Switch to ${currentTheme} theme`);
  });
}

export function initLiveChat() {
  const launcherBtn = document.getElementById('chat-launcher-btn');
  const chatDrawer = document.getElementById('chat-drawer');
  const closeBtn = document.getElementById('chat-close-btn');
  const sendBtn = document.getElementById('chat-send-btn');
  const inputField = document.getElementById('chat-input-field');
  const messagesContainer = document.getElementById('chat-messages');

  if (!launcherBtn || !chatDrawer || !messagesContainer) return;

  function toggleChat() {
    const isActive = chatDrawer.classList.toggle('active');
    chatDrawer.setAttribute('aria-hidden', (!isActive).toString());
    if (isActive) {
      setTimeout(() => inputField?.focus(), 200);
    }
  }

  launcherBtn.addEventListener('click', toggleChat);
  closeBtn?.addEventListener('click', toggleChat);

  function appendMessage(text, isUser = false) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${isUser ? 'bubble-user' : 'bubble-bot'}`;
    bubble.textContent = text;
    messagesContainer.appendChild(bubble);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function handleBotResponse(query) {
    // Show typing simulation
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'chat-bubble bubble-bot';
    typingIndicator.innerHTML = '<span style="opacity:0.7;">Architect is typing...</span>';
    messagesContainer.appendChild(typingIndicator);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    setTimeout(() => {
      typingIndicator.remove();
      const lower = query.toLowerCase();

      if (lower.includes('app') || lower.includes('mobile')) {
        appendMessage('For iOS, Android, or React Native apps, we build 120fps fluid native solutions with offline-first sync. Would you like to schedule an architecture scoping session?');
      } else if (lower.includes('e-comm') || lower.includes('loja') || lower.includes('store')) {
        appendMessage('Our headless e-commerce architectures boast sub-350ms checkout pipelines and average 42% conversion lifts. Check out Pillar II in our Services grid!');
      } else if (lower.includes('backend') || lower.includes('cloud') || lower.includes('kafka')) {
        appendMessage('We specialize in Microservices, Kubernetes, Event-Driven Kafka message buses, and Serverless Edge runtimes. Which topology does your system require?');
      } else if (lower.includes('email') || lower.includes('contato')) {
        appendMessage('You can reach our engineering director directly at contact@apexarchitectures.com or fill out the formal form below.');
      } else {
        appendMessage('Thank you for reaching out! A Lead Solutions Architect is ready to review your project. Feel free to use the quick options or dispatch an inquiry below.');
      }
    }, 600);
  }

  function sendMessage() {
    const text = inputField.value.trim();
    if (!text) return;
    appendMessage(text, true);
    inputField.value = '';
    handleBotResponse(text);
  }

  sendBtn?.addEventListener('click', sendMessage);
  inputField?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  });

  // Quick Action Chips
  document.querySelectorAll('.quick-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const topic = chip.getAttribute('data-query');
      if (topic) {
        appendMessage(chip.textContent.trim(), true);
        handleBotResponse(topic);
      }
    });
  });
}
