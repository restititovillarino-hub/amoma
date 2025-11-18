import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function GratitudeGarden() {
  const { user } = useAuth();
  const [gratitude, setGratitude] = useState('');
  const [flowers, setFlowers] = useState([]);
  const [showComplete, setShowComplete] = useState(false);

  const flowerEmojis = ['🌸', '🌺', '🌻', '🌷', '🌹', '🏵️', '💐', '🌼'];

  const handlePlant = async () => {
    if (!gratitude.trim()) return;

    const randomFlower = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
    setFlowers([...flowers, { text: gratitude, emoji: randomFlower }]);
    setGratitude('');

    // Save to database
    try {
      await addDoc(collection(db, 'gameEntries'), {
        userId: user.uid,
        game: 'gratitude',
        entry: gratitude,
        createdAt: new Date()
      });
    } catch (error) {
      console.error('Error saving:', error);
    }

    if (flowers.length >= 2) {
      setShowComplete(true);
    }
  };

  return (
    <div className="min-h-screen gradient-green py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/games" className="text-emerald-600 hover:text-emerald-700 font-medium mb-6 inline-block">
          ← Back to Games
        </Link>

        <div className="card mb-8">
          <div className="text-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 mx-auto mb-4 flex items-center justify-center text-4xl">
              🌸
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Plant Your Gratitude Garden</h1>
            <p className="text-gray-600">Each gratitude you write plants a beautiful flower</p>
          </div>

          {!showComplete && (
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What are you grateful for today?
              </label>
              <textarea
                value={gratitude}
                onChange={(e) => setGratitude(e.target.value)}
                placeholder="I'm grateful for... (e.g., my family's support, a beautiful sunset, a good cup of coffee)"
                className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none resize-none"
                maxLength={200}
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-500">{gratitude.length}/200 characters</span>
                <button
                  onClick={handlePlant}
                  disabled={!gratitude.trim()}
                  className="btn-primary px-6 py-2"
                >
                  🌱 Plant Flower
                </button>
              </div>
            </div>
          )}

          {flowers.length > 0 && (
            <div className="bg-gradient-to-b from-green-100 to-green-50 rounded-2xl p-8 mb-6">
              <h3 className="text-xl font-bold text-center text-gray-900 mb-6">Your Garden 🌿</h3>
              <div className="grid grid-cols-3 gap-6">
                {flowers.map((flower, index) => (
                  <div key={index} className="text-center">
                    <div className="text-6xl mb-2 animate-bounce">{flower.emoji}</div>
                    <p className="text-sm text-gray-700 italic">"{flower.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {showComplete && (
            <div className="bg-pink-50 border-2 border-pink-200 rounded-2xl p-6 text-center">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Beautiful Garden!</h3>
              <p className="text-gray-700 mb-4">
                You've planted {flowers.length} flowers of gratitude. Research shows that regular gratitude 
                practice can improve mood, reduce stress, and enhance overall well-being.
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => {
                    setFlowers([]);
                    setShowComplete(false);
                  }}
                  className="btn-secondary px-6 py-2"
                >
                  Plant More
                </button>
                <Link to="/games" className="btn-primary px-6 py-2">
                  Play Another Game
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="card bg-pink-50">
          <h3 className="font-bold text-lg mb-2 text-pink-900">💡 Benefits of Gratitude</h3>
          <ul className="text-gray-700 space-y-1 text-sm">
            <li>• Improves mood and life satisfaction</li>
            <li>• Reduces stress and anxiety</li>
            <li>• Enhances relationships and social connections</li>
            <li>• Promotes better sleep quality</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
