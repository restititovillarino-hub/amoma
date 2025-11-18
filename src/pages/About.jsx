import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-5xl font-bold text-gray-900 mb-8 text-center">About AMOMA</h1>
        
        <div className="bg-white rounded-2xl p-8 shadow-xl mb-8 border-2 border-emerald-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-emerald-700">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            <strong className="text-emerald-600">AMOMA</strong> is an AI-enhanced wellness platform designed specifically for college students worldwide. 
            We combine evidence-based health guidance with cutting-edge artificial intelligence to support your 
            physical and mental well-being throughout your academic journey.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-xl mb-8 border-2 border-emerald-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-emerald-700">Research Foundation</h2>
          <p className="text-gray-700 mb-6 text-lg">AMOMA is built upon rigorous scientific research, integrating:</p>
          <div className="space-y-4 text-gray-700">
            <div className="flex items-start gap-4 bg-emerald-50 p-4 rounded-xl">
              <span className="text-emerald-600 text-2xl flex-shrink-0 font-bold">✓</span>
              <p className="leading-relaxed"><strong>DASS-21:</strong> Depression, Anxiety and Stress Scale - a validated 21-item assessment tool widely used in clinical and research settings to measure emotional states (Lovibond & Lovibond, 1995).</p>
            </div>
            <div className="flex items-start gap-4 bg-blue-50 p-4 rounded-xl">
              <span className="text-blue-600 text-2xl flex-shrink-0 font-bold">✓</span>
              <p className="leading-relaxed"><strong>PERMA Model:</strong> Seligman's (2011) comprehensive well-being framework assessing Positive emotions, Engagement, Relationships, Meaning, and Accomplishment.</p>
            </div>
            <div className="flex items-start gap-4 bg-purple-50 p-4 rounded-xl">
              <span className="text-purple-600 text-2xl flex-shrink-0 font-bold">✓</span>
              <p className="leading-relaxed"><strong>Cognitive Behavioral Therapy (CBT):</strong> Evidence-based therapeutic techniques proven effective for anxiety and depression (Beck, 2011).</p>
            </div>
            <div className="flex items-start gap-4 bg-green-50 p-4 rounded-xl">
              <span className="text-green-600 text-2xl flex-shrink-0 font-bold">✓</span>
              <p className="leading-relaxed"><strong>Lifestyle Medicine:</strong> Integrating physical activity, nutrition, and sleep science for holistic health (Rippe, 2019).</p>
            </div>
            <div className="flex items-start gap-4 bg-orange-50 p-4 rounded-xl">
              <span className="text-orange-600 text-2xl flex-shrink-0 font-bold">✓</span>
              <p className="leading-relaxed"><strong>Digital Health Interventions:</strong> AI-assisted wellness programs with clinical oversight, following best practices in e-mental health (Torous et al., 2020).</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-xl mb-8 border-2 border-emerald-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-emerald-700">How AMOMA Works</h2>
          <div className="space-y-6">
            <div className="flex gap-6 items-start">
              <span className="text-5xl flex-shrink-0">1️⃣</span>
              <div>
                <h3 className="font-bold text-xl text-gray-900 mb-2">Complete Validated Assessments</h3>
                <p className="text-gray-700 leading-relaxed">Take scientifically validated DASS-21, PERMA, and physical health assessments to establish your wellness baseline.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <span className="text-5xl flex-shrink-0">2️⃣</span>
              <div>
                <h3 className="font-bold text-xl text-gray-900 mb-2">Receive Evidence-Based Insights</h3>
                <p className="text-gray-700 leading-relaxed">Get AI-powered analysis anchored in peer-reviewed research and clinical best practices.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <span className="text-5xl flex-shrink-0">3️⃣</span>
              <div>
                <h3 className="font-bold text-xl text-gray-900 mb-2">Track & Improve Your Well-Being</h3>
                <p className="text-gray-700 leading-relaxed">Monitor progress through interactive dashboards, journal analytics, and therapeutic games.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-600 to-green-700 rounded-2xl p-8 shadow-xl text-white text-center">
          <h3 className="text-2xl font-bold mb-3">Important Disclaimer</h3>
          <p className="text-emerald-50 leading-relaxed mb-4">
            AMOMA is an educational wellness tool and is <strong>not a substitute for professional medical or mental health care</strong>. 
            If you are experiencing a medical emergency, please contact emergency services (dial 911) or the NCMH Crisis Hotline at 1553 immediately.
          </p>
        </div>

        <div className="text-center mt-10">
          <Link to="/signup" className="bg-gradient-to-r from-emerald-600 to-green-700 text-white px-10 py-4 rounded-xl font-bold text-lg hover:from-emerald-700 hover:to-green-800 transition-all shadow-xl inline-block">
            Start Your Wellness Journey
          </Link>
        </div>
      </div>
    </div>
  );
}
