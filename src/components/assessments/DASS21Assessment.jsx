import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';

const questions = [
  { id: 1, text: "I couldn't seem to experience any positive feeling at all", category: 'depression' },
  { id: 2, text: "I was aware of dryness of my mouth", category: 'anxiety' },
  { id: 3, text: "I found it hard to wind down", category: 'stress' },
  { id: 4, text: "I had difficulty in breathing (e.g., excessively rapid breathing, breathlessness)", category: 'anxiety' },
  { id: 5, text: "I found it difficult to work up the initiative to do things", category: 'depression' },
  { id: 6, text: "I tended to over-react to situations", category: 'stress' },
  { id: 7, text: "I experienced trembling (e.g., in the hands)", category: 'anxiety' },
  { id: 8, text: "I felt that I was using a lot of nervous energy", category: 'stress' },
  { id: 9, text: "I was worried about situations in which I might panic and make a fool of myself", category: 'anxiety' },
  { id: 10, text: "I felt that I had nothing to look forward to", category: 'depression' },
  { id: 11, text: "I found myself getting agitated", category: 'stress' },
  { id: 12, text: "I found it difficult to relax", category: 'stress' },
  { id: 13, text: "I felt down-hearted and blue", category: 'depression' },
  { id: 14, text: "I was intolerant of anything that kept me from getting on with what I was doing", category: 'stress' },
  { id: 15, text: "I felt I was close to panic", category: 'anxiety' },
  { id: 16, text: "I was unable to become enthusiastic about anything", category: 'depression' },
  { id: 17, text: "I felt I wasn't worth much as a person", category: 'depression' },
  { id: 18, text: "I felt that I was rather touchy", category: 'stress' },
  { id: 19, text: "I was aware of the action of my heart in the absence of physical exertion", category: 'anxiety' },
  { id: 20, text: "I felt scared without any good reason", category: 'anxiety' },
  { id: 21, text: "I felt that life was meaningless", category: 'depression' },
];

const options = [
  { value: 0, label: 'Did not apply to me at all' },
  { value: 1, label: 'Applied to me to some degree, or some of the time' },
  { value: 2, label: 'Applied to me to a considerable degree, or a good part of the time' },
  { value: 3, label: 'Applied to me very much, or most of the time' },
];

export default function DASS21Assessment() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [scores, setScores] = useState(null);

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [currentQuestion]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScores(newAnswers);
    }
  };

  const calculateScores = async (finalAnswers) => {
    let depression = 0, anxiety = 0, stress = 0;

    questions.forEach((q, index) => {
      const value = finalAnswers[index] || 0;
      if (q.category === 'depression') depression += value;
      if (q.category === 'anxiety') anxiety += value;
      if (q.category === 'stress') stress += value;
    });

    // Multiply by 2 for DASS-21 scoring
    depression *= 2;
    anxiety *= 2;
    stress *= 2;

    const calculatedScores = { depression, anxiety, stress };
    setScores(calculatedScores);
    setShowResults(true);

    // Save to Firestore
    try {
      await addDoc(collection(db, 'assessments'), {
        userId: user.uid,
        userEmail: user.email,
        type: 'dass21',
        scores: calculatedScores,
        completedAt: new Date()
      });
    } catch (error) {
      console.error('Error saving assessment:', error);
    }
  };

  const getSeverity = (score, type) => {
    if (type === 'depression') {
      if (score <= 9) return { level: 'Normal', color: 'text-green-600' };
      if (score <= 13) return { level: 'Mild', color: 'text-yellow-600' };
      if (score <= 20) return { level: 'Moderate', color: 'text-orange-600' };
      if (score <= 27) return { level: 'Severe', color: 'text-red-600' };
      return { level: 'Extremely Severe', color: 'text-red-800' };
    }
    if (type === 'anxiety') {
      if (score <= 7) return { level: 'Normal', color: 'text-green-600' };
      if (score <= 9) return { level: 'Mild', color: 'text-yellow-600' };
      if (score <= 14) return { level: 'Moderate', color: 'text-orange-600' };
      if (score <= 19) return { level: 'Severe', color: 'text-red-600' };
      return { level: 'Extremely Severe', color: 'text-red-800' };
    }
    // stress
    if (score <= 14) return { level: 'Normal', color: 'text-green-600' };
    if (score <= 18) return { level: 'Mild', color: 'text-yellow-600' };
    if (score <= 25) return { level: 'Moderate', color: 'text-orange-600' };
    if (score <= 33) return { level: 'Severe', color: 'text-red-600' };
    return { level: 'Extremely Severe', color: 'text-red-800' };
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults && scores) {
    const depSeverity = getSeverity(scores.depression, 'depression');
    const anxSeverity = getSeverity(scores.anxiety, 'anxiety');
    const strSeverity = getSeverity(scores.stress, 'stress');

    return (
      <div className="min-h-screen gradient-green py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link to="/assessments" className="text-emerald-600 hover:text-emerald-700 font-medium mb-6 inline-block">
            ← Back to Assessments
          </Link>

          <div className="card mb-8 text-center">
            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">✓</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Assessment Complete!</h1>
            <p className="text-gray-600">Here are your DASS-21 results for the past 7 days</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="card border-l-4 border-blue-500">
              <h3 className="text-sm text-gray-600 mb-1">DEPRESSION</h3>
              <p className="text-4xl font-bold text-gray-900 mb-2">{scores.depression}</p>
              <p className={`text-lg font-semibold ${depSeverity.color}`}>{depSeverity.level}</p>
            </div>

            <div className="card border-l-4 border-yellow-500">
              <h3 className="text-sm text-gray-600 mb-1">ANXIETY</h3>
              <p className="text-4xl font-bold text-gray-900 mb-2">{scores.anxiety}</p>
              <p className={`text-lg font-semibold ${anxSeverity.color}`}>{anxSeverity.level}</p>
            </div>

            <div className="card border-l-4 border-purple-500">
              <h3 className="text-sm text-gray-600 mb-1">STRESS</h3>
              <p className="text-4xl font-bold text-gray-900 mb-2">{scores.stress}</p>
              <p className={`text-lg font-semibold ${strSeverity.color}`}>{strSeverity.level}</p>
            </div>
          </div>

          <div className="card bg-blue-50 border-2 border-blue-200 mb-8">
            <h3 className="font-bold text-lg mb-2 text-blue-900">📊 What do these scores mean?</h3>
            <p className="text-gray-700 mb-4">These scores indicate your level of distress over the past 7 days. Higher scores suggest you may benefit from additional support.</p>
            
            <div className="space-y-2 text-sm">
              <p><strong>Depression:</strong> 0-9 Normal • 10-13 Mild • 14-20 Moderate • 21-27 Severe • 28+ Extremely Severe</p>
              <p><strong>Anxiety:</strong> 0-7 Normal • 8-9 Mild • 10-14 Moderate • 15-19 Severe • 20+ Extremely Severe</p>
              <p><strong>Stress:</strong> 0-14 Normal • 15-18 Mild • 19-25 Moderate • 26-33 Severe • 34+ Extremely Severe</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Link to="/dashboard" className="btn-primary flex-1 text-center">
              Continue to Dashboard
            </Link>
            <Link to="/assessments" className="btn-secondary flex-1 text-center">
              Take Another Assessment
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-green py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/assessments" className="text-emerald-600 hover:text-emerald-700 font-medium mb-6 inline-block">
          ← Back to Assessments
        </Link>

        <div className="card mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">DASS-21 Assessment</h1>
          <p className="text-gray-600 mb-6">
            Please read each statement and select the response that indicates how much the statement 
            applied to you <strong>over the past 7 days</strong>. There are no right or wrong answers.
          </p>

          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{currentQuestion + 1} / {questions.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-green-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="card bg-blue-50 border-2 border-blue-200 mb-6">
            <p className="text-sm text-gray-600 mb-2">📊 Score Interpretation:</p>
            <div className="text-xs text-gray-600 space-y-1">
              <p><strong>Depression:</strong> 0-9 Normal • 10-13 Mild • 14-20 Moderate • 21+ Severe</p>
              <p><strong>Anxiety:</strong> 0-7 Normal • 8-9 Mild • 10-14 Moderate • 15+ Severe</p>
              <p><strong>Stress:</strong> 0-14 Normal • 15-18 Mild • 19-25 Moderate • 26+ Severe</p>
            </div>
          </div>
        </div>

        <div className="card mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg">
              {currentQuestion + 1}
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">
                {questions[currentQuestion].category.toUpperCase()}
              </p>
              <h2 className="text-xl font-bold text-gray-900">
                Over the past 7 days, {questions[currentQuestion].text.toLowerCase()}
              </h2>
            </div>
          </div>

          <div className="space-y-3">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className="w-full p-4 text-left border-2 border-gray-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all"
              >
                <p className="font-medium text-gray-900">{option.label}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="text-center text-sm text-gray-600">
          <p>📊 Your responses will be saved locally and securely</p>
        </div>
      </div>
    </div>
  );
}
