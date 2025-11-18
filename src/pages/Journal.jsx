import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../config/firebase';
import { collection, addDoc, query, where, orderBy, getDocs } from 'firebase/firestore';

export default function Journal() {
  const { user } = useAuth();
  const [entry, setEntry] = useState('');
  const [mood, setMood] = useState('');
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const username = user?.displayName || user?.email?.split('@')[0] || 'User';

  const moodOptions = [
    { emoji: '😊', label: 'Happy', value: 'happy' },
    { emoji: '😌', label: 'Calm', value: 'calm' },
    { emoji: '😔', label: 'Sad', value: 'sad' },
    { emoji: '😰', label: 'Anxious', value: 'anxious' },
    { emoji: '😤', label: 'Frustrated', value: 'frustrated' },
  ];

  useEffect(() => {
    loadEntries();
  }, [user]);

  const loadEntries = async () => {
    if (!user) return;
    try {
      const q = query(
        collection(db, 'journalEntries'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      const loadedEntries = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
      }));
      setEntries(loadedEntries);
    } catch (error) {
      console.error('Error loading entries:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!entry.trim() || !mood) return;

    setLoading(true);
    try {
      await addDoc(collection(db, 'journalEntries'), {
        userId: user.uid,
        userEmail: user.email,
        content: entry,
        mood,
        createdAt: new Date()
      });
      
      setShowSuccess(true);
      setEntry('');
      setMood('');
      await loadEntries();
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving entry:', error);
      alert('Failed to save entry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMoodEmoji = (moodValue) => {
    const mood = moodOptions.find(m => m.value === moodValue);
    return mood ? mood.emoji : '📝';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl p-8 shadow-xl mb-8 border-2 border-emerald-200">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Reflective Journal</h1>
          <p className="text-gray-600 mb-8 text-lg">Welcome, <strong className="text-emerald-600">{username}</strong>! 📝 Express your thoughts and track your emotional journey</p>

          {showSuccess && (
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 mb-6">
              <p className="text-emerald-800 font-semibold">✓ Journal entry saved successfully!</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">How are you feeling today?</label>
              <div className="flex gap-4 flex-wrap">
                {moodOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setMood(option.value)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                      mood === option.value
                        ? 'border-emerald-500 bg-emerald-50 shadow-lg transform scale-105'
                        : 'border-gray-200 hover:border-emerald-300 hover:shadow-md'
                    }`}
                  >
                    <span className="text-5xl">{option.emoji}</span>
                    <span className="text-sm font-semibold text-gray-700">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Your thoughts and reflections...</label>
              <textarea
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                placeholder="What's on your mind today? How are you feeling? What happened? What are you grateful for?"
                className="w-full h-48 p-4 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none resize-none text-base"
                required
              />
              <p className="text-sm text-gray-500 mt-2">{entry.length} characters</p>
            </div>

            <button
              type="submit"
              disabled={loading || !entry.trim() || !mood}
              className="bg-gradient-to-r from-emerald-600 to-green-700 text-white px-10 py-4 rounded-xl font-bold text-lg hover:from-emerald-700 hover:to-green-800 transition-all w-full disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
            >
              {loading ? 'Saving...' : '💾 Save Entry'}
            </button>
          </form>
        </div>

        {entries.length > 0 && (
          <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-emerald-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">📚 Past Journal Entries</h2>
            <div className="space-y-4">
              {entries.map((entry) => (
                <div key={entry.id} className="border-2 border-gray-200 rounded-xl p-6 hover:border-emerald-300 transition-all hover:shadow-lg">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-4xl">{getMoodEmoji(entry.mood)}</span>
                    <div>
                      <p className="font-bold text-gray-900 text-lg">{formatDate(entry.createdAt)}</p>
                      <p className="text-sm text-gray-500">{entry.mood}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{entry.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
