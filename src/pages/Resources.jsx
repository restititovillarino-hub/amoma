export default function Resources() {
  return (
    <div className="min-h-screen gradient-green py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">Wellness Resources</h1>
        <p className="text-center text-gray-700 mb-12">A comprehensive collection of mental health and wellness resources for Filipino college students</p>

        {/* Crisis Support */}
        <div className="card mb-8 bg-red-50 border-2 border-red-200">
          <h2 className="text-2xl font-bold text-red-800 mb-4">🚨 Crisis Support (24/7)</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-red-900 mb-2">National Crisis Hotlines</h3>
              <ul className="space-y-2 text-sm">
                <li><strong>NCMH Crisis Hotline:</strong> 1553 (24/7, Free)</li>
                <li><strong>Landline:</strong> 0917-899-USAP (8727)</li>
                <li><strong>Smart/TNT:</strong> 0908-639-2672</li>
                <li><strong>Globe/TM:</strong> 0917-899-8727</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-red-900 mb-2">Emergency Services</h3>
              <ul className="space-y-2 text-sm">
                <li><strong>Emergency:</strong> 911</li>
                <li><strong>PNP Hotline:</strong> 117</li>
                <li><strong>Red Cross:</strong> 143</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-sm text-red-700 italic">
            <strong>AMOMA</strong> is an educational companion, not a substitute for professional care. For emergencies, contact your campus clinic or nearest hospital.
          </p>
        </div>

        {/* Campus Mental Health */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🎓 Campus Mental Health Services</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold mb-2">University of the Philippines</h3>
              <p className="text-sm text-gray-600 mb-1">Office of Counseling & Guidance</p>
              <p className="text-sm">📞 (02) 8981-8500 loc. 2436</p>
              <p className="text-sm">⏰ Mon-Fri: 8am-5pm</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">De La Salle University</h3>
              <p className="text-sm text-gray-600 mb-1">Counseling and Career Services</p>
              <p className="text-sm">📞 (02) 8524-4611 loc. 112</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Note: Check with your university's guidance office for more information. Most universities offer free counseling services.
          </p>
        </div>

        {/* Mental Health Topics */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="card">
            <h3 className="text-xl font-bold mb-4 text-gray-900">🧠 Mental Health Topics</h3>
            <ul className="space-y-3">
              <li>
                <strong className="text-emerald-600">Stress Management</strong>
                <p className="text-sm text-gray-600">Learn techniques to manage academic and personal stress</p>
              </li>
              <li>
                <strong className="text-emerald-600">Anxiety & Depression</strong>
                <p className="text-sm text-gray-600">Understanding symptoms and seeking appropriate help</p>
              </li>
              <li>
                <strong className="text-emerald-600">Sleep Hygiene</strong>
                <p className="text-sm text-gray-600">Establish healthy sleep habits for better mental health</p>
              </li>
              <li>
                <strong className="text-emerald-600">Building Resilience</strong>
                <p className="text-sm text-gray-600">Develop coping strategies for life's challenges</p>
              </li>
            </ul>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-4 text-gray-900">💪 Physical Wellness</h3>
            <ul className="space-y-3">
              <li>
                <strong className="text-emerald-600">Exercise Guidelines</strong>
                <p className="text-sm text-gray-600">150 minutes moderate activity per week recommended</p>
              </li>
              <li>
                <strong className="text-emerald-600">Nutrition for Students</strong>
                <p className="text-sm text-gray-600">Eating well on a student budget</p>
              </li>
              <li>
                <strong className="text-emerald-600">Campus Recreation</strong>
                <p className="text-sm text-gray-600">Find activities and facilities on your campus</p>
              </li>
              <li>
                <strong className="text-emerald-600">Mindfulness & Yoga</strong>
                <p className="text-sm text-gray-600">Mind-body practices for holistic wellness</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Online Resources */}
        <div className="card mb-8">
          <h3 className="text-xl font-bold mb-4 text-gray-900">🌐 Online Resources</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-bold text-emerald-600 mb-2">Mental Health Philippines</h4>
              <ul className="text-sm space-y-1">
                <li>• <a href="https://doh.gov.ph" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">DOH Mental Health</a></li>
                <li>• National Center for Mental Health</li>
                <li>• MindNation - Online Therapy</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-emerald-600 mb-2">Global Resources</h4>
              <ul className="text-sm space-y-1">
                <li>• WHO Mental Health</li>
                <li>• NIMH - Research & Info</li>
                <li>• Headspace - Meditation App</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-emerald-600 mb-2">Student-Focused</h4>
              <ul className="text-sm space-y-1">
                <li>• Active Minds</li>
                <li>• JED Foundation</li>
                <li>• The Steve Fund</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Daily Self-Care Tips */}
        <div className="card bg-gradient-to-r from-emerald-50 to-green-50">
          <h3 className="text-xl font-bold mb-4 text-gray-900">💡 Daily Self-Care Tips</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-bold mb-2 text-emerald-700">Morning Routine</h4>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• Wake at consistent time</li>
                <li>• Drink water</li>
                <li>• 5-minute stretching</li>
                <li>• Healthy breakfast</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2 text-emerald-700">During the Day</h4>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• Take study breaks</li>
                <li>• Stay hydrated</li>
                <li>• Connect with friends</li>
                <li>• Move your body</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2 text-emerald-700">Evening Routine</h4>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• No screens before bed</li>
                <li>• Reflect on gratitude</li>
                <li>• Prepare for tomorrow</li>
                <li>• 7-9 hours sleep</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
