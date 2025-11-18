import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function BreathingBubble() {
  const [isBreathing, setIsBreathing] = useState(false);
  const [phase, setPhase] = useState('ready'); // ready, inhale, hold, exhale
  const [count, setCount] = useState(0);
  const [cycles, setCycles] = useState(0);

  useEffect(() => {
    if (!isBreathing) return;

    const timer = setTimeout(() => {
      if (phase === 'inhale' && count < 4) {
        setCount(count + 1);
      } else if (phase === 'inhale' && count === 4) {
        setPhase('hold');
        setCount(0);
      } else if (phase === 'hold' && count < 4) {
        setCount(count + 1);
      } else if (phase === 'hold' && count === 4) {
        setPhase('exhale');
        setCount(0);
      } else if (phase === 'exhale' && count < 6) {
        setCount(count + 1);
      } else if (phase === 'exhale' && count === 6) {
        setCycles(cycles + 1);
        setPhase('inhale');
        setCount(0);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [isBreathing, phase, count, cycles]);

  const handleStart = () => {
    setIsBreathing(true);
    setPhase('inhale');
    setCount(0);
    setCycles(0);
  };

  const handleStop = () => {
    setIsBreathing(false);
    setPhase('ready');
    setCount(0);
  };

  const getBubbleSize = () => {
    if (phase === 'inhale') {
      return 100 + (count * 50);
    } else if (phase === 'hold') {
      return 300;
    } else if (phase === 'exhale') {
      return 300 - (count * 50);
    }
    return 150;
  };

  const getPhaseText = () => {
    if (phase === 'inhale') return 'Breathe In...';
    if (phase === 'hold') return 'Hold...';
    if (phase === 'exhale') return 'Breathe Out...';
    return 'Ready?';
  };

  return (
    <div className="min-h-screen gradient-green py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/games" className="text-emerald-600 hover:text-emerald-700 font-medium mb-6 inline-block">
          ← Back to Games
        </Link>

        <div className="card mb-8">
          <div className="text-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 mx-auto mb-4 flex items-center justify-center text-4xl">
              🫧
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Breathing Bubble</h1>
            <p className="text-gray-600">Follow the bubble to practice mindful breathing</p>
          </div>

          <div className="bg-gradient-to-b from-blue-50 to-cyan-50 rounded-2xl p-12 mb-6">
            <div className="flex flex-col items-center justify-center">
              <div
                className="rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 shadow-2xl transition-all duration-1000 ease-in-out flex items-center justify-center"
                style={{
                  width: `${getBubbleSize()}px`,
                  height: `${getBubbleSize()}px`,
                }}
              >
                <span className="text-white font-bold text-2xl drop-shadow-lg">
                  {count > 0 ? count : ''}
                </span>
              </div>

              <div className="mt-8 text-center">
                <p className="text-3xl font-bold text-gray-900 mb-2">{getPhaseText()}</p>
                <p className="text-lg text-gray-600">Cycles completed: {cycles}</p>
              </div>
            </div>
          </div>

          <div className="text-center mb-6">
            {!isBreathing ? (
              <button onClick={handleStart} className="btn-primary px-12 py-4 text-lg">
                Start Breathing Exercise
              </button>
            ) : (
              <button onClick={handleStop} className="btn-secondary px-12 py-4 text-lg">
                Stop Exercise
              </button>
            )}
          </div>

          {cycles >= 3 && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 text-center">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Great Work!</h3>
              <p className="text-gray-700 mb-4">
                You've completed {cycles} breathing cycles. Deep breathing activates your parasympathetic 
                nervous system, reducing stress and promoting relaxation.
              </p>
              <Link to="/games" className="btn-primary px-6 py-2 inline-block">
                Play Another Game
              </Link>
            </div>
          )}
        </div>

        <div className="card bg-blue-50">
          <h3 className="font-bold text-lg mb-2 text-blue-900">💡 Box Breathing (4-4-6)</h3>
          <p className="text-gray-700 text-sm mb-3">
            This breathing technique is used by Navy SEALs to stay calm under pressure. 
            It helps reduce stress, improve focus, and regulate emotions.
          </p>
          <ul className="text-gray-700 space-y-1 text-sm">
            <li>• Inhale for 4 seconds</li>
            <li>• Hold for 4 seconds</li>
            <li>• Exhale for 6 seconds</li>
            <li>• Repeat 3-5 times</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
