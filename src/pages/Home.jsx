import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-green py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            {/* THREE IMAGES IN CIRCLES */}
            <div className="flex justify-center items-center gap-6 mb-8">
              <img 
                src="/images/developer_logo.jpg" 
                alt="Dr. Resti"
                className="w-20 h-20 rounded-full object-cover border-4 border-emerald-600 shadow-xl"
                onError={(e) => e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><circle cx="40" cy="40" r="40" fill="%2310b981"/><text x="40" y="50" text-anchor="middle" fill="white" font-size="24" font-weight="bold">DR</text></svg>'}
              />
              <img 
                src="/images/amoma-bot-logo.png" 
                alt="AMOMA Bot"
                className="w-24 h-24 rounded-full object-cover border-4 border-emerald-500 shadow-xl"
                onError={(e) => e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><circle cx="48" cy="48" r="48" fill="%2310b981"/><text x="48" y="60" text-anchor="middle" fill="white" font-size="32" font-weight="bold">A</text></svg>'}
              />
              <img 
                src="/images/developer2_logo.jpg" 
                alt="Maureen"
                className="w-20 h-20 rounded-full object-cover border-4 border-orange-500 shadow-xl"
                onError={(e) => e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><circle cx="40" cy="40" r="40" fill="%23f97316"/><text x="40" y="50" text-anchor="middle" fill="white" font-size="24" font-weight="bold">MV</text></svg>'}
              />
            </div>
            
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              <span className="gradient-text text-6xl">A</span>daptive{' '}
              <span className="gradient-text text-6xl">M</span>ultidimensional{' '}
              <span className="gradient-text text-6xl">O</span>ptimization for{' '}
              <span className="gradient-text text-6xl">M</span>ental Health &{' '}
              <span className="gradient-text text-6xl">A</span>ctivity
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
              AI-enhanced physical and mental health platform for college students, 
              integrating DASS-21, PERMA well-being tracking, lifestyle assessments, 
              journal analytics, and an AI support chatbot with human clinician oversight.
            </p>
            
            {!user ? (
              <div className="flex gap-4 justify-center">
                <Link to="/signup" className="btn-primary px-8 py-4 text-lg">Get Started Free</Link>
                <Link to="/about" className="btn-secondary px-8 py-4 text-lg">Learn More</Link>
              </div>
            ) : (
              <Link to="/chat" className="btn-primary px-8 py-4 text-lg">💬 Chat with AMOMA</Link>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Students Choose AMOMA</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-xl font-bold mb-3">AI Wellness Support</h3>
              <p className="text-gray-600">24/7 empathetic AI trained in CBT, ACT, and mindfulness</p>
            </div>
            <div className="card text-center">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-3">Track Your Progress</h3>
              <p className="text-gray-600">Monitor your physical health (physical activity levels, nutrition, and sleep quality), mental health (DASS-21), and well-being (PERMA)</p>
            </div>
            <div className="card text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-3">Wellness Games</h3>
              <p className="text-gray-600">Evidence-based therapeutic games that reduce stress</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-green-700 py-20 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Wellness Journey?</h2>
          <p className="text-xl mb-8">Join college students worldwide using AMOMA to improve their mental and physical health</p>
          {!user && (
            <Link to="/signup" className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors inline-block shadow-lg">
              Sign Up Now - It's Free
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
