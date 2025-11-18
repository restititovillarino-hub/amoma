const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export async function sendChatMessage(messages) {
  const systemPrompt = `You are AMOMA, a warm and empathetic AI wellness companion for college students. You provide evidence-based guidance using CBT, mindfulness, and lifestyle medicine.

CRITICAL FORMATTING RULES:
- NEVER use asterisks (**) for bold text
- NEVER use markdown formatting
- Use plain text only
- Use numbered lists with actual numbers (1., 2., 3.)
- Use bullet points with simple dashes (-)

RESPONSE STYLE:
- Be warm, empathetic, and conversational
- Use simple language, avoid medical jargon
- Give practical, actionable advice
- Validate feelings before offering solutions
- Keep responses under 200 words

TOPICS YOU HELP WITH:
- Stress, anxiety, depression
- Sleep problems
- Study strategies and focus
- Exercise and nutrition
- Relationships

IMPORTANT:
- Start with empathy and validation
- If serious crisis, recommend NCMH hotline: 1553
- You're supportive but not a replacement for therapy`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) throw new Error('API request failed');
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    const lastMessage = messages[messages.length - 1].content.toLowerCase();
    
    if (lastMessage.includes('sad') || lastMessage.includes('depressed')) {
      return `I hear that you're feeling down, and I want you to know those feelings are completely valid. It takes courage to share that.

Here are some things that might help right now:

1. Reach out to someone you trust - a friend, family member, or counselor
2. Try a 10-minute walk outside - movement and fresh air can help lift mood
3. Do one small thing you enjoy today, even if it's just listening to music
4. Practice self-compassion - be as kind to yourself as you would to a friend

If these feelings have been lasting more than 2 weeks, I really encourage you to talk with a counselor. The NCMH Crisis Hotline (1553) is available 24/7 if you need immediate support.

What's one small thing you could do for yourself today?`;
    }
    
    if (lastMessage.includes('stress') || lastMessage.includes('anxious') || lastMessage.includes('overwhelm')) {
      return `I understand you're feeling stressed. Let's work on bringing that stress level down together.

Quick relief (try right now):
1. Take 5 deep breaths - breathe in for 4 seconds, hold for 4, breathe out for 6
2. Close your eyes and rest for 60 seconds
3. Drink a glass of water - dehydration affects mood
4. Step outside for 2 minutes if you can

For managing stress ongoing:
- Break tasks into smaller, manageable steps
- Prioritize - what's truly urgent vs what can wait?
- Take 5-minute breaks every hour when studying
- Talk to someone about how you're feeling

What's the main thing stressing you right now? Let's break it down together.`;
    }

    if (lastMessage.includes('sleep') || lastMessage.includes('insomnia') || lastMessage.includes('tired')) {
      return `Sleep issues can really affect everything. Let's work on improving your sleep quality.

Tonight, try these:
1. No screens 30 minutes before bed
2. Keep your room cool and dark
3. Try deep breathing while lying in bed
4. Go to bed at the same time each night

Build better sleep habits:
- Wake up at the same time daily (yes, even weekends)
- Get morning sunlight exposure
- Avoid caffeine after 2pm
- Exercise during the day, not before bed

How many hours are you currently sleeping? Let's set a realistic sleep goal together.`;
    }

    if (lastMessage.includes('focus') || lastMessage.includes('concentrate') || lastMessage.includes('distracted')) {
      return `Difficulty focusing is really common, especially when stressed. Let's tackle this together.

Immediate strategies:
1. Remove all distractions - phone away, close extra browser tabs
2. Try Pomodoro Technique: 25 minutes focused work, 5 minute break
3. Start with the easiest task to build momentum
4. Focus on just one thing at a time

Check these factors affecting focus:
- Sleep: Are you getting 7-9 hours?
- Nutrition: Did you eat recently?
- Environment: Is your study space comfortable and quiet?
- Stress: High anxiety directly impacts concentration

What are you trying to focus on right now? I'm here to help.`;
    }

    return `I'm here to support you. I want to help, so could you tell me more about what you're experiencing?

Whether it's:
- Stress or anxiety
- Sleep problems
- Difficulty concentrating
- Relationship issues
- Physical health concerns
- Or anything else on your mind

I'm here to listen and provide evidence-based guidance. What would be most helpful to discuss?`;
  }
}
