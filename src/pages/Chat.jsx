import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { sendChatMessage } from '../utils/openai';

export default function Chat() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const username = user?.displayName || user?.email?.split('@')[0] || 'there';

  useEffect(() => {
    setMessages([{
      role: 'assistant',
      content: `Hi ${username}! I'm AMOMA, your AI wellness companion. I'm here to support you with evidence-based guidance for mental health, physical wellness, and academic success.\n\n💙 How can I help you today?`
    }]);
  }, [username]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const chatHistory = [...messages, userMessage].map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await sendChatMessage(chatHistory);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm here to support you. Could you tell me more about what you're experiencing? Whether it's stress, sleep issues, concentration problems, or anything else - I'm here to listen and provide evidence-based guidance."
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-xl border-2 border-emerald-200">
          <div className="flex items-center gap-4">
            <img 
              src="/images/amoma-bot-logo.png" 
              alt="AMOMA"
              className="w-16 h-16 rounded-full border-4 border-emerald-500 shadow-lg"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><circle cx="32" cy="32" r="32" fill="%2310b981"/><text x="32" y="40" text-anchor="middle" fill="white" font-size="24" font-weight="bold">A</text></svg>';
              }}
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Chat with AMOMA</h1>
              <p className="text-gray-600">Your 24/7 AI wellness companion 💚</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 h-[500px] overflow-y-auto mb-6 shadow-xl border-2 border-emerald-200">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <img 
                    src="/images/amoma-bot-logo.png" 
                    alt="AMOMA"
                    className="w-10 h-10 rounded-full border-2 border-emerald-500 flex-shrink-0 shadow-md"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><circle cx="20" cy="20" r="20" fill="%2310b981"/><text x="20" y="26" text-anchor="middle" fill="white" font-size="16" font-weight="bold">A</text></svg>';
                    }}
                  />
                )}
                <div className={`max-w-[70%] rounded-2xl p-4 ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3">
                <img 
                  src="/images/amoma-bot-logo.png" 
                  alt="AMOMA"
                  className="w-10 h-10 rounded-full border-2 border-emerald-500 shadow-md"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><circle cx="20" cy="20" r="20" fill="%2310b981"/><text x="20" y="26" text-anchor="middle" fill="white" font-size="16" font-weight="bold">A</text></svg>';
                  }}
                />
                <div className="bg-gray-100 rounded-2xl p-4">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-xl border-2 border-emerald-200">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message... (Press Enter to send)"
              disabled={loading}
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-gradient-to-r from-emerald-600 to-green-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-green-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              Send
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            ⚠️ AMOMA provides educational support, not medical advice. For emergencies, call NCMH: 1553
          </p>
        </form>

        {/* Crisis Resources */}
        <div className="bg-red-50 rounded-2xl p-6 mt-6 border-2 border-red-200 shadow-xl">
          <h3 className="font-bold text-red-800 mb-3 text-lg">🚨 Mental Health Crisis Support - Philippines</h3>
          <p className="text-sm text-red-700 mb-3"><strong>If you're in crisis, please reach out immediately:</strong></p>
          <ul className="text-sm text-red-700 space-y-2">
            <li>📞 <strong>NCMH Crisis Hotline:</strong> 1553 (24/7, Free)</li>
            <li>📞 <strong>Landline:</strong> 0917-899-USAP (8727)</li>
            <li>📞 <strong>Smart/TNT:</strong> 0908-639-2672</li>
            <li>📞 <strong>Globe/TM:</strong> 0917-899-8727</li>
          </ul>
          <p className="text-xs text-red-600 mt-3 italic">
            AMOMA is an educational companion, not a substitute for professional care. For emergencies, contact your campus clinic or nearest hospital.
          </p>
        </div>
      </div>
    </div>
  );
}
