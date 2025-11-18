import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function MoodMandala() {
  const { user } = useAuth();
  const [selectedColor, setSelectedColor] = useState(null);
  const [reflection, setReflection] = useState('');
  const [coloredSegments, setColoredSegments] = useState([]);
  const [showComplete, setShowComplete] = useState(false);

  const colors = [
    { name: 'Red', hex: '#EF4444', emotion: 'Energy/Passion' },
    { name: 'Orange', hex: '#F97316', emotion: 'Joy/Creativity' },
    { name: 'Yellow', hex: '#EAB308', emotion: 'Optimism/Happiness' },
    { name: 'Green', hex: '#10B981', emotion: 'Calm/Balance' },
    { name: 'Blue', hex: '#3B82F6', emotion: 'Peace/Trust' },
    { name: 'Purple', hex: '#8B5CF6', emotion: 'Wisdom/Spirituality' },
    { name: 'Pink', hex: '#EC4899', emotion: 'Love/Compassion' },
    { name: 'Gray', hex: '#6B7280', emotion: 'Neutral/Uncertain' },
  ];

  const handleColorSegment = async () => {
    if (!selectedColor || !reflection.trim()) return;

    const newSegment = {
      color: selectedColor,
      reflection: reflection,
      timestamp: new Date()
    };

    setColoredSegments([...coloredSegments, newSegment]);
    setReflection('');

    // Save to database
    try {
      await addDoc(collection(db, 'gameEntries'), {
        userId: user.uid,
        game: 'mandala',
        color: selectedColor.name,
        reflection: reflection,
        createdAt: new Date()
      });
    } catch (error) {
      console.error('Error saving:', error);
    }

    if (coloredSegments.length >= 3) {
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
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 mx-auto mb-4 flex items-center justify-center text-4xl">
              🎨
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Color Your Mood Mandala</h1>
            <p className="text-gray-600">Choose colors that represent your feelings</p>
          </div>

          {!showComplete && (
            <>
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-3">Choose a color:</h3>
                <div className="grid grid-cols-4 gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`p-4 rounded-xl border-4 transition-all ${
                        selectedColor?.name === color.name
                          ? 'border-gray-900 shadow-lg scale-105'
                          : 'border-transparent hover:border-gray-300'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      <div className="text-white font-bold text-sm drop-shadow-lg">
                        {color.name}
                      </div>
                      <div className="text-white text-xs drop-shadow-lg">{color.emotion}</div>
                    </button>
                  ))}
                </div>
              </div>

              {selectedColor && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Why did you choose {selectedColor.name}? What does it represent for you today?
                  </label>
                  <textarea
                    value={reflection}
                    onChange={(e) => setReflection(e.target.value)}
                    placeholder={`This color represents... (e.g., I chose ${selectedColor.name.toLowerCase()} because...)`}
                    className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none resize-none"
                    maxLength={200}
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500">{reflection.length}/200 characters</span>
                    <button
                      onClick={handleColorSegment}
                      disabled={!reflection.trim()}
                      className="btn-primary px-6 py-2"
                    >
                      Add to Mandala
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {coloredSegments.length > 0 && (
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 mb-6">
              <h3 className="text-xl font-bold text-center text-gray-900 mb-4">Your Mood Mandala</h3>
              <div className="flex justify-center mb-6">
                <div className="flex gap-2">
                  {coloredSegments.map((segment, index) => (
                    <div
                      key={index}
                      className="w-16 h-16 rounded-full shadow-lg animate-pulse"
                      style={{ backgroundColor: segment.color.hex }}
                      title={segment.reflection}
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                {coloredSegments.map((segment, index) => (
                  <div key={index} className="bg-white rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex-shrink-0"
                        style={{ backgroundColor: segment.color.hex }}
                      />
                      <div>
                        <p className="font-bold text-sm text-gray-900">{segment.color.name} - {segment.color.emotion}</p>
                        <p className="text-sm text-gray-700 italic">"{segment.reflection}"</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {showComplete && (
            <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-6 text-center">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Mandala Complete!</h3>
              <p className="text-gray-700 mb-4">
                You've created a beautiful representation of your emotions. Art therapy helps process 
                feelings and promotes self-awareness and emotional regulation.
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => {
                    setColoredSegments([]);
                    setShowComplete(false);
                    setSelectedColor(null);
                  }}
                  className="btn-secondary px-6 py-2"
                >
                  Create Another
                </button>
                <Link to="/games" className="btn-primary px-6 py-2">
                  Play Another Game
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="card bg-purple-50">
          <h3 className="font-bold text-lg mb-2 text-purple-900">💡 Color Psychology</h3>
          <p className="text-gray-700 text-sm">
            Colors can influence emotions and mood. Art therapy using colors helps express feelings 
            that might be difficult to put into words, promoting emotional awareness and healing.
          </p>
        </div>
      </div>
    </div>
  );
}
