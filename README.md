# CIPHER
### Cardiovascular Intelligence for Predictive Health and Early Risk Analysis
> Built in 24 hours. Designed for the 48 million Nigerians who don't know their blood pressure is killing them.

---

## The Problem

Nigeria is sitting on a cardiovascular time bomb. An estimated **1 in 3 Nigerian adults** lives with hypertension — most of them unaware. Hypertension is silent. It doesn't hurt. It doesn't announce itself. It just builds quietly until a stroke, a heart failure, a life cut short.

Existing health apps were built for someone else — a Western user with a Fitbit, a GP on speed dial, and a diet that doesn't include egusi or stockfish. They track. They log. They remind. But they don't understand the person using them.

**The result:** data gets collected, nothing changes, and the silent killer keeps winning.

---

## The Solution

CIPHER is a proactive cardiovascular health partner built specifically for the Nigerian context. It doesn't just collect blood pressure readings — it interprets them, contextualizes them, and turns them into a personal narrative that drives real behavior change.

---

## Core Features

### 🫀 Health Mirror
LLM-generated personal narrative after every BP entry. Culturally grounded, plain language, actionable. Instead of *"reduce sodium intake"*, CIPHER says *"cutting down on your Maggi and smoked fish by half could meaningfully shift your risk trajectory over the next 12 months."*

### 🔴 Risk Dial
A single, animated color-coded indicator (green → yellow → red) derived from BP trend, age, and lifestyle inputs. Replaces meaningless percentages with immediate visual clarity.

### 📈 BP Timeline
A running chart of readings over time. Watching your own trend move is one of the most powerful behavioral nudges that exists.

### 🤝 Tremor Sentinel
Passive accelerometer monitoring via the DeviceMotion API. Variance thresholding triggers a contextual, non-alarming overlay when unusual hand movement is detected — a real clinical signal linked to hypertension-related neurological changes.

### 🎙️ CIPHER Voice
A floating orb interface powered by Web Speech API for speech-to-text and text-to-speech, with LLM-powered conversation. Two modes:
- **Ghost** — supportive, when you're struggling
- **Optimal** — motivational, when you're on track

### 📄 Shareable Health Report
One-click exportable summary of readings and narrative for clinic visits. Bridges the app and the doctor's office.

---

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React, Recharts, Web Speech API, DeviceMotion API, CSS Animations |
| **Backend** | Node.js, Express, SQLite |
| **AI** | Claude API · Prompt engineering · Nigerian foods JSON dataset |
| **Other** | No proprietary libraries · No paid third-party services beyond LLM API |

---

## Getting Started
```bash
# Clone the repository
git clone https://github.com/your-username/cipher.git
cd cipher

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your Claude/OpenAI API key to .env

# Run the development server
npm run dev
```

---

## Why CIPHER Stands Out

Most health apps are mirrors that show you where you've been. CIPHER is a window that shows you where you're going — and speaks to you in a voice that actually sounds like it knows you.

- **Tremor detection** → passive intelligence
- **Health narrative** → cultural intelligence  
- **Voice companion** → emotional intelligence

No single app in this category combines all three. None were built with a Nigerian user as the primary human in the room.

---

## Team NEXA

| Member | Role |
|--------|------|
| **DX** | Architecture, tremor & voice systems, pitch strategy |
| **Beejay** | UI/UX design, frontend experience, visual system |
| **Praise** | Backend engineering, LLM integration, full-stack wiring |

---

## License

MIT License — see [LICENSE](LICENSE) for details.