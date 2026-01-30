import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer 
      className="relative mt-20 border-t border-white/20"
      style={{
        backdropFilter: 'blur(20px)',
        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.4) 0%, rgba(34, 211, 238, 0.25) 100%)',
        boxShadow: '0 8px 32px rgba(6, 182, 212, 0.4), inset 0 0 20px rgba(255,255,255,0.15)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-12">
        </div>

        {/* Categories Grid */}
        <div className="flex justify-center mb-12">
          <div className="grid grid-cols-3 gap-6 w-full max-w-5xl px-6">
            {/* Navigation */}
            <div className="flex flex-col items-center">
              <h4 className="text-lg font-bold mb-5 text-cyan-400 uppercase tracking-wider">Navigation</h4>
              <ul className="space-y-3 text-center w-full">
                {['Home', 'NFT Gallery', 'Games', 'Rewards'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-white visited:text-white hover:text-yellow-400 transition duration-200 font-medium">
                      {link}
                    </a>
                  </li>
                ))}  
              </ul>
            </div>

            {/* Community */}
            <div className="flex flex-col items-center">
              <h4 className="text-lg font-bold mb-5 text-emerald-400 uppercase tracking-wider">Community</h4>
              <ul className="space-y-3 text-center w-full">
                {['Discord', 'Twitter', 'Telegram', 'Instagram'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-white visited:text-white hover:text-yellow-400 transition duration-200 font-medium">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="flex flex-col items-center">
              <h4 className="text-lg font-bold mb-5 text-teal-400 uppercase tracking-wider">Legal</h4>
              <ul className="space-y-3 text-center w-full">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-white visited:text-white hover:text-yellow-400 transition duration-200 font-medium">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/30 pt-8">
          <div className="flex flex-col md:flex-row justify-center items-center text-center gap-6">
            <p className="text-white/80 text-sm">
              © 2026 NeuroIsland. All rights reserved. 🚀
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
