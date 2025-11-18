import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const questions = [
  { 
    id: 1, 
    text: "How many days did you engage in at least 30 minutes of moderate physical activity?", 
    category: 'exercise',
    options: [
      { value: 0, label: '0 days' },
      { value: 1, label: '1-2 days' },
      { value: 2, label: '3-4 days' },
      { value: 3, label: '5-6 days' },
      { value: 4, label: 'Every day' },
    ]
  },
  { 
    id: 2, 
    text: "How many servings of fruits and vegetables did you eat daily?", 
    category: 'nutrition',
    options: [
      { value: 0, label: '0-1 servings' },
      { value: 1, label: '2-3 servings' },
      { value: 2, label: '4-5 servings' },
      { value: 3, label: '6-7 servings' },
      { value: 4, label: '8+ servings' },
    ]
  },
  { 
    id: 3, 
    text: "How many hours of sleep did you get on average per night?", 
    category: 'sleep',
    options: [
      { value: 0, label: 'Less than 5 hours' },
      { value: 1, label: '5-6 hours' },
      { value: 2, label: '6-7 hours' },
      { value: 3, label: '7-8 hours' },
      { value: 4, label: '8-9 hours' },
    ]
  },
  { 
    id: 4, 
    text: "How would you rate the quality of your sleep?", 
    category: 'sleep',
    options: [
      { value: 0, label: 'Very poor' },
      { value: 1, label: 'Poor' },
      { value: 2, label: 'Fair' },
      { value: 3, label: 'Good' },
      { value: 4, label: 'Excellent' },
    ]
  },
  { 
    id: 5, 
    text: "How many glasses of water did you drink daily?", 
    category: 'nutrition',
    options: [
      { value: 0, label: '1-2 glasses' },
      { value: 1, label: '3-4 glasses' },
      { value: 2, label: '5-6 glasses' },
      { value: 3, label: '7-8 glasses' },
      { value: 4, label: '9+ glasses' },
    ]
  },
  { 
    id: 6, 
    text: "How often did you eat balanced meals (protein, carbs, vegetables)?", 
    category: 'nutrition',
    options: [
      { value: 0, label: 'Rarely' },
      { value: 1, label: 'Sometimes (1-2 meals/day)' },
      { value: 2, label: 'Often (2 meals/day)' },
      { value: 3, label: 'Usually (3 meals/day)' },
      { value: 4, label: 'Always (all meals)' },
    ]
  },
  { 
    id: 7, 
    text: "How many days did you do strength training or resistance exercises?", 
    category: 'exercise',
    options: [
      { value: 0, label: '0 days' },
      { value: 1, label: '1 day' },
      { value: 2, label: '2 days' },
      { value: 3, label: '3 days' },
      { value: 4, label: '4+ days' },
    ]
  },
  { 
    id: 8, 
    text: "How consistent was your sleep schedule (same bedtime/wake time)?", 
    category: 'sleep',
    options: [
      { value: 0, label: 'Very inconsistent' },
      { value: 1, label: 'Inconsistent' },
      { value: 2, label: 'Somewhat consistent' },
      { value: 3, label: 'Mostly consistent' },
      { value: 4, label: 'Very consistent' },
    ]
  },
  { 
    id: 9, 
    text: "How often did you limit processed foods and sugary drinks?", 
    category: 'nutrition',
    options: [
      { value: 0, label: 'Never' },
      { value: 1, label: 'Rarely' },
      { value: 2, label: 'Sometimes' },
      { value: 3, label: 'Often' },
      { value: 4, label: 'Always' },
    ]
  },
  { 
    id: 10, 
    text: "How would you rate your overall energy levels?", 
    category: 'overall',
    options: [
      { value: 0, label: 'Very low' },
      { value: 1, label: 'Low' },
      { value: 2, label: 'Moderate' },
      { value: 3, label: 'High' },
      { value: 4, label: 'Very high' },
    ]
  },
  { 
    id: 11, 
    text: "How often did you take breaks from sitting/screen time?", 
    category: 'exercise',
    options: [
      { value: 0, label: 'Never' },
      { value: 1, label: 'Rarely' },
      { value: 2, label: 'Sometimes' },
      { value: 3, label: 'Often' },
      { value: 4, label: 'Regularly' },
    ]
  },
  { 
    id: 12, 
    text: "How satisfied are you with your current physical health?", 
    category: 'overall',
    options: [
      { value: 0, label: 'Very dissatisfied' },
      { value: 1, label: 'Dissatisfied' },
      { value: 2, label: 'Neutral' },
      { value: 3, label: 'Satisfied' },
      { value: 4, label: 'Very satisfied' },
    ]
  },
];

export default function PhysicalHealthAssessment() {
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
    const categoryScores = {
      exercise: 0,
      nutrition: 0,
      sleep: 0,
      overall: 0,
    };

    const categoryCounts = {
      exercise: 0,
      nutrition: 0,
      sleep: 0,
      overall: 0,
    };

    questions.forEach((q, index) => {
      const value = finalAnswers[index] || 0;
      categoryScores[q.category] += value;
      categoryCounts[q.category]++;
    });

    // Calculate averages
    Object.keys(categoryScores).forEach(category => {
      categoryScores[category] = (categoryScores[category] / categoryCounts[category]) * 25;
    });

    // Total score
    const total = Object.values(categoryScores).reduce((sum, score) => sum + score, 0) / 4;
    categoryScores.total = total;

    setScores(categoryScores);
    setShowResults(true);

    // Save to Firestore
    try {
      await addDoc(collection(db, 'assessments'), {
        userId: user.uid,
        userEmail: user.email,
        type: 'physical',
        scores: categoryScores,
        completedAt: new Date()
      });
    } catch (error) {
      console.error('Error saving assessment:', error);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 75) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    if (score >= 25) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreLevel = (score) => {
    if (score >= 75) return 'Excellent';
    if (score >= 50) return 'Good';
    if (score >= 25) return 'Fair';
    return 'Needs Improvement';
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  if (showResults && scores) {
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
            <p className="text-gray-600">Here are your physical health scores for the past 7 days</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="card border-l-4 border-emerald-500 md:col-span-2">
              <h3 className="text-sm text-gray-600 mb-1">TOTAL SCORE</h3>
              <p className="text-5xl font-bold text-gray-900 mb-2">{Math.round(scores.total)}/100</p>
              <p className={`text-xl font-semibold ${getScoreColor(scores.total)}`}>
                {getScoreLevel(scores.total)}
              </p>
            </div>

            <div className="card border-l-4 border-blue-500">
              <h3 className="text-sm text-gray-600 mb-1">🏃 Exercise</h3>
              <p className="text-3xl font-bold text-gray-900 mb-2">{Math.round(scores.exercise)}/100</p>
              <p className={`text-lg font-semibold ${getScoreColor(scores.exercise)}`}>
                {getScoreLevel(scores.exercise)}
              </p>
            </div>

            <div className="card border-l-4 border-green-500">
              <h3 className="text-sm text-gray-600 mb-1">🥗 Nutrition</h3>
              <p className="text-3xl font-bold text-gray-900 mb-2">{Math.round(scores.nutrition)}/100</p>
              <p className={`text-lg font-semibold ${getScoreColor(scores.nutrition)}`}>
                {getScoreLevel(scores.nutrition)}
              </p>
            </div>

            <div className="card border-l-4 border-purple-500">
              <h3 className="text-sm text-gray-600 mb-1">😴 Sleep</h3>
              <p className="text-3xl font-bold text-gray-900 mb-2">{Math.round(scores.sleep)}/100</p>
              <p className={`text-lg font-semibold ${getScoreColor(scores.sleep)}`}>
                {getScoreLevel(scores.sleep)}
              </p>
            </div>

            <div className="card border-l-4 border-orange-500">
              <h3 className="text-sm text-gray-600 mb-1">⚡ Overall Wellness</h3>
              <p className="text-3xl font-bold text-gray-900 mb-2">{Math.round(scores.overall)}/100</p>
              <p className={`text-lg font-semibold ${getScoreColor(scores.overall)}`}>
                {getScoreLevel(scores.overall)}
              </p>
            </div>
          </div>

          <div className="card bg-emerald-50 border-2 border-emerald-200 mb-8">
            <h3 className="font-bold text-lg mb-2 text-emerald-900">💡 Score Interpretation</h3>
            <div className="text-sm space-y-1">
              <p>🟢 <strong>75-100:</strong> Excellent - Keep up the great work!</p>
              <p>🟡 <strong>50-74:</strong> Good - You're on the right track</p>
              <p>🟠 <strong>25-49:</strong> Fair - Room for improvement</p>
              <p>🔴 <strong>0-24:</strong> Needs Improvement - Let's work on this together</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Link to="/dashboard" className="btn-primary flex-1 text-center">
              Continue to Dashboard
            </Link>
            <Link to="/chat" className="btn-secondary flex-1 text-center">
              Chat with AMOMA
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Physical Health Assessment</h1>
          <p className="text-gray-600 mb-6">
            Please answer based on <strong>your habits over the past 7 days</strong>.
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
        </div>

        <div className="card mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-lg">
              {currentQuestion + 1}
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">
                {currentQ.category.toUpperCase()}
              </p>
              <h2 className="text-xl font-bold text-gray-900">
                Over the past 7 days, {currentQ.text.toLowerCase()}
              </h2>
            </div>
          </div>

          <div className="space-y-3">
            {currentQ.options.map((option) => (
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
      </div>
    </div>
  );
}
