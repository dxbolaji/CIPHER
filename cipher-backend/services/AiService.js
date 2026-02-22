const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

/**
 * Generates a personal health narrative after a BP reading
 */
const generateHealthNarrative = async ({ systolic, diastolic, riskLevel, user, recentReadings }) => {
  const trend = recentReadings && recentReadings.length > 1
    ? recentReadings.slice(0, 5).map(r => `${r.systolic}/${r.diastolic}`).join(' → ')
    : 'First reading';

  const prompt = `You are CIPHER, a compassionate cardiovascular health assistant built specifically for Nigerians.

A user just logged their blood pressure reading. Write a short, warm, plain-language health narrative (3-5 sentences max) about what this reading means for them. Be specific, grounded in Nigerian food culture, and actionable. Do NOT be clinical or scary.

USER PROFILE:
- Name: ${user.name}
- Age: ${user.age}
- Smoker: ${user.smoker ? 'Yes' : 'No'}
- Diabetic: ${user.diabetic ? 'Yes' : 'No'}
- Exercise: ${user.exerciseFrequency}

CURRENT READING: ${systolic}/${diastolic} mmHg
RISK LEVEL: ${riskLevel}
RECENT TREND: ${trend}

Write the narrative directly. No greetings, no titles. Speak to ${user.name} directly. 
If risk is 'normal': be encouraging, mention what they're doing right.
If risk is 'elevated' or 'high': give 1-2 specific Nigerian food-based tips they can act on TODAY.
If risk is 'crisis': calmly but firmly advise them to see a doctor today.`;

  const response = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 300,
    messages: [{ role: 'user', content: prompt }],
  });

  return response.content[0].text;
};

/**
 * Handles voice companion chat
 */
const handleChat = async ({ message, mode, conversationHistory }) => {
  const systemPrompt = mode === 'ghost'
    ? `You are CIPHER in Ghost mode — a calm, supportive health companion for someone who is struggling. 
       You're warm, never judgmental, never alarming. Listen first, then gently guide.
       Keep responses short (2-4 sentences). You understand Nigerian context and culture.`
    : `You are CIPHER in Optimal mode — an energetic, motivational health companion for someone who is on track.
       You're encouraging, celebratory, and forward-looking. Keep responses punchy and uplifting (2-3 sentences).
       You understand Nigerian context and culture.`;

  const messages = [
    ...(conversationHistory || []),
    { role: 'user', content: message }
  ];

  const response = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 200,
    system: systemPrompt,
    messages,
  });

  return response.content[0].text;
};

module.exports = { generateHealthNarrative, handleChat };