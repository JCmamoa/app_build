/**
 * Theme Switcher & Interactive Support Chat Controller
 * Manages Apple light/dark theme persistence and responsive concierge chat.
 */

// Safe localStorage wrapper
function getStoredTheme() {
  try {
    return localStorage.getItem('apex-theme');
  } catch (e) {
    return null;
  }
}

function setStoredTheme(theme) {
  try {
    localStorage.setItem('apex-theme', theme);
  } catch (e) {
    // Ignore storage errors in restricted iframes or incognito
  }
}

export function initThemeSwitcher() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const root = document.documentElement;

  if (!toggleBtn) return;

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    document.body?.setAttribute('data-theme', theme);
    toggleBtn.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`);
    toggleBtn.setAttribute('title', `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`);
    setStoredTheme(theme);
  }

  // Determine initial theme: stored > system preference > default dark
  const stored = getStoredTheme();
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  const initialTheme = stored ? stored : (prefersLight ? 'light' : 'dark');

  applyTheme(initialTheme);

  // Toggle on click
  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const currentTheme = root.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme);
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

  function openChat() {
    chatDrawer.classList.add('active');
    chatDrawer.setAttribute('aria-hidden', 'false');
    launcherBtn.setAttribute('aria-expanded', 'true');
    setTimeout(() => inputField?.focus(), 150);
  }

  function closeChat() {
    chatDrawer.classList.remove('active');
    chatDrawer.setAttribute('aria-hidden', 'true');
    launcherBtn.setAttribute('aria-expanded', 'false');
  }

  function toggleChat(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (chatDrawer.classList.contains('active')) {
      closeChat();
    } else {
      openChat();
    }
  }

  launcherBtn.addEventListener('click', toggleChat);
  closeBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeChat();
  });

  // Close when clicking outside chat window
  document.addEventListener('click', (e) => {
    if (chatDrawer.classList.contains('active')) {
      if (!chatDrawer.contains(e.target) && !launcherBtn.contains(e.target)) {
        closeChat();
      }
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && chatDrawer.classList.contains('active')) {
      closeChat();
    }
  });

  function appendMessage(text, isUser = false) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${isUser ? 'bubble-user' : 'bubble-bot'}`;
    bubble.textContent = text;
    messagesContainer.appendChild(bubble);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function handleBotResponse(query) {
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'chat-bubble bubble-bot';
    typingIndicator.innerHTML = '<span style="opacity:0.75;">Architect is typing...</span>';
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
        appendMessage('Thank you for reaching out! A Lead Solutions Architect is ready to review your project parameters. Feel free to use the quick options or dispatch an inquiry below.');
      }
    }, 450);
  }

  function sendMessage() {
    if (!inputField) return;
    const text = inputField.value.trim();
    if (!text) return;
    appendMessage(text, true);
    inputField.value = '';
    handleBotResponse(text);
  }

  sendBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    sendMessage();
  });

  inputField?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  });

  // Quick Action Chips
  document.querySelectorAll('.quick-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      e.preventDefault();
      const topic = chip.getAttribute('data-query');
      if (topic) {
        appendMessage(chip.textContent.trim(), true);
        handleBotResponse(topic);
      }
    });
  });
}
