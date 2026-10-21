# ⚡ Women in Tech Quiz — Epicenter Helsinki Edition

A vibrant, modern, static trivia quiz celebrating trailblazing women in technology and Nordic innovation at **Epicenter Helsinki**. Featuring a real-time precision stopwatch, dynamic canvas fireworks, and tiered awards for bragging rights.

Built with **pure HTML5, CSS3, and JavaScript** — zero build steps, zero npm dependencies, and 100% ready to host for free on **GitHub Pages**.

![Women in Tech Quiz](https://img.shields.io/badge/Theme-Women%20In%20Tech%20%40%20Epicenter%20Helsinki-ff0080?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Complete-00f59b?style=for-the-badge)
![Deployment](https://img.shields.io/badge/Host-GitHub%20Pages-00f2fe?style=for-the-badge)

---

## 🌟 Key Features

- **⏱️ Real-time Precision Stopwatch**: Measures total duration down to tenths of a second (`MM:SS.s`) to test how fast players can finish.
- **🎆 Particle Canvas Fireworks**:
  - Localized firework bursts erupt whenever a player selects the correct answer.
  - Grand celebratory fireworks storm and fanfare when achieving a perfect **100% score (3/3)**!
- **🏆 Tiered Epicenter Helsinki Awards**:
  - **Tier 1 (3/3 - 100%)**: 🏆 **Epicenter Grand WIT Champion Trophy** (*Legendary Rank S*)
  - **Tier 2 (2/3 - 66%)**: 🥈 **Silver Code Virtuoso Badge** (*Helsinki Rising Star Rank A*)
  - **Tier 3 (1/3 - 33%)**: 🥉 **Bronze Tech Cadet Medal** (*Nordic Challenger Rank B*)
  - **Tier 4 (0/3 - 0%)**: 💡 **Apprentice Innovator Ribbon** (*Curious Trailblazer Rank C with free retry*)
- **⚡ Speed Rating Accolades**: Rewards fast reflexes (*⚡ Supersonic Speed*, *🚀 Rapid Fire*, *🎯 Sharp & Steady*).
- **🔊 Synthesized Web Audio**: Built-in sound effects (correct chimes, fanfare, wrong buzz) powered by the browser's Web Audio API — **no external audio files required**!
- **📋 One-Click Share / Copy**: Players can copy a formatted scorecard text to share in Slack, Discord, Twitter, or WhatsApp.
- **📱 Fully Responsive & Glassmorphism Design**: Looks beautiful on phones, tablets, and high-resolution desktop screens.

---

## 🚀 Quick Start (Testing Locally)

Because this project is completely static, you **do not need Node.js, npm, or any server** installed!

### Option 1: Double-Click (Easiest)
1. Open your file manager (`Finder` on Mac).
2. Navigate to this folder (`wit-quiz`).
3. Double-click **`index.html`** to open it in Chrome, Safari, Firefox, or Edge.

### Option 2: Using Any Local Web Server (Optional)
If you have Python installed or VS Code Live Server:
```bash
# In your terminal inside this folder:
python3 -m http.server 8000
# Then open http://localhost:8000 in your browser
```

---

## 🎥 On-Camera Filming & Interview Guide (Make It Fun & Natural!)

When filming attendees at the Women in Tech event with your phone or tablet:

1. **The Hook / Icebreaker**:  
   > *“Quick question! We're at Women in Tech with Epicenter — want to try a super-quick quiz?”*
2. **Permission to Guess**:  
   > *“No pressure, just go with your gut!”*
3. **Keep Options Visible**:  
   Show the phone screen with the large choice buttons directly to the camera or attendee so they can tap their answer.
4. **React Naturally**:  
   > *“Exactly!”* or *“Good guess!”* — keep the vibe upbeat, light, and encouraging.
5. **The 1-Sentence Reveal**:  
   After they answer, share what Epicenter does based on the card explanation:
   - *Community*: “Epicenter is where meeting people, sharing ideas, and finding opportunities happen under one roof!”
   - *Experience*: “It's built for networking, inspiration, and hands-on collaboration.”
   - *Cities*: “Epicenter is across 4 major innovation cities: Helsinki, Amsterdam, Oslo, and Stockholm!”

---

## 🛠️ How to Customize Questions & Prizes

Everything you want to configure is located in one clean file: **`js/questions.js`**.

### 1. Adding or Editing Questions
Open `js/questions.js` and look at `QUIZ_QUESTIONS`:
```javascript
{
  category: "Pioneering Minds 🧠",
  question: "Who wrote the world's very first computer algorithm?",
  options: [
    "Ada Lovelace",
    "Alan Turing",
    "Grace Hopper",
    "Margaret Hamilton"
  ],
  correctIndex: 0, // 0 = first option, 1 = second, etc.
  explanation: "Ada Lovelace published the first algorithm in 1843!"
}
```
You can change the question text, answers, and explanation in plain English.

### 2. Customizing Prizes & Trophies
Look at `PRIZE_TIERS` in `js/questions.js`:
```javascript
3: {
  tier: "Tier 1: 100% Mastery",
  rank: "Rank S • Legendary",
  title: "Grand Champion Gold Trophy",
  icon: "🏆",
  description: "Flawless victory! You answered all 3 questions...",
  perk: "Unlocked: Bragging Rights & Hall of Fame Induction",
  bragText: "🏆 I just achieved a 100% Flawless Score on the Wit Quiz!"
}
```
You can change the trophy name, emoji icon, description, or paste custom reward codes/links here!

---

## 🌐 How to Host on GitHub Pages (Step-by-Step)

Follow these simple steps to put your quiz online for free:

### Step 1: Create a Repository on GitHub
1. Go to [github.com/new](https://github.com/new).
2. Enter a repository name (e.g. `wit-quiz`).
3. Set visibility to **Public**.
4. Leave "Add a README file" unchecked (we already made one for you!).
5. Click **Create repository**.

### Step 2: Push your code with Git
Open your Terminal on your Mac and run these commands:

> **Note on macOS**: If macOS shows a popup saying *"The 'git' command requires the command line developer tools"*, click **Install** and let it finish (it takes ~2 minutes).

```bash
# 1. Initialize git in this directory
git init

# 2. Add all files
git add .

# 3. Create your first commit
git commit -m "Initial commit: Epicenter Women in Tech Quiz"

# 4. Rename main branch
git branch -M main

# 5. Connect to your GitHub repository:
git remote add origin https://github.com/anujin-epicenter/wit-quiz.git

# 6. Push to GitHub
git push -u origin main
```

### Step 3: Turn on GitHub Pages (3 Clicks!)
1. In your GitHub repository [github.com/anujin-epicenter/wit-quiz](https://github.com/anujin-epicenter/wit-quiz), click on **Settings** (gear icon near top right).
2. In the left sidebar, click on **Pages** (under the "Code and automation" section).
3. Under **Build and deployment > Branch**, select **`main`** from the dropdown menu and leave the folder as **`/(root)`**.
4. Click **Save**.
5. Wait ~60 seconds. Refresh the page, and your live URL will be active:
   ```
   https://anujin-epicenter.github.io/wit-quiz/
   ```
6. Share the link with friends, coworkers, or on social media!

---

## 📁 Project File Structure

```
wit-quiz/
├── index.html          # Main HTML document & accessible screen containers
├── css/
│   └── style.css       # Complete CSS design system (glassmorphism & animations)
├── js/
│   ├── questions.js    # Easy-to-edit questions, answers & prize tiers
│   ├── fireworks.js    # Canvas particle fireworks physics engine
│   └── app.js          # Stopwatch timer, Web Audio synthesizer & state controller
├── .gitignore          # Ignores system files
└── README.md           # This documentation
```

---

## 📄 License
This project is open source and available under the [MIT License](https://opensource.org/licenses/MIT).
