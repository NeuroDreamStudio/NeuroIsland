import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer 
      className="relative mt-20 border-t border-white/20 !bg-transparent"
      style={{
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.2)',
        background: 'transparent !important',
        position: 'relative',
        zIndex: 40,
      }}
    >
      <div className="max-w-7xl mx-auto px-4" style={{ paddingTop: '4.4rem', paddingBottom: '4.4rem' }}>
        {/* Header Section */}
        <div className="text-center mb-12">
        </div>

        {/* Categories Grid */}
        <div className="flex justify-center mb-12" style={{ marginTop: '-2%' }}>
          <div className="grid grid-cols-3 gap-6 w-full max-w-5xl px-6">
            {/* Navigation */}
            <div className="flex flex-col items-center">
              <h4 className="text-lg font-bold mb-5 text-cyan-400 uppercase tracking-wider">Navigation</h4>
              <ul className="space-y-3 text-center w-full list-none">
                {[
                  { name: 'Home', href: '/' },
                  { name: 'NFT Hub', href: '/nft-island' },
                  { name: 'Neuro Trivia', href: '/neuro-trivia' },
                  { name: 'Rewards', href: '/rewards' }
                ].map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} legacyBehavior>
                      <a className="text-white visited:text-white hover:text-yellow-400 transition duration-200 font-medium">
                        {link.name}
                      </a>
                    </Link>
                  </li>
                ))}  
              </ul>
            </div>

            {/* Community */}
            <div className="flex flex-col items-center">
              <h4 className="text-lg font-bold mb-5 text-emerald-400 uppercase tracking-wider">Community</h4>
              <ul className="space-y-3 text-center w-full list-none">
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
              <ul className="space-y-3 text-center w-full list-none">
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
        <div className="border-t border-white/30 mt-12 pt-12">
          <div className="flex flex-col md:flex-row justify-center items-center text-center gap-6">
            <p className="text-white/80 text-sm">
              © 2026 NeuroIsland. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
