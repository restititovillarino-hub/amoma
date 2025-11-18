import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            {/* THREE IMAGES IN CIRCLES */}
            <div className="flex justify-center items-center gap-8 mb-12">
              <img 
                src="/images/developer_logo.png" 
                alt="Dr. Resti Villarino"
                className="w-24 h-24 rounded-full object-cover border-4 border-emerald-600 shadow-2xl hover:scale-105 transition-transform"
                onError={(e) => e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><circle cx="48" cy="48" r="48" fill="%2310b981"/><text x="48" y="60" text-anchor="middle" fill="white" font-size="32" font-weight="bold">RV</text></svg>'}
              />
              <img 
                src="/images/amoma-bot-logo.png" 
                alt="AMOMA Bot"
                className="w-32 h-32 rounded-full object-cover border-4 border-emerald-500 shadow-2xl"
                onError={(e) => e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128"><circle cx="64" cy="64" r="64" fill="%2310b981"/><text x="64" y="80" text-anchor="middle" fill="white" font-size="40" font-weight="bold">A</text></svg>'}
              />
              <img 
                src="/images/developer2_logo.jpg" 
                alt="Maureen Villarino"
                className="w-24 h-24 rounded-full object-cover border-4 border-orange-500 shadow-2xl hover:scale-105 transition-transform"
                onError={(e) => e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><circle cx="48" cy="48" r="48" fill="%23f97316"/><text x="48" y="60" text-anchor="middle" fill="white" font-size="32" font-weight="bold">MV</text></svg>'}
              />
            </div>
            
            <h1 className="text-6xl font-bold text-gray-900 mb-3 tracking-tight">
              AMOMA
            </h1>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 leading-relaxed">
              <span className="font-bold text-emerald-600">A</span>daptive{' '}
              <span className="font-bold text-emerald-600">M</span>ultidimensional{' '}
              <span className="font-bold text-emerald-600">O</span>ptimization for{' '}
              <span className="font-bold text-emerald-600">M</span>ental Health &{' '}
              <span className="font-bold text-emerald-600">A</span>ctivity
            </h2>
            
            <p className="text-lg text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
              An AI-enhanced wellness platform for college students worldwide, integrating validated 
              mental health assessments (DASS-21, PERMA), lifestyle tracking, therapeutic games, 
              journal analytics, and an empathetic AI support chatbot grounded in evidence-based practice.
            </p>
            
            {!user ? (
              <div className="flex gap-4 justify-center">
                <Link to="/signup" className="bg-gradient-to-r from-emerald-600 to-green-700 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:from-emerald-700 hover:to-green-800 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105">
                  Get Started Free
                </Link>
                <Link to="/about" className="bg-white text-emerald-600 px-10 py-4 rounded-xl font-semibold text-lg border-2 border-emerald-600 hover:bg-emerald-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                  Learn More
                </Link>
              </div>
            ) : (
              <Link to="/chat" className="bg-gradient-to-r from-emerald-600 to-green-700 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:from-emerald-700 hover:to-green-800 transition-all shadow-xl inline-block">
                💬 Chat with AMOMA
              </Link>
            )}
            
            <p className="text-sm text-gray-600 mt-6">
              No credit card required • Takes 2 minutes • 100% Confidential
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Why Students Choose AMOMA</h2>
          <p className="text-center text-gray-600 mb-16 text-lg">Evidence-based tools for holistic wellness</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-emerald-100">
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">24/7 AI Wellness Companion</h3>
              <p className="text-gray-700 leading-relaxed">Empathetic AI trained in CBT, ACT, and mindfulness techniques, providing immediate support when you need it most.</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-blue-100">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Validated Assessments</h3>
              <p className="text-gray-700 leading-relaxed">Track mental health (DASS-21), well-being (PERMA), and physical health with clinically validated tools used by professionals worldwide.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-purple-100">
              <div className="text-5xl mb-4">🎮</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Therapeutic Games</h3>
              <p className="text-gray-700 leading-relaxed">Evidence-based wellness games designed by mental health professionals to reduce stress and build resilience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-700 py-20 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Wellness Journey?</h2>
          <p className="text-xl mb-8 text-emerald-50">Join thousands of college students worldwide using AMOMA to improve their mental and physical health</p>
          {!user && (
            <Link to="/signup" className="bg-white text-emerald-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all inline-block shadow-2xl hover:shadow-3xl transform hover:scale-105">
              Sign Up Now - It's Free
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
