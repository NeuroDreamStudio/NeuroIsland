import React from 'react';
import Link from 'next/link';

interface LayoutWrapperProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children, showFooter = true }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">
      {/* Header */}
      <header className="relative z-50 backdrop-blur-md bg-black/30 border-b border-emerald-500/30 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-3xl">🏝️</span>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
              NeuroIsland
            </span>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-300 hover:text-emerald-400 transition">
              Home
            </Link>
            <Link href="/trivia" className="text-gray-300 hover:text-emerald-400 transition">
              Trivia
            </Link>
            <Link href="/nft-island" className="text-gray-300 hover:text-emerald-400 transition">
              NFT Hub
            </Link>
            <Link href="/admin/login" className="text-gray-300 hover:text-emerald-400 transition">
              Admin
            </Link>
          </nav>
          <button className="px-6 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 hover:shadow-lg transition text-white font-semibold">
            Connect Wallet
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      {showFooter && (
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
              <h3 className="text-3xl font-bold mb-3 flex items-center justify-center space-x-3">
                <span>🏝️</span>
                <span className="bg-gradient-to-r from-cyan-300 via-emerald-300 to-teal-400 bg-clip-text text-transparent">
                  NeuroIsland
                </span>
              </h3>
              <p className="text-cyan-200 text-lg max-w-2xl mx-auto">
                Your tropical paradise for gaming, NFTs, and Web3 adventures
              </p>
            </div>

            {/* Categories Grid */}
            <div className="flex justify-center mb-12">
              <div className="grid grid-cols-3 gap-6 w-full max-w-5xl px-6">
                {/* Product */}
                <div className="flex flex-col items-center">
                  <h4 className="text-lg font-bold mb-5 text-cyan-400 uppercase tracking-wider">Product</h4>
                  <ul className="space-y-3 text-center w-full list-none">
                    {['Trivia', 'NFT Hub', 'Neuro Trivia', 'Rewards'].map((link) => (
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
      )}
    </div>
  );
};

export default LayoutWrapper;
