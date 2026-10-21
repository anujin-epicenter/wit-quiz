/**
 * QUIZ CONFIGURATION: Women in Tech @ Epicenter Helsinki
 * 
 * Celebrate groundbreaking women in technology, Finnish pioneers, 
 * and the vibrant innovation community at Epicenter Helsinki.
 */

const QUIZ_QUESTIONS = [
  {
    category: "✨ Question 1 • Community Vibe",
    question: "What do you think makes a great professional community?",
    options: [
      "Meeting interesting people",
      "Sharing ideas",
      "Finding opportunities",
      "All of the above"
    ],
    correctIndex: 3,
    explanation: "All of the above! A great community connects brilliant people, sparks bold ideas, and opens doors to real opportunities—exactly what happens every day at Epicenter!"
  },
  {
    category: "🚀 Question 2 • Epicenter Energy",
    question: "What would you come to Epicenter for?",
    options: [
      "Networking",
      "Inspiration",
      "Collaboration",
      "All of the above"
    ],
    correctIndex: 3,
    explanation: "All of the above! Whether you're here to expand your network, get inspired by fellow founders, or collaborate on innovative projects, Epicenter brings it all together."
  },
  {
    category: "🌍 Question 3 • Innovation Footprint",
    question: "Guess how many cities Epicenter is in!",
    options: [
      "2",
      "4",
      "6",
      "10"
    ],
    correctIndex: 1,
    explanation: "Epicenter is in 4 vibrant cities: Helsinki, Amsterdam, Oslo, and Stockholm!"
  }
];

/**
 * TIERED PRIZE / TROPHY CONFIGURATION: Epicenter Helsinki Edition
 * Different prizes awarded depending on final score: 3 (100%), 2, 1, or 0.
 */
const PRIZE_TIERS = {
  3: {
    tier: "Tier 1: 100% Mastery",
    rank: "Rank S • Pure Tech Royalty 💅",
    title: "Epicenter Grand WIT Legend Trophy",
    icon: "🏆",
    badgeTheme: "badge-gold",
    glowColor: "rgba(255, 215, 0, 0.55)",
    description: "Flawless victory! You crushed every single question with unmatched wit and lightning instincts. You officially own the room and the Epicenter Hall of Fame!",
    perk: "Unlocked: Tech Royalty Status & Infinite Bragging Rights ⚡",
    bragText: "🏆 Just scored 100% on the Women in Tech Quiz at Epicenter Helsinki! Unstoppable tech royalty status. Can you beat my time?"
  },
  2: {
    tier: "Tier 2: 66% Mastery",
    rank: "Rank A • Big Brain Energy 🧠",
    title: "High-Key Innovator Badge",
    icon: "🥈",
    badgeTheme: "badge-silver",
    glowColor: "rgba(192, 192, 210, 0.45)",
    description: "2 out of 3 in the bag! You’re clearly in the know and bringing serious innovation energy to Epicenter today. So close to perfection!",
    perk: "Unlocked: VIP Disruptor Distinction ✨",
    bragText: "🥈 Scored 2/3 with Big Brain Energy on the Epicenter Women in Tech Quiz!"
  },
  1: {
    tier: "Tier 3: 33% Mastery",
    rank: "Rank B • Fearless Rebel 🚀",
    title: "Rising Disruptor Medal",
    icon: "🥉",
    badgeTheme: "badge-bronze",
    glowColor: "rgba(205, 127, 50, 0.45)",
    description: "You took on the clock with zero hesitation! You landed on the board, and with one quick rematch, that gold trophy is yours.",
    perk: "Unlocked: Certified Tech Rebel 💥",
    bragText: "🥉 Rocking the Rising Disruptor medal from the Epicenter Women in Tech Quiz!"
  },
  0: {
    tier: "Tier 4: Pure Vibes",
    rank: "Rank C • Chaotic & Thriving 🥐",
    title: "Chief Vibe Officer Ribbon",
    icon: "☕",
    badgeTheme: "badge-blue",
    glowColor: "rgba(56, 189, 248, 0.45)",
    description: "Living on the edge! You’re here for the epic networking, good coffee, and immaculate event vibes. Grab a drink and run it back!",
    perk: "Unlocked: Unlimited Free Retries & VIP Vibe Pass 🎟️",
    bragText: "☕ Playing for the immaculate vibes at the Epicenter Women in Tech event! Taking another shot."
  }
};

/**
 * SPEED RATINGS
 * Evaluates completion time to reward fast thinkers
 */
const SPEED_RATINGS = [
  {
    maxSeconds: 18,
    label: "⚡ Hyperdrive Reflexes",
    badgeClass: "speed-blazing",
    comment: "Under 18 seconds?! Synapses moving faster than Slush founder speed!"
  },
  {
    maxSeconds: 35,
    label: "🚀 Smooth Operator",
    badgeClass: "speed-fast",
    comment: "Swift, sharp, and confident under pressure. Pure swagger!"
  },
  {
    maxSeconds: 60,
    label: "🧠 Zen Master",
    badgeClass: "speed-steady",
    comment: "Cool, calm, and calculating every move like a seasoned founder."
  },
  {
    maxSeconds: Infinity,
    label: "🧘 Sipping Champagne & Taking Notes",
    badgeClass: "speed-calm",
    comment: "Quality over rush! A true visionary takes her time to appreciate the journey."
  }
];
