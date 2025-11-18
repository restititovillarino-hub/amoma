import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../config/firebase';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const [assessments, setAssessments] = useState([]);
  const [journalEntries, setJournalEntries] = useState([]);
  const [gameEntries, setGameEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [latestScores, setLatestScores] = useState(null);

  const username = user?.displayName || user?.email?.split('@')[0] || 'User';

  useEffect(() => {
    loadDashboardData();
  }, [user]);

  const loadDashboardData = async () => {
    if (!user) return;
    
    try {
      // Load assessments
      const assessmentQuery = query(
        collection(db, 'assessments'),
        where('userId', '==', user.uid),
        orderBy('completedAt', 'desc'),
        limit(10)
      );
      const assessmentSnapshot = await getDocs(assessmentQuery);
      const assessmentData = assessmentSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        completedAt: doc.data().completedAt?.toDate()
      }));
      setAssessments(assessmentData);

      // Get latest scores for each type
      const dass21 = assessmentData.find(a => a.type === 'dass21');
      const perma = assessmentData.find(a => a.type === 'perma');
      const physical = assessmentData.find(a => a.type === 'physical');
      
      setLatestScores({
        dass21: dass21?.scores,
        perma: perma?.scores,
        physical: physical?.scores
      });

      // Load journal entries
      const journalQuery = query(
        collection(db, 'journalEntries'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc'),
        limit(5)
      );
      const journalSnapshot = await getDocs(journalQuery);
      const journalData = journalSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
      }));
      setJournalEntries(journalData);

      // Load game entries
      const gameQuery = query(
        collection(db, 'gameEntries'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc'),
        limit(10)
      );
      const gameSnapshot = await getDocs(gameQuery);
      const gameData = gameSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
      }));
      setGameEntries(gameData);

    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMoodEmoji = (mood) => {
    const moods = {
      'happy': '😊', 'calm': '😌', 'sad': '😔', 
      'anxious': '😰', 'frustrated': '😤'
    };
    return moods[mood] || '📝';
  };

  const getGameIcon = (game) => {
    const icons = {
      'gratitude': '🌸',
      'mandala': '🎨',
      'breathing': '🫧',
      'body-scan': '🧘',
      'worry-tree': '🌳'
    };
    return icons[game] || '🎮';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold text-lg">Loading your wellness dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">Health & Wellness Dashboard</h1>
          <p className="text-gray-600 text-lg">Welcome back, <strong className="text-emerald-600">{username}</strong>! 📊 Here's your wellness overview</p>
        </div>

        {/* Latest Scores Summary */}
        {latestScores && (latestScores.dass21 || latestScores.perma || latestScores.physical) && (
          <div className="bg-white rounded-2xl p-8 shadow-xl mb-8 border-2 border-emerald-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Latest Assessment Scores</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {latestScores.dass21 && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                  <h3 className="font-bold text-blue-900 mb-3 text-lg">DASS-21</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Depression:</strong> {latestScores.dass21.depression}</p>
                    <p><strong>Anxiety:</strong> {latestScores.dass21.anxiety}</p>
                    <p><strong>Stress:</strong> {latestScores.dass21.stress}</p>
                  </div>
                </div>
              )}
              
              {latestScores.perma && (
                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border-2 border-cyan-200">
                  <h3 className="font-bold text-cyan-900 mb-3 text-lg">PERMA Well-Being</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Overall:</strong> {latestScores.perma.overall?.toFixed(2)}</p>
                    <p><strong>Positive:</strong> {latestScores.perma.positive?.toFixed(2)}</p>
                    <p><strong>Engagement:</strong> {latestScores.perma.engagement?.toFixed(2)}</p>
                  </div>
                </div>
              )}
              
              {latestScores.physical && (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                  <h3 className="font-bold text-green-900 mb-3 text-lg">Physical Health</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Total:</strong> {Math.round(latestScores.physical.total)}/100</p>
                    <p><strong>Exercise:</strong> {Math.round(latestScores.physical.exercise)}/100</p>
                    <p><strong>Nutrition:</strong> {Math.round(latestScores.physical.nutrition)}/100</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Recent Assessments */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-emerald-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">📊 Recent Assessments</h2>
              <Link to="/assessments" className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm">
                View All →
              </Link>
            </div>

            {assessments.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No assessments completed yet</p>
                <Link to="/assessments" className="bg-gradient-to-r from-emerald-600 to-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-green-800 transition-all inline-block shadow-lg">
                  Take Your First Assessment
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {assessments.map((assessment) => (
                  <div key={assessment.id} className="border-2 border-gray-200 rounded-xl p-4 hover:border-emerald-300 transition-all hover:shadow-md">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900 text-lg">{assessment.type?.toUpperCase()}</h3>
                      <span className="text-xs text-gray-500">{formatDate(assessment.completedAt)}</span>
                    </div>
                    <p className="text-sm text-gray-600">Completed</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Journal Entries */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-emerald-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">📝 Recent Journal Entries</h2>
              <Link to="/journal" className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm">
                View All →
              </Link>
            </div>

            {journalEntries.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No journal entries yet</p>
                <Link to="/journal" className="bg-gradient-to-r from-emerald-600 to-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-green-800 transition-all inline-block shadow-lg">
                  Start Journaling
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {journalEntries.map((entry) => (
                  <div key={entry.id} className="border-2 border-gray-200 rounded-xl p-4 hover:border-emerald-300 transition-all hover:shadow-md">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{getMoodEmoji(entry.mood)}</span>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-gray-900">{formatDate(entry.createdAt)}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm line-clamp-2">{entry.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Game Activities */}
        {gameEntries.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-xl mb-8 border-2 border-emerald-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🎮 Recent Wellness Games</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {gameEntries.map((entry) => (
                <div key={entry.id} className="border-2 border-gray-200 rounded-xl p-4 hover:border-emerald-300 transition-all">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{getGameIcon(entry.game)}</span>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 mb-1">{entry.game?.replace('-', ' ').toUpperCase()}</p>
                      <p className="text-xs text-gray-500 mb-2">{formatDate(entry.createdAt)}</p>
                      {entry.entry && <p className="text-sm text-gray-700 italic line-clamp-2">"{entry.entry}"</p>}
                      {entry.reflection && <p className="text-sm text-gray-700 italic line-clamp-2">"{entry.reflection}"</p>}
                      {entry.worry && <p className="text-sm text-gray-700 italic line-clamp-2">Worry: "{entry.worry}"</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-emerald-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">⚡ Quick Actions</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link to="/chat" className="bg-gradient-to-br from-emerald-500 to-green-600 text-white p-6 rounded-xl hover:shadow-2xl transition-all text-center group transform hover:scale-105">
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">💬</div>
              <h3 className="font-bold text-lg">Chat with AMOMA</h3>
            </Link>
            <Link to="/assessments" className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 rounded-xl hover:shadow-2xl transition-all text-center group transform hover:scale-105">
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">📊</div>
              <h3 className="font-bold text-lg">Take Assessment</h3>
            </Link>
            <Link to="/journal" className="bg-gradient-to-br from-purple-500 to-pink-600 text-white p-6 rounded-xl hover:shadow-2xl transition-all text-center group transform hover:scale-105">
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">📝</div>
              <h3 className="font-bold text-lg">Write Journal</h3>
            </Link>
            <Link to="/games" className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-6 rounded-xl hover:shadow-2xl transition-all text-center group transform hover:scale-105">
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">🎮</div>
              <h3 className="font-bold text-lg">Play Games</h3>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
