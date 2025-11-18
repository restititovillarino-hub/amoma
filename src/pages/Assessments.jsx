import { Routes, Route, Link } from 'react-router-dom';
import DASS21Assessment from '../components/assessments/DASS21Assessment';
import PERMAAssessment from '../components/assessments/PERMAAssessment';
import PhysicalHealthAssessment from '../components/assessments/PhysicalHealthAssessment';

function AssessmentsHome() {
  return (
    <div className="min-h-screen gradient-green py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">Health Assessments</h1>
        <p className="text-center text-gray-700 mb-12">Take regular assessments to track your mental health and well-being journey</p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="card hover:shadow-xl transition-all">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">DASS-21</h2>
            <p className="text-gray-700 mb-4">Measures depression, anxiety, and stress levels over the past week</p>
            <ul className="text-sm text-gray-600 mb-4 space-y-1">
              <li>✓ 21 questions</li>
              <li>✓ Takes ~5-7 minutes</li>
              <li>✓ Validated assessment tool</li>
            </ul>
            <Link to="/assessments/dass21" className="btn-primary w-full block text-center">
              Start DASS-21
            </Link>
          </div>

          <div className="card hover:shadow-xl transition-all">
            <h2 className="text-2xl font-bold mb-4 text-cyan-600">PERMA Profiler</h2>
            <p className="text-gray-700 mb-4">Assesses five domains of positive well-being</p>
            <ul className="text-sm text-gray-600 mb-4 space-y-1">
              <li>✓ 15 questions</li>
              <li>✓ Takes ~3-5 minutes</li>
              <li>✓ Evidence-based framework</li>
            </ul>
            <Link to="/assessments/perma" className="btn-primary w-full block text-center">
              Start PERMA
            </Link>
          </div>

          <div className="card hover:shadow-xl transition-all md:col-span-2">
            <h2 className="text-2xl font-bold mb-4 text-emerald-600">Physical Health Assessment</h2>
            <p className="text-gray-700 mb-4">Track physical activity, nutrition, and sleep quality</p>
            <ul className="text-sm text-gray-600 mb-4 space-y-1">
              <li>✓ 12 questions</li>
              <li>✓ Takes ~3-4 minutes</li>
              <li>✓ Comprehensive lifestyle tracking</li>
            </ul>
            <Link to="/assessments/physical" className="btn-primary w-full block text-center">
              Start Physical Health
            </Link>
          </div>
        </div>

        <div className="card bg-emerald-50 border-2 border-emerald-200">
          <h3 className="font-bold text-lg mb-2 text-emerald-800">📊 Weekly Assessments</h3>
          <p className="text-gray-700">For best results, complete these assessments weekly. Your progress will be tracked and visualized in your dashboard.</p>
        </div>
      </div>
    </div>
  );
}

export default function Assessments() {
  return (
    <Routes>
      <Route path="/" element={<AssessmentsHome />} />
      <Route path="/dass21" element={<DASS21Assessment />} />
      <Route path="/perma" element={<PERMAAssessment />} />
      <Route path="/physical" element={<PhysicalHealthAssessment />} />
    </Routes>
  );
}
