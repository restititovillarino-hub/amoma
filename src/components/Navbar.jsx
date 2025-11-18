import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [showDevelopers, setShowDevelopers] = useState(false);

  return (
    <>
      <nav className="bg-white border-b-2 border-emerald-100 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between gap-8">
            {/* Logo Section */}
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity flex-shrink-0">
              <img 
                src="/images/amoma-bot-logo.png" 
                alt="AMOMA"
                className="w-12 h-12 rounded-full border-2 border-emerald-500 shadow-lg"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><circle cx="24" cy="24" r="24" fill="%2310b981"/><text x="24" y="30" text-anchor="middle" fill="white" font-size="18" font-weight="bold">A</text></svg>';
                }}
              />
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent whitespace-nowrap">
                AMOMA
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-4 flex-wrap">
              {!user && (
                <>
                  <Link to="/" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors text-sm whitespace-nowrap">
                    Home
                  </Link>
                  <Link to="/about" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors text-sm whitespace-nowrap">
                    About
                  </Link>
                  <Link to="/features" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors text-sm whitespace-nowrap">
                    Features
                  </Link>
                  <Link to="/resources" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors text-sm whitespace-nowrap">
                    Resources
                  </Link>
                  <Link to="/login" className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors text-sm whitespace-nowrap">
                    Login
                  </Link>
                  <Link to="/signup" className="bg-gradient-to-r from-emerald-600 to-green-700 text-white px-5 py-2 rounded-lg font-semibold text-sm hover:from-emerald-700 hover:to-green-800 transition-all shadow-lg whitespace-nowrap">
                    Sign Up
                  </Link>
                </>
              )}
              
              {user && (
                <>
                  <Link to="/dashboard" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors text-sm whitespace-nowrap">
                    📈 Dashboard
                  </Link>
                  <Link to="/chat" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors text-sm whitespace-nowrap">
                    💬 Chat
                  </Link>
                  <Link to="/assessments" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors text-sm whitespace-nowrap">
                    📊 Assessments
                  </Link>
                  <Link to="/journal" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors text-sm whitespace-nowrap">
                    📝 Journal
                  </Link>
                  <Link to="/games" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors text-sm whitespace-nowrap">
                    🎮 Games
                  </Link>
                  <button 
                    onClick={() => setShowDevelopers(true)}
                    className="text-gray-700 hover:text-emerald-600 font-medium transition-colors text-sm whitespace-nowrap"
                  >
                    �� Creators
                  </button>
                  <span className="text-gray-600 text-sm whitespace-nowrap">
                    Hi, <strong className="text-emerald-600">{user.displayName || user.email?.split('@')[0]}</strong>!
                  </span>
                  <button 
                    onClick={logout} 
                    className="bg-white text-emerald-600 px-4 py-2 rounded-lg font-semibold text-sm border-2 border-emerald-500 hover:bg-emerald-50 transition-all whitespace-nowrap"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Developers Modal */}
      {showDevelopers && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setShowDevelopers(false)}>
          <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto p-10" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-4xl font-bold text-gray-900">Platform Creators</h2>
              <button onClick={() => setShowDevelopers(false)} className="text-gray-500 hover:text-gray-700 text-4xl leading-none">&times;</button>
            </div>

            {/* Dr. Resti */}
            <div className="mb-12 pb-12 border-b-2 border-gray-200">
              <div className="flex gap-8 items-start">
                <img 
                  src="/images/resti_photo.jpg" 
                  alt="Dr. Resti Tito H. Villarino"
                  className="w-48 h-48 rounded-full object-cover border-4 border-emerald-600 flex-shrink-0 shadow-2xl"
                  onError={(e) => e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192"><circle cx="96" cy="96" r="96" fill="%2310b981"/><text x="96" y="116" text-anchor="middle" fill="white" font-size="56" font-weight="bold">RV</text></svg>'}
                />
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">Resti Tito H. Villarino, Dev.Ed.D, RN, LPT</h3>
                  <p className="text-gray-700 leading-relaxed mb-4 text-base">
                    Clinical Instructor at the West Visayas State University–College of Nursing and a Regular Member of the 
                    National Research Council of the Philippines (Medical Sciences Division). With over a decade of research, 
                    teaching, and clinical experience, his scholarship centers on mental health, well-being, digital health 
                    interventions, and climate-related psychosocial resilience.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4 text-base">
                    A recipient of the Canada ASEAN-SEED Research Scholarship and the SSHN Research Mobility Grant (France), 
                    Dr. Villarino has authored and reviewed numerous Scopus and Web of Science-indexed publications in 
                    collaboration with scholars from Canada, France, and Asia. His studies—particularly on AI-assisted wellness 
                    programs, DASS-21, and PERMA-based interventions, as well as the integration of mental health promotion in 
                    higher education—serve as the empirical foundation of AMOMA (Adaptive Multidimensional Optimization for 
                    Mental Health & Activity), an AI-enhanced life-saving platform that advances holistic student wellness and 
                    clinician-supported digital care.
                  </p>
                  <div className="flex gap-4 text-sm">
                    <a href="https://orcid.org/0000-0002-5752-1742" target="_blank" rel="noopener noreferrer" 
                       className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline">
                      ORCID
                    </a>
                    <span className="text-gray-400">|</span>
                    <span className="text-gray-600">Scopus: 57303977500</span>
                    <span className="text-gray-400">|</span>
                    <span className="text-gray-600">ResearcherID: ACU-3465-2022</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Maureen */}
            <div>
              <div className="flex gap-8 items-start">
                <img 
                  src="/images/mau_photo.jpg" 
                  alt="Maureen Lorence F. Villarino"
                  className="w-48 h-48 rounded-full object-cover border-4 border-orange-500 flex-shrink-0 shadow-2xl"
                  onError={(e) => e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192"><circle cx="96" cy="96" r="96" fill="%23f97316"/><text x="96" y="116" text-anchor="middle" fill="white" font-size="56" font-weight="bold">MV</text></svg>'}
                />
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">Maureen Lorence F. Villarino, MA.Ed, RN, LPT</h3>
                  <p className="text-gray-700 leading-relaxed text-base">
                    Registered Nurse and Licensed Professional Teacher with a background in health, science education, and 
                    well-being research. She is a Clinical Instructor at the West Visayas State University–College of Nursing 
                    and an Associate Member of the National Research Council of the Philippines (Medical Sciences Division). 
                    Her research work focuses on the intersection of health promotion and health education, serving as a 
                    co-researcher in government-funded projects such as the Online Well-Being Development Program for College 
                    Students during the COVID-19 Pandemic (DOST–NRCP NSTEP) and the Lifestyle Intervention using the Modified 
                    BASNEF Model in Hypertension Management (GAA-funded). As a co-developer of AMOMA (Adaptive Multidimensional 
                    Optimization for Mental Health & Activity), she contributes her expertise in health education and 
                    evidence-based behavioral interventions to create a holistic, AI-enhanced platform for improving students' 
                    mental well-being and resilience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
