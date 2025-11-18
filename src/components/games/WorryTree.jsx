import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function WorryTree() {
  const { user } = useAuth();
  const [step, setStep] = useState('input');
  const [worry, setWorry] = useState('');
  const [canControl, setCanControl] = useState(null);
  const [action, setAction] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const handleWorrySubmit = () => {
    if (!worry.trim()) return;
    setStep('control');
  };

  const handleControlAnswer = (answer) => {
    setCanControl(answer);
    if (answer === 'no') {
      setStep('letGo');
    } else {
      setStep('action');
    }
  };

  const handleActionSubmit = async () => {
    if (!action.trim()) return;

    try {
      await addDoc(collection(db, 'gameEntries'), {
        userId: user.uid,
        game: 'worry-tree',
        worry: worry,
        canControl: canControl,
        action: action,
        createdAt: new Date()
      });
    } catch (error) {
      console.error('Error saving:', error);
    }

    setIsComplete(true);
  };

  const handleReset = () => {
    setStep('input');
    setWorry('');
    setCanControl(null);
    setAction('');
    setIsComplete(false);
  };

  if (isComplete) {
    return (
      <div className="min-h-screen gradient-green py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link to="/games" className="text-emerald-600 hover:text-emerald-700 font-medium mb-6 inline-block">
            ← Back to Games
          </Link>

          <div className="card text-center">
            <div className="text-6xl mb-6">🎯</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Action Plan Created!</h2>
            <p className="text-gray-700 mb-6">
              You've identified a concrete action. Now commit to taking this step!
            </p>

            <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6 mb-6 max-w-2xl mx-auto text-left">
              <h3 className="font-bold text-lg mb-2 text-orange-900">Your Worry:</h3>
              <p className="text-gray-700 mb-4 italic">"{worry}"</p>
              
              <h3 className="font-bold text-lg mb-2 text-orange-900">Your Action Plan:</h3>
              <p className="text-gray-700 italic">"{action}"</p>
            </div>

            <div className="flex gap-4 justify-center">
              <button onClick={handleReset} className="btn-secondary px-6 py-2">
                Process Another Worry
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

  if (step === 'letGo') {
    return (
      <div className="min-h-screen gradient-green py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link to="/games" className="text-emerald-600 hover:text-emerald-700 font-medium mb-6 inline-block">
            ← Back to Games
          </Link>

          <div className="card text-center">
            <div className="text-6xl mb-6">🍃</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Let It Go</h2>
            
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6 max-w-2xl mx-auto text-left">
              <h3 className="font-bold text-lg mb-2 text-blue-900">Your Worry:</h3>
              <p className="text-gray-700 mb-4 italic">"{worry}"</p>
              
              <h3 className="font-bold text-lg mb-3 text-blue-900">This worry is outside your control.</h3>
              <p className="text-gray-700 mb-4">
                Since you can't control this situation, the healthiest response is to practice acceptance 
                and redirect your energy toward things you can influence.
              </p>

              <h4 className="font-bold mb-2 text-gray-900">Try these strategies:</h4>
              <ul className="text-gray-700 space-y-2 text-sm">
                <li>✓ Practice mindfulness: Focus on the present moment</li>
                <li>✓ Challenge catastrophic thinking: What's realistic?</li>
                <li>✓ Distract with positive activities: Exercise, hobbies, friends</li>
                <li>✓ Use the 5-4-3-2-1 grounding technique for anxiety</li>
                <li>✓ Write it down and symbolically "let it go"</li>
              </ul>
            </div>

            <div className="flex gap-4 justify-center">
              <button onClick={handleReset} className="btn-secondary px-6 py-2">
                Process Another Worry
              </button>
              <Link to="/chat" className="btn-primary px-6 py-2">
                Talk to AMOMA
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-green py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/games" className="text-emerald-600 hover:text-emerald-700 font-medium mb-6 inline-block">
          ← Back to Games
        </Link>

        <div className="card mb-8">
          <div className="text-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 mx-auto mb-4 flex items-center justify-center text-4xl">
              🌳
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Worry Tree (CBT Tool)</h1>
            <p className="text-gray-600">A structured way to manage worries effectively</p>
          </div>

          {step === 'input' && (
            <>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What's worrying you right now?
                </label>
                <textarea
                  value={worry}
                  onChange={(e) => setWorry(e.target.value)}
                  placeholder="I'm worried about... (e.g., my upcoming exam, a difficult conversation, my health)"
                  className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none resize-none"
                  maxLength={200}
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-500">{worry.length}/200 characters</span>
                  <button
                    onClick={handleWorrySubmit}
                    disabled={!worry.trim()}
                    className="btn-primary px-6 py-2"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </>
          )}

          {step === 'control' && (
            <>
              <div className="bg-orange-50 rounded-xl p-6 mb-6">
                <h3 className="font-bold text-lg mb-2 text-gray-900">Your Worry:</h3>
                <p className="text-gray-700 italic mb-4">"{worry}"</p>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-lg text-gray-900 mb-4 text-center">
                  Can you do something about this worry right now?
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleControlAnswer('yes')}
                    className="p-6 border-2 border-green-500 rounded-xl hover:bg-green-50 transition-all"
                  >
                    <div className="text-4xl mb-2">✅</div>
                    <p className="font-bold text-gray-900">Yes, I can</p>
                    <p className="text-sm text-gray-600">There's an action I can take</p>
                  </button>
                  <button
                    onClick={() => handleControlAnswer('no')}
                    className="p-6 border-2 border-blue-500 rounded-xl hover:bg-blue-50 transition-all"
                  >
                    <div className="text-4xl mb-2">🍃</div>
                    <p className="font-bold text-gray-900">No, I can't</p>
                    <p className="text-sm text-gray-600">It's outside my control</p>
                  </button>
                </div>
              </div>
            </>
          )}

          {step === 'action' && (
            <>
              <div className="bg-orange-50 rounded-xl p-6 mb-6">
                <h3 className="font-bold text-lg mb-2 text-gray-900">Your Worry:</h3>
                <p className="text-gray-700 italic">"{worry}"</p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What specific action can you take to address this worry?
                </label>
                <textarea
                  value={action}
                  onChange={(e) => setAction(e.target.value)}
                  placeholder="I will... (e.g., study for 30 minutes today, schedule that conversation, make a doctor's appointment)"
                  className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none resize-none"
                  maxLength={200}
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-500">{action.length}/200 characters</span>
                  <button
                    onClick={handleActionSubmit}
                    disabled={!action.trim()}
                    className="btn-primary px-6 py-2"
                  >
                    Create Action Plan
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="card bg-orange-50">
          <h3 className="font-bold text-lg mb-2 text-orange-900">💡 How the Worry Tree Works</h3>
          <p className="text-gray-700 text-sm mb-3">
            The Worry Tree is a cognitive behavioral therapy (CBT) technique that helps you:
          </p>
          <ul className="text-gray-700 space-y-1 text-sm">
            <li>• Distinguish between productive and unproductive worry</li>
            <li>• Focus energy on problems you can solve</li>
            <li>• Let go of things outside your control</li>
            <li>• Reduce rumination and anxiety</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
