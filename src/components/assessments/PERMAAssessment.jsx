import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const questions = [
  { id: 1, text: "In general, how often did you feel joyful?", domain: 'positive' },
  { id: 2, text: "In general, how often did you feel positive?", domain: 'positive' },
  { id: 3, text: "In general, how often did you feel contented?", domain: 'positive' },
  { id: 4, text: "In general, to what extent did you feel excited and interested in things?", domain: 'engagement' },
  { id: 5, text: "In general, to what extent did you lose track of time while doing something you enjoy?", domain: 'engagement' },
  { id: 6, text: "In general, to what extent did you become absorbed in what you were doing?", domain: 'engagement' },
  { id: 7, text: "In general, to what extent did you receive help and support from others when you needed it?", domain: 'relationships' },
  { id: 8, text: "In general, to what extent did you feel loved?", domain: 'relationships' },
  { id: 9, text: "In general, how satisfied were you with your personal relationships?", domain: 'relationships' },
  { id: 10, text: "In general, to what extent did you lead a purposeful and meaningful life?", domain: 'meaning' },
  { id: 11, text: "In general, to what extent did you generally feel that what you do in your life is valuable and worthwhile?", domain: 'meaning' },
  { id: 12, text: "In general, did you have a sense of direction in your life?", domain: 'meaning' },
  { id: 13, text: "In general, how often were you able to handle your responsibilities?", domain: 'accomplishment' },
  { id: 14, text: "In general, how often did you accomplish important goals you have set for yourself?", domain: 'accomplishment' },
  { id: 15, text: "In general, how capable were you at managing your daily responsibilities?", domain: 'accomplishment' },
];

const options = [
  { value: 0, label: 'Never' },
  { value: 1, label: 'Rarely' },
  { value: 2, label: 'Sometimes' },
  { value: 3, label: 'Often' },
  { value: 4, label: 'Always' },
];

export default function PERMAAssessment() {
  const { user } = useAuth();
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
    const domainScores = {
      positive: 0,
      engagement: 0,
      relationships: 0,
      meaning: 0,
      accomplishment: 0,
    };

    const domainCounts = {
      positive: 0,
      engagement: 0,
      relationships: 0,
      meaning: 0,
      accomplishment: 0,
    };

    questions.forEach((q, index) => {
      const value = finalAnswers[index] || 0;
      domainScores[q.domain] += value;
      domainCounts[q.domain]++;
    });

    // Calculate averages
    Object.keys(domainScores).forEach(domain => {
      domainScores[domain] = domainScores[domain] / domainCounts[domain];
    });

    // Overall score
    const overall = Object.values(domainScores).reduce((sum, score) => sum + score, 0) / 5;
    domainScores.overall = overall;

    setScores(domainScores);
    setShowResults(true);

    // Save to Firestore
    try {
      await addDoc(collection(db, 'assessments'), {
        userId: user.uid,
        userEmail: user.email,
        type: 'perma',
        scores: domainScores,
        completedAt: new Date()
      });
    } catch (error) {
      console.error('Error saving assessment:', error);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 3.5) return 'text-green-600';
    if (score >= 2.5) return 'text-yellow-600';
    if (score >= 1.5) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreLevel = (score) => {
    if (score >= 3.5) return 'Flourishing';
    if (score >= 2.5) return 'Moderate';
    if (score >= 1.5) return 'Low';
    return 'Very Low';
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults && scores) {
    return (
      <div className="min-h-screen gradient-green py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link to="/assessments" className="text-emerald-600 hover:text-emerald-700 font-medium mb-6 inline-block">
            ← Back to Assessments
          </Link>

          <div className="card mb-8 text-center">
            <div className="w-20 h-20 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">✓</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Assessment Complete!</h1>
            <p className="text-gray-600">Here are your PERMA well-being scores for the past 7 days</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="card border-l-4 border-cyan-500">
              <h3 className="text-sm text-gray-600 mb-1">OVERALL SCORE</h3>
              <p className="text-4xl font-bold text-gray-900 mb-2">{scores.overall.toFixed(2)}</p>
              <p className={`text-lg font-semibold ${getScoreColor(scores.overall)}`}>
                {getScoreLevel(scores.overall)}
              </p>
            </div>

            <div className="card border-l-4 border-pink-500">
              <h3 className="text-sm text-gray-600 mb-1">Positive</h3>
              <p className="text-4xl font-bold text-gray-900 mb-2">{scores.positive.toFixed(2)}</p>
              <p className={`text-lg font-semibold ${getScoreColor(scores.positive)}`}>
                {getScoreLevel(scores.positive)}
              </p>
            </div>

            <div className="card border-l-4 border-blue-500">
              <h3 className="text-sm text-gray-600 mb-1">Engagement</h3>
              <p className="text-4xl font-bold text-gray-900 mb-2">{scores.engagement.toFixed(2)}</p>
              <p className={`text-lg font-semibold ${getScoreColor(scores.engagement)}`}>
                {getScoreLevel(scores.engagement)}
              </p>
            </div>

            <div className="card border-l-4 border-green-500">
              <h3 className="text-sm text-gray-600 mb-1">Relationships</h3>
              <p className="text-4xl font-bold text-gray-900 mb-2">{scores.relationships.toFixed(2)}</p>
              <p className={`text-lg font-semibold ${getScoreColor(scores.relationships)}`}>
                {getScoreLevel(scores.relationships)}
              </p>
            </div>

            <div className="card border-l-4 border-purple-500">
              <h3 className="text-sm text-gray-600 mb-1">Meaning</h3>
              <p className="text-4xl font-bold text-gray-900 mb-2">{scores.meaning.toFixed(2)}</p>
              <p className={`text-lg font-semibold ${getScoreColor(scores.meaning)}`}>
                {getScoreLevel(scores.meaning)}
              </p>
            </div>

            <div className="card border-l-4 border-orange-500">
              <h3 className="text-sm text-gray-600 mb-1">Accomplishment</h3>
              <p className="text-4xl font-bold text-gray-900 mb-2">{scores.accomplishment.toFixed(2)}</p>
              <p className={`text-lg font-semibold ${getScoreColor(scores.accomplishment)}`}>
                {getScoreLevel(scores.accomplishment)}
              </p>
            </div>
          </div>

          <div className="card bg-blue-50 border-2 border-blue-200 mb-8">
            <h3 className="font-bold text-lg mb-2 text-blue-900">📊 What do these scores mean?</h3>
            <p className="text-gray-700 mb-4">
              Your PERMA profile shows how balanced your well-being is across five domains: Positive Emotions, 
              Engagement, Relationships, Meaning, and Accomplishment. Scores closer to 4 indicate stronger well-being.
            </p>
            <div className="text-sm space-y-1">
              <p>�� <strong>3.5-4.0:</strong> Flourishing • <strong>2.5-3.4:</strong> Moderate</p>
              <p>😐 <strong>1.5-2.4:</strong> Low • <strong>0-1.4:</strong> Very Low</p>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">PERMA Well-Being Profiler</h1>
          <p className="text-gray-600 mb-6">
            Please answer honestly based on <strong>your experiences over the past 7 days</strong>.
          </p>

          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{currentQuestion + 1} / {questions.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="card mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-cyan-500 text-white flex items-center justify-center font-bold text-lg">
              {currentQuestion + 1}
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">
                {questions[currentQuestion].domain.toUpperCase()}
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
                className="w-full p-4 text-left border-2 border-gray-200 rounded-xl hover:border-cyan-500 hover:bg-cyan-50 transition-all flex justify-between items-center"
              >
                <span className="font-medium text-gray-900">{option.label}</span>
                <span className="text-2xl text-gray-400">{option.value}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
