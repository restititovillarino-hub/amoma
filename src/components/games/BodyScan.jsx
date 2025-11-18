import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function BodyScan() {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [reflection, setReflection] = useState('');
  const [showReflectionInput, setShowReflectionInput] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const steps = [
    {
      part: 'Feet & Toes',
      emoji: '🦶',
      instruction: 'Focus on your feet and toes. Notice any tension, warmth, or sensations. Wiggle your toes gently.',
      duration: '30 seconds'
    },
    {
      part: 'Legs',
      emoji: '🦵',
      instruction: 'Bring awareness to your calves and thighs. Feel them relax and sink into your chair or bed.',
      duration: '30 seconds'
    },
    {
      part: 'Stomach & Back',
      emoji: '💪',
      instruction: 'Notice your abdomen rising and falling with each breath. Feel your lower back supported.',
      duration: '30 seconds'
    },
    {
      part: 'Chest & Shoulders',
      emoji: '🫁',
      instruction: 'Feel your chest expand with each breath. Let your shoulders drop away from your ears.',
      duration: '30 seconds'
    },
    {
      part: 'Arms & Hands',
      emoji: '✋',
      instruction: 'Scan down your arms to your fingertips. Release any tension you find. Let your hands rest.',
      duration: '30 seconds'
    },
    {
      part: 'Neck & Face',
      emoji: '😌',
      instruction: 'Relax your jaw. Soften your forehead. Feel the tension melt from your neck and face.',
      duration: '30 seconds'
    },
    {
      part: 'Whole Body',
      emoji: '🧘',
      instruction: 'Take a moment to feel your whole body relaxed and peaceful. Notice how different you feel.',
      duration: '30 seconds'
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowReflectionInput(true);
    }
  };

  const handleSaveReflection = async () => {
    if (!reflection.trim()) return;

    try {
      await addDoc(collection(db, 'gameEntries'), {
        userId: user.uid,
        game: 'body-scan',
        reflection: reflection,
        createdAt: new Date()
      });
    } catch (error) {
      console.error('Error saving:', error);
    }

    setIsComplete(true);
  };

  if (isComplete) {
    return (
      <div className="min-h-screen gradient-green py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link to="/games" className="text-emerald-600 hover:text-emerald-700 font-medium mb-6 inline-block">
            ← Back to Games
          </Link>

          <div className="card text-center">
            <div className="text-6xl mb-6">✨</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Body Scan Complete!</h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Great work! Body scan meditation helps reduce stress, improve body awareness, 
              and promote deep relaxation. Regular practice can improve sleep and reduce chronic pain.
            </p>

            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-6 max-w-2xl mx-auto">
              <h3 className="font-bold text-lg mb-2 text-green-900">Your Reflection:</h3>
              <p className="text-gray-700 italic">"{reflection}"</p>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  setCurrentStep(0);
                  setReflection('');
                  setShowReflectionInput(false);
                  setIsComplete(false);
                }}
                className="btn-secondary px-6 py-2"
              >
                Practice Again
              </button>
              <Link to="/games" className="btn-primary px-6 py-2">
                Play Another Game
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showReflectionInput) {
    return (
      <div className="min-h-screen gradient-green py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link to="/games" className="text-emerald-600 hover:text-emerald-700 font-medium mb-6 inline-block">
            ← Back to Games
          </Link>

          <div className="card">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🌟</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Complete!</h2>
              <p className="text-gray-600">Take a moment to feel your whole body relaxed and peaceful.</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How do you feel after the body scan journey?
              </label>
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="I feel... (e.g., more relaxed, calmer, less tense in my shoulders)"
                className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none resize-none"
                maxLength={200}
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-500">{reflection.length}/200 characters</span>
                <button
                  onClick={handleSaveReflection}
                  disabled={!reflection.trim()}
                  className="btn-primary px-6 py-2"
                >
                  Complete Practice
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const progress = ((currentStep + 1) / steps.length) * 100;
  const step = steps[currentStep];

  return (
    <div className="min-h-screen gradient-green py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/games" className="text-emerald-600 hover:text-emerald-700 font-medium mb-6 inline-block">
          ← Back to Games
        </Link>

        <div className="card mb-8">
          <div className="text-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 mx-auto mb-4 flex items-center justify-center text-4xl">
              🧘
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Body Scan Meditation</h1>
            <p className="text-gray-600">Progressive relaxation from feet to head</p>
          </div>

          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>Step {currentStep + 1} of {steps.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-50 to-emerald-50 mb-6">
          <div className="text-center mb-6">
            <div className="text-7xl mb-4">{step.emoji}</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{step.part}</h2>
            <p className="text-sm text-gray-600 mb-4">{step.duration}</p>
          </div>

          <div className="bg-white rounded-xl p-6 mb-6">
            <p className="text-lg text-gray-700 leading-relaxed text-center">
              {step.instruction}
            </p>
          </div>

          <div className="text-center">
            <button onClick={handleNext} className="btn-primary px-12 py-4 text-lg">
              {currentStep < steps.length - 1 ? 'Next →' : 'Complete'}
            </button>
          </div>
        </div>

        <div className="card bg-green-50">
          <h3 className="font-bold text-lg mb-2 text-green-900">💡 Body Scan Benefits</h3>
          <ul className="text-gray-700 space-y-1 text-sm">
            <li>• Reduces physical tension and stress</li>
            <li>• Improves body awareness and mindfulness</li>
            <li>• Helps with sleep and relaxation</li>
            <li>• Can reduce chronic pain perception</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
