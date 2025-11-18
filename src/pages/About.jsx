import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen gradient-green py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About AMOMA</h1>
        
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            <strong className="gradient-text">AMOMA</strong> is an AI-powered wellness platform designed specifically for Filipino college students worldwide. 
            We combine evidence-based health guidance with cutting-edge artificial intelligence to support your 
            physical and mental well-being throughout your academic journey.
          </p>
        </div>

        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Research Foundation</h2>
          <p className="text-gray-700 mb-4">AMOMA is built upon evidence-based approach that integrates:</p>
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-emerald-600 text-xl flex-shrink-0">✓</span>
              <p><strong>DASS-21:</strong> Validated assessment for depression, anxiety, and stress</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-emerald-600 text-xl flex-shrink-0">✓</span>
              <p><strong>PERMA Model:</strong> Comprehensive well-being framework (Positive emotions, Engagement, Relationships, Meaning, Accomplishment)</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-emerald-600 text-xl flex-shrink-0">✓</span>
              <p><strong>Cognitive Behavioral Therapy:</strong> Evidence-based therapeutic techniques</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-emerald-600 text-xl flex-shrink-0">✓</span>
              <p><strong>Lifestyle Medicine:</strong> Sleep hygiene, physical activity, nutrition science</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-emerald-600 text-xl flex-shrink-0">✓</span>
              <p><strong>Digital Health Interventions:</strong> AI-assisted wellness programs with clinical oversight</p>
            </div>
          </div>
        </div>

        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <span className="text-4xl flex-shrink-0">1️⃣</span>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Complete Assessments</h3>
                <p className="text-gray-600">Take validated DASS-21, PERMA, and physical health assessments</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-4xl flex-shrink-0">2️⃣</span>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Get Personalized Insights</h3>
                <p className="text-gray-600">Receive AI-powered analysis and evidence-based recommendations</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-4xl flex-shrink-0">3️⃣</span>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Track Your Progress</h3>
                <p className="text-gray-600">Monitor improvements with interactive dashboards and journal analytics</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link to="/signup" className="btn-primary px-8 py-4 text-lg">Start Your Journey</Link>
        </div>
      </div>
    </div>
  );
}
