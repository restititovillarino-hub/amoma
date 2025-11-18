export default function Features() {
  const features = [
    {
      icon: '💬',
      title: 'AI Wellness Chat',
      description: 'Talk to AMOMA, your 24/7 AI wellness companion. Get instant support for stress, anxiety, exercise guidance, nutrition advice, and mental health resources.',
      features: ['Evidence-based responses', 'Crisis intervention support', 'Culturally-sensitive advice']
    },
    {
      icon: '📊',
      title: 'Mental Health Assessments',
      description: 'Track your mental health with validated tools: DASS-21 for depression, anxiety, and stress; PERMA for overall well-being.',
      features: ['Clinically validated tools', 'Weekly progress tracking', 'Visual trend dashboard']
    },
    {
      icon: '🏃',
      title: 'Physical Health Monitoring',
      description: 'Monitor physical activity levels, nutrition habits, and sleep quality with personalized recommendations.',
      features: ['Activity tracking', 'Nutrition guidance', 'Sleep hygiene tips']
    },
    {
      icon: '📝',
      title: 'Reflective Journaling',
      description: 'Guided journaling prompts with AI-powered thematic analysis to understand your emotional patterns and progress over time.',
      features: ['Mood tracking', 'Pattern recognition', 'Insight generation']
    },
    {
      icon: '🎮',
      title: 'Wellness Games',
      description: 'Engage with evidence-based therapeutic games designed to reduce stress and improve mental well-being.',
      features: ['Breathing exercises', 'Gratitude practices', 'CBT-based activities']
    },
    {
      icon: '🔒',
      title: 'Privacy & Security',
      description: 'Your data is encrypted and secure. We never share your personal information. Full GDPR and data privacy compliance.',
      features: ['End-to-end encryption', 'Anonymous research data', 'You own your data']
    }
  ];

  return (
    <div className="min-h-screen gradient-green py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AMOMA Features</h1>
          <p className="text-xl text-gray-700">Comprehensive wellness support designed specifically for Filipino college students</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-700 mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.features.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-emerald-600">✓</span>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="card mt-12 bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📚 Evidence-Based Approach</h2>
          <p className="text-gray-700 leading-relaxed">
            AMOMA is grounded in scientific research and clinical best practices. Our interventions are based on:
          </p>
          <ul className="mt-4 grid md:grid-cols-2 gap-3">
            {['WHO Mental Health Guidelines', 'ACSM Exercise Recommendations', 'CBT & ACT Therapeutic Techniques', 'Lifestyle Medicine Principles'].map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
