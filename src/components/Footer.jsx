export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-emerald-400">AMOMA</h3>
            <p className="text-gray-400 text-sm">
              Evidence-based AI wellness platform for college students worldwide. Combining research excellence with compassionate care.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-emerald-400">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="text-gray-400 hover:text-emerald-400 transition-colors">About AMOMA</a></li>
              <li><a href="/features" className="text-gray-400 hover:text-emerald-400 transition-colors">Features</a></li>
              <li><a href="/resources" className="text-gray-400 hover:text-emerald-400 transition-colors">Resources</a></li>
              <li><a href="/assessments" className="text-gray-400 hover:text-emerald-400 transition-colors">Assessments</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-orange-400">🚨 Crisis Support</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-400"><strong>Emergency:</strong> 911</li>
              <li className="text-gray-400"><strong>NCMH Crisis Hotline:</strong> 1553</li>
              <li className="text-gray-400"><strong>Crisis Text Line:</strong> Text HOME to 741741</li>
              <li className="text-gray-400"><strong>Suicide Lifeline:</strong> 1-800-273-8255</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-emerald-400">Support</h4>
            <p className="text-gray-400 text-sm mb-2">Available 24/7 for college students worldwide</p>
            <a href="/chat" className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
              Chat with AMOMA
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="text-center text-sm text-gray-400">
            <p className="mb-4">
              <strong className="text-white">Disclaimer:</strong> AMOMA is an educational wellness tool. It is not a substitute for professional medical or mental health care. If you are experiencing a medical emergency, please contact emergency services or a crisis hotline immediately.
            </p>
            <div className="bg-gray-800 rounded-lg p-6 mb-4">
              <p className="text-gray-300 mb-2">
                <strong className="text-emerald-400">Copyright © 2025 Resti Tito H. Villarino. All rights reserved.</strong>
              </p>
              <p className="text-gray-400 text-xs leading-relaxed">
                The content on this website, including text, images, and other materials, is protected by copyright law. 
                No part of this website may be reproduced, distributed, or transmitted in any form or by any means without 
                the prior written permission of the copyright owner.
              </p>
              <p className="text-gray-400 text-xs mt-2">
                For inquiries, contact: <a href="mailto:restitito.villarino@wvsu.edu.ph" className="text-emerald-400 hover:underline">restitito.villarino@wvsu.edu.ph</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
