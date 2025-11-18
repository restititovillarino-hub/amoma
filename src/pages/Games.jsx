import { Routes, Route, Link } from 'react-router-dom';
import GratitudeGarden from '../components/games/GratitudeGarden';
import MoodMandala from '../components/games/MoodMandala';
import BreathingBubble from '../components/games/BreathingBubble';
import WorryTree from '../components/games/WorryTree';
import BodyScan from '../components/games/BodyScan';

function GamesHome() {
  const games = [
    { 
      id: 'gratitude', 
      title: '🌸 Gratitude Garden', 
      desc: 'Plant gratitude to grow your inner garden',
      path: '/games/gratitude',
      color: 'from-pink-500 to-rose-600'
    },
    { 
      id: 'mandala', 
      title: '🎨 Mood Mandala', 
      desc: 'Color your emotions through art',
      path: '/games/mandala',
      color: 'from-purple-500 to-indigo-600'
    },
    { 
      id: 'breathing', 
      title: '🫧 Breathing Bubble', 
      desc: 'Practice mindful breathing exercises',
      path: '/games/breathing',
      color: 'from-blue-500 to-cyan-600'
    },
    { 
      id: 'body-scan', 
      title: '🧘 Body Scan Journey', 
      desc: 'Progressive relaxation from feet to head',
      path: '/games/body-scan',
      color: 'from-green-500 to-emerald-600'
    },
    { 
      id: 'worry', 
      title: '🌳 Worry Tree', 
      desc: 'Sort your worries using CBT techniques',
      path: '/games/worry',
      color: 'from-orange-500 to-amber-600'
    },
  ];

  return (
    <div className="min-h-screen gradient-green py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">Wellness Games</h1>
        <p className="text-center text-gray-700 mb-12">Evidence-based therapeutic games to support your mental health journey</p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {games.map(game => (
            <Link 
              key={game.id} 
              to={game.path}
              className="card text-center hover:shadow-2xl transition-all transform hover:scale-105"
            >
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${game.color} mx-auto mb-4 flex items-center justify-center text-4xl shadow-lg`}>
                {game.title.split(' ')[0]}
              </div>
              <h3 className="text-xl font-bold mb-2">{game.title.slice(3)}</h3>
              <p className="text-gray-600 mb-4">{game.desc}</p>
              <span className="text-emerald-600 font-semibold">Play Now →</span>
            </Link>
          ))}
        </div>

        <div className="card bg-emerald-50 border-2 border-emerald-200">
          <h3 className="font-bold text-lg mb-2 text-emerald-800">💡 Why Play Wellness Games?</h3>
          <p className="text-gray-700">
            These games are designed by mental health professionals to help reduce stress, 
            practice mindfulness, and build emotional resilience through engaging, evidence-based activities.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Games() {
  return (
    <Routes>
      <Route path="/" element={<GamesHome />} />
      <Route path="/gratitude" element={<GratitudeGarden />} />
      <Route path="/mandala" element={<MoodMandala />} />
      <Route path="/breathing" element={<BreathingBubble />} />
      <Route path="/body-scan" element={<BodyScan />} />
      <Route path="/worry" element={<WorryTree />} />
    </Routes>
  );
}
