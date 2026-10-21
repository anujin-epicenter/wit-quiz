/**
 * WIT QUIZ APPLICATION LOGIC
 * Manages Quiz State, Precision Stopwatch, Audio Synth, and Results Display.
 */

// Web Audio API Synthesizer (Zero external audio file dependencies)
class SoundFX {
  constructor() {
    this.audioCtx = null;
    this.enabled = true;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  playTone(freq, type, duration, delay = 0, gainVal = 0.15) {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    setTimeout(() => {
      try {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

        gain.gain.setValueAtTime(gainVal, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start();
        osc.stop(this.audioCtx.currentTime + duration);
      } catch (e) {
        console.warn('Audio play failed', e);
      }
    }, delay);
  }

  playClick() {
    this.playTone(800, 'sine', 0.05, 0, 0.08);
  }

  playCorrect() {
    // Joyful melodic tri-tone chime
    this.playTone(523.25, 'sine', 0.15, 0, 0.2);     // C5
    this.playTone(659.25, 'sine', 0.15, 80, 0.2);    // E5
    this.playTone(783.99, 'triangle', 0.35, 160, 0.25); // G5
    this.playTone(1046.50, 'sine', 0.45, 240, 0.2);  // C6
  }

  playIncorrect() {
    // Gentle low buzz
    this.playTone(280, 'sawtooth', 0.18, 0, 0.12);
    this.playTone(210, 'sawtooth', 0.25, 140, 0.14);
  }

  playFanfare() {
    // Grand celebratory fanfare
    const notes = [
      { f: 523.25, d: 0.12, t: 0 },
      { f: 659.25, d: 0.12, t: 120 },
      { f: 783.99, d: 0.12, t: 240 },
      { f: 1046.50, d: 0.45, t: 360 },
      { f: 880.00, d: 0.15, t: 560 },
      { f: 1046.50, d: 0.6, t: 720 }
    ];
    notes.forEach(n => this.playTone(n.f, 'triangle', n.d, n.t, 0.22));
  }
}

// Main App Controller
class QuizApp {
  constructor() {
    this.sound = new SoundFX();
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.userAnswers = [];
    this.totalQuestions = QUIZ_QUESTIONS.length;

    // Timer variables
    this.timerStartTimestamp = 0;
    this.elapsedSeconds = 0;
    this.timerAnimationId = null;
    this.isTimerRunning = false;

    // Cache DOM Elements
    this.dom = {
      // Screens
      screenWelcome: document.getElementById('screen-welcome'),
      screenQuiz: document.getElementById('screen-quiz'),
      screenResults: document.getElementById('screen-results'),
      
      // Nav Controls
      soundToggleBtn: document.getElementById('sound-toggle-btn'),
      soundIcon: document.getElementById('sound-icon'),
      fullscreenBtn: document.getElementById('fullscreen-btn'),
      
      // Welcome
      startQuizBtn: document.getElementById('start-quiz-btn'),
      
      // Quiz Elements
      currentQIndex: document.getElementById('current-q-index'),
      totalQCount: document.getElementById('total-q-count'),
      timerDisplay: document.getElementById('timer-display'),
      progressFill: document.getElementById('progress-fill'),
      questionCategory: document.getElementById('question-category'),
      questionText: document.getElementById('question-text'),
      optionsContainer: document.getElementById('options-container'),
      explanationCard: document.getElementById('explanation-card'),
      explanationText: document.getElementById('explanation-text'),
      nextQuestionBtn: document.getElementById('next-question-btn'),
      nextBtnText: document.getElementById('next-btn-text'),
      
      // Results Elements
      resultsHeadline: document.getElementById('results-headline'),
      trophyShowcase: document.getElementById('trophy-showcase'),
      trophyIcon: document.getElementById('trophy-icon'),
      trophyRank: document.getElementById('trophy-rank'),
      trophyName: document.getElementById('trophy-name'),
      trophyDesc: document.getElementById('trophy-desc'),
      trophyPerk: document.getElementById('trophy-perk'),
      physicalGiftTitle: document.getElementById('physical-gift-title'),
      physicalGiftDetail: document.getElementById('physical-gift-detail'),
      statScore: document.getElementById('stat-score'),
      statScorePercent: document.getElementById('stat-score-percent'),
      statTime: document.getElementById('stat-time'),
      statSpeedLabel: document.getElementById('stat-speed-label'),
      statSpeedSummary: document.getElementById('stat-speed-summary'),
      statSpeedComment: document.getElementById('stat-speed-comment'),
      
      // Result Action Buttons
      btnCelebrateFireworks: document.getElementById('btn-celebrate-fireworks'),
      btnCopyBrag: document.getElementById('btn-copy-brag'),
      btnPlayAgain: document.getElementById('btn-play-again'),
      
      // Toast Notice
      toastNotice: document.getElementById('toast-notice'),
      toastMessage: document.getElementById('toast-message')
    };

    this.bindEvents();
    this.initUI();
  }

  initUI() {
    if (this.dom.totalQCount) {
      this.dom.totalQCount.textContent = this.totalQuestions;
    }
  }

  bindEvents() {
    // Start Quiz
    this.dom.startQuizBtn.addEventListener('click', () => {
      this.sound.playClick();
      this.startQuiz();
    });

    // Next Question
    this.dom.nextQuestionBtn.addEventListener('click', () => {
      this.sound.playClick();
      this.handleNextQuestion();
    });

    // Sound Toggle
    this.dom.soundToggleBtn.addEventListener('click', () => {
      const isEnabled = this.sound.toggle();
      this.dom.soundIcon.textContent = isEnabled ? '🔊' : '🔇';
      this.showToast(isEnabled ? 'Sound effects enabled' : 'Sound effects muted');
    });

    // Fullscreen Toggle
    this.dom.fullscreenBtn.addEventListener('click', () => {
      this.toggleFullscreen();
    });

    // Results Actions
    this.dom.btnCelebrateFireworks.addEventListener('click', () => {
      this.sound.playClick();
      if (window.fireworks) {
        window.fireworks.startCelebration(4500);
      }
    });

    this.dom.btnCopyBrag.addEventListener('click', () => {
      this.sound.playClick();
      this.copyScoreCard();
    });

    this.dom.btnPlayAgain.addEventListener('click', () => {
      this.sound.playClick();
      this.startQuiz();
    });

    // Logo Click Fireworks Easter Egg & Quick Test
    const brandBadge = document.querySelector('.brand-badge');
    if (brandBadge) {
      brandBadge.style.cursor = 'pointer';
      brandBadge.title = 'Click for fireworks test! 🎆';
      brandBadge.addEventListener('click', (e) => {
        this.sound.playClick();
        if (window.fireworks) {
          const rect = brandBadge.getBoundingClientRect();
          window.fireworks.burst(rect.left + rect.width / 2, rect.bottom + 20, 80);
        }
      });
    }
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else if (document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
  }

  showScreen(screenElement) {
    [this.dom.screenWelcome, this.dom.screenQuiz, this.dom.screenResults].forEach(screen => {
      screen.classList.remove('active');
    });
    screenElement.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ==========================================================================
     STOPWATCH & TIMER ENGINE
     ========================================================================== */
  startTimer() {
    this.timerStartTimestamp = performance.now();
    this.isTimerRunning = true;

    const updateTimer = () => {
      if (!this.isTimerRunning) return;
      const now = performance.now();
      this.elapsedSeconds = (now - this.timerStartTimestamp) / 1000;
      this.dom.timerDisplay.textContent = this.formatTime(this.elapsedSeconds);
      this.timerAnimationId = requestAnimationFrame(updateTimer);
    };

    if (this.timerAnimationId) {
      cancelAnimationFrame(this.timerAnimationId);
    }
    this.timerAnimationId = requestAnimationFrame(updateTimer);
  }

  stopTimer() {
    this.isTimerRunning = false;
    if (this.timerAnimationId) {
      cancelAnimationFrame(this.timerAnimationId);
      this.timerAnimationId = null;
    }
  }

  formatTime(totalSeconds) {
    const mins = Math.floor(totalSeconds / 60);
    const secs = Math.floor(totalSeconds % 60);
    const tenths = Math.floor((totalSeconds % 1) * 10);
    const mm = String(mins).padStart(2, '0');
    const ss = String(secs).padStart(2, '0');
    return `${mm}:${ss}.${tenths}`;
  }

  /* ==========================================================================
     QUIZ FLOW
     ========================================================================== */
  startQuiz() {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.userAnswers = [];
    if (window.fireworks) {
      window.fireworks.clear();
    }

    this.showScreen(this.dom.screenQuiz);
    this.startTimer();
    this.renderQuestion();
  }

  renderQuestion() {
    const q = QUIZ_QUESTIONS[this.currentQuestionIndex];
    if (!q) return;

    // Update Counter & Progress Bar
    const qNumber = this.currentQuestionIndex + 1;
    this.dom.currentQIndex.textContent = qNumber;
    const progressPercent = (qNumber / this.totalQuestions) * 100;
    this.dom.progressFill.style.width = `${progressPercent}%`;

    // Category & Question Text
    this.dom.questionCategory.textContent = q.category || "General Tech Trivia ⚡";
    this.dom.questionText.textContent = q.question;

    // Reset Explanation & Next Button
    this.dom.explanationCard.classList.remove('active');
    this.dom.explanationText.textContent = '';
    this.dom.nextQuestionBtn.classList.remove('visible');

    // Update Next Button Text for Final Question
    const isLastQuestion = this.currentQuestionIndex === this.totalQuestions - 1;
    this.dom.nextBtnText.textContent = isLastQuestion ? "See Your Prize & Results" : "Next Question";

    // Build Options Buttons
    this.dom.optionsContainer.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];

    q.options.forEach((optText, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'option-btn';
      btn.setAttribute('aria-label', `Option ${letters[idx]}: ${optText}`);

      btn.innerHTML = `
        <span class="option-letter" aria-hidden="true">${letters[idx]}</span>
        <span class="option-text">${optText}</span>
        <span class="option-icon" aria-hidden="true">✓</span>
      `;

      btn.addEventListener('click', (e) => this.handleOptionSelect(idx, btn, e));
      this.dom.optionsContainer.appendChild(btn);
    });
  }

  handleOptionSelect(selectedIndex, selectedBtn, clickEvent) {
    const q = QUIZ_QUESTIONS[this.currentQuestionIndex];
    if (!q) return;

    // Disable all options immediately to lock choice
    const allOptionBtns = this.dom.optionsContainer.querySelectorAll('.option-btn');
    allOptionBtns.forEach(btn => btn.disabled = true);

    const isCorrect = selectedIndex === q.correctIndex;
    this.userAnswers.push({
      questionIndex: this.currentQuestionIndex,
      selectedIndex,
      isCorrect
    });

    if (isCorrect) {
      this.score++;
      selectedBtn.classList.add('correct');
      this.sound.playCorrect();

      // Launch vibrant localized fireworks around and above the clicked button
      if (window.fireworks) {
        const rect = selectedBtn.getBoundingClientRect();
        const burstX = rect.left + rect.width / 2;
        const burstY = rect.top + rect.height / 2;
        window.fireworks.burst(burstX, burstY, 80);
        setTimeout(() => {
          if (window.fireworks) {
            window.fireworks.burst(burstX, Math.max(90, burstY - 150), 70);
          }
        }, 150);
      }
    } else {
      selectedBtn.classList.add('incorrect');
      selectedBtn.querySelector('.option-icon').textContent = '✗';
      this.sound.playIncorrect();

      // Also gently highlight the correct answer so user learns
      if (allOptionBtns[q.correctIndex]) {
        allOptionBtns[q.correctIndex].classList.add('correct');
      }
    }

    // Reveal Explanation Card
    this.dom.explanationText.textContent = q.explanation;
    this.dom.explanationCard.classList.add('active');

    // Reveal Next Button smoothly
    this.dom.nextQuestionBtn.classList.add('visible');
    this.dom.nextQuestionBtn.focus();
  }

  handleNextQuestion() {
    if (this.currentQuestionIndex < this.totalQuestions - 1) {
      this.currentQuestionIndex++;
      this.renderQuestion();
    } else {
      this.stopTimer();
      this.showResults();
    }
  }

  /* ==========================================================================
     RESULTS & PRIZE PRESENTATION
     ========================================================================== */
  showResults() {
    this.showScreen(this.dom.screenResults);

    // 1. Determine Prize Tier
    const prize = PRIZE_TIERS[this.score] || PRIZE_TIERS[0];
    
    // 2. Determine Speed Rating
    const speedRating = SPEED_RATINGS.find(r => this.elapsedSeconds <= r.maxSeconds) || SPEED_RATINGS[SPEED_RATINGS.length - 1];

    // 3. Update Results Headline
    if (this.score === this.totalQuestions) {
      this.dom.resultsHeadline.textContent = "Flawless Victory! 🌟";
    } else if (this.score >= 2) {
      this.dom.resultsHeadline.textContent = "Impressive Brilliance! 🔥";
    } else if (this.score === 1) {
      this.dom.resultsHeadline.textContent = "Good Effort! 🚀";
    } else {
      this.dom.resultsHeadline.textContent = "Challenge Completed! 💡";
    }

    // 4. Update Trophy Showcase
    this.dom.trophyShowcase.className = `trophy-showcase ${prize.badgeTheme}`;
    this.dom.trophyIcon.textContent = prize.icon;
    this.dom.trophyRank.textContent = prize.rank;
    this.dom.trophyName.textContent = prize.title;
    this.dom.trophyDesc.textContent = prize.description;
    this.dom.trophyPerk.textContent = prize.perk;

    // Physical appreciation gift display
    if (this.dom.physicalGiftTitle && prize.physicalGift) {
      this.dom.physicalGiftTitle.textContent = prize.physicalGift;
    }
    if (this.dom.physicalGiftDetail && prize.giftDetail) {
      this.dom.physicalGiftDetail.textContent = prize.giftDetail;
    }

    // 5. Update Stats
    this.dom.statScore.textContent = `${this.score} / ${this.totalQuestions}`;
    const percent = Math.round((this.score / this.totalQuestions) * 100);
    this.dom.statScorePercent.textContent = `${percent}% Accuracy`;

    const formattedTime = this.formatTime(this.elapsedSeconds);
    this.dom.statTime.textContent = formattedTime;
    this.dom.statSpeedLabel.textContent = speedRating.label;
    this.dom.statSpeedSummary.textContent = speedRating.label;
    this.dom.statSpeedComment.textContent = speedRating.comment;

    // 6. Fireworks & Audio Celebrations
    if (this.score === this.totalQuestions) {
      // 100% Score -> Grand Fireworks Extravaganza
      if (window.fireworks) {
        window.fireworks.startCelebration(5500);
      }
      this.sound.playFanfare();
    } else if (this.score >= 1) {
      // Runner up burst
      if (window.fireworks) {
        window.fireworks.burst(window.innerWidth / 2, window.innerHeight * 0.35, 90);
      }
      this.sound.playCorrect();
    }
  }

  /* ==========================================================================
     SHARE / COPY SCORE CARD
     ========================================================================== */
  copyScoreCard() {
    const prize = PRIZE_TIERS[this.score] || PRIZE_TIERS[0];
    const speedRating = SPEED_RATINGS.find(r => this.elapsedSeconds <= r.maxSeconds) || SPEED_RATINGS[SPEED_RATINGS.length - 1];
    const timeStr = this.formatTime(this.elapsedSeconds);
    const percent = Math.round((this.score / this.totalQuestions) * 100);

    const shareText = 
`⚡ WOMEN IN TECH QUIZ @ EPICENTER HELSINKI 🇫🇮
${prize.icon} Award: ${prize.title} (${prize.rank})
🎁 Event Gift: ${prize.physicalGift}
📊 Score: ${this.score}/${this.totalQuestions} (${percent}%)
⏱️ Time: ${timeStr} (${speedRating.label})
"${prize.bragText}"
Can you beat my time? Try the challenge here: ${window.location.href}`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareText).then(() => {
        this.showToast("Score card copied to clipboard! 📋");
      }).catch(() => {
        this.fallbackCopy(shareText);
      });
    } else {
      this.fallbackCopy(shareText);
    }
  }

  fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      this.showToast("Score card copied to clipboard! 📋");
    } catch (err) {
      this.showToast("Unable to copy automatically.");
    }
    document.body.removeChild(textarea);
  }

  showToast(message) {
    if (!this.dom.toastNotice) return;
    this.dom.toastMessage.textContent = message;
    this.dom.toastNotice.classList.add('show');
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.dom.toastNotice.classList.remove('show');
    }, 2800);
  }
}

// Instantiate on DOM load
window.addEventListener('DOMContentLoaded', () => {
  window.app = new QuizApp();
});
